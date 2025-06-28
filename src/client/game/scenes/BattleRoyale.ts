import { Scene } from 'phaser';
import * as Phaser from 'phaser';
import { WEAPONS } from '../../../shared/data/weapons';
import { SUBREDDIT_BIOMES } from '../../../shared/data/biomes';

export class BattleRoyale extends Scene {
  private player: Phaser.GameObjects.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd: any;
  private playerHealth: number = 100;
  private playerKarma: number = 0;
  private playersAlive: number = 100;
  private mapRadius: number = 1000;
  private stormCenter: { x: number; y: number };
  
  // UI Elements
  private healthBar: Phaser.GameObjects.Graphics;
  private karmaText: Phaser.GameObjects.Text;
  private playersAliveText: Phaser.GameObjects.Text;
  private weaponText: Phaser.GameObjects.Text;
  private minimap: Phaser.GameObjects.Graphics;
  private currentWeapon: any;
  
  // Game objects
  private otherPlayers: Phaser.GameObjects.Group;
  private lootItems: Phaser.GameObjects.Group;
  private stormCircle: Phaser.GameObjects.Graphics;
  private biomeAreas: Phaser.GameObjects.Group;

  constructor() {
    super('BattleRoyale');
  }

  create() {
    // Initialize world
    this.cameras.main.setBackgroundColor('#2d5016');
    this.stormCenter = { x: 512, y: 384 };
    
    // Create biome areas
    this.createBiomes();
    
    // Create player
    this.player = this.add.sprite(512, 384, 'logo')
      .setScale(0.3)
      .setTint(0x00ff00);
    
    // Camera follows player
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1.5);
    
    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys('W,S,A,D');
    
    // Initialize groups
    this.otherPlayers = this.add.group();
    this.lootItems = this.add.group();
    this.biomeAreas = this.add.group();
    
    // Create other players
    this.createOtherPlayers();
    
    // Create loot
    this.createLoot();
    
    // Create storm circle
    this.stormCircle = this.add.graphics();
    this.updateStormCircle();
    
    // Create UI
    this.createUI();
    
    // Start with a basic weapon
    this.currentWeapon = WEAPONS.find(w => w.name === 'Downvote Dart');
    this.updateWeaponDisplay();
    
    // Game events
    this.startGameEvents();
    
