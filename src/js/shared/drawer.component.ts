import { Component, Input } from "@angular/core";

@Component({
	selector: "cosmic-drawer",
	templateUrl: "./drawer.html"
})
export class CosmicDrawerComponent {
	@Input() public page: string;
}