import { defineQuery, defineSystem} from "bitecs";
import { Direction } from "../components/Direction";

import { Move } from "../enums/Move";
import { Input } from "../components/Input";
import { Position } from "../components/Position";
import { Velocity } from "../components/Velocity";

export const createMovementSystem = () => {
  
  const movementQuery = defineQuery([Position, Velocity, Input, Direction]);

  return defineSystem(world => {
    const entities = movementQuery(world);
    const speed = 5;

    for (let entity of entities) {

      const move = Input.direction[entity]

      switch (move) {
        //left
        case Move.Left:
          Velocity.x[entity] = -speed;
          Velocity.y[entity] = 0;
          Direction.angle[entity] = 270
          break;

        // right
        case Move.Right:
          Velocity.x[entity] = speed;
          Velocity.y[entity] = 0;
          Direction.angle[entity] = 90
          break;

        // up
        case Move.Up:
          Velocity.x[entity] = 0;
          Velocity.y[entity] = -speed;
          Direction.angle[entity] = 0
          break;

        // down
        case Move.Down:
          Velocity.x[entity] = 0;
          Velocity.y[entity] = speed;
          Direction.angle[entity] = 180
          break;

        case Move.None:
          Velocity.x[entity] = 0;
          Velocity.y[entity] = 0;
      }

      Position.x[entity] += Velocity.x[entity];
      Position.y[entity] += Velocity.y[entity];
    }

    return world;
  })
}