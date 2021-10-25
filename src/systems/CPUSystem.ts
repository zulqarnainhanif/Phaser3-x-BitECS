import { defineQuery, defineSystem } from "bitecs";

import { Move } from "../enums/Move";
import { CPU } from "../components/CPU";
import { Input } from "../components/Input";
import { Velocity } from "../components/Velocity";
import { Direction } from "../components/Direction";

export const createCPUSystem = (scene: Phaser.Scene) => {
    
  const cpuPlayerQuery = defineQuery([CPU, Velocity, Direction, Input]);

  return defineSystem(world => {
    const entities = cpuPlayerQuery(world);
    const dt = scene.game.loop.delta;

    for (let entity of entities) {
      CPU.accumulatedTime[entity] += dt;

      if (CPU.accumulatedTime[entity] < CPU.timeBetweenActions[entity]) continue;

      CPU.accumulatedTime[entity] = 0;

      const rand = Phaser.Math.Between(0, 20)

      switch (rand) {
        //left
        case 0:
          Input.direction[entity] = Move.Left
          break;

        // right
        case 1:
          Input.direction[entity] = Move.Right
          break;

        // up
        case 2:
          Input.direction[entity] = Move.Up
          break;

        // down
        case 3:
          Input.direction[entity] = Move.Down
          break;

        default:
          Input.direction[entity] = Move.None
      }
        

    }

    return world;
  })
}