import SceneBase from 'lib/sceneBase'

import Player from './player'
import Vec2 from 'lib/vec2'
import TranslateBlock from './translateBlock'
import DrawManager from 'lib/drawManager'
import Camera from 'lib/camera'
import Rect from 'lib/rect'
import RotateBlock from './rotateBlock'
import Entities from './entities'
import Color from 'lib/color'
import TranslateBlockNeo from './translateBlockNeo'

const csv = require('csv')

export default class Game implements SceneBase {
  private player: Player
  private entities: Entities
  private loadFinished = false
  private readonly blockSize = 50

  constructor() {
    this.player = new Player()
    this.entities = new Entities()

    TranslateBlock.size = this.blockSize
    RotateBlock.size = this.blockSize

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
        this.entities.addEntity(
          new RotateBlock(
            new Vec2(x, y),
            true,
            false
          )
        )
        break
      case 'bl':
        this.entities.addEntity(
          new RotateBlock(
            new Vec2(x, y),
            false,
            false
          )
        )
        break
      case 'tr':
        this.entities.addEntity(
          new RotateBlock(
            new Vec2(x, y),
            true,
            true
          )
        )
        break
      case 't0':
        this.entities.addEntity(
          new TranslateBlock(new Vec2(x, y), 0)
        )
        break
      case 't315':
        this.entities.addEntity(
          new TranslateBlock(new Vec2(x, y), 315)
        )
        break
      case 't180':
        this.entities.addEntity(
          new TranslateBlock(new Vec2(x, y), 180)
        )
        break
      case 't90':
        this.entities.addEntity(
          new TranslateBlock(new Vec2(x, y), 90)
        )
        break
      case 't270':
        this.entities.addEntity(
          new TranslateBlock(new Vec2(x, y), 270)
        )
        break
      case 'tn':
        this.entities.addEntity(
          new TranslateBlockNeo(new Vec2(x, y), 270)
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
              this.loadBlock(stage[i][j], j * TranslateBlock.size, i * TranslateBlock.size)
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

    DrawManager.clear()

    let gradient = DrawManager.ctx.createLinearGradient(
      0,
      0,
      Camera.getCameraRect().width,
      0
    )
    gradient.addColorStop(0.0, 'rgba(255, 255, 255, 0.3)')
    gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0.3)')

    DrawManager.setCameraPos(Camera.getCameraPos())
    DrawManager.clear()
    DrawManager.fillRect(Camera.getCameraRect(), gradient)

    for (let x = - Camera.getCameraPos().x % this.blockSize; x < Camera.getCameraRect().width; x += TranslateBlock.size) {
      for (let y = - Camera.getCameraPos().y % this.blockSize; y < Camera.getCameraRect().height; y += TranslateBlock.size) {
        DrawManager.strokeRect(new Rect(new Vec2(Camera.getCameraPos().x + x, Camera.getCameraPos().y + y), this.blockSize, this.blockSize), new Color(0, 0, 0, 0.1));
      }
    }

    this.entities.draw()
    this.player.draw()

    DrawManager.setCameraPos(Vec2.zero())
  }

  public update(): SceneBase {
    if (!this.loadFinished) {
      return this
    }

    this.entities.update()
    this.player.update(this.entities)

    return this
  }
}
