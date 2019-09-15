import Point from './lib/point'

import { InputKey, KeyCode } from './lib/input'
import DrawManager from './lib/drawManager'

import SceneBase from './lib/sceneBase'

export default class Game implements SceneBase {
  private pos: Point
  private speed: number

  constructor() {
    this.pos = new Point(100, 100)
    this.speed = 5
  }

  public draw(dm: DrawManager) {
    dm.rect(Point.zero, 800, 600, '#ffffff', true)
    dm.rect(this.pos, 200, 200, '#def', true)
    dm.circle(this.pos, 30, '#000', true)
  }

  public update(): SceneBase {
    if (InputKey.isKeyDown(KeyCode.A)) {
      this.pos.x -= this.speed
    }
    if (InputKey.isKeyDown(KeyCode.D)) {
      this.pos.x += this.speed
    }
    if (InputKey.isKeyDown(KeyCode.W)) {
      this.pos.y -= this.speed
    }
    if (InputKey.isKeyDown(KeyCode.S)) {
      this.pos.y += this.speed
    }
    return this
  }
}