    // Input handlers
    this.input.on('pointerdown', this.handleShoot, this);
    this.input.keyboard.on('keydown-E', this.handlePickupLoot, this);
    this.input.keyboard.on('keydown-SPACE', this.handleSpecialAbility, this);
  }

  createBiomes() {
    // Create different biome areas
    SUBREDDIT_BIOMES.forEach((biome, index) => {
      const angle = (index / SUBREDDIT_BIOMES.length) * Math.PI * 2;
      const distance = 300;
      const x = 512 + Math.cos(angle) * distance;
      const y = 384 + Math.sin(angle) * distance;
      
      // Create biome area
      const biomeArea = this.add.graphics();
      biomeArea.fillStyle(Phaser.Display.Color.HexStringToColor(biome.backgroundColor).color);
      biomeArea.fillCircle(x, y, 150);
      biomeArea.setAlpha(0.3);
      
      // Add biome label
      this.add.text(x, y - 20, biome.name, {
        fontFamily: 'Arial Black',
        fontSize: 16,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 2,
      }).setOrigin(0.5);
      
      this.biomeAreas.add(biomeArea);
    });
  }

  createOtherPlayers() {
    // Create AI players scattered around the map
    for (let i = 0; i < 20; i++) {
      const x = Phaser.Math.Between(200, 824);
      const y = Phaser.Math.Between(200, 568);
      
      const aiPlayer = this.add.sprite(x, y, 'logo')
        .setScale(0.2)
        .setTint(Phaser.Math.Between(0x000000, 0xffffff));
      
      // Add username
      this.add.text(x, y - 30, `Snoo${i + 1}`, {
        fontFamily: 'Arial',
        fontSize: 12,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 1,
      }).setOrigin(0.5);
      
      this.otherPlayers.add(aiPlayer);
    }
  }

  createLoot() {
    // Scatter loot around the map
    for (let i = 0; i < 30; i++) {
      const x = Phaser.Math.Between(100, 924);
      const y = Phaser.Math.Between(100, 668);
      
      const weapon = Phaser.Utils.Array.GetRandom(WEAPONS);
      let color = 0xcccccc; // Common
      if (weapon.tier === 'rare') color = 0x0099ff;
      if (weapon.tier === 'legendary') color = 0xff9900;
      
      const loot = this.add.circle(x, y, 8, color);
      loot.setData('weapon', weapon);
      loot.setStrokeStyle(2, 0xffffff);
      
      this.lootItems.add(loot);
    }
  }

  createUI() {
    // Health bar
    this.healthBar = this.add.graphics();
    this.updateHealthBar();
    
    // Karma display
    this.karmaText = this.add.text(20, 60, `Karma: ${this.playerKarma}`, {
      fontFamily: 'Arial Black',
      fontSize: 18,
      color: '#ffd700',
      stroke: '#000000',
      strokeThickness: 2,
    }).setScrollFactor(0);
    
    // Players alive
    this.playersAliveText = this.add.text(20, 90, `Players Alive: ${this.playersAlive}`, {
      fontFamily: 'Arial Black',
      fontSize: 18,
      color: '#ff4500',
      stroke: '#000000',
      strokeThickness: 2,
    }).setScrollFactor(0);
    
    // Weapon display
    this.weaponText = this.add.text(20, 120, '', {
      fontFamily: 'Arial Black',
      fontSize: 16,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
    }).setScrollFactor(0);
    
    // Minimap
    this.minimap = this.add.graphics();
    this.minimap.setScrollFactor(0);
    this.updateMinimap();
    
    // Controls help
    this.add.text(1004, 20, 'Controls:', {
      fontFamily: 'Arial Black',
      fontSize: 14,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 1,
    }).setOrigin(1, 0).setScrollFactor(0);
    
    const controls = [
      'WASD/Arrows: Move',
      'Click: Shoot',
      'E: Pick up loot',
      'Space: Special ability'
    ];
    
    controls.forEach((control, index) => {
      this.add.text(1004, 45 + (index * 20), control, {
        fontFamily: 'Arial',
        fontSize: 12,
        color: '#cccccc',
        stroke: '#000000',
        strokeThickness: 1,
      }).setOrigin(1, 0).setScrollFactor(0);
    });
  }

  update() {
    // Player movement
    const speed = 200;
    let velocityX = 0;
    let velocityY = 0;
    
    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      velocityX = -speed;
    } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
      velocityX = speed;
    }
    
    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      velocityY = -speed;
    } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
      velocityY = speed;
    }
    
    // Apply movement
    this.player.x += velocityX * this.game.loop.delta / 1000;
    this.player.y += velocityY * this.game.loop.delta / 1000;
    
    // Check storm damage
    this.checkStormDamage();
    
    // Update UI
    this.updateMinimap();
    
    // Simulate other players moving
    this.otherPlayers.children.entries.forEach((player: any) => {
      if (Math.random() < 0.02) {
        player.x += Phaser.Math.Between(-20, 20);
        player.y += Phaser.Math.Between(-20, 20);
      }
    });
  }

  handleShoot(pointer: Phaser.Input.Pointer) {
    if (!this.currentWeapon) return;
    
    // Calculate direction to pointer
    const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
    const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, worldPoint.x, worldPoint.y);
    
    // Create projectile
    const projectile = this.add.circle(this.player.x, this.player.y, 4, 0xff0000);
    
    // Move projectile
    this.tweens.add({
      targets: projectile,
      x: worldPoint.x,
      y: worldPoint.y,
      duration: 500,
      onComplete: () => {
        projectile.destroy();
        this.checkProjectileHit(worldPoint.x, worldPoint.y);
      }
    });
    
    // Weapon feedback
    this.cameras.main.shake(100, 0.01);
  }

  handlePickupLoot() {
    // Check for nearby loot
    this.lootItems.children.entries.forEach((loot: any) => {
      const distance = Phaser.Math.Distance.Between(
        this.player.x, this.player.y,
        loot.x, loot.y
      );
      
      if (distance < 50) {
        const weapon = loot.getData('weapon');
        this.currentWeapon = weapon;
        this.updateWeaponDisplay();
        loot.destroy();
        
        // Show pickup notification
        const notification = this.add.text(this.player.x, this.player.y - 50, `Picked up ${weapon.name}!`, {
          fontFamily: 'Arial',
          fontSize: 14,
          color: '#00ff00',
          stroke: '#000000',
          strokeThickness: 1,
        }).setOrigin(0.5);
        
        this.tweens.add({
          targets: notification,
          y: notification.y - 30,
          alpha: 0,
          duration: 2000,
          onComplete: () => notification.destroy()
        });
      }
    });
  }

  handleSpecialAbility() {
    if (!this.currentWeapon) return;
    
    // Different abilities based on weapon
    switch (this.currentWeapon.name) {
      case 'Lurker Cloak':
        this.player.setAlpha(0.3);
        this.time.delayedCall(3000, () => {
          this.player.setAlpha(1);
        });
        break;
        
      case 'Karma Bomb':
        // Heal nearby teammates (simulate)
        this.playerHealth = Math.min(100, this.playerHealth + 25);
        this.updateHealthBar();
        break;
        
      case 'Admin Override':
        // Instant elimination (simulate)
        this.eliminateRandomPlayer();
        break;
    }
  }

  checkProjectileHit(x: number, y: number) {
    // Check if projectile hit any players
    this.otherPlayers.children.entries.forEach((player: any) => {
      const distance = Phaser.Math.Distance.Between(x, y, player.x, player.y);
      if (distance < 30) {
        // Hit!
        this.eliminatePlayer(player);
        this.playerKarma += 10;
        this.karmaText.setText(`Karma: ${this.playerKarma}`);
      }
    });
  }

  eliminatePlayer(player: any) {
    // Create elimination effect
    const explosion = this.add.circle(player.x, player.y, 20, 0xff0000);
    this.tweens.add({
      targets: explosion,
      scaleX: 3,
      scaleY: 3,
      alpha: 0,
      duration: 500,
      onComplete: () => explosion.destroy()
    });
    
    player.destroy();
    this.playersAlive--;
    this.playersAliveText.setText(`Players Alive: ${this.playersAlive}`);
    
    if (this.playersAlive <= 1) {
      this.scene.start('Victory');
    }
  }

  eliminateRandomPlayer() {
    const players = this.otherPlayers.children.entries;
    if (players.length > 0) {
      const randomPlayer = Phaser.Utils.Array.GetRandom(players);
      this.eliminatePlayer(randomPlayer);
    }
  }

  checkStormDamage() {
    const distance = Phaser.Math.Distance.Between(
      this.player.x, this.player.y,
      this.stormCenter.x, this.stormCenter.y
    );
    
    if (distance > this.mapRadius) {
      this.playerHealth -= 0.5;
      this.updateHealthBar();
      
      if (this.playerHealth <= 0) {
        this.scene.start('GameOver');
      }
    }
  }

  updateHealthBar() {
    this.healthBar.clear();
    this.healthBar.setScrollFactor(0);
    
    // Background
    this.healthBar.fillStyle(0x000000);
    this.healthBar.fillRect(20, 20, 200, 20);
    
    // Health
    const healthColor = this.playerHealth > 50 ? 0x00ff00 : this.playerHealth > 25 ? 0xffff00 : 0xff0000;
    this.healthBar.fillStyle(healthColor);
    this.healthBar.fillRect(22, 22, (this.playerHealth / 100) * 196, 16);
    
    // Border
    this.healthBar.lineStyle(2, 0xffffff);
    this.healthBar.strokeRect(20, 20, 200, 20);
  }

  updateWeaponDisplay() {
    if (this.currentWeapon) {
      const tierColor = this.currentWeapon.tier === 'legendary' ? '#ff9900' : 
                       this.currentWeapon.tier === 'rare' ? '#0099ff' : '#cccccc';
      
      this.weaponText.setText(`Weapon: ${this.currentWeapon.name}`);
      this.weaponText.setColor(tierColor);
    }
  }

  updateStormCircle() {
    this.stormCircle.clear();
    this.stormCircle.lineStyle(4, 0xff0000, 0.8);
    this.stormCircle.strokeCircle(this.stormCenter.x, this.stormCenter.y, this.mapRadius);
  }

  updateMinimap() {
    this.minimap.clear();
    
    // Minimap background
    this.minimap.fillStyle(0x000000, 0.5);
    this.minimap.fillRect(824, 20, 180, 180);
    
    // Storm circle on minimap
    this.minimap.lineStyle(2, 0xff0000);
    const minimapScale = 180 / 2000; // Assuming world is 2000x2000
    this.minimap.strokeCircle(914, 110, this.mapRadius * minimapScale);
    
    // Player position on minimap
    const playerMinimapX = 824 + (this.player.x * minimapScale);
    const playerMinimapY = 20 + (this.player.y * minimapScale);
    this.minimap.fillStyle(0x00ff00);
    this.minimap.fillCircle(playerMinimapX, playerMinimapY, 3);
    
    // Other players on minimap
    this.minimap.fillStyle(0xff0000);
    this.otherPlayers.children.entries.forEach((player: any) => {
      const x = 824 + (player.x * minimapScale);
      const y = 20 + (player.y * minimapScale);
      this.minimap.fillCircle(x, y, 2);
    });
  }

  startGameEvents() {
    // Shrink storm every 30 seconds
    this.time.addEvent({
      delay: 30000,
      callback: () => {
        this.mapRadius = Math.max(100, this.mapRadius - 100);
        this.updateStormCircle();
        
        // Show warning
        const warning = this.add.text(512, 100, 'CONTROVERSY SPREADING!', {
          fontFamily: 'Arial Black',
          fontSize: 32,
          color: '#ff0000',
          stroke: '#000000',
          strokeThickness: 2,
        }).setOrigin(0.5).setScrollFactor(0);
        
        this.tweens.add({
          targets: warning,
          alpha: 0,
          duration: 3000,
          onComplete: () => warning.destroy()
        });
      },
      loop: true
    });
    
    // Random events
    this.time.addEvent({
      delay: 45000,
      callback: () => {
        this.triggerRandomEvent();
      },
      loop: true
    });
  }

  triggerRandomEvent() {
    const events = [
      'AMA Invasion: Celebrity NPC has appeared!',
      'Cake Day: All players get karma boost!',
      'Server Maintenance: Vision reduced!',
      'Brigading: NPC armies incoming!',
      'Mod Sweep: Some areas now safe zones!'
    ];
    
    const event = Phaser.Utils.Array.GetRandom(events);
    
    const eventText = this.add.text(512, 150, event, {
      fontFamily: 'Arial Black',
      fontSize: 24,
      color: '#ffff00',
      stroke: '#000000',
      strokeThickness: 2,
    }).setOrigin(0.5).setScrollFactor(0);
    
    this.tweens.add({
      targets: eventText,
      alpha: 0,
      duration: 5000,
      onComplete: () => eventText.destroy()
    });
    
    // Apply event effects
    if (event.includes('Cake Day')) {
      this.playerKarma += 50;
      this.karmaText.setText(`Karma: ${this.playerKarma}`);
    }
  }
}