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
    const emitter = new ParticleEmitter();
    emitter.emitterType = EmitterType.Circle;
    emitter.radius = 5;
    emitter.minVel = 40;
    emitter.maxVel = 120;
    emitter.minAngle = 0;
    emitter.maxAngle = Math.PI * 2;
    emitter.emitRate = 10; // 300 particles/second
    emitter.opacity = 0.3;
    emitter.fadeFlag = true; // fade particles overtime
    emitter.particleLife = 500; // in milliseconds = 1 sec
    emitter.maxSize = 10; // in pixels
    emitter.minSize = 1;
    emitter.isEmitting = true; // should the emitter be emitting
    this.add(emitter);
  };
}
