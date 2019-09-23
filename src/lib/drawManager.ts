import Vec2 from './vec2'

import Rect from './rect'
import Circle from './circle'
import Color from './color';

export default class DrawManager {
  private static ctx: CanvasRenderingContext2D
  private static cameraPos: Vec2

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

    this.cameraPos = new Vec2(0, 0)
  }

  public static setCameraPos(vec: Vec2) {
    this.cameraPos = vec
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
    const pos = rect.pos.sub(this.cameraPos)
    this.ctx.rect(pos.x, pos.y, rect.width, rect.height)
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
    const pos = circle.pos.sub(this.cameraPos)
    this.ctx.arc(
      pos.x,
      pos.y,
      circle.radius,
      start,
      end,
      false
    )
  }

  public static line(p1: Vec2, p2: Vec2, color: Color, width: number = 1) {
    this.ctx.beginPath()
    const pos1 = p1.sub(this.cameraPos)
    const pos2 = p2.sub(this.cameraPos)
    this.ctx.moveTo(pos1.x, pos1.y)
    this.ctx.lineTo(pos2.x, pos2.y)
    this.strokeDraw(color, width)
  }

  public static string(p: Vec2, str: string, size: number, color: Color) {
    this.ctx.fillStyle = color.toString()
    this.ctx.font = '' + size + "px 'メイリオ'"

    const pos = p.sub(this.cameraPos)

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
