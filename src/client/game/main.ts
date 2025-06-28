import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { GameLobby } from './scenes/GameLobby';
import { BattleRoyale } from './scenes/BattleRoyale';
import { Victory } from './scenes/Victory';
import { MainMenu } from './scenes/MainMenu';
import * as Phaser from 'phaser';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';

//  Snoo Royale Game Configuration
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  backgroundColor: '#0f1419',
  scene: [Boot, Preloader, MainMenu, GameLobby, BattleRoyale, Victory, GameOver],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600
    },
    max: {
      width: 1600,
      height: 1200
    }
  }
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;