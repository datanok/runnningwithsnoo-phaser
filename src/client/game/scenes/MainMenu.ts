import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;

  constructor() {
    super('MainMenu');
  }

  create() {
    // Reddit-themed background
    this.cameras.main.setBackgroundColor('#0f1419');
    
    // Background pattern
    this.background = this.add.image(512, 384, 'background').setAlpha(0.1);

    // Main title
    this.add.text(512, 200, '⚔️ SNOO ROYALE ⚔️', {
      fontFamily: 'Arial Black',
      fontSize: 72,
      color: '#ff4500',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.add.text(512, 280, 'Last Snoo Standing', {
      fontFamily: 'Arial Black',
      fontSize: 36,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(512, 330, 'Reddit-Themed Battle Royale', {
      fontFamily: 'Arial',
      fontSize: 20,
      color: '#cccccc',
    }).setOrigin(0.5);

    // Logo/mascot
    this.logo = this.add.image(512, 450, 'logo').setScale(0.8);

    // Tagline
    this.add.text(512, 550, '"What if r/place had a baby with Fortnite?"', {
      fontFamily: 'Arial',
      fontSize: 18,
      color: '#888888',
      fontStyle: 'italic',
    }).setOrigin(0.5);

    // Start button
    const startButton = this.add.text(512, 620, '🚀 Enter Battle Arena', {
      fontFamily: 'Arial Black',
      fontSize: 28,
      color: '#ffffff',
      backgroundColor: '#ff4500',
      padding: { x: 30, y: 15 },
    }).setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => {
        startButton.setScale(1.1);
        startButton.setStyle({ backgroundColor: '#ff6500' });
      })
      .on('pointerout', () => {
        startButton.setScale(1);
        startButton.setStyle({ backgroundColor: '#ff4500' });
      })
      .on('pointerdown', () => {
        this.scene.start('GameLobby');
      });

    // Version info
    this.add.text(20, 748, 'v1.0.0 - Powered by Devvit', {
      fontFamily: 'Arial',
      fontSize: 12,
      color: '#666666',
    }).setOrigin(0, 1);

    // Player count (simulated)
    this.add.text(1004, 748, 'Players Online: 1,337', {
      fontFamily: 'Arial',
      fontSize: 12,
      color: '#00ff00',
    }).setOrigin(1, 1);

    // Floating particles effect
    this.createFloatingParticles();
  }

  createFloatingParticles() {
    // Create floating upvote/downvote particles
    for (let i = 0; i < 20; i++) {
      const isUpvote = Math.random() > 0.5;
      const particle = this.add.text(
        Phaser.Math.Between(0, 1024),
        Phaser.Math.Between(0, 768),
        isUpvote ? '⬆️' : '⬇️',
        { fontSize: 16 }
      ).setAlpha(0.3);

      // Floating animation
      this.tweens.add({
        targets: particle,
        y: particle.y - 100,
        duration: Phaser.Math.Between(8000, 12000),
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
      });

      // Fade in/out
      this.tweens.add({
        targets: particle,
        alpha: 0.1,
        duration: Phaser.Math.Between(3000, 5000),
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
      });
    }
  }
}