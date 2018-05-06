import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cosmic-game-options',
  styleUrls: ['games.component.scss'],
  templateUrl: './games.component.html',
})
export class GameOptionsComponent {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onSelected = new EventEmitter<GameSelection>();
  @Input() public games: GameSelection = {};
  public names: Game[] = ['Encounter', 'Alliance', 'Conflict', 'Dominion', 'Eons', 'Incursion', 'Storm'];

  public select() { this.onSelected.emit(this.games); }

}
