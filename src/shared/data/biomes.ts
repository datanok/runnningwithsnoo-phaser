import { SubredditBiome } from '../types/game';

export const SUBREDDIT_BIOMES: SubredditBiome[] = [
  {
    name: 'r/gaming District',
    theme: 'retro_gaming',
    hazards: ['lag_spikes', 'console_wars'],
    lootTable: [],
    specialRules: ['NPCs argue about console wars', 'Lag spikes freeze players briefly'],
    backgroundColor: '#1a1a2e',
    musicTrack: 'chiptune_battle'
  },
  {
    name: 'r/science Laboratory',
    theme: 'clean_sterile',
    hazards: ['peer_review_zones'],
    lootTable: [],
    specialRules: ['Evidence-based combat', 'Peer review zones slow movement'],
    backgroundColor: '#f8f9fa',
    musicTrack: 'laboratory_ambient'
  },
  {
    name: 'r/memes Chaos Zone',
    theme: 'absurd_shifting',
    hazards: ['dead_memes'],
    lootTable: [],
    specialRules: ['Constantly shifting terrain', 'Humor meter affects abilities'],
    backgroundColor: '#ff6b6b',
    musicTrack: 'meme_madness'
  },
  {
    name: 'r/wallstreetbets Casino',
    theme: 'financial_chaos',
    hazards: ['market_crashes'],
    lootTable: [],
    specialRules: ['Extremely volatile loot', 'YOLO zones with high-risk rewards'],
    backgroundColor: '#4ecdc4',
    musicTrack: 'stonks_theme'
  },
  {
    name: 'r/aww Safe Haven',
    theme: 'cute_wholesome',
    hazards: [],
    lootTable: [],
    specialRules: ['Combat disabled', 'Healing items only', 'Limited space'],
    backgroundColor: '#ffeaa7',
    musicTrack: 'wholesome_vibes'
  },
  {
    name: 'r/conspiracy Bunker',
    theme: 'dark_mysterious',
    hazards: ['misinformation_clouds'],
    lootTable: [],
    specialRules: ['Hidden passages', 'Misinformation causes confusion'],
    backgroundColor: '#2d3436',
    musicTrack: 'conspiracy_ambient'
  }
];