import { Component, Input } from '@angular/core';

@Component({
  selector: 'alien-grid',
  styleUrls: ['grid.component.scss'],
  template: `<alien-card [alien]="alien" *ngFor="let alien of aliens"></alien-card>`,
})
export class AlienGridComponent {
  @Input() public aliens: Alien[];
}
