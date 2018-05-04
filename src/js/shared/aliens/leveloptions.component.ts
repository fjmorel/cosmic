import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "level-options",
	styles: ["mat-list-item { height: 32px !important; }"],
	templateUrl: "./leveloptions.html"
})
export class LevelOptionsComponent {
	@Output() public onSelected = new EventEmitter<boolean[]>();
	@Input() public levels: boolean[];
	public select() { this.onSelected.emit(this.levels.slice(0)); }
}