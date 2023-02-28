import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameSelection, Game } from '../../types';

@Component({
  selector: 'cosmic-game-options',
  templateUrl: './games.component.html',
})
export class GameOptionsComponent {
  @Output() public change = new EventEmitter<GameSelection>();
  @Input() public games: GameSelection = {};
  readonly GameEnum = Game;
  public names: Game[] = [
    Game.Encounter, Game.Alliance,
    Game.Conflict, Game.Dominion,
    Game.Eons, Game.Incursion,
    Game.Storm, Game.Odyssey,
    Game.OdysseyAlternate,
  ];

  public select() {
    // Deselect the alternate timeline if Odyssey is not selected
    if(!this.games[Game.Odyssey]) {
      this.games[Game.OdysseyAlternate] = false;
    }
    this.change.emit(this.games);
  }

}
