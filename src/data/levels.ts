const names = ["Green", "Yellow", "Red"];
const stars = ["★", "★★", "★★★"];

/** Turns 0/1/2 into Green/Yellow/Red */
export function getLevelColor(level: number) {
  return names[level];
}

/** Turns 0/1/2 into 1/2/3 stars */
export function getLevelStars(level: number) {
  return stars[level];
}
