import { Devvit, useWebView, useState, useAsync, useChannel } from '@devvit/public-api';

// Configure the app
Devvit.configure({
  redditAPI: true,
  redis: true,
  realtime: true,
});

// Add a menu action to create new game posts
Devvit.addMenuItem({
  label: 'Snoo Royale: New Battle',
  location: 'subreddit',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    
    await reddit.submitPost({
      title: '⚔️ SNOO ROYALE: Last Snoo Standing - Battle #' + Math.floor(Math.random() * 1000),
      subredditName: subreddit.name,
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <image
            imageHeight={256}
            imageWidth={256}
            height="256px"
            width="256px"
            url="https://i.redd.it/snoovatar/avatars/nftv2_bmZ0X2VpcDE1NToxMzdfNjkwOTc4NjIzNzE5NzAyNzlfMV8xNjcwOTc4NjIzNzE5NzAyNzk/1.png"
            description="Snoo Royale Battle Arena"
          />
          <vstack alignment="center middle">
            <text size="xxlarge" weight="bold" color="orangered">
              ⚔️ SNOO ROYALE ⚔️
            </text>
            <text size="large" weight="bold">
              Last Snoo Standing
            </text>
            <text size="medium">
              100 Players • Reddit-Themed Battle Royale
            </text>
            <text size="small" color="neutral-content-weak">
              Memes are weapons, karma is currency!
            </text>
          </vstack>
        </vstack>
      ),
    });

    ui.showToast({ text: '🎮 New Snoo Royale battle created!' });
  },
});

// Main app component
const App: Devvit.CustomPostComponent = (context) => {
  const { useState, useAsync, useChannel } = context;
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'spectating'>('lobby');
  const [playerCount, setPlayerCount] = useState(0);
  const [webviewVisible, setWebviewVisible] = useState(false);

  // Set up realtime channel for game updates
  const channel = useChannel({
    name: 'game-updates',
    onMessage: (msg) => {
      if (msg.type === 'player-count') {
        setPlayerCount(msg.count);
      }
    },
  });

  // Initialize game data
  const gameData = useAsync(async () => {
    const { redis } = context;
    const postId = context.postId!;
    
    // Initialize game state if not exists
    const existingGame = await redis.get(`game:${postId}`);
    if (!existingGame) {
      const initialGame = {
        status: 'lobby',
        players: [],
        maxPlayers: 100,
        createdAt: Date.now(),
      };
      await redis.set(`game:${postId}`, JSON.stringify(initialGame));
      return initialGame;
    }
    
    return JSON.parse(existingGame);
  });

  const webviewOptions = {
    id: 'snoo-royale-game',
    url: 'index.html',
    width: '100%',
    height: '600px',
  };

  if (webviewVisible) {
    return (
      <vstack height="100%" width="100%">
        <hstack width="100%" alignment="space-between middle">
          <text size="large" weight="bold">🎮 Snoo Royale Battle Arena</text>
          <button onPress={() => setWebviewVisible(false)}>
            ❌ Exit Game
          </button>
        </hstack>
        <webview {...webviewOptions} />
      </vstack>
    );
  }

  return (
    <vstack height="100%" width="100%" padding="medium" gap="medium">
      {/* Header */}
      <vstack alignment="center middle" gap="small">
        <text size="xxlarge" weight="bold" color="orangered">
          ⚔️ SNOO ROYALE ⚔️
        </text>
        <text size="large" weight="bold">
          Last Snoo Standing
        </text>
        <text size="medium" color="neutral-content-weak">
          Reddit-Themed Battle Royale • 100 Players
        </text>
      </vstack>

      {/* Game Stats */}
      <hstack width="100%" alignment="space-between">
        <vstack alignment="start">
          <text size="small" color="neutral-content-weak">Players Online</text>
          <text size="large" weight="bold" color="green">
            {playerCount}/100
          </text>
        </vstack>
        <vstack alignment="center">
          <text size="small" color="neutral-content-weak">Game Mode</text>
          <text size="medium" weight="bold">Battle Royale</text>
        </vstack>
        <vstack alignment="end">
          <text size="small" color="neutral-content-weak">Status</text>
          <text size="medium" weight="bold" color="orange">
            {gameData.loading ? 'Loading...' : gameData.data?.status || 'Lobby'}
          </text>
        </vstack>
      </hstack>

      {/* Game Description */}
      <vstack gap="small" padding="medium" backgroundColor="neutral-background-weak" cornerRadius="medium">
        <text size="medium" weight="bold">🎯 How to Play:</text>
        <text size="small">• 100 Redditors drop into Reddit-themed world</text>
        <text size="small">• Memes are weapons, karma is currency</text>
        <text size="small">• Survive the controversy storm</text>
        <text size="small">• Last Snoo standing wins!</text>
      </vstack>

      {/* Weapon Preview */}
      <vstack gap="small">
        <text size="medium" weight="bold">⚔️ Featured Weapons:</text>
        <hstack gap="medium" alignment="space-between">
          <vstack alignment="center" gap="xsmall">
            <text size="large">⬇️</text>
            <text size="xsmall">Downvote Dart</text>
          </vstack>
          <vstack alignment="center" gap="xsmall">
            <text size="large">🔨</text>
            <text size="xsmall">Ban Hammer</text>
          </vstack>
          <vstack alignment="center" gap="xsmall">
            <text size="large">💣</text>
            <text size="xsmall">Karma Bomb</text>
          </vstack>
          <vstack alignment="center" gap="xsmall">
            <text size="large">👑</text>
            <text size="xsmall">Admin Override</text>
          </vstack>
        </hstack>
      </vstack>

      {/* Action Buttons */}
      <vstack gap="medium" width="100%">
        <button 
          appearance="primary" 
          size="large"
          onPress={() => setWebviewVisible(true)}
        >
          🚀 Join Battle Arena
        </button>
        
        <hstack gap="medium" width="100%">
          <button 
            appearance="secondary" 
            size="medium"
            grow
            onPress={() => {
              // TODO: Show leaderboard
            }}
          >
            🏆 Leaderboard
          </button>
          <button 
            appearance="secondary" 
            size="medium"
            grow
            onPress={() => {
              // TODO: Show stats
            }}
          >
            📊 Stats
          </button>
        </hstack>
      </vstack>

      {/* Footer */}
      <vstack alignment="center" gap="xsmall">
        <text size="xsmall" color="neutral-content-weak">
          Powered by Devvit • Made with ❤️ for Reddit
        </text>
        <text size="xsmall" color="neutral-content-weak">
          "What if r/place had a baby with Fortnite?"
        </text>
      </vstack>
    </vstack>
  );
};

// Register the custom post type
Devvit.addCustomPostType({
  name: 'Snoo Royale Battle',
  height: 'tall',
  render: App,
});

export default Devvit;