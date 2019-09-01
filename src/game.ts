export default class game {
  private ctx: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  public draw() {
    this.ctx.beginPath()
    this.ctx.fillStyle = '#abc'
    this.ctx.rect(100, 100, 200, 200)
    this.ctx.fill()
  }
}
