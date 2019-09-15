import Point from './point'

export default class DrawManager {
  private ctx: CanvasRenderingContext2D

  constructor(width: number, height: number) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')

    if (ctx) {
      this.ctx = ctx
    } else {
      console.error('Canvas is null')
    }
  }

  public rect(
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

  public circle(p: Point, r: number, color: string, fill: Boolean) {
    this.ctx.beginPath()
    this.ctx.arc(p.x, p.y, r, 0, Math.PI * 2, false)
    this.draw(color, fill)
  }

  private draw(color: string, fill: Boolean) {
    if (fill) {
      this.ctx.fillStyle = color
      this.ctx.fill()
    } else {
      this.ctx.strokeStyle = color
      this.ctx.stroke()
    }
  }
}
