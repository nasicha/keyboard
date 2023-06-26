
export function radius(x: number, y: number) {
  return Math.sqrt(x * x + y * y);
}

export function isWithinSmallerCircle(x: number, y: number, r: number) {
  return radius(x, y) <= r;
}