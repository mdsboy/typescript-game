import Point from './lib/point'

import { InputKey, KeyCode } from './lib/inputKey'
import dm from './lib/drawManager'

import SceneBase from './lib/sceneBase'
import Rect from './lib/rect'
import Circle from './lib/circle'
import { InputMouse } from './lib/inputMouse'
import { radianToDegree, degreeToRadian } from './lib/util'

export default class Game implements SceneBase {
  private pos: Point
  private speed: number
  private rect: Rect
  private circle: Circle
  private angle: number
  private rotate: boolean
  private center: Point
  private rotate_circle: Circle | null
  private len: number
  private ay: number

  constructor() {
    this.pos = new Point(100, 100)
    this.speed = 5
    this.rect = new Rect(Point.zero, 200, 200)
    this.circle = new Circle(this.pos, 30)
    this.rotate_circle = null
    this.ay = 0
  }

  public draw() {
    dm.rect(this.rect, '#def', true)
    dm.circle(this.circle, '#000', true)
    dm.line(new Point(50, 100), new Point(200, 300), 3, '#000')
    dm.string(new Point(300, 300), 'abcdef', 300, '000')

    if (this.rotate_circle) {
      dm.circle(this.rotate_circle, '#000', false)
    }
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

    if (InputMouse.isMouseLeftDown()) {
      if (!this.rotate) {
        this.rotate = true
        this.center = InputMouse.getMousepos()

        this.len = this.center.dist(this.circle.pos)
        this.rotate_circle = new Circle(this.center, this.len)

        const x = this.circle.pos.x - this.center.x
        const y = this.circle.pos.y - this.center.y
        this.angle = radianToDegree(Math.atan2(y, x))
        console.log(this.angle)
      }
    } else {
      this.rotate = false
      this.angle = 0
    }

    if (this.rotate) {
      this.angle += 1
      this.circle.pos.x =
        this.center.x + this.len * Math.cos(degreeToRadian(this.angle))
      this.circle.pos.y =
        this.center.y + this.len * Math.sin(degreeToRadian(this.angle))
    } else {
      this.pos.y += this.ay
      this.ay += 1
    }

    if (this.pos.y >= dm.height) {
      this.pos.y = dm.height
      this.ay = 0
    }

    return this
  }
}
