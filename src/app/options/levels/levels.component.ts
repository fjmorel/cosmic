import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'alien-level-options',
  styles: ['mat-list-item { height: 32px !important; }'],
  templateUrl: './levels.component.html',
})
export class LevelOptionsComponent {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onSelected = new EventEmitter<boolean[]>();
  @Input() public levels: boolean[];
  public select() { this.onSelected.emit(this.levels.slice(0)); }
}
