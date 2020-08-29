import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameSelection, Game } from '../../types';

@Component({
  selector: 'cosmic-game-options',
  templateUrl: './games.component.html',
})
export class GameOptionsComponent {
  @Output() public change = new EventEmitter<GameSelection>();
  @Input() public games: GameSelection = {};
  public names: Game[] = [
    Game.Encounter, Game.Alliance,
    Game.Conflict, Game.Dominion,
    Game.Eons, Game.Incursion,
    Game.Storm,
  ];

  public select() { this.change.emit(this.games); }

}
