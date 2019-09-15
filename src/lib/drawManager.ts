import Point from './point'

import Rect from './rect'
import Circle from './circle'

export default class DrawManager {
  private static ctx: CanvasRenderingContext2D

  public static init(width: number, height: number) {
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

  public static rect(rect: Rect, color: string, fill: Boolean) {
    this.ctx.beginPath()
    this.ctx.rect(rect.pos.x, rect.pos.y, rect.width, rect.height)
    this.draw(color, fill)
  }

  public static circle(circle: Circle, color: string, fill: Boolean) {
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

  public static line(p1: Point, p2: Point, l: number, color: string) {
    this.ctx.beginPath()
    this.ctx.moveTo(p1.x, p1.y)
    this.ctx.lineTo(p2.x, p2.y)
    this.ctx.lineWidth = l
    this.draw(color, false)
  }

  public static string(pos: Point, str: string, size: number, color: string) {
    this.ctx.fillStyle = color
    this.ctx.font = '' + size + "px 'メイリオ'"
    this.ctx.fillText(str, pos.x, pos.y)
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
