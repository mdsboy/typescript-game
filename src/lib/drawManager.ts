import Vec2 from './vec2'

import Rect from './rect'
import Circle from './circle'
import Color from './color';

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

  public static fillRect(rect: Rect, color: Color) {
    this.ctx.beginPath()
    this.rect(rect)
    this.fillDraw(color)
  }

  public static strokeRect(rect: Rect, color: Color, width: number = 1) {
    this.ctx.beginPath()
    this.rect(rect)
    this.strokeDraw(color, width)
  }

  private static rect(rect: Rect) {
    this.ctx.rect(rect.pos.x, rect.pos.y, rect.width, rect.height)
  }

  public static fillCircle(circle: Circle, color: Color) {
    this.ctx.beginPath()
    this.circle(circle, 0, Math.PI * 2)
    this.fillDraw(color)
  }

  public static strokeCircle(circle: Circle, color: Color, width: number = 1) {
    this.ctx.beginPath()
    this.circle(circle, 0, Math.PI * 2)
    this.strokeDraw(color, width)
  }

  public static fillArc(circle: Circle, start: number, end: number, color: Color, width: number = 1) {
    this.ctx.beginPath()
    this.circle(circle, start, end)
    this.fillDraw(color)
  }

  public static strokeArc(circle: Circle, start: number, end: number, color: Color, width: number = 1) {
    this.ctx.beginPath()
    this.circle(circle, start, end)
    this.strokeDraw(color, width)
  }

  private static circle(circle: Circle, start: number, end: number) {
    this.ctx.arc(
      circle.pos.x,
      circle.pos.y,
      circle.radius,
      start,
      end,
      false
    )
  }

  public static line(p1: Vec2, p2: Vec2, color: Color, width: number = 1) {
    this.ctx.beginPath()
    this.ctx.moveTo(p1.x, p1.y)
    this.ctx.lineTo(p2.x, p2.y)
    this.strokeDraw(color, width)
  }

  public static string(pos: Vec2, str: string, size: number, color: Color) {
    this.ctx.fillStyle = color.toString()
    this.ctx.font = '' + size + "px 'メイリオ'"
    this.ctx.fillText(str, pos.x, pos.y)
  }

  private static fillDraw(color: Color) {
    this.ctx.fillStyle = color.toString()
    this.ctx.fill()
  }

  private static strokeDraw(color: Color, width: number) {
    this.ctx.strokeStyle = color.toString()
    this.ctx.lineWidth = width
    this.ctx.stroke()
  }
}
