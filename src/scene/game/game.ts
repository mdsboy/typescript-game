import SceneBase from 'lib/sceneBase'

import Player from './player'
import Vec2 from 'lib/vec2'
import Block from './block'
import Entity from './entity'
import moveBlock from './moveBlock'
import DrawManager from 'lib/drawManager'
import Camera from 'lib/camera'

export default class Game implements SceneBase {
  private player: Player
  private entities: Array<Entity> = []

  constructor() {
    this.player = new Player()

    Block.size = 50
    moveBlock.size = 50
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 20; j++) {
        if (j >= 13 || i == 15 || i + j == 25) {
          this.entities.push(
            new Block(new Vec2(i * Block.size, j * Block.size))
          )
        }
        if ((j == 10 || j == 5) && i == 0) {
          this.entities.push(
            new moveBlock(new Vec2(i * moveBlock.size, j * moveBlock.size))
          )
        }
      }
    }
  }

  public draw() {
    DrawManager.setCameraPos(Camera.getPos())

    for (let entity of this.entities) {
      entity.draw()
    }

    this.player.draw()

    DrawManager.setCameraPos(Vec2.zero)
  }

  public update(): SceneBase {
    for (let entity of this.entities) {
      entity.update(this.entities)
    }
    this.player.update(this.entities)

    return this
  }
}
