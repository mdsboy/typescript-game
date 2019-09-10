import { InputKey, KeyCode } from './input'
import DM from './drawManager'

export default class game {
  private x: number
  private y: number

  constructor(ctx: CanvasRenderingContext2D) {
    DM.setCtx(ctx)
    this.x = 100
    this.y = 100
  }

  public draw() {
    DM.rect(0, 0, 800, 600, '#ffffff', true)
    DM.rect(this.x, this.y, 200, 200, '#def', true)
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
