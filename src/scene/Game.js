import Phaser from "phaser";

import BlueTank from "../assets/blue-tank.png";
import GreyBattleShip from "../assets/grey-battle-ship.png"
import PheonixBattleShip from "../assets/pheonix-battle-ship.png"

export default class Game extends Phaser.Scene {
  init() {

  }

  preload() {
    this.load.image('blue-tank', BlueTank);
    this.load.image("grey-battle-ship", GreyBattleShip);
    this.load.image("pheonix-battle-ship", PheonixBattleShip);
  }

  create() {

  }

  upload() {

  }
}