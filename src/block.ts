import {
  Actor,
  Body,
  Collider,
  CollisionGroupManager,
  CollisionType,
  Color,
  Shape,
  Vector,
} from "excalibur";

export class Block extends Actor {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: Color = Color.Blue
  ) {
    super({
      pos: new Vector(x, y),
      body: new Body({
        collider: new Collider({
          type: CollisionType.Passive,
          shape: Shape.Box(width, height),
        }),
      }),
    });
    this.color = color;
  }
}
