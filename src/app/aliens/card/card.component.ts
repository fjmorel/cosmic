import { Component, Input } from '@angular/core';

@Component({
  selector: 'alien-card',
  styles: [
    'mat-card { padding: 0 }',
    'mat-card-title { font-weight: bold; margin-left: -8px; margin-right: -8px; }',
    'mat-card-subtitle { font-weight: normal; margin-left: -8px; margin-right: -8px; }',
    'mat-icon { width: 16px; height: 16px; font-size: 16px; }',
    'mat-card-header { justify-content: space-between; padding: 16px 16px 0 16px;  }',
    '.mat-card-header-text { margin: 0; }',
    '[mat-card-avatar] { order: 2; width: inherit; }',
    '[mat-raised-button] { min-width: 0; line-height: 24px; padding: 0 8px; }',
    'mat-card-footer { margin: 0; }',
    '.alien-bar { display:flex; justify-content: space-between; font-size: smaller; color: #fff; }',
    '.alien-bar > span { margin: 8px 16px; }',
    '.desc { font-family: \'EB Garamond\', serif; background: #ddd; padding: 8px 16px; }',
  ],
  templateUrl: 'card.component.html',
})
export class AlienCardComponent {
  @Input() public alien: Alien;
  public opened = false;
}
