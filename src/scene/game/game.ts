import SceneBase from 'lib/sceneBase'

import Player from './player'
import Vec2 from 'lib/vec2'
import Block from './block'
import Entity from './entity'
import Box from './box'

export default class Game implements SceneBase {
  private player: Player
  private entities: Array<Entity> = []

  constructor() {
    this.player = new Player()

    Block.size = 50
    Box.size = 50
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 20; j++) {
        if (j >= 13 || i == 15 || i + j == 25) {
          this.entities.push(
            new Block(new Vec2(i * Block.size, j * Block.size))
          )
        }
        if (j == 0) {
          this.entities.push(new Box(new Vec2(i * Box.size, j * Box.size)))
        }
      }
    }
  }

  public draw() {
    for (let entity of this.entities) {
      entity.draw()
    }

    this.player.draw()
  }

  public update(): SceneBase {
    for (let entity of this.entities) {
      entity.update()
    }
    this.player.update(this.entities)

    return this
  }
}
