   import Phaser from 'phaser';
   import Game from './scene/Game.ts';

   const config = {
     type: Phaser.AUTO,
     parent: 'game',
     width: 900,
     height: 600,
     scene: Game
   };

   const game = new Phaser.Game(config);