/**
 * Turn alien level into Bootstrap class name for colors
 */
export function LevelToClass(): LevelFilter {
	const classes = ["success", "warning", "danger"];
	return lvl => classes[lvl];
}

/**
 * Turn alien level into a string of stars to show level
 */
export function LevelToStars(): LevelFilter {
	const stars = ["★", "★★", "★★★"];
	return lvl => stars[lvl];
}

/**
 * Turn alien level into a color name
 */
export function LevelToName(): LevelFilter {
	const names = ["Green", "Yellow", "Red"];
	return lvl => names[lvl];
}