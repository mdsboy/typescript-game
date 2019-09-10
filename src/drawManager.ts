import Point from './point'

export default class DrawManager {
  private static ctx: CanvasRenderingContext2D

  public static setCtx(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  public static rect(
    p: Point,
    w: number,
    h: number,
    color: string,
    fill: Boolean
  ) {
    this.ctx.beginPath()
    this.ctx.rect(p.x, p.y, w, h)
    this.draw(color, fill)
  }

  public static circle(
    p: Point,
    r: number,
    color: string,
    fill: Boolean
  ) {
    this.ctx.beginPath()
    this.ctx.arc(p.x, p.y, r, 0, Math.PI * 2, false)
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
