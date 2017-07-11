import { Injectable } from "@angular/core";
import { AlienService } from "../shared/alien.service";

type Status = Generator.Status;

/** Manage aliens given, available, etc */
@Injectable()
export class AlienGeneratorService {

	/** Determine list of possible choices based on selected options */
	public reset: (complexities: boolean[], games: Games[], namesExcluded: string[], setupLevel: string) => Status;

	/** Show all aliens that have been given out so far */
	public getAllGiven: () => Status;

	/** Keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick */
	public getChooseLimit: (original: number) => number;

	/** Pick aliens randomly, if possible */
	public draw: (howManyToChoose: number, preventConflicts?: boolean) => Status;

	/** Hide all aliens (so return nothing to show */
	public hide: () => Status;

	/** Show current aliens if pass test */
	public show: () => Status;

	/** Undo last draw, then draw again */
	public redo: (howManyToChoose: number, preventConflicts?: boolean) => Status;

	/** Get which actions are not allowed */
	public getDisabledActions: (howManyToChoose: number, numShown: number) => Record<Generator.Actions, boolean>;

	/** Get number given out and size of pool */
	public getStatus: () => string;

	/** start Generator by getting alien names */
	public init: Promise<string[]>;

	constructor(Aliens: AlienService) {
		const service = this;
		service.init = Aliens.init;

		function namesToAliens(names: string[]): Alien[] {
			return names.sort().map(Aliens.get);
		}

		// current = currently drawn.
		let current: string[] = [];
		// given = previously given/restricted.
		let given: string[] = [];
		// restricted = restricted by those currently drawn.
		let restricted: string[] = [];
		// pool = all left to draw from
		let pool: string[] = [];
		// Number of times redo button has been used.
		let numRedos = 0;

		/** Choose alien from pool */
		function drawOne(preventConflicts = false): string | void {
			// select name (return if wasn't able to select
			const choice = Math.floor(Math.random() * pool.length);
			if(!pool[choice]) { return; }
			const name = pool.splice(choice, 1)[0];
			current.push(name);

			// if current choice has any restrictions, remove them from pool as well
			const alien = Aliens.get(name);
			if(preventConflicts && alien.restriction) {
				const restrictions = alien.restriction.split(",");
				for(let j = 0; j < restrictions.length; j++) {
					const index = pool.indexOf(restrictions[j]);
					if(index > -1) { restricted.push(pool.splice(index, 1)[0]); }
				}
			}
			// return selected name
			return name;
		}

		/** Move current to given and move on */
		function makePickFinal() {
			given = given.concat(current, restricted);
			restricted = []; current = [];
		}

		/** Move current selection back to pool */
		function undo() {
			pool = pool.concat(current, restricted);
			current = []; restricted = [];
		}

		service.reset = function(complexities, games, namesExcluded, setupLevel) {
			pool = Aliens.getMatchingNames(complexities, games, namesExcluded, setupLevel);
			given = [];
			current = [];
			restricted = [];
			numRedos = 0;
			return { aliens: [], message: "List reset." };
		};

		service.getAllGiven = function() {
			makePickFinal();
			return { aliens: namesToAliens(given), message: "Aliens given out so far:" };
		};

		service.getChooseLimit = function(original) {
			let numToGive = original;
			const max = pool.length;
			if(max > 0 && numToGive > max) { numToGive = max; }
			if(numToGive < 1) { numToGive = 1; }
			return numToGive;
		};

		service.draw = function(howManyToChoose, preventConflicts = false) {
			makePickFinal();
			for(let i = 0; i < howManyToChoose; i++) {
				const name = drawOne(preventConflicts);
				if(!name) { break; }
			}

			// if unable to pick desired number, undo
			if(current.length < howManyToChoose) {
				undo();
				return { aliens: [], message: "Not enough potential aliens left." + (preventConflicts ? " It's possible that the \"Prevent conflicts\" option is preventing me from displaying remaining aliens." : "") };
			}

			// display
			return { aliens: namesToAliens(current), message: "Choices:", limit: service.getChooseLimit(howManyToChoose) };
		};

		service.hide = () => ({ aliens: [], message: "Choices hidden." });

		service.show = function() {
			// ask for initial of one of the aliens before reshowing them
			const initials = current.map(function(e) { return e[0].toLowerCase(); });
			if(initials.indexOf((prompt("Enter the first initial of one of the aliens you were given, then click OK.") || "").toLowerCase()) < 0) {
				return { aliens: [], message: "Wrong letter." };
			}

			// if passed, then show aliens
			return { aliens: namesToAliens(current), message: "Choices:" };
		};

		service.redo = function(howManyToChoose, preventConflicts = false) {
			if(confirm("Redo?")) {
				undo();
				numRedos++;
				return service.draw(howManyToChoose, preventConflicts);
			}
			return { aliens: namesToAliens(current), message: "Choices:" };
		};

		service.getDisabledActions = function(howManyToChoose, numShown) {
			return {
				draw: (pool.length < howManyToChoose),
				hide: (numShown < 1),
				show: !(current.length > 0 && numShown < 1),
				redo: (current.length <= 0 || numShown <= 0),
				reset: (current.length <= 0 && given.length <= 0)
			};
		};

		service.getStatus = function() {
			const numGiven = current.length + given.length + restricted.length;
			return numGiven + " of " + (numGiven + pool.length) + " drawn. " + numRedos + " redos so far.";
		};
	}
}
