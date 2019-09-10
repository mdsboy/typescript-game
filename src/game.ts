import Point from './point'

import { InputKey, KeyCode } from './input'
import DM from './drawManager'

export default class Game {
  private pos: Point;
  private speed: number;

  constructor(ctx: CanvasRenderingContext2D) {
    DM.setCtx(ctx)
    this.pos = new Point(100, 100)
    this.speed = 5;
  }

  public draw() {
    DM.rect(Point.zero, 800, 600, '#ffffff', true)
    DM.rect(this.pos, 200, 200, '#def', true)
    DM.circle(this.pos, 30, '#000', true)
  }

  public update() {
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
  }
}
