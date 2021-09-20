import {
  Actor,
  Body,
  Collider,
  CollisionType,
  Color,
  Shape,
  Vector,
} from "excalibur";

export class Ball extends Actor {
  constructor(pos: Vector, radius: number) {
    super({
      pos: pos,
      color: Color.Red,
      body: new Body({
        collider: new Collider({
          type: CollisionType.Active,
          shape: Shape.Circle(radius),
        }),
      }),
    });
  }
}
