export default class Point {
  public x: number
  public y: number
  public static zero: Point = new Point(0, 0)

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public move(p: Point) {
    this.x += p.x
    this.y += p.y
  }

  public add(p: Point): Point {
    return new Point(this.x + p.x, this.y + p.y)
  }

  public dist(p: Point): number {
    const dx = this.x - p.x
    const dy = this.y - p.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}
