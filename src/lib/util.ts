export function between(x: number, y: number, z: number): boolean {
  return x <= y && y <= z
}

export function radianToDegree(radian: number): number {
  return (radian * 180) / Math.PI
}

export function degreeToRadian(degree: number): number {
  return (degree * Math.PI) / 180
}
