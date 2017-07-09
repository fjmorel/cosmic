import { Component } from "@angular/core";

/** Bindings for card in component */
type ActionCard = Readonly<{
	/** Title of Card */
	title: string;
	/** Text description to put in card */
	text: string;
	/** Link to use as call to action at bottom of card */
	link: string;
	/** Call to action at bottom of card */
	linkText: string;
}>;

@Component({
	selector: "cosmic-app",
	styles: [`
		#container { display: flex; flex: auto; flex-wrap: wrap; align-content: stretch; padding:8px }
		.mat-card { max-width: 300px; }
		md-card-actions { text-align: right }
	`],
	template: `
<md-toolbar class="mat-primary">
	<h2>Cosmic Companion</h2>
</md-toolbar>
<div id="container">
	<md-card *ngFor="let card of cards">
		<md-card-title>{{card.title}}</md-card-title>
		<md-card-content>
			<p>{{card.text}}</p>
		</md-card-content>
		<md-card-actions>
			<a href="{{card.link}}" class="mat-primary" md-raised-button>{{card.linkText}}</a>
		</md-card-actions>
	</md-card>
</div>
<md-toolbar class="mat-primary">
	<a md-button class="mat-accent" href="//www.fmorel.net">Return home</a>
</md-toolbar>
`,
})
export class AppComponent {
	private cards: ActionCard[];
	constructor() {
		this.cards = [
			{
				title: "Alien Generator",
				text: "Let a random number generator give you choices to start a game of Cosmic Encounter.",
				link: "generator.html",
				linkText: "Use Generator"
			},
			{
				title: "Alien Reference",
				text: "Look up aliens by game and/or level for easy reference.",
				link: "reference.html",
				linkText: "View Reference"
			},
			{
				title: "Android App",
				text: "Companion for Cosmic Encounter is available on the Google Play Store, and includes both the Alien Generator and Reference tools",
				link: "https://play.google.com/store/apps/details?id=net.fmorel.cosmicgenerator",
				linkText: "Download from Google Play"
			}
		];
	}
}
