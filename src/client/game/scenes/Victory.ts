import { Scene } from 'phaser';
import * as Phaser from 'phaser';

export class Victory extends Scene {
  constructor() {
    super('Victory');
  }

  create() {
    // Victory background
    this.cameras.main.setBackgroundColor('#ffd700');
    
    // Confetti effect
    this.createConfetti();
    
    // Victory text
    this.add.text(512, 200, '🏆 VICTORY ROYALE! 🏆', {
      fontFamily: 'Arial Black',
      fontSize: 64,
      color: '#ff4500',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);
    
    this.add.text(512, 280, 'You are the Reddit Overlord!', {
      fontFamily: 'Arial Black',
      fontSize: 32,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
    }).setOrigin(0.5);
    
    // Stats
    const stats = [
      'Players Eliminated: 23',
      'Karma Earned: 450',
      'Survival Time: 8:42',
      'Favorite Weapon: Ban Hammer'
    ];
    
    stats.forEach((stat, index) => {
      this.add.text(512, 350 + (index * 30), stat, {
        fontFamily: 'Arial',
        fontSize: 20,
        color: '#000000',
      }).setOrigin(0.5);
    });
    
    // Rewards
    this.add.text(512, 500, '🎁 Rewards Earned:', {
      fontFamily: 'Arial Black',
      fontSize: 24,
      color: '#ff4500',
    }).setOrigin(0.5);
    
    const rewards = [
      '• Reddit Overlord Crown',
      '• 1000 Karma Coins',
      '• Victory Dance Emote',
      '• Special Flair: "Last Snoo Standing"'
    ];
    
    rewards.forEach((reward, index) => {
      this.add.text(512, 530 + (index * 25), reward, {
        fontFamily: 'Arial',
        fontSize: 16,
        color: '#000000',
      }).setOrigin(0.5);
    });
    
    // Play again button
    const playAgainButton = this.add.text(512, 680, '🔄 Play Again', {
      fontFamily: 'Arial Black',
      fontSize: 24,
      color: '#ffffff',
      backgroundColor: '#ff4500',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => playAgainButton.setScale(1.1))
      .on('pointerout', () => playAgainButton.setScale(1))
      .on('pointerdown', () => {
        this.scene.start('GameLobby');
      });
    
    // Share button
    const shareButton = this.add.text(312, 680, '📤 Share Victory', {
      fontFamily: 'Arial Black',
      fontSize: 20,
      color: '#ffffff',
      backgroundColor: '#0099ff',
      padding: { x: 15, y: 8 },
    }).setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => shareButton.setScale(1.1))
      .on('pointerout', () => shareButton.setScale(1))
      .on('pointerdown', () => {
        // TODO: Share to Reddit
        console.log('Sharing victory to Reddit...');
      });
    
    // Leaderboard button
    const leaderboardButton = this.add.text(712, 680, '🏆 Leaderboard', {
      fontFamily: 'Arial Black',
      fontSize: 20,
      color: '#ffffff',
      backgroundColor: '#00aa00',
      padding: { x: 15, y: 8 },
    }).setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => leaderboardButton.setScale(1.1))
      .on('pointerout', () => leaderboardButton.setScale(1))
      .on('pointerdown', () => {
        // TODO: Show leaderboard
        console.log('Opening leaderboard...');
      });
  }

  createConfetti() {
    // Create falling confetti particles
    for (let i = 0; i < 50; i++) {
      const x = Phaser.Math.Between(0, 1024);
      const y = Phaser.Math.Between(-100, 0);
      const color = Phaser.Utils.Array.GetRandom([0xff4500, 0xffd700, 0x00ff00, 0x0099ff, 0xff69b4]);
      
      const confetti = this.add.rectangle(x, y, 8, 8, color);
      
      this.tweens.add({
        targets: confetti,
        y: 800,
        rotation: Math.PI * 4,
        duration: Phaser.Math.Between(3000, 6000),
        ease: 'Linear',
        onComplete: () => confetti.destroy()
      });
    }
  }
}