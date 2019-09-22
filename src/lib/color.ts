import { threadId } from 'worker_threads'

export default class Color {
  public r: number
  public g: number
  public b: number
  public a: number

  public static readonly white = new Color(255, 255, 255)
  public static readonly red = new Color(255, 0, 0)
  public static readonly green = new Color(0, 255, 0)
  public static readonly blue = new Color(0, 0, 255)
  public static readonly black = new Color(0, 0, 0)

  constructor(r: number, g: number, b: number, a = 1) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  public toString(): string {
    return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')'
  }
}
