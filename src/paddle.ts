import {
  Actor,
  Body,
  Collider,
  CollisionType,
  Color,
  Engine,
  PreCollisionEvent,
  Shape,
  Vector,
} from "excalibur";

export class Paddle extends Actor {
  public flickTargets: Actor[];

  constructor(pos: Vector, width: number, height: number) {
    super({
      pos: pos,
      color: Color.Green,
      body: new Body({
        collider: new Collider({
          type: CollisionType.Fixed,
          shape: Shape.Box(width, height),
        }),
      }),
    });

    this.flickTargets = [];
  }

  onInitialize = (engine: Engine) => {
    this.on("preCollision", (event: PreCollisionEvent) => {
      this.flickTargets.forEach((target) => {
        if (target === event.other) {
          target.vel.x *= 2;
          target.vel.y *= 2;
        }
      });
    });
  };

  setFlickTarget = (target: Actor) => {
    this.flickTargets.push(target);
  };
}
