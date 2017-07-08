import { Service } from "./service";

/**
 * Based on settings, allow user to pick aliens randomly
 */
export class Controller {
	public settings: Generator.Settings;
	public namesAll: string[];

	// output
	public status = "0 of 0 drawn. 0 redos.";
	public state = "Loading aliens...";
	public aliensToShow: Alien[] = [];
	public disabled: Generator.AllowedActions = { draw: true, hide: true, show: true, redo: true, reset: true };

	// actions
	public draw: () => void;
	public hide: () => void;
	public show: () => void;
	public redo: () => void;
	public reset: () => void;
	public restrictNumToChoose: () => void;
	public change: () => void;

	constructor($localStorage: Generator.Settings, Aliens: Alien.Service) {
		const ctrl = this;
		const Generator = new Service(Aliens);

		$localStorage.$default({
			complexities: [true, true, true],
			games: { E: true },
			namesExcluded: [],
			setupLevel: "none",
			numToChoose: 2,
			preventConflicts: true
		});
		ctrl.settings = $localStorage;

		function setState(newState: Generator.Status) {
			if(!newState) { return; }
			ctrl.state = newState.message;
			ctrl.aliensToShow = newState.aliens;
			if(newState.limit) {
				ctrl.settings.numToChoose = newState.limit;
			}
			ctrl.status = Generator.getStatus();
			ctrl.disabled = Generator.getDisabledActions(ctrl.settings.numToChoose, ctrl.aliensToShow.length);
		}

		function resetGenerator() {
			const opts = ctrl.settings;
			setState(Generator.reset(opts.complexities, opts.games, opts.namesExcluded, opts.setupLevel));
			ctrl.restrictNumToChoose();
		}

		ctrl.change = resetGenerator;

		let NOT_RESET = 0;
		ctrl.reset = function() {
			if(confirm("Reset list of aliens?")) { resetGenerator(); } else { NOT_RESET++; }

			if(NOT_RESET > 2) {
				setState(Generator.getAllGiven());
				NOT_RESET = 0;
			}
		};

		// keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick
		ctrl.restrictNumToChoose = function() {
			ctrl.settings.numToChoose = Generator.getChooseLimit(ctrl.settings.numToChoose);
		};

		ctrl.draw = () => setState(Generator.draw(ctrl.settings.numToChoose, ctrl.settings.preventConflicts));
		ctrl.hide = () => setState(Generator.hide());
		ctrl.show = () => setState(Generator.show());
		ctrl.redo = () => setState(Generator.redo(ctrl.settings.numToChoose, ctrl.settings.preventConflicts));

		// init generator
		Generator.init.then(names => { ctrl.namesAll = names; }).then(resetGenerator);
	}
}
