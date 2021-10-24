import { defineQuery, defineSystem, enterQuery, exitQuery } from "bitecs";

import { Textures } from "../enums/Textures";
import { Sprite } from "../components/Sprite";
import { Position } from "../components/Position";
import { Direction } from "../components/Direction";

export const createSpriteSystem = (scene: Phaser.Scene) => {

  const spriteByID = new Map<number, Phaser.GameObjects.Sprite>()
  const spriteQuery = defineQuery([Sprite, Position, Direction])
  const spriteQueryEnter = enterQuery(spriteQuery);
  const spriteQueryExit = exitQuery(spriteQuery);

  return defineSystem(world => {
    const enterEntities = spriteQueryEnter(world);

    for (let entity of enterEntities) {
      const textureID = Sprite.texture[entity];
      const texture = Textures[textureID];
      spriteByID.set(entity, scene.add.sprite(0,0, texture))
    }

    const entities = spriteQuery(world);

    for (let entity of entities) {
      const sprite = spriteByID.get(entity);

      if(!sprite) continue;

      sprite.x = Position.x[entity]
      sprite.y = Position.y[entity]
      sprite.angle = Direction.angle[entity]
    }

    const exitEntities = spriteQueryExit(world);

    for (let entity of exitEntities) {
      const sprite = spriteByID.get(entity);

      if(!sprite) continue;

      sprite.destroy();
      spriteByID.delete(entity);
    }

    return world;
  })
}