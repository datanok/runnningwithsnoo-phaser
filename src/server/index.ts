import express from 'express';
import { createServer, context } from '@devvit/server';
import { redis } from '@devvit/redis';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

const router = express.Router();

// Game state management
interface GameState {
  id: string;
  status: 'lobby' | 'dropping' | 'active' | 'final-circle' | 'ended';
  players: Player[];
  playersAlive: number;
  maxPlayers: number;
  mapShrinkRadius: number;
  mapCenter: { x: number; y: number };
  currentEvent?: GameEvent;
  timeRemaining: number;
  winner?: Player;
  createdAt: number;
}

interface Player {
  id: string;
  username: string;
  position: { x: number; y: number };
  health: number;
  karma: number;
  inventory: any[];
  isAlive: boolean;
  subredditAffinity: string[];
  kills: number;
  survivalTime: number;
}

interface GameEvent {
  type: 'ama-invasion' | 'cake-day' | 'server-maintenance' | 'brigading' | 'mod-sweep';
  description: string;
  duration: number;
  effect: string;
}

// Initialize game
router.get('/api/game/init', async (_req, res): Promise<void> => {
  const { postId } = context;

  if (!postId) {
    res.status(400).json({
      status: 'error',
      message: 'postId is required but missing from context',
    });
    return;
  }

  try {
    let gameState = await redis.get(`game:${postId}`);
    
    if (!gameState) {
      const newGame: GameState = {
        id: postId,
        status: 'lobby',
        players: [],
        playersAlive: 0,
        maxPlayers: 100,
        mapShrinkRadius: 1000,
        mapCenter: { x: 512, y: 384 },
        timeRemaining: 0,
        createdAt: Date.now()
      };
      
      await redis.set(`game:${postId}`, JSON.stringify(newGame));
      gameState = JSON.stringify(newGame);
    }

    res.json({
      type: 'game-init',
      postId: postId,
      gameState: JSON.parse(gameState)
    });
  } catch (error) {
    console.error(`Game Init Error for post ${postId}:`, error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to initialize game' 
    });
  }
});

// Join game
router.post('/api/game/join', async (req, res): Promise<void> => {
  const { postId } = context;
  const { username, subredditAffinity } = req.body;

  if (!postId) {
    res.status(400).json({
      status: 'error',
      message: 'postId is required',
    });
    return;
  }

  try {
    const gameStateStr = await redis.get(`game:${postId}`);
    if (!gameStateStr) {
      res.status(404).json({
        status: 'error',
        message: 'Game not found'
      });
      return;
    }

    const gameState: GameState = JSON.parse(gameStateStr);
    
    if (gameState.players.length >= gameState.maxPlayers) {
      res.status(400).json({
        status: 'error',
        message: 'Game is full'
      });
      return;
    }

    if (gameState.status !== 'lobby') {
      res.status(400).json({
        status: 'error',
        message: 'Game already in progress'
      });
      return;
    }

    // Add player
    const newPlayer: Player = {
      id: `player_${Date.now()}_${Math.random()}`,
      username: username || `Snoo${gameState.players.length + 1}`,
      position: { x: 512, y: 384 },
      health: 100,
      karma: 0,
      inventory: [],
      isAlive: true,
      subredditAffinity: subredditAffinity || ['r/gaming'],
      kills: 0,
      survivalTime: 0
    };

    gameState.players.push(newPlayer);
    gameState.playersAlive = gameState.players.length;

    await redis.set(`game:${postId}`, JSON.stringify(gameState));

    res.json({
      type: 'player-joined',
      postId: postId,
      player: newPlayer,
      gameState: gameState
    });
  } catch (error) {
    console.error(`Join Game Error for post ${postId}:`, error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to join game' 
    });
  }
});

// Update player position
router.post('/api/game/move', async (req, res): Promise<void> => {
  const { postId } = context;
  const { playerId, position } = req.body;

  if (!postId) {
    res.status(400).json({
      status: 'error',
      message: 'postId is required',
    });
    return;
  }

  try {
    const gameStateStr = await redis.get(`game:${postId}`);
    if (!gameStateStr) {
      res.status(404).json({
        status: 'error',
        message: 'Game not found'
      });
      return;
    }

    const gameState: GameState = JSON.parse(gameStateStr);
    const player = gameState.players.find(p => p.id === playerId);
    
    if (!player) {
      res.status(404).json({
        status: 'error',
        message: 'Player not found'
      });
      return;
    }

    player.position = position;
    await redis.set(`game:${postId}`, JSON.stringify(gameState));

    res.json({
      type: 'player-moved',
      postId: postId,
      playerId: playerId,
      position: position
    });
  } catch (error) {
    console.error(`Move Player Error for post ${postId}:`, error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to update player position' 
    });
  }
});

