/// <reference path="../../typings/project.d.ts" />
export function GroupBy() {

	function groupItems(list: Object[], fields: string[], level: number): GroupedItems[] {
		if (fields.length < 1) return [{ value: '', items: list }];

		//Group objects by property
		let grouped: Map<Object[]> = {};
		let field = fields[level];
		list.forEach(function (item) {
			let group: string = (<any>item)[field];
			grouped[group] = grouped[group] || [];
			grouped[group].push(item);
		});

		//Generate array with named groups
		let result = Object.keys(grouped).sort().map((group): GroupedItems => ({ value: group, items: grouped[group] }));

		//If more fields to group by, go deeper
		if (fields[level + 1]) {
			result = result.map(group => ({ value: group.value, items: groupItems(group.items, fields, level + 1) }));
		}

		return result;
	}
	//Begin grouping from first level
	return (list: Object[], fields: string[]) => groupItems(list, fields, 0);
}

//Turn game initial into game name
export function InitialToGameName(): GameNameFilter {
	let games: Map<String> = {
		E: "Encounter",
		A: "Alliance",
		C: "Conflict",
		D: "Dominion",
		I: "Incursion",
		S: "Storm"
	};
	return initial => ('Cosmic ' + games[initial]);
}

export function LevelToClass(): LevelFilter {
	//Turn alien level into Bootstrap class name for colors
	let classes = ["success", "warning", "danger"];
	return lvl => classes[lvl];
};

export function LevelToStars(): LevelFilter {
	//Turn alien level into a string of stars to show level
	let stars = ['★', '★★', '★★★'];
	return lvl => stars[lvl];
}

export function LevelToName(): LevelFilter {
	//Turn alien level into a string of stars to show level
	let names = ['Green', 'Yellow', 'Red'];
	return lvl => names[lvl];
}