import { Component, Input } from '@angular/core';

@Component({
  selector: 'cosmic-drawer',
  templateUrl: './drawer.component.html',
})
export class DrawerComponent {
  @Input() public page: string;
}
