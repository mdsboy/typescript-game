import Vec2 from './vec2'

import Rect from './rect'
import Circle from './circle'

export default class DrawManager {
  public static width: number
  public static height: number

  private static ctx: CanvasRenderingContext2D

  public static init(width: number, height: number) {
    this.width = width
    this.height = height

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

  public static fillRect(rect: Rect, color: string) {
    this.ctx.beginPath()
    this.ctx.rect(rect.pos.x, rect.pos.y, rect.width, rect.height)
    this.fillDraw(color)
  }

  public static strokeRect(rect: Rect, color: string, width: number) {
    this.ctx.beginPath()
    this.ctx.rect(rect.pos.x, rect.pos.y, rect.width, rect.height)
    this.strokeDraw(color, width)
  }

  public static fillCircle(circle: Circle, color: string) {
    this.ctx.beginPath()
    this.ctx.arc(
      circle.pos.x,
      circle.pos.y,
      circle.radius,
      0,
      Math.PI * 2,
      false
    )
    this.fillDraw(color)
  }

  public static strokeCircle(circle: Circle, color: string, width: number) {
    this.ctx.beginPath()
    this.ctx.arc(
      circle.pos.x,
      circle.pos.y,
      circle.radius,
      0,
      Math.PI * 2,
      false
    )
    this.strokeDraw(color, width)
  }

  public static line(p1: Vec2, p2: Vec2, width: number, color: string) {
    this.ctx.beginPath()
    this.ctx.moveTo(p1.x, p1.y)
    this.ctx.lineTo(p2.x, p2.y)
    this.strokeDraw(color, width)
  }

  public static string(pos: Vec2, str: string, size: number, color: string) {
    this.ctx.fillStyle = color
    this.ctx.font = '' + size + "px 'メイリオ'"
    this.ctx.fillText(str, pos.x, pos.y)
  }

  private static fillDraw(color: string) {
    this.ctx.fillStyle = color
    this.ctx.fill()
  }

  private static strokeDraw(color: string, width: number) {
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = width
    this.ctx.stroke()
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
