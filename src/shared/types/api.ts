export type GameInitResponse = {
  type: 'game-init';
  postId: string;
  gameState: any;
};

export type PlayerJoinResponse = {
  type: 'player-joined';
  postId: string;
  player: any;
  gameState: any;
};

export type PlayerMoveResponse = {
  type: 'player-moved';
  postId: string;
  playerId: string;
  position: { x: number; y: number };
};

export type PlayerAttackResponse = {
  type: 'player-attacked';
  postId: string;
  attacker: any;
  target: any;
  damage: number;
  eliminated: boolean;
};

export type LeaderboardResponse = {
  type: 'leaderboard';
  postId: string;
  leaderboard: Array<{
    username: string;
    wins: number;
    karma: number;
    rank: number;
  }>;
};

export type GameEventResponse = {
  type: 'game-event';
  postId: string;
  event: {
    type: string;
    description: string;
    duration: number;
    effect: string;
  };
};

// Legacy types for compatibility
export type InitResponse = {
  type: 'init';
  postId: string;
  count: number;
};

export type IncrementResponse = {
  type: 'increment';
  postId: string;
  count: number;
};

export type DecrementResponse = {
  type: 'decrement';
  postId: string;
  count: number;
};