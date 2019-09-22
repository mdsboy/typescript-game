export default class Vec2 {
  public x: number
  public y: number

  public static zero: Readonly<Vec2> = new Vec2(0, 0)

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public add(p: Vec2): Vec2 {
    return new Vec2(this.x + p.x, this.y + p.y)
  }

  public addAssign(p: Vec2): void {
    this.x += p.x
    this.y += p.y
  }

  public sub(p: Vec2): Vec2 {
    return new Vec2(this.x - p.x, this.y - p.y)
  }

  public subAssign(p: Vec2): void {
    this.x -= p.x
    this.y -= p.y
  }

  public dist(p: Vec2): number {
    const dx = this.x - p.x
    const dy = this.y - p.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  public scalarMul(s: number): Vec2 {
    return new Vec2(s * this.x, s * this.y)
  }

  public static cosSin(radian: number): Vec2 {
    return new Vec2(Math.cos(radian), Math.sin(radian))
  }
}
