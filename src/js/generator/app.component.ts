import { Component, OnInit } from "@angular/core";
import { LocalStorageService } from "angular-2-local-storage";
import { AlienService } from "../shared";
import { AlienGeneratorService } from "./generator.service";

@Component({
	selector: "aliens-generator-app",
	styles: [`
		#container { display: flex; flex: auto; flex-wrap: wrap; align-content: stretch; }
		mat-radio-button { display: block; margin: 16px 0; }
		#gen-actions { padding: 0 8px; }
		#gen-status { margin: 16px; }
		.space-right { margin-right: 16px; }
	`],
	templateUrl: "./app.html"
})
export class AlienGeneratorPage implements OnInit {
	public settings: Generator.Settings = { levels: [], games: {}, namesExcluded: [], setupLevel: "", numToChoose: 2, preventConflicts: true };
	public disabled: Record<Generator.Actions, boolean> = { draw: true, hide: true, show: true, redo: true, reset: true };
	public namesAll: string[];
	public status: string;
	public state: string;
	public aliensToShow: Alien[] = [];
	private NOT_RESET = 0;

	constructor(private Aliens: AlienService, private Generator: AlienGeneratorService, private Storage: LocalStorageService) { }
	public ngOnInit(): void {
		this.Aliens.init.subscribe(names => {
			this.namesAll = names;
			this.settings = this.Storage.get("settings");
			if(!this.settings) { this.settings = {} as Generator.Settings; }
			if(!this.settings.levels) { this.settings.levels = [true, true, true]; }
			if(!this.settings.games) { this.settings.games = { Encounter: true }; }
			if(!this.settings.namesExcluded) { this.settings.namesExcluded = []; }
			if(!this.settings.setupLevel) { this.settings.setupLevel = ""; }
			if(!this.settings.numToChoose) { this.settings.numToChoose = 2; }
			if(this.settings.preventConflicts === undefined) { this.settings.preventConflicts = true; }
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
		if(this.settings) {
			const names = this.Aliens.getMatchingNames(this.settings.levels, this.settings.games, this.settings.namesExcluded, this.settings.setupLevel);
			this.setState(this.Generator.reset(names));
			this.restrictNumToChoose();
		}
	}

	// keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick
	public restrictNumToChoose = () => {
		this.settings.numToChoose = this.Generator.getChooseLimit(this.settings.numToChoose);
		this.saveSettings();
	}

	public onSelectGame($event: GameSelection) {
		this.settings.games = $event;
		this.change();
	}
	public onSelectLevel($event: boolean[]) {
		this.settings.levels = $event;
		this.change();
	}

	private saveSettings() {
		this.Storage.set("settings", this.settings);
	}

	private setState(newState: Generator.Status) {
		if(!newState) { return; }
		this.state = newState.message;
		this.aliensToShow = newState.aliens.map(e => this.Aliens.get(e));
		if(newState.limit) {
			this.settings.numToChoose = newState.limit;
		}
		this.status = this.Generator.getStatus();
		this.disabled = this.Generator.getDisabledActions(this.settings.numToChoose, this.aliensToShow.length);
	}
}
