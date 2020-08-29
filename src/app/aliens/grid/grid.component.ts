import { Component, Input } from '@angular/core';
import { Alien } from '../../types';

@Component({
  selector: 'alien-grid',
  templateUrl: 'grid.component.html',
})
export class AlienGridComponent {
  /** Whether a specific alien is opened to show description and extra details */
  public opened: Record<string, boolean> = {};
  /** List of aliens to display */
  @Input() public aliens: Alien[];
}
