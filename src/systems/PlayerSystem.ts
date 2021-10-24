import { defineQuery, defineSystem } from "bitecs";

import { Player } from "../components/Player";
import { Velocity } from "../components/Velocity";
import { Direction } from "../components/Direction";

export const createPlayerSystem = (cursors: Phaser.Types.Input.Keyboard.CursorKeys) => {
  return defineSystem(world => {
    const playerQuery = defineQuery([Player, Velocity, Direction]);
    const entities = playerQuery(world);

    for (let entity of entities) {
      if(cursors.left.isDown){
        Velocity.x[entity] = -5;
        Velocity.y[entity] = 0;
        Direction.angle[entity] = 270
      } else if(cursors.right.isDown){
        Velocity.x[entity] = 5;
        Velocity.y[entity] = 0;
        Direction.angle[entity] = 90
      } else if(cursors.up.isDown){
        Velocity.x[entity] = 0;
        Velocity.y[entity] = -5;
        Direction.angle[entity] = 0
      } else if(cursors.down.isDown){
        Velocity.x[entity] = 0;
        Velocity.y[entity] = 5;
        Direction.angle[entity] = 180
      } else {
        Velocity.x[entity] = 0;
        Velocity.y[entity] = 0;
      }
    }

    return world;
  })
}