import {InputKey, KeyCode} from './input'

export default class game {
  private ctx: CanvasRenderingContext2D
  private x: number
  private y: number

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.x = 100;
    this.y = 100;
  }

  public draw() {
    this.ctx.beginPath()
    this.ctx.fillStyle = '#ffffff'
    this.ctx.rect(0, 0, 800, 600)
    this.ctx.fill()
    this.ctx.beginPath()
    this.ctx.fillStyle = '#abc'
    this.ctx.rect(this.x, this.y, 200, 200)
    this.ctx.fill()
  }

  public update() {
    if (InputKey.isKeyDown(KeyCode.A)) {
      this.x -= 1
    }
    if (InputKey.isKeyDown(KeyCode.D)) {
      this.x += 1
    }
    if (InputKey.isKeyDown(KeyCode.W)) {
      this.y -= 1
    }
    if (InputKey.isKeyDown(KeyCode.S)) {
      this.y += 1
    }
  }
}
