import {
  Actor,
  Body,
  Collider,
  CollisionType,
  Color,
  Engine,
  PreCollisionEvent,
  Random,
  Shape,
  Timer,
  Vector,
} from "excalibur";
import { TwoPI } from "excalibur/dist/Util";

export class Ball extends Actor {
  public killTarget: Actor[];

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

    this.killTarget = [];
  }

  onInitialize = (engine: Engine) => {
    this.on("exitviewport", (evt) => {
      // alert("You lose!");
    });

    this.on("preCollision", (event: PreCollisionEvent) => {
      const intersection = event.intersection.normalize();

      if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
        this.vel.x *= -1;
      } else {
        this.vel.y *= -1;
      }

      if (this.killTarget.indexOf(event.other) > -1) {
        event.other.kill();
      }
    });

    const timer = new Timer({
      fcn: () => {
        const rand = new Random();
        const r = rand.floating(-TwoPI, TwoPI);
        const x = Math.cos(r) * 200;
        const y = Math.sin(r) * 200;
        this.vel.x = x;
        this.vel.y = y;
      },
      interval: 1000,
      repeats: false,
    });
    engine.add(timer);
  };

  onPostUpdate = (engine: Engine) => {
    const radius = this.body.collider.localBounds.width / 2;
    if (this.pos.x < radius) {
      this.vel.x *= -1;
    }
    if (this.pos.x + radius > engine.drawWidth) {
      this.vel.x *= -1;
    }
    if (this.pos.y < radius / 2) {
      this.vel.y *= -1;
    }
  };

  addKillTarget = (target: Actor) => {
    this.killTarget.push(target);
  };
}
