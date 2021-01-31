import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cosmic-drawer',
  templateUrl: './drawer.component.html',
})
export class DrawerComponent {
  public page: string;
  public constructor(private route: ActivatedRoute) {
    this.route.url.subscribe(url => {
      this.page = url[0].path;
    });
  }
}
