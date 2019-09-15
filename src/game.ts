import Point from './lib/point'

import { InputKey, KeyCode } from './lib/input'
import DrawManager from './lib/drawManager'

import SceneBase from './lib/sceneBase'
import Rect from './lib/rect'
import Circle from './lib/circle'

export default class Game implements SceneBase {
  private pos: Point
  private speed: number
  private rect: Rect
  private circle: Circle

  constructor() {
    this.pos = new Point(100, 100)
    this.speed = 5
    this.rect = new Rect(this.pos, 200, 200)
    this.circle = new Circle(this.pos, 30)
  }

  public draw(dm: DrawManager) {
    dm.rect(this.rect, '#def', true)
    dm.circle(this.circle, '#000', true)
    dm.line(new Point(50, 100), new Point(200, 300), 3, "#000")
    dm.string(new Point(300, 300), "abcdef", 300, "000")
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

    this.rect.pos = this.pos
    this.circle.pos = this.pos

    return this
  }
}
