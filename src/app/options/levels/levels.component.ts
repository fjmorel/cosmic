import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'alien-level-options',
  templateUrl: './levels.component.html',
})
export class LevelOptionsComponent {
  @Output() public change = new EventEmitter<boolean[]>();
  @Input() public levels: boolean[];
  public select() { this.change.emit(this.levels.slice(0)); }
}
