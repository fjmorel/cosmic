import { Component, Output, EventEmitter, OnInit } from "@angular/core";

// todo: color checkboxes based on level
@Component({
	selector: "level-options",
	styles: [`
	.mat-list-item { height: 32px; }
	`],
	template: `
<md-card>
<md-card-title>Levels to include</md-card-title>
<md-card-content>
	<md-list>
		<md-list-item [ngClass]="'alien-'+level+'-theme'" *ngFor="let level of [0,1,2]">
			<md-checkbox class="mat-primary" (change)="select()" [(ngModel)]="levels[level]">{{level | levelName}}</md-checkbox>
		</md-list-item>
	</md-list>
</md-card-content>
</md-card>
`,
})
export class LevelOptionsComponent implements OnInit {
	@Output() public onSelected = new EventEmitter<boolean[]>();
	// todp: load settings from storage
	public levels = [true, true, true];
	public ngOnInit(): void { this.select(); }
	private select() { this.onSelected.emit(this.levels.slice(0)); }
}