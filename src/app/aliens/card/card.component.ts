import { Component, Input } from '@angular/core';

@Component({
  selector: 'alien-card',
  styleUrls: ['card.component.scss'],
  templateUrl: 'card.component.html',
})
export class AlienCardComponent {
  @Input() public alien: Alien;
  public opened = false;
}
