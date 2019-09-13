import Point from './point'

import { InputKey, KeyCode } from './input'
import DM from './drawManager'

import SceneBase from './sceneBase'

export default class Game implements SceneBase {
  private pos: Point
  private speed: number

  constructor() {
    this.pos = new Point(100, 100)
    this.speed = 5
  }

  public draw(ctx: CanvasRenderingContext2D) {
    DM.rect(ctx, Point.zero, 800, 600, '#ffffff', true)
    DM.rect(ctx, this.pos, 200, 200, '#def', true)
    DM.circle(ctx, this.pos, 30, '#000', true)
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
