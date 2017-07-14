import { Component, Input } from "@angular/core";

@Component({
	selector: "alien-card",
	styles: [
		"md-card { padding: 0 }",
		"md-card-title { font-weight: bold; margin-left: -8px; margin-right: -8px; }",
		"md-card-subtitle { font-weight: normal; margin-left: -8px; margin-right: -8px; }",
		"md-icon { width: 16px; height: 16px; font-size: 16px; }",
		"md-card-header { justify-content: space-between; padding: 16px 16px 0 16px;  }",
		".mat-card-header-text { margin: 0; }",
		"[md-card-avatar] { order: 2; width: inherit; }",
		"[md-raised-button] { min-width: 0; line-height: 24px; padding: 0 8px; }",
		"md-card-footer { position: relative; }",
		".alien-bar { display:flex; justify-content: space-between; font-size: smaller; color: #fff; }",
		".alien-bar > span { margin: 8px 16px; }",
		".desc { font-family: 'EB Garamond', serif; background: #ddd; padding: 8px 16px; }"
	],
	templateUrl: "card.html"
})
export class AlienCardComponent {
	@Input() public alien: Alien;
	public opened = false;
}