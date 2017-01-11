/**
 * Group objects by given array of fields
 */
export let groupBy = (function () {

	function groupItems(list: Object[], fields: string[], level: number): GroupedItems[] {
		if (fields.length < 1) return [{ value: "", items: list }];

		// group objects by property
		let grouped: IMap<Object[]> = {};
		let field = fields[level];
		list.forEach(function (item) {
			let group: string = (<any>item)[field];
			grouped[group] = grouped[group] || [];
			grouped[group].push(item);
		});

		// generate array with named groups
		let result = Object.keys(grouped).sort().map((group): GroupedItems => ({ value: group, items: grouped[group] }));

		// if more fields to group by, go deeper
		if (fields[level + 1]) {
			result = result.map(group => ({ value: group.value, items: groupItems(group.items, fields, level + 1) }));
		}

		return result;
	}

	/**
	 * Group objects by given array of fields, starting at first level
	 */
	return (list: Object[], fields: string[]) => groupItems(list, fields, 0);
})();

/**
 * Turn alien level into Bootstrap class name for colors
 */
export function LevelToClass(): LevelFilter {
	let classes = ["success", "warning", "danger"];
	return lvl => classes[lvl];
};

/**
 * Turn alien level into a string of stars to show level
 */
export function LevelToStars(): LevelFilter {
	let stars = ["★", "★★", "★★★"];
	return lvl => stars[lvl];
}

/**
 * Turn alien level into a color name
 */
export function LevelToName(): LevelFilter {
	let names = ["Green", "Yellow", "Red"];
	return lvl => names[lvl];
}