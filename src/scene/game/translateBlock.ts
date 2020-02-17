import Rect from 'lib/rect'
import Vec2 from 'lib/vec2'
import dm from 'lib/drawManager'
import Color from 'lib/color'
import Circle from 'lib/circle'
import Entity from './entity'

export default class TranslateBlock implements Entity {
  public static size: number
  private rect: Rect
  private isTarget: boolean
  private centerPos: Vec2
  private angle: number
  private color: Color

  constructor(pos: Vec2, angle: number) {
    this.rect = new Rect(pos, TranslateBlock.size, TranslateBlock.size)
    this.angle = angle
  }

  public draw(): void {
    const angleVal = 200 * ((this.angle + 360) % 360 / 360)
    this.color = new Color(200 - angleVal, 0, angleVal)
    dm.fillRect(this.rect, this.color.getAlphaColor(0.5))
    dm.strokeRect(this.rect, this.color, 3)

    if (this.isTarget) {
      dm.fillRect(this.rect, new Color(50, 50, 50, 0.8))
    }

    const center = this.rect.pos.add(new Vec2(this.rect.width / 2, this.rect.height / 2))
    const startPos = new Vec2(center.x, center.y).sub(
      Vec2.cosSin(this.angle).scalarMul(TranslateBlock.size / 3)
    )
    const endPos = new Vec2(center.x, center.y).add(
      Vec2.cosSin(this.angle).scalarMul(TranslateBlock.size / 3)
    )
    dm.line(startPos, endPos,
      Color.white,
      2
    )
    dm.line(endPos,
      endPos.add(
        Vec2.cosSin(this.angle + 225).scalarMul(10)
      ),
      Color.white,
      2
    )
    dm.line(endPos,
      endPos.add(
        Vec2.cosSin(this.angle + 135).scalarMul(10)
      ),
      Color.white,
      2
    )
  }
  public update(): void {
  }

  public move(v: Vec2): void {
    this.rect.pos.addAssign(v)
  }

  public moveStart(circle: Circle, center: Vec2): void {
  }

  public moveEnd(): void {
  }

  public isClicked(center: Vec2): boolean {
    this.isTarget = this.rect.inVec2(center)
    return this.isTarget
  }

  public getCenterPos(): Vec2 {
    return this.centerPos.add(this.rect.pos)
  }

  public getNextPos(circlePos: Vec2): Vec2 {
    return circlePos.add(
      Vec2.cosSin(this.angle).scalarMul(5)
    )
  }

  public getStartPos(): Vec2 | null {
    return null
  }

  public isCollide(circle: Circle): boolean {
    return circle.collideRect(this.rect)
  }

  public isTransparent(): boolean {
    return false;
  }

  public getColor(): Color {
    return this.color
  }
}
