import { Component, OnInit } from "@angular/core";
import { AlienService } from "../shared/alien.service";

@Component({
	selector: "aliens-reference-app",
	styles: [`
	md-sidenav-container { height: 100%; }
		#container { display: flex; flex: auto; flex-wrap: wrap; align-content: stretch; padding:8px }
		md-card-actions { text-align: right }
		.mat-h2 { margin: 16px 8px 8px;}
	`],
	template: `
<md-sidenav-container>
	<md-sidenav #leftnav>
		<cosmic-drawer [page]="'reference'"></cosmic-drawer>
	</md-sidenav>
	<div id="content">
		<md-toolbar class="mat-primary">
			<button md-button (click)="leftnav.toggle()">
				<md-icon>menu</md-icon>
			</button>
			<h1>Alien Reference</h1>
		</md-toolbar>
		<div id="container">
			<game-options (onSelected)="onSelectGame($event)"></game-options>
			<level-options (onSelected)="onSelectLevel($event)"></level-options>
			<md-card>
				<md-card-title>Sort by</md-card-title>
				<ol>
					<li>Game</li>
					<li>Level</li>
					<li>Name</li>
				</ol>
				<md-card-title>Group by</md-card-title>
				<ol>
					<li>Game</li>
					<li>Level</li>
				</ol>
			</md-card>
		</div>
		<div *ngFor="let gameGroup of alienGroups">
			<div *ngFor="let levelGroup of gameGroup.items">
				<h2 class="mat-h2">Cosmic {{gameGroup.value}} - {{levelGroup.value| levelName}} {{levelGroup.value | levelStars}}</h2>
				<alien-grid [aliens]="levelGroup.items"></alien-grid>
			</div>
		</div>
	</div>
</md-sidenav-container>
`,
})
export class AppComponent implements OnInit {
	public alienGroups: Reference.GroupedItems[];
	public selectedGames: Games[] = [];
	public selectedLevels: boolean[] = [];
	public orderBy: Alien.Properties = ["name"];
	public groupBy: Alien.Properties = ["game", "level"];

	constructor(private Aliens: AlienService) { }

	public ngOnInit(): void {
		this.Aliens.init.then(() => { this.refresh(); });
	}
	public onSelectGame($event: Games[]) {
		this.selectedGames = $event;
		this.refresh();
	}
	public onSelectLevel($event: boolean[]) {
		this.selectedLevels = $event;
		this.refresh();
	}

	private refresh() {
		if(!this.Aliens) { return; }
		const names = this.Aliens.getMatchingNames(this.selectedLevels, this.selectedGames);
		this.alienGroups = groupBy(names.map(this.Aliens.get), this.groupBy);
	}
}

/** Group objects by given array of fields */
const groupBy = (function() {

	function groupItems(list: Alien[], fields: Alien.Properties, level: number): Reference.GroupedItems[] {
		if(fields.length < 1) { return [{ value: "", items: list }]; }

		// group objects by property
		const grouped: Record<string, Alien[]> = {};
		const field = fields[level];
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

	/** Group objects by given array of fields, starting at first level */
	return (list: Alien[], fields: Alien.Properties) => groupItems(list, fields, 0);
})();
