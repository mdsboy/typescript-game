export default class Color {
  public r: number
  public g: number
  public b: number
  public a: number

  public static readonly white: Readonly<Color> = new Color(255, 255, 255)
  public static readonly red: Readonly<Color> = new Color(255, 0, 0)
  public static readonly green: Readonly<Color> = new Color(0, 255, 0)
  public static readonly blue: Readonly<Color> = new Color(0, 0, 255)
  public static readonly black: Readonly<Color> = new Color(0, 0, 0)

  constructor(r: number, g: number, b: number, a = 1) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  public static black_color(a = 1): Color {
    return new Color(0, 0, 0, a)
  }

  public static red_color(r: number, a = 1): Color {
    return new Color(r, 0, 0, a)
  }

  public static green_color(g: number, a = 1): Color {
    return new Color(0, g, 0, a)
  }

  public static blue_color(b: number, a = 1): Color {
    return new Color(0, 0, b, a)
  }

  public toString(): string {
    return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')'
  }

  public getAlphaColor(a: number): Color {
    return new Color(this.r, this.g, this.b, a)
  }

  public deepCopy(): Color {
    return new Color(this.r, this.g, this.b, this.a)
  }
}
