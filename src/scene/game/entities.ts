import MoveEntity from "./moveEntity"
import RotateEntity from "./rotateEntity"
import Vec2 from "lib/vec2"
import Circle from "lib/circle"

export default class Entities {
  private moveEntities: Array<MoveEntity> = []
  private rotateEntities: Array<RotateEntity> = []

  constructor() { }

  public update() {
    for (let entity of this.rotateEntities) {
      entity.update()
    }
    for (let moveEntity of this.moveEntities) {
      moveEntity.update()
    }
  }

  public draw() {
    for (let rotateEntity of this.rotateEntities) {
      rotateEntity.draw()
    }
    for (let moveEntity of this.moveEntities) {
      moveEntity.draw()
    }
  }

  public addRotateEntity(entity: RotateEntity) {
    this.rotateEntities.push(entity);
  }

  public addMoveEntity(entity: MoveEntity) {
    this.moveEntities.push(entity);
  }

  public getCenter(center: Vec2): RotateEntity | null {
    for (let entity of this.rotateEntities) {
      if (entity.getIsCenter(center)) {
        return entity
      }
    }
    return null
  }

  public isCollide(circle: Circle): boolean {
    for (let entity of this.rotateEntities) {
      if (entity.collide(circle)) {
        return true;
      }
    }
    for (let entity of this.moveEntities) {
      if (entity.collide(circle)) {
        return true;
      }
    }
    return false;
  }

  public getIsCenter(center: Vec2) {
    for (let rotateEntity of this.rotateEntities) {
      rotateEntity.getIsCenter(center)
    }
    for (let moveEntity of this.moveEntities) {
      moveEntity.getIsCenter(center)
    }
  }
}