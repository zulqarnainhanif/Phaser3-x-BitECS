import { defineQuery, defineSystem } from "bitecs";

import { CPU } from "../components/CPU";
import { Velocity } from "../components/Velocity";
import { Direction } from "../components/Direction";

export const createCPUSystem = (scene: Phaser.Scene) => {
  return defineSystem(world => {
    const cpuPlayerQuery = defineQuery([CPU, Velocity, Direction]);
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
          Velocity.x[entity] = -5;
          Velocity.y[entity] = 0;
          Direction.angle[entity] = 270
          break;

        // right
        case 1:
          Velocity.x[entity] = 5;
          Velocity.y[entity] = 0;
          Direction.angle[entity] = 90
          break;

        // up
        case 2:
          Velocity.x[entity] = 0;
          Velocity.y[entity] = 5;
          Direction.angle[entity] = 0
          break;

        // down
        case 3:
          Velocity.x[entity] = 0;
          Velocity.y[entity] = -5;
          Direction.angle[entity] = 180
          break;

        default:
          Velocity.x[entity] = 0;
          Velocity.y[entity] = 0;
      }
        

    }

    return world;
  })
}