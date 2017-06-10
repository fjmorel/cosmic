/**
 * Based on settings, show aliens sorted and grouped
 */
export class Controller {
	public complexities: boolean[];
	public games: IMap<boolean>;
	public orderPref: string[];
	public groupPref: string[];
	public alienGroups: Reference.GroupedItems[];
	public change: () => void;

	constructor($localStorage: Reference.Settings, Aliens: Alien.Service) {
		const ctrl = this;

		// set up default settings
		$localStorage.$default({
			complexities: [true, true, true],
			games: { E: true },
			orderPref: ["name"],
			groupPref: ["game", "level"]
		});

		// load settings
		ctrl.complexities = $localStorage.complexities;
		ctrl.games = $localStorage.games;
		ctrl.orderPref = $localStorage.orderPref;
		ctrl.groupPref = $localStorage.groupPref;
		ctrl.alienGroups = [];

		// show filtered, grouped list of aliens
		ctrl.change = function(): void {
			ctrl.alienGroups = groupBy(Aliens.getMatchingNames(ctrl.complexities, ctrl.games).map(Aliens.get), ctrl.groupPref);
		};

		// initialize reference page
		Aliens.init.then(ctrl.change);
	}
}

/**
 * Group objects by given array of fields
 */
const groupBy = (function() {

	function groupItems(list: Alien[], fields: string[], level: number): Reference.GroupedItems[] {
		if(fields.length < 1) { return [{ value: "", items: list }]; }

		// group objects by property
		const grouped: IMap<Alien[]> = {};
		const field = fields[level] as keyof Alien;
		list.forEach(function(item) {
			const group = item[field]!;
			grouped[group] = grouped[group] || [];
			grouped[group].push(item);
		});

		// generate array with named groups
		let result: Reference.GroupedItems[] = Object.keys(grouped).sort().map(group => ({ value: group, items: grouped[group] }));

		// if more fields to group by, go deeper
		if(fields[level + 1]) {
			result = result.map(group => ({ value: group.value, items: groupItems(group.items as Alien[], fields, level + 1) }));
		}

		return result;
	}

	/**
	 * Group objects by given array of fields, starting at first level
	 */
	return (list: Alien[], fields: string[]) => groupItems(list, fields, 0);
})();