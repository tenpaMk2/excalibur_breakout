import {
  Actor,
  Body,
  Collider,
  CollisionType,
  EmitterType,
  Engine,
  ParticleEmitter,
  Shape,
  Sprite,
  Vector,
} from "excalibur";
import { Resources } from "./resource";

export class Block extends Actor {
  constructor(x: number, y: number, width: number, height: number) {
    super({
      pos: new Vector(x, y),
      anchor: Vector.Zero,
      body: new Body({
        collider: new Collider({
          type: CollisionType.Passive,
          shape: Shape.Box(width, height, Vector.Zero),
        }),
      }),
    });

    const frontSprite = new Sprite(
      Resources.front,
      x - -250,
      y - -150,
      width,
      height
    );
    this.addDrawing("front", frontSprite);
    this.setDrawing("front");
  }

  onInitialize = (engine: Engine) => {
    const emitter = new ParticleEmitter({
      emitterType: EmitterType.Circle,
      radius: 5,
      minVel: 40,
      maxVel: 120,
      minAngle: 0,
      maxAngle: Math.PI * 2,
      emitRate: 10, // 300 particles/second
      opacity: 0.3,
      fadeFlag: true, // fade particles overtime
      particleLife: 500, // in milliseconds = 1 sec
      maxSize: 10, // in pixels
      minSize: 1,
      isEmitting: true, // should the emitter be emitting
    });
    this.add(emitter);
  };
}
