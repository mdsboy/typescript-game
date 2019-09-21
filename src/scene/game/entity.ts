import Vec2 from "lib/vec2";

export default interface Entity {
  draw(): void
  update(): void
  
  move(v: Vec2): void
}
