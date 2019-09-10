export default class DrawManager {
  private static ctx: CanvasRenderingContext2D

  public static setCtx(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  public static rect(
    x: number,
    y: number,
    w: number,
    h: number,
    color: string,
    fill: Boolean
  ) {
    this.ctx.beginPath()
    this.ctx.rect(x, y, w, h)
    this.draw(color, fill)
  }

  public static circle(
    x: number,
    y: number,
    r: number,
    color: string,
    fill: Boolean
  ) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, r, 0, Math.PI * 2, false)
    this.draw(color, fill)
  }

  private static draw(color: string, fill: Boolean) {
    if (fill) {
      this.ctx.fillStyle = color
      this.ctx.fill()
    } else {
      this.ctx.strokeStyle = color
      this.ctx.stroke()
    }
  }
}
