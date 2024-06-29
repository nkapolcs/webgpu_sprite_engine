import { vec2 } from "gl-matrix";
import { SpriteRenderer } from "../sprite-renderer";
import { Content } from "../content";
import { Color } from "../color";

export class HighScore {
  private readonly position = vec2.fromValues(10, 10);
  public currentScore = 0;

  public draw(spriteRenderer: SpriteRenderer) {
    spriteRenderer.drawString(Content.spriteFont, `Score: ${this.currentScore}`, this.position, new Color(1, 1, 1), 0.5);
  }
}
