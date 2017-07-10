import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
	selector: "alien-grid",
	styles: [`
		alien-grid { display: flex; flex-wrap: wrap; align-items: stretch; }
		alien-grid > * { flex-basis: 25% }
		@media (max-width: 992px) {
			alien-grid > * { flex-basis: 33% }
		}
		@media (max-width: 768px) {
			alien-grid > * { flex-basis: 50% }
		}
		@media (max-width: 576px) {
			alien-grid > * { flex-basis: 100% }
		}
	`],
	template: `<alien-card [alien]="alien" *ngFor="let alien of aliens"></alien-card>`,
	encapsulation: ViewEncapsulation.None
})
export class AlienGridComponent {
	@Input() public aliens: Alien[];
}