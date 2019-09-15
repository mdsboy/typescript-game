//import Point from './point'

import Rect from './rect'
import Circle from './circle'

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

  public rect(rect: Rect, color: string, fill: Boolean) {
    this.ctx.beginPath()
    this.ctx.rect(rect.pos.x, rect.pos.y, rect.width, rect.height)
    this.draw(color, fill)
  }

  public circle(circle: Circle, color: string, fill: Boolean) {
    this.ctx.beginPath()
    this.ctx.arc(
      circle.pos.x,
      circle.pos.y,
      circle.radius,
      0,
      Math.PI * 2,
      false
    )
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
