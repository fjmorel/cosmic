import { Component, Input } from '@angular/core';
import { Alien } from '../../types';

@Component({
  selector: 'alien-grid',
  templateUrl: 'grid.component.html',
})
export class AlienGridComponent {
  /** List of aliens to display */
  @Input() public aliens: Alien[];
  /** Whether a specific alien is opened to show description and extra details */
  public opened: Record<string, boolean> = {};
}
