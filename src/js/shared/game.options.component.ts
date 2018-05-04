import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "game-options",
	styles: [".mat-list-item { height: 32px !important; }"],
	templateUrl: "./game.options.html"
})
export class GameOptionsComponent {
	@Output() public onSelected = new EventEmitter<GameSelection>();
	@Input() public games: GameSelection = {};
	public names: Game[] = ["Encounter", "Alliance", "Conflict", "Dominion", "Eons", "Incursion", "Storm"];

	public select() { this.onSelected.emit(this.games); }

}