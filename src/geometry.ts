export class QuadGeometry {
  // public positions: number[];
  // public colors: number[];
  // public textCoords: number[];

  public vertices: number[];
  public indices: number[];

  constructor() {
    const x = 100;
    const y = 100;
    const w = 99;
    const h = 75;

    // prettier-ignore
    this.vertices = [
      // x, y         u, v        r, g, b
      x, y,           0.0, 0.0,   1.0, 0.0, 0.0, // top left
      x + w, y,       1.0, 0.0,   0.0, 1.0, 0.0, // top right
      x + w, y + h,   1.0, 1.0,   0.0, 0.0, 1.0, // bottom right
      x, y + h,       0.0, 1.0,   0.0, 1.0, 0.0, // bottom left
    ];

    // prettier-ignore
    this.indices = [
      0, 1, 2,
      2, 3, 0
    ]
  }
}
