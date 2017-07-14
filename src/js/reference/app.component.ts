import { Component } from "@angular/core";
import { AlienService } from "../shared";
import { LocalStorageService } from "angular-2-local-storage";

@Component({
	selector: "aliens-reference-app",
	styles: [
		"#container { display: flex; flex: auto; flex-wrap: wrap; align-content: stretch; }",
		".mat-h2 { margin: 16px 8px 8px;}"
	],
	templateUrl: "./app.html"
})
export class AlienReferencePage implements Partial<Reference.Settings> {
	public groups: Reference.GroupedItems[];
	public games: GameSelection;
	public levels: boolean[];

	public onSelectGame: (newGames: GameSelection) => void;
	public onSelectLevel: (newLevels: boolean[]) => void;

	constructor(Aliens: AlienService, Storage: LocalStorageService) {
		const ctrl = this;

		// Set defaults
		ctrl.levels = Storage.get("levels") || [true, true, true];
		ctrl.games = Storage.get("games") || { Encounter: true };
		const groupBy: Alien.Properties = ["game", "level"];
		const orderBy: Alien.Properties = ["name"];

		// Handle option changes
		ctrl.onSelectGame = (newGames) => {
			Storage.set("games", newGames);
			ctrl.games = newGames;
			refresh();
		};
		ctrl.onSelectLevel = (newLevels) => {
			Storage.set("levels", newLevels);
			ctrl.levels = newLevels;
			refresh();
		};

		Aliens.init.subscribe(refresh);

		function refresh() {
			ctrl.groups = groupObjects(Aliens.getMatching(ctrl.levels, ctrl.games), groupBy, orderBy);
		}
	}
}

/** Group objects by given array of fields */
const groupObjects = (function() {

	function groupItems(list: Alien[], gFields: Alien.Properties, sFields: Alien.Properties, level: number): Reference.GroupedItems[] {
		if(gFields.length < 1) { return [{ value: "", items: list }]; }

		// group objects by property
		const grouped: Record<string, Alien[]> = {};
		const field = gFields[level];
		list.forEach(function(item) {
			const group = item[field]!;
			grouped[group] = grouped[group] || [];
			grouped[group].push(item);
		});

		// generate array with named groups
		// todo sort using orderBy
		let result: Reference.GroupedItems[] = Object.keys(grouped).sort().map(group => ({ value: group, items: grouped[group] }));

		// if more fields to group by, go deeper
		if(gFields[level + 1]) {
			result = result.map(group => ({ value: group.value, items: groupItems(group.items as Alien[], gFields, sFields, level + 1) }));
		}

		return result;
	}

	/** Group objects by given array of fields, starting at first level */
	return (list: Alien[], gFields: Alien.Properties, sFields: Alien.Properties) => groupItems(list, gFields, sFields, 0);
})();