// Player attack
router.post('/api/game/attack', async (req, res): Promise<void> => {
  const { postId } = context;
  const { attackerId, targetId, weapon } = req.body;

  if (!postId) {
    res.status(400).json({
      status: 'error',
      message: 'postId is required',
    });
    return;
  }

  try {
    const gameStateStr = await redis.get(`game:${postId}`);
    if (!gameStateStr) {
      res.status(404).json({
        status: 'error',
        message: 'Game not found'
      });
      return;
    }

    const gameState: GameState = JSON.parse(gameStateStr);
    const attacker = gameState.players.find(p => p.id === attackerId);
    const target = gameState.players.find(p => p.id === targetId);
    
    if (!attacker || !target) {
      res.status(404).json({
        status: 'error',
        message: 'Player not found'
      });
      return;
    }

    // Apply damage
    const damage = weapon?.damage || 25;
    target.health -= damage;
    
    if (target.health <= 0) {
      target.isAlive = false;
      attacker.kills++;
      attacker.karma += 10;
      gameState.playersAlive--;
    }

    await redis.set(`game:${postId}`, JSON.stringify(gameState));

    res.json({
      type: 'player-attacked',
      postId: postId,
      attacker: attacker,
      target: target,
      damage: damage,
      eliminated: target.health <= 0
    });
  } catch (error) {
    console.error(`Attack Error for post ${postId}:`, error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to process attack' 
    });
  }
});

// Get leaderboard
router.get('/api/game/leaderboard', async (_req, res): Promise<void> => {
  const { postId } = context;

  if (!postId) {
    res.status(400).json({
      status: 'error',
      message: 'postId is required',
    });
    return;
  }

  try {
    // Get top players from Redis
    const leaderboardData = await redis.get(`leaderboard:global`);
    let leaderboard = [];
    
    if (leaderboardData) {
      leaderboard = JSON.parse(leaderboardData);
    } else {
      // Create sample leaderboard
      leaderboard = [
        { username: 'SnooMaster', wins: 42, karma: 15000, rank: 1 },
        { username: 'RedditRoyalty', wins: 38, karma: 12500, rank: 2 },
        { username: 'KarmaKing', wins: 35, karma: 11000, rank: 3 },
        { username: 'MemeQueen', wins: 32, karma: 9800, rank: 4 },
        { username: 'UpvoteHero', wins: 28, karma: 8500, rank: 5 }
      ];
      await redis.set(`leaderboard:global`, JSON.stringify(leaderboard));
    }

    res.json({
      type: 'leaderboard',
      postId: postId,
      leaderboard: leaderboard
    });
  } catch (error) {
    console.error(`Leaderboard Error for post ${postId}:`, error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to get leaderboard' 
    });
  }
});

// Trigger game event
router.post('/api/game/event', async (req, res): Promise<void> => {
  const { postId } = context;
  const { eventType } = req.body;

  if (!postId) {
    res.status(400).json({
      status: 'error',
      message: 'postId is required',
    });
    return;
  }

  try {
    const gameStateStr = await redis.get(`game:${postId}`);
    if (!gameStateStr) {
      res.status(404).json({
        status: 'error',
        message: 'Game not found'
      });
      return;
    }

    const gameState: GameState = JSON.parse(gameStateStr);
    
    // Create event based on type
    const events = {
      'ama-invasion': {
        type: 'ama-invasion' as const,
        description: 'Celebrity NPC has appeared! Compete for attention!',
        duration: 60000,
        effect: 'karma_boost'
      },
      'cake-day': {
        type: 'cake-day' as const,
        description: 'It\'s everyone\'s cake day! Karma boost for all!',
        duration: 30000,
        effect: 'global_karma_boost'
      },
      'server-maintenance': {
        type: 'server-maintenance' as const,
        description: 'Server maintenance mode - reduced visibility!',
        duration: 45000,
        effect: 'reduced_vision'
      }
    };

    const event = events[eventType as keyof typeof events];
    if (event) {
      gameState.currentEvent = event;
      await redis.set(`game:${postId}`, JSON.stringify(gameState));
    }

    res.json({
      type: 'game-event',
      postId: postId,
      event: event
    });
  } catch (error) {
    console.error(`Game Event Error for post ${postId}:`, error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to trigger game event' 
    });
  }
});

// Use router middleware
app.use(router);

// Get port from environment variable with fallback
const port = process.env.WEBBIT_PORT || 3000;

const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port, () => console.log(`🎮 Snoo Royale Server running on http://localhost:${port}`));