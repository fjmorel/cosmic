import { Component, OnInit } from "@angular/core";
import { AlienGeneratorService } from "./generator.service";

@Component({
	selector: "aliens-generator-app",
	styles: [`
	md-sidenav-container { height: 100%; }
		#container { display: flex; flex: auto; flex-wrap: wrap; align-content: stretch; padding:8px }
		md-radio-button { display: block; margin: 16px 0; }
		#gen-status { margin: 16px; }
		#gen-actions .space-right { margin-right: 16px; }
	`],
	template: `
<md-sidenav-container>
	<md-sidenav #leftnav>
		<cosmic-drawer [page]="'generator'"></cosmic-drawer>
	</md-sidenav>
	<div id="content">
		<md-toolbar class="mat-primary">
			<button md-button (click)="leftnav.toggle()">
				<md-icon>menu</md-icon>
			</button>
			<h1>Game Generator</h1>
		</md-toolbar>
		<div id="container">
			<game-options (onSelected)="onSelectGame($event)"></game-options>
			<level-options (onSelected)="onSelectLevel($event)"></level-options>
			<md-card>
				<md-card-title>Game Setup</md-card-title>
				<md-radio-group [(ngModel)]="settings.setupLevel" (change)="change()">
					<md-radio-button value="none" class="mat-primary">Remove none</md-radio-button>
					<md-radio-button value="color" class="mat-primary">Remove those requiring extra color</md-radio-button>
					<md-radio-button value="all" class="mat-primary">Remove all</md-radio-button>
				</md-radio-group>
			</md-card>
			<md-card>
				<md-card-title>Exclude by name</md-card-title>
				<md-select multiple [(ngModel)]="settings.namesExcluded" (change)="change()" placeholder="Select names">
					<md-option *ngFor="let name of namesAll" [value]="name">{{name}}</md-option>
				</md-select>
			</md-card>
			<md-card>
				<md-card-title>How to choose</md-card-title>
				<md-input-container>
					<input mdInput type="number" [(ngModel)]="settings.numToChoose" placeholder="Choices per player" step="1" min="1" (change)="restrictNumToChoose()">
				</md-input-container>
				<div><md-checkbox class="md-primary" [(ngModel)]="settings.preventConflicts">Prevent conflicts (like Oracle vs. Magician)</md-checkbox></div>
			</md-card>
		</div>
		<md-toolbar id="gen-actions">
			<span class="space-right alien-0-theme"><button md-raised-button class="mat-accent" (click)="draw()" [disabled]="disabled.draw">Draw</button></span>
			<span class=""><button md-raised-button class="mat-primary" (click)="hide()" [disabled]="disabled.hide"><md-icon>visibility_off</md-icon> Hide</button></span>
			<span class="space-right"><button md-raised-button class="mat-primary" (click)="show()" [disabled]="disabled.show"><md-icon>visibility</md-icon> Show</button></span>
			<span class="space-right alien-1-theme"><button md-raised-button class="mat-accent" (click)="redo();" [disabled]="disabled.redo"><md-icon>history</md-icon> Redo</button></span>
			<span class="space-rightalien-2-theme"><button md-raised-button class="mat-accent" (click)="reset()" [disabled]="disabled.reset"><md-icon>replay</md-icon> Reset</button></span>
		</md-toolbar>
		<p class="mat-body-1" id="gen-status">{{status}} {{state}}</p>
		<alien-grid [aliens]="aliensToShow"></alien-grid>
	</div>
</md-sidenav-container>
`,
})
export class AlienGeneratorPage implements OnInit {
	public settings = {
		namesExcluded: [] as string[],
		games: ["Encounter"] as Games[],
		complexities: [true, true, true],
		setupLevel: "none",
		numToChoose: 2,
		preventConflicts: true
	};
	public disabled: Record<Generator.Actions, boolean> = { draw: true, hide: true, show: true, redo: true, reset: true };
	public namesAll = ["test", "test2"];
	public status = "status";
	public state = "state";
	public aliensToShow: Alien[] = [];
	private NOT_RESET = 0;

	constructor(private Generator: AlienGeneratorService) { }
	public ngOnInit(): void {
		this.Generator.init.then(names => {
			this.namesAll = names;
			this.change();
		});
	}

	// Actions
	public draw = () => this.setState(this.Generator.draw(this.settings.numToChoose, this.settings.preventConflicts));
	public hide = () => this.setState(this.Generator.hide());
	public show = () => this.setState(this.Generator.show());
	public redo = () => this.setState(this.Generator.redo(this.settings.numToChoose, this.settings.preventConflicts));
	public reset = () => {
		if(confirm("Reset list of aliens?")) { this.change(); } else { this.NOT_RESET++; }

		if(this.NOT_RESET > 2) {
			this.setState(this.Generator.getAllGiven());
			this.NOT_RESET = 0;
		}
	}

	// Preference changes
	public change() {
		this.setState(this.Generator.reset(this.settings.complexities, this.settings.games, this.settings.namesExcluded, this.settings.setupLevel));
		this.restrictNumToChoose();
	}

	// keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick
	public restrictNumToChoose = () => {
		this.settings.numToChoose = this.Generator.getChooseLimit(this.settings.numToChoose);
	}

	public onSelectGame($event: Games[]) {
		this.settings.games = $event;
		this.change();
	}
	public onSelectLevel($event: boolean[]) {
		this.settings.complexities = $event;
		this.change();
	}

	private setState(newState: Generator.Status) {
		if(!newState) { return; }
		this.state = newState.message;
		this.aliensToShow = newState.aliens;
		if(newState.limit) {
			this.settings.numToChoose = newState.limit;
		}
		this.status = this.Generator.getStatus();
		this.disabled = this.Generator.getDisabledActions(this.settings.numToChoose, this.aliensToShow.length);
	}
}
