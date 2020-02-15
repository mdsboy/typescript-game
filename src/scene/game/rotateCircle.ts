import Circle from 'lib/circle'
import dm from 'lib/drawManager'
import Color from 'lib/color'
import Vec2 from 'lib/vec2'

export default class RotateCircle {
  private circle: Circle
  private start_circle: Circle
  private dir: boolean
  private start_angle: number

  constructor(
    circle: Circle,
    start_circle: Circle,
    start_angle: number,
    dir: boolean
  ) {
    this.circle = circle
    this.start_circle = start_circle
    this.dir = dir
    this.start_angle = start_angle
  }

  public setPos(pos: Vec2): void {
    this.circle.pos = pos

    this.start_circle.pos = this.circle.pos.add(
      Vec2.cosSin(this.start_angle).scalarMul(
        this.circle.radius
      )
    )
  }

  public getStartPos(): Vec2 {
    return this.start_circle.pos
  }

  public getPos(): Vec2 {
    return this.circle.pos
  }

  public draw(end_angle: number): void {
    dm.strokeCircle(this.circle, Color.black_color(0.3), 3)
    dm.strokeCircle(
      new Circle(
        this.circle.pos,
        this.circle.radius - this.start_circle.radius
      ),
      Color.black_color(0.2),
      3
    )
    dm.strokeCircle(
      new Circle(
        this.circle.pos,
        this.circle.radius + this.start_circle.radius
      ),
      Color.black_color(0.2),
      3
    )
    if (this.dir) {
      dm.strokeArc(
        new Circle(
          this.circle.pos,
          this.circle.radius - this.start_circle.radius
        ),
        this.start_angle,
        end_angle,
        Color.black_color(0.8),
        3
      )
      dm.strokeArc(
        new Circle(
          this.circle.pos,
          this.circle.radius + this.start_circle.radius
        ),
        this.start_angle,
        end_angle,
        Color.black_color(0.8),
        3
      )
    } else {
      dm.strokeArc(
        new Circle(
          this.circle.pos,
          this.circle.radius - this.start_circle.radius
        ),
        end_angle,
        this.start_angle,
        Color.black_color(0.8),
        3
      )
      dm.strokeArc(
        new Circle(
          this.circle.pos,
          this.circle.radius + this.start_circle.radius
        ),
        end_angle,
        this.start_angle,
        Color.black_color(0.8),
        3
      )
    }

    dm.line(this.circle.pos, this.circle.pos, Color.black_color(0.5), 2)
    dm.line(this.start_circle.pos, this.circle.pos, Color.black_color(0.5), 2)

    dm.fillCircle(this.start_circle, Color.black_color(0.3))
    dm.strokeCircle(this.start_circle, Color.black, 3)
  }
}
