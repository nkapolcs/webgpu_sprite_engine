import { SpriteRenderer } from "../sprite-renderer";
import { BulletManager } from "./bullet-manager";
import { Enemy } from "./enemy";
import { ExplosionManager } from "./explosion-manager";
import { HighScore } from "./high-score";
import { MeteorEnemy } from "./meteor-enemy";
import { Player } from "./player";

const SPAWN_INTERVAL = 1000;

export class EnemyManager {
  private timeToSpwan = 0;
  private pool: Enemy[] = [];

  constructor(
    private readonly player: Player,
    private readonly explosionManager: ExplosionManager,
    private readonly bulletManager: BulletManager,
    private gameWidth: number,
    private gameHeight: number,
    private readonly highScore: HighScore
  ) {}

  public spawnEnemy() {
    if (this.timeToSpwan > SPAWN_INTERVAL) {
      this.timeToSpwan = 0;
      let enemy = this.pool.find((e) => !e.active);

      if (!enemy) {
        enemy = new MeteorEnemy(this.gameWidth, this.gameHeight);
        this.pool.push(enemy);
      }

      enemy.active = true;
      enemy.drawRect.x = Math.random() * (this.gameWidth - enemy.drawRect.width);
      enemy.drawRect.y = -enemy.drawRect.height;
    }
  }

  public update(dt: number) {
    this.timeToSpwan += dt;
    this.spawnEnemy();

    for (const enemy of this.pool) {
      if (enemy.active) {
        enemy.update(dt);

        // enemy player collision
        if (enemy.collider.intersects(this.player.collider)) {
          enemy.active = false;
          this.explosionManager.create(enemy.drawRect);
          // TODO: player takes damage this.player.active = false;
        }

        // enemy bullet explosion
        if (this.bulletManager.intersectsEnemy(enemy)) {
          enemy.active = false;
          this.explosionManager.create(enemy.drawRect);
          this.highScore.currentScore += 10;
        }

        if (enemy.drawRect.y > this.gameHeight) {
          enemy.active = false;
        }
      }
    }
  }

  public draw(spriteRenderer: SpriteRenderer) {
    for (const enemy of this.pool) {
      if (enemy.active) {
        enemy.draw(spriteRenderer);
      }
    }
  }
}
