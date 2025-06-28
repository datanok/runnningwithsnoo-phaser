import { WeaponData } from '../types/game';

export const WEAPONS: WeaponData[] = [
  // Tier 1 - Common Weapons
  {
    name: 'Downvote Dart',
    tier: 'common',
    damage: 15,
    range: 300,
    fireRate: 2,
    ammoType: 'disagreement',
    redditReference: 'The classic disagreement',
    description: 'Quick poke, minimal damage',
    sprite: 'downvote_dart'
  },
  {
    name: 'Report Rocket',
    tier: 'common',
    damage: 20,
    range: 400,
    fireRate: 1,
    ammoType: 'reports',
    redditReference: 'Getting someone in trouble',
    description: 'Marks enemy for mod attention',
    sprite: 'report_rocket'
  },
  {
    name: 'Repost Rifle',
    tier: 'common',
    damage: 12,
    range: 250,
    fireRate: 3,
    ammoType: 'recycled_content',
    redditReference: 'Low-effort content',
    description: 'Copies last enemy attack',
    sprite: 'repost_rifle'
  },
  {
    name: 'Lurker Cloak',
    tier: 'common',
    damage: 0,
    range: 0,
    fireRate: 0,
    ammoType: 'silence',
    redditReference: 'Silent observers',
    description: 'Brief invisibility',
    sprite: 'lurker_cloak'
  },

  // Tier 2 - Rare Weapons
  {
    name: 'Ban Hammer',
    tier: 'rare',
    damage: 75,
    range: 150,
    fireRate: 0.5,
    ammoType: 'authority',
    redditReference: 'Moderator power',
    description: 'Massive knockback + stun',
    sprite: 'ban_hammer'
  },
  {
    name: 'Karma Bomb',
    tier: 'rare',
    damage: 50,
    range: 200,
    fireRate: 1,
    ammoType: 'upvotes',
    redditReference: 'Viral post energy',
    description: 'AOE explosion that heals teammates',
    sprite: 'karma_bomb'
  },
  {
    name: 'Gilded Gun',
    tier: 'rare',
    damage: 60,
    range: 500,
    fireRate: 1.5,
    ammoType: 'premium_currency',
    redditReference: 'Reddit Premium benefits',
    description: 'Pierces armor, expensive ammo',
    sprite: 'gilded_gun'
  },
  {
    name: 'Mod Mail Missile',
    tier: 'rare',
    damage: 45,
    range: 600,
    fireRate: 1,
    ammoType: 'bureaucracy',
    redditReference: 'Unavoidable admin contact',
    description: 'Homing projectile',
    sprite: 'modmail_missile'
  },

  // Tier 3 - Legendary Weapons
  {
    name: 'Admin Override',
    tier: 'legendary',
    damage: 999,
    range: 1000,
    fireRate: 0.1,
    ammoType: 'absolute_power',
    redditReference: 'Ultimate Reddit power',
    description: 'Instantly eliminate any player',
    sprite: 'admin_override'
  },
  {
    name: 'Viral Vortex',
    tier: 'legendary',
    damage: 80,
    range: 300,
    fireRate: 0.5,
    ammoType: 'trending_energy',
    redditReference: 'Trending post madness',
    description: 'Pulls all nearby players into chaos',
    sprite: 'viral_vortex'
  },
  {
    name: 'Democracy Destroyer',
    tier: 'legendary',
    damage: 100,
    range: 400,
    fireRate: 0.3,
    ammoType: 'mob_rule',
    redditReference: 'Mob rule gone wrong',
    description: 'Vote to eliminate multiple players',
    sprite: 'democracy_destroyer'
  },
  {
    name: 'The Snappening',
    tier: 'legendary',
    damage: 50,
    range: 999,
    fireRate: 0.1,
    ammoType: 'balance',
    redditReference: 'r/thanosdidnothingwrong',
    description: 'Random half of remaining players vanish',
    sprite: 'the_snappening'
  }
];