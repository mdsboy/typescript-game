import MoveEntity from "./moveEntity"
import RotateEntity from "./rotateEntity"
import Vec2 from "lib/vec2"
import Circle from "lib/circle"
import Entity from "./entity"

export default class Entities {
  private entities: Array<Entity> = []

  constructor() { }

  public update() {
    for (let entity of this.entities) {
      entity.update()
    }
  }

  public draw() {
    for (let entity of this.entities) {
      entity.draw()
    }
  }


  public addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  public getClicked(center: Vec2): Entity | null {
    for (let entity of this.entities) {
      if (entity.isClicked(center)) {
        return entity
      }
    }
    return null
  }

  public isCollide(circle: Circle): boolean {
    for (let entity of this.entities) {
      if (entity.isCollide(circle)) {
        return true;
      }
    }
    return false;
  }
}