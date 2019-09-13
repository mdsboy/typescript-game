import Point from './point'

export default class DrawManager {
  public static rect(
    ctx: CanvasRenderingContext2D,
    p: Point,
    w: number,
    h: number,
    color: string,
    fill: Boolean
  ) {
    ctx.beginPath()
    ctx.rect(p.x, p.y, w, h)
    this.draw(ctx, color, fill)
  }

  public static circle(
    ctx: CanvasRenderingContext2D,
    p: Point,
    r: number,
    color: string,
    fill: Boolean
  ) {
    ctx.beginPath()
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2, false)
    this.draw(ctx, color, fill)
  }

  private static draw(
    ctx: CanvasRenderingContext2D,
    color: string,
    fill: Boolean
  ) {
    if (fill) {
      ctx.fillStyle = color
      ctx.fill()
    } else {
      ctx.strokeStyle = color
      ctx.stroke()
    }
  }
}
