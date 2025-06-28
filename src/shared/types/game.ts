export interface Player {
  id: string;
  username: string;
  position: { x: number; y: number };
  health: number;
  karma: number;
  inventory: Item[];
  isAlive: boolean;
  subredditAffinity: string[];
  kills: number;
  survivalTime: number;
}

export interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'consumable' | 'utility';
  tier: 'common' | 'rare' | 'legendary';
  damage?: number;
  protection?: number;
  effect?: string;
  redditReference: string;
}

export interface GameState {
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
}

export interface GameEvent {
  type: 'ama-invasion' | 'cake-day' | 'server-maintenance' | 'brigading' | 'mod-sweep';
  description: string;
  duration: number;
  effect: string;
}

export interface SubredditBiome {
  name: string;
  theme: string;
  hazards: string[];
  lootTable: Item[];
  specialRules: string[];
  backgroundColor: string;
  musicTrack?: string;
}

export interface WeaponData {
  name: string;
  tier: 'common' | 'rare' | 'legendary';
  damage: number;
  range: number;
  fireRate: number;
  ammoType: string;
  redditReference: string;
  description: string;
  sprite: string;
}