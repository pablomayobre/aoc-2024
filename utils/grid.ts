export class Grid<Cell extends any> {
  private map: Map<string, Cell>;
  private maxW = 0;
  private maxH = 0;

  constructor() {
    this.map = new Map<string, Cell>();
  }

  get(x: number, y: number) {
    return this.map.get(`${x},${y}`);
  }

  set(x: number, y: number, cell: Cell) {
    this.map.set(`${x},${y}`, cell);
    this.maxW = Math.max(this.maxW, x);
    this.maxH = Math.max(this.maxH, y);
  }

  getColumn(x: number) {
    return Array.from({ length: this.maxH }, (_, y) => this.get(x, y));
  }

  getRow(y: number) {
    return Array.from({ length: this.maxW }, (_, x) => this.get(x, y));
  }

  getNeighbors(
    x: number,
    y: number,
    {
      includeDiagonals = false,
      includeVertical = true,
      includeHorizontal = true,
    }: {
      includeDiagonals?: boolean;
      includeVertical?: boolean;
      includeHorizontal?: boolean;
    } = {},
  ) {
    const neighbors = [];
    if (includeDiagonals) {
      neighbors.push(
        this.get(x - 1, y - 1),
        this.get(x + 1, y - 1),
        this.get(x - 1, y + 1),
        this.get(x + 1, y + 1),
      );
    }

    if (includeVertical) {
      neighbors.push(this.get(x, y - 1), this.get(x, y + 1));
    }

    if (includeHorizontal) {
      neighbors.push(this.get(x - 1, y), this.get(x + 1, y));
    }

    return neighbors;
  }

  getDiagonals(x: number, y: number) {
    return {
      topLeft: this.get(x - 1, y - 1),
      topRight: this.get(x + 1, y - 1),
      bottomLeft: this.get(x - 1, y + 1),
      bottomRight: this.get(x + 1, y + 1),
    };
  }
}
