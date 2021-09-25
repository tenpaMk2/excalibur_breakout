import {
  Actor,
  CollisionType,
  Color,
  Label,
  TextAlign,
  Vector,
} from "excalibur";

export class GameOverScreen extends Actor {
  constructor(width: number, height: number) {
    super({
      pos: Vector.Zero,
      color: Color.Black,
      anchor: Vector.Zero,
      opacity: 0.3,
      width: width,
      height: height,
    });
    this.body.collider.type = CollisionType.PreventCollision;

    const gameOverText = new Label({
      pos: new Vector(width / 2, height / 2),
      fontSize: 40,
      text: "GameOver!!",
      textAlign: TextAlign.Center,
      color: Color.White,
    });
    this.add(gameOverText);
  }
}
