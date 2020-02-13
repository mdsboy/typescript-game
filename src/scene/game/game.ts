import SceneBase from 'lib/sceneBase'

import Player from './player'
import Vec2 from 'lib/vec2'
import Block from './block'
import Entity from './entity'
import moveBlock from './moveBlock'
import DrawManager from 'lib/drawManager'
import Camera from 'lib/camera'
import Rect from 'lib/rect'
import SceneManager from 'lib/sceneManager'

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

  private loadBlock(s: string, x: number, y: number) {
    switch (s) {
      case 'p':
        const pos = new Vec2(x, y)
        this.player.setPos(pos)
        Camera.move(new Vec2(Camera.getDistFromCetnerX(pos), 0))
        break
      case 'c':
        this.player.addCheckPoint(new Vec2(x, y))
        break;
      case 'br':
        this.entities.push(
          new Block(
            new Vec2(x, y),
            true,
            false
          )
        )
        break
      case 'bl':
        this.entities.push(
          new Block(
            new Vec2(x, y),
            false,
            false
          )
        )
        break
      case 'tr':
        this.entities.push(
          new Block(
            new Vec2(x, y),
            true,
            true
          )
        )
        break
      case 'mbr':
        this.entities.push(
          new moveBlock(new Vec2(x, y))
        )
        break
    }
  }

  private load() {
    fetch('stage1.csv', {
      method: 'GET'
    })
      .then(response => response.text())
      .then(text => {
        console.log(text)

        csv.parse(text, (err: Error, stage: Array<Array<string>>) => {
          for (let i = 0; i < stage.length; i++) {
            for (let j = 0; j < stage[i].length; j++) {
              this.loadBlock(stage[i][j], j * Block.size, i * Block.size)
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
    let gradient = DrawManager.ctx.createLinearGradient(
      0,
      0,
      SceneManager.getScreen().width,
      0
    )
    gradient.addColorStop(0.0, 'rgba(255, 255, 255, 0.3)')
    gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0.3)')
    DrawManager.fillRect(SceneManager.getScreen(), gradient)

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
