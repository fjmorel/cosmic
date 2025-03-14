const names = ["Green", "Yellow", "Red"] as const;
const stars = ["★", "★★", "★★★"] as const;
export const colors = ["#189247", "#c39c07", "#c31b09"] as [
  string,
  string,
  string,
];

/** Turns 0/1/2 into Green/Yellow/Red */
export function getLevelColor(level: number) {
  return names[level];
}

/** Turns 0/1/2 into 1/2/3 stars */
export function getLevelStars(level: number) {
  return stars[level];
}
