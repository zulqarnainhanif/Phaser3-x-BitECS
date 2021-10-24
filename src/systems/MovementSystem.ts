import { defineQuery, defineSystem} from "bitecs";

import { Position } from "../components/Position";
import { Velocity } from "../components/Velocity";

export const createMovementSystem = () => {
  return defineSystem(world => {
    const movementQuery = defineQuery([Position, Velocity]);
    const entities = movementQuery(world);

    for (let entity of entities) {
      Position.x[entity] += Velocity.x[entity];
      Position.y[entity] += Velocity.y[entity];
    }

    return world;
  })
}