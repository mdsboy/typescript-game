import SceneBase from 'lib/sceneBase'

import Player from './player'
import Vec2 from 'lib/vec2'
import Block from './block'
import Entity from './entity'
import moveBlock from './moveBlock'
import DrawManager from 'lib/drawManager'
import Camera from 'lib/camera'

const csv = require('csv')

export default class Game implements SceneBase {
  private player: Player
  private entities: Array<Entity> = []
  private loadFinished = false

  constructor() {
    this.player = new Player()

    Block.size = 50
    moveBlock.size = 50

    this.load()
  }

  public load() {
    fetch('stage1.csv', {
      method: 'GET'
    })
      .then(response => response.text())
      .then(text => {
        console.log(text)

        csv.parse(text, (err: Error, stage: Array<Array<Object>>) => {
          for (let i = 0; i < stage.length; i++) {
            for (let j = 0; j < stage[i].length; j++) {
              switch (stage[i][j]) {
                case "1":
                  this.player.setPos(new Vec2(j * Block.size, i * Block.size))
                  console.log("po")
                  break;
                case "2":
                  this.entities.push(
                    new Block(new Vec2(j * Block.size, i * Block.size))
                  )
                  break
                case "3":
                  this.entities.push(
                    new moveBlock(new Vec2(j * Block.size, i * Block.size))
                  )
                  break
              }
            }
          }
          this.loadFinished = true
        })
      })
  }

  public draw() {
    console.log(this.loadFinished)
    if (!this.loadFinished) {
      return
    }
    DrawManager.setCameraPos(Camera.getCameraPos())

    for (let entity of this.entities) {
      entity.draw()
    }

    this.player.draw()

    DrawManager.setCameraPos(Vec2.zero)
  }

  public update(): SceneBase {
    if (!this.loadFinished) {
      return this
    }

    for (let entity of this.entities) {
      entity.update(this.entities)
    }
    this.player.update(this.entities)

    return this
  }
}
