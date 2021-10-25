import { defineQuery, defineSystem } from "bitecs";

import { Move } from "../enums/Move";
import { Input } from "../components/Input";
import { Player } from "../components/Player";
import { Velocity } from "../components/Velocity";
import { Direction } from "../components/Direction";

export const createPlayerSystem = (cursors: Phaser.Types.Input.Keyboard.CursorKeys) => {
  
  const playerQuery = defineQuery([Player, Velocity, Direction, Input]);
  
  return defineSystem(world => {
    const entities = playerQuery(world);

    for (let entity of entities) {
      if(cursors.left.isDown){
        Input.direction[entity] = Move.Left
      } else if(cursors.right.isDown){
        Input.direction[entity] = Move.Right
      } else if(cursors.up.isDown){
        Input.direction[entity] = Move.Up
      } else if(cursors.down.isDown){
        Input.direction[entity] = Move.Down
      } else {
        Input.direction[entity] = Move.None
      }
    }

    return world;
  })
}