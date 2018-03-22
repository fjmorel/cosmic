import { Component, OnInit } from "@angular/core";
import { AlienService } from "../shared";
import { LocalStorageService } from "angular-2-local-storage";

// todo: options for grouping/ordering

@Component({
	selector: "aliens-reference-app",
	styles: [
		"#container { display: flex; flex: auto; flex-wrap: wrap; align-content: stretch; }",
		".mat-h2 { margin: 16px 8px 8px;}"
	],
	templateUrl: "./app.html"
})
export class AlienReferencePage implements OnInit, Reference.Settings {
	public groups: GroupedItems<Alien>[];
	public games: GameSelection;
	public levels: boolean[];

	constructor(private Aliens: AlienService, private Storage: LocalStorageService) { }

	public ngOnInit() {
		// Set defaults
		this.levels = this.Storage.get("levels") || [true, true, true];
		this.games = this.Storage.get("games") || { Encounter: true };
		this.Aliens.init.subscribe(() => { this.refresh(); });
	}

	/** Handle game option change */
	public onSelectGame(newGames: GameSelection) {
		this.Storage.set("games", newGames);
		this.games = newGames;
		this.refresh();
	}

	/** Handle level option change */
	public onSelectLevel(newLevels: boolean[]) {
		this.Storage.set("levels", newLevels);
		this.levels = newLevels;
		this.refresh();
	}

	/** Refresh shown aliens based on settings */
	private refresh() {
		this.groups = groupItems(this.Aliens.getMatching(this.levels, this.games), ["game", "level"], ["name"]);
	}
}

/** Group objects by given array of fields */
function groupItems(list: Alien[], gFields: Alien.Properties, sFields: Alien.Properties, level: number = 0): GroupedItems<Alien>[] {
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
	let result: GroupedItems<Alien>[] = Object.keys(grouped).sort().map(group => ({ value: group, items: grouped[group] }));

	// if more fields to group by, go deeper
	if(gFields[level + 1]) {
		result = result.map(group => ({ value: group.value, items: groupItems(group.items as Alien[], gFields, sFields, level + 1) }));
	}

	return result;
}