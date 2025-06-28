# ⚔️ Snoo Royale: Last Snoo Standing

**The ultimate Reddit-themed battle royale experience!**

*"What if r/place had a baby with Fortnite, raised by Reddit's collective insanity?"*

## 🎯 Game Overview

Snoo Royale is an epic MMO battle royale where 100 Redditors drop into a living, breathing Reddit-themed world. **Memes are weapons**, **karma is currency**, and **drama literally shrinks the map**. The last Snoo standing becomes the **Reddit Overlord** until the next match.

### 🎮 Core Features

- **100-Player Battle Royale** - Epic Reddit-themed combat
- **Meme Weapons System** - From Downvote Darts to Admin Override
- **Subreddit Biomes** - Fight across r/gaming, r/science, r/memes and more
- **Dynamic Events** - AMA invasions, cake day celebrations, mod sweeps
- **Karma Currency** - Earn and spend karma for upgrades
- **Real Reddit Integration** - Connect with your actual Reddit profile

## 🗺️ Subreddit Biomes

### r/gaming District
- **Theme**: Retro gaming landscapes with pixel art
- **Hazards**: Lag spikes freeze players briefly
- **Special**: NPCs argue about console wars

### r/science Laboratory  
- **Theme**: Clean, sterile research environment
- **Hazards**: Peer review zones slow movement
- **Special**: Evidence-based combat (accuracy = damage)

### r/memes Chaos Zone
- **Theme**: Constantly shifting, absurd architecture  
- **Hazards**: Dead memes deal poison damage
- **Special**: Humor meter affects all abilities

### r/wallstreetbets Casino
- **Theme**: Stock tickers and diamond hand statues
- **Hazards**: Market crashes damage all players
- **Special**: YOLO zones with high-risk/high-reward loot

### r/aww Safe Haven
- **Theme**: Cute animals and calming colors
- **Hazards**: None (genuinely safe space)
- **Special**: Combat disabled, healing items only

### r/conspiracy Bunker
- **Theme**: Dark maze with hidden passages
- **Hazards**: Misinformation clouds cause confusion
- **Special**: Secret doors for certain players

## ⚔️ Weapon Tiers

### Tier 1 (Common)
- **Downvote Dart** - Quick poke, minimal damage
- **Report Rocket** - Marks enemy for mod attention  
- **Repost Rifle** - Copies last enemy attack
- **Lurker Cloak** - Brief invisibility

### Tier 2 (Rare)
- **Ban Hammer** - Massive knockback + stun
- **Karma Bomb** - AOE explosion that heals teammates
- **Gilded Gun** - Pierces armor, expensive ammo
- **Mod Mail Missile** - Homing projectile

### Tier 3 (Legendary)
- **Admin Override** - Instantly eliminate any player
- **Viral Vortex** - Pulls all nearby players into chaos
- **Democracy Destroyer** - Vote to eliminate multiple players
- **The Snappening** - Random half of remaining players vanish

## 🎪 Dynamic Events

- **AMA Invasion** - Celebrity NPC appears, players compete for attention
- **Cake Day Celebration** - All players get temporary karma boost
- **Server Maintenance** - Map goes black & white, limited visibility
- **Brigading** - NPC armies spawn and attack all players
- **Mod Sweep** - Areas randomly become safe zones

## 🏆 Progression System

### Match Rewards
- **Survival Time Karma** - Longer survival = more points
- **Style Points** - Creative eliminations and funny moments
- **Community MVP** - Other players vote post-match
- **Clutch Moments** - Bonus for dramatic final circle plays

### Long-term Progression
- **Reddit Integration** - Unlock cosmetics based on Reddit history
- **Achievement Hunting** - 100+ unique Reddit culture challenges
- **Seasonal Battle Pass** - Free progression with Premium bonuses
- **Legacy Items** - Special rewards for major Reddit events

## 🚀 Getting Started

### Prerequisites
- Node.js 22+
- Reddit account
- Subreddit for testing

### Installation

1. **Clone the repository**
   ```bash
   git clone your-repo-url
   cd snoo-royale
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your subreddit**
   - Create a private subreddit on Reddit
   - Update `package.json` dev script with your subreddit name

4. **Deploy to Reddit**
   ```bash
   npm run deploy
   ```

5. **Start development**
   ```bash
   npm run dev
   ```

6. **Create a battle post**
   - Go to your subreddit
   - Use "Snoo Royale: New Battle" menu action

## 🎮 How to Play

### Controls
- **WASD/Arrow Keys** - Move your Snoo
- **Mouse Click** - Shoot weapon
- **E** - Pick up loot
- **Space** - Special ability

### Gameplay Flow
1. **Drop Phase** - Parachute into the Reddit world
2. **Looting** - Find weapons and karma in subreddit biomes  
3. **Combat** - Eliminate other Snoos with meme weapons
4. **Storm Survival** - Stay inside the shrinking controversy circle
5. **Victory** - Be the last Snoo standing!

## 🛠️ Tech Stack

- **Platform**: Devvit (Reddit's developer platform)
- **Game Engine**: Phaser 3
- **Backend**: Express.js + TypeScript
- **Database**: Redis (via Devvit)
- **Realtime**: Devvit Realtime API
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── devvit/          # Reddit app integration
├── client/          # Phaser game client
│   ├── game/
│   │   ├── scenes/  # Game scenes
│   │   └── main.ts  # Game configuration
│   └── assets/      # Game assets
├── server/          # Express backend
├── shared/          # Shared types and data
│   ├── types/       # TypeScript interfaces
│   └── data/        # Game data (weapons, biomes)
```

## 🎨 Assets & Design

The game features:
- **Pixel art style** inspired by classic Reddit aesthetics
- **Chiptune soundtrack** for that retro gaming feel
- **Reddit-themed UI** with familiar colors and iconography
- **Responsive design** that works on all devices

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for:
- Code style and standards
- How to add new weapons
- Creating new biome types
- Implementing game events

## 📜 License

This project is licensed under the BSD-3-Clause License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **Phaser Team** - Amazing game engine
- **Reddit/Devvit Team** - Revolutionary platform
- **Reddit Community** - Endless inspiration for chaos

---

**Ready to become the Reddit Overlord? Drop in and show them who's the last Snoo standing! 🏆**

*Made with ❤️ for the Reddit community*