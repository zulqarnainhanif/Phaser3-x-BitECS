import * as Phaser from "phaser";
import {
  IWorld,
  System,
  addEntity,
  createWorld,
  addComponent,
} from "bitecs";

import { CPU } from "../components/CPU";
import { Input } from "../components/Input";
import { Sprite } from "../components/Sprite";
import { Player } from "../components/Player";
import { Position } from "../components/Position";
import { Velocity } from "../components/Velocity";
import { Direction } from "../components/Direction";

import { createCPUSystem } from "../systems/CPUSystem";
import { createSpriteSystem } from "../systems/SpriteSystem";
import { createPlayerSystem } from "../systems/PlayerSystem";
import { createMovementSystem } from "../systems/MovementSystem";

const CPU_PLAYER_COUNT = 20;

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private world?: IWorld;
  private spriteSystem?: System;
  private movementSystem?: System;
  private playerSystem?: System;
  private cpuSystem?: System;

  constructor() {
    super("game");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.image('blue-tank', require("../assets/blue-tank.png"));
    this.load.image("grey-battle-ship", require("../assets/grey-battle-ship.png"));
    this.load.image("pheonix-battle-ship", require("../assets/pheonix-battle-ship.png"));
  }

  create() {
    this.world = createWorld();

    const tank = addEntity(this.world);

    addComponent(this.world, Position, tank);
    Position.x[tank] = 450;
    Position.y[tank] = 300;

    addComponent(this.world, Input, tank);

    addComponent(this.world, Velocity, tank);

    addComponent(this.world, Direction, tank);

    addComponent(this.world, Sprite, tank);
    Sprite.texture[tank] = 0;

    addComponent(this.world, Player, tank);

    for (let i = 0; i < CPU_PLAYER_COUNT; i++) {
      const { width, height } = this.scale;
      const cpuPlayer = addEntity(this.world);

      addComponent(this.world, Position, cpuPlayer);
      Position.x[cpuPlayer] = Phaser.Math.Between(width * 0.25, width * 0.75);
      Position.y[cpuPlayer] = Phaser.Math.Between(height * 0.25, height * 0.75);

      addComponent(this.world, Input, cpuPlayer);

      addComponent(this.world, Velocity, cpuPlayer);

      addComponent(this.world, Direction, cpuPlayer);

      addComponent(this.world, Sprite, cpuPlayer);
      Sprite.texture[cpuPlayer] = Phaser.Math.Between(1,2);

      addComponent(this.world, CPU, cpuPlayer);
      CPU.timeBetweenActions[cpuPlayer] = Phaser.Math.Between(0, 500);
    }

    this.spriteSystem = createSpriteSystem(this);
    this.movementSystem = createMovementSystem();
    this.playerSystem = createPlayerSystem(this.cursors);
    this.cpuSystem = createCPUSystem(this);
  }

  update(t:number, dt:number) {
    if(!this.world) return;

    this.playerSystem?.(this.world);
    this.cpuSystem?.(this.world);
    this.movementSystem?.(this.world);
    this.spriteSystem?.(this.world);
  }
}