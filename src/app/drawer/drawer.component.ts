import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cosmic-drawer',
  templateUrl: './drawer.component.html',
})
export class DrawerComponent implements OnInit {
  public page: string;
  constructor(private route: ActivatedRoute) {
    //
  }
  ngOnInit() {
    this.route.url.subscribe(url => {
      this.page = url[0].path;
    });
  }
}
