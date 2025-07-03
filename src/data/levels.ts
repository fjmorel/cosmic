export type Level = 0 | 1 | 2;

export type LevelValues<T> = [T, T, T];

const names = ["Green", "Yellow", "Red"] as const;
const stars = ["★", "★★", "★★★"] as const;
const themes = ["success", "warning", "error"] as const;
const colors = ["#189247", "#c39c07", "#c31b09"] as const;

/** Turns 0/1/2 into Green/Yellow/Red */
export function getLevelColor(level: Level): string {
  return names[level];
}

/** Turns 0/1/2 into 1/2/3 stars */
export function getLevelStars(level: Level) {
  return stars[level];
}

/** Turns 0/1/2 into MUI theme color */
export function getLevelTheme(level: Level) {
  return themes[level];
}

export function getMainColor(level: Level) {
  return colors[level];
}
