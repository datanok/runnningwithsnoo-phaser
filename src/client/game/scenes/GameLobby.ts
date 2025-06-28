import { Scene } from 'phaser';
import * as Phaser from 'phaser';

export class GameLobby extends Scene {
  private playerCountText: Phaser.GameObjects.Text;
  private statusText: Phaser.GameObjects.Text;
  private playerCount: number = 0;
  private maxPlayers: number = 100;

  constructor() {
    super('GameLobby');
  }

  create() {
    // Background
    this.cameras.main.setBackgroundColor('#0f1419');
    
    // Title
    this.add.text(512, 100, '⚔️ SNOO ROYALE ⚔️', {
      fontFamily: 'Arial Black',
      fontSize: 64,
      color: '#ff4500',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.add.text(512, 160, 'Last Snoo Standing', {
      fontFamily: 'Arial Black',
      fontSize: 32,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
    }).setOrigin(0.5);

    // Player count display
    this.playerCountText = this.add.text(512, 250, `Players: ${this.playerCount}/${this.maxPlayers}`, {
      fontFamily: 'Arial Black',
      fontSize: 36,
      color: '#00ff00',
      stroke: '#000000',
      strokeThickness: 2,
    }).setOrigin(0.5);

    // Status
    this.statusText = this.add.text(512, 300, 'Waiting for players...', {
      fontFamily: 'Arial',
      fontSize: 24,
      color: '#cccccc',
    }).setOrigin(0.5);

    // Game info
    const infoY = 380;
    this.add.text(512, infoY, 'How to Play:', {
      fontFamily: 'Arial Black',
      fontSize: 28,
      color: '#ffffff',
    }).setOrigin(0.5);

    const instructions = [
      '• 100 Redditors drop into Reddit-themed world',
      '• Memes are weapons, karma is currency',
      '• Survive the controversy storm',
      '• Last Snoo standing wins!'
    ];

    instructions.forEach((instruction, index) => {
      this.add.text(512, infoY + 40 + (index * 30), instruction, {
        fontFamily: 'Arial',
        fontSize: 18,
        color: '#cccccc',
      }).setOrigin(0.5);
    });

    // Weapon showcase
    this.add.text(512, 580, 'Featured Weapons:', {
      fontFamily: 'Arial Black',
      fontSize: 24,
      color: '#ffffff',
    }).setOrigin(0.5);

    const weapons = [
      { emoji: '⬇️', name: 'Downvote Dart' },
      { emoji: '🔨', name: 'Ban Hammer' },
      { emoji: '💣', name: 'Karma Bomb' },
      { emoji: '👑', name: 'Admin Override' }
    ];

    weapons.forEach((weapon, index) => {
      const x = 200 + (index * 150);
      this.add.text(x, 620, weapon.emoji, {
        fontSize: 32,
      }).setOrigin(0.5);
      
      this.add.text(x, 660, weapon.name, {
        fontFamily: 'Arial',
        fontSize: 14,
        color: '#cccccc',
      }).setOrigin(0.5);
    });

    // Start button (only show when enough players)
    const startButton = this.add.text(512, 720, 'Waiting for more players...', {
      fontFamily: 'Arial Black',
      fontSize: 24,
      color: '#666666',
      backgroundColor: '#333333',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5);

    // Simulate player joining
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.playerCount = Math.min(this.playerCount + Math.floor(Math.random() * 5) + 1, this.maxPlayers);
        this.updateDisplay();
        
        if (this.playerCount >= 10) { // Start with fewer players for demo
          startButton.setText('🚀 START BATTLE');
          startButton.setStyle({ color: '#ffffff', backgroundColor: '#ff4500' });
          startButton.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
              this.scene.start('BattleRoyale');
            });
        }
      },
      loop: true
    });
  }

  updateDisplay() {
    this.playerCountText.setText(`Players: ${this.playerCount}/${this.maxPlayers}`);
    
    if (this.playerCount < 10) {
      this.statusText.setText('Waiting for players...');
    } else if (this.playerCount < 50) {
      this.statusText.setText('Almost ready to start!');
    } else {
      this.statusText.setText('Battle ready!');
    }
  }
}