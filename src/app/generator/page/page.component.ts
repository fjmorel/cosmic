import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AlienService } from '../../aliens/alien.service';

const STORAGE_PREFIX = 'alien-gen';

@Component({
  selector: 'alien-generator',
  styleUrls: ['page.component.scss'],
  templateUrl: './page.component.html',
})
export class AlienGeneratorPageComponent implements OnInit {

  public reset: () => void;
  /** Reset list of possible choices and clear status */
  public change: () => void;

  /** Keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick */
  public getChooseLimit: (original: number) => number;

  /** Pick aliens randomly, if possible */
  public draw: () => void;

  /** Show current aliens if pass test */
  public show: () => void;

  /** Undo last draw, then draw again */
  public redo: () => void;

  /** Get which actions are not allowed */
  public getDisabledActions: (howManyToChoose: number, numShown: number) => Record<Generator.Actions, boolean>;

  /** Get number given out and size of pool */
  public getStatus: () => string;

  public settings: Generator.Settings = { levels: [], games: {}, namesExcluded: [], setupLevel: '', numToChoose: 2, preventConflicts: true };
  /** Which actions are disabled */
  public disabled: Record<Generator.Actions, boolean> = { draw: true, hide: true, show: true, redo: true, reset: true };

  /** Names of all aliens, for Exclude by name */
  public namesAll: string[];

  /** Number of draws, redos, etc */
  public status: string;
  /** Extra message to display */
  public state: string;
  /** Aliens to display */
  public aliensToShow: Alien[] = [];
  /** How many times Reset has been clicked, without Resetting */
  private NOT_RESET = 0;

  constructor(private Aliens: AlienService, private Storage: LocalStorageService) {

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
      if(preventConflicts) {
        const alien = Aliens.get(name);
        if(alien.restriction) {
          for(const restriction of alien.restriction.split(',')) {
            const index = pool.indexOf(restriction);
            if(index > -1) { restricted.push(pool.splice(index, 1)[0]); }
          }
        }
      }
      // return selected name
      return name;
    }

    /** Move current to given and move on */
    function makePickFinal() {
      given.push(...current, ...restricted);
      restricted = [];
      current = [];
    }

    /** Move current selection back to pool */
    function undo() {
      pool.push(...current, ...restricted);
      restricted = [];
      current = [];
    }

    this.getChooseLimit = original => {
      let numToGive = original;
      const max = pool.length;
      if(max > 0 && numToGive > max) { numToGive = max; }
      if(numToGive < 1) { numToGive = 1; }
      return numToGive;
    };

    this.draw = () => {
      // this.settings.numToChoose, this.settings.preventConflicts
      makePickFinal();
      for(let i = 0; i < this.settings.numToChoose; i++) {
        const name = drawOne(this.settings.preventConflicts);
        if(!name) { break; }
      }

      // if unable to pick desired number, undo
      if(current.length < this.settings.numToChoose) {
        undo();
        this.setState({ aliens: [], message: 'Not enough potential aliens left.' + (this.settings.preventConflicts ? ' It\'s possible that the "Prevent conflicts" option is preventing me from displaying remaining aliens.' : '') });
      } else {

        // display
        this.setState({ aliens: current, message: 'Choices:', limit: this.getChooseLimit(this.settings.numToChoose) });
      }
    };

    this.show = () => {
      // ask for initial of one of the aliens before reshowing them
      const initials = current.map(e => e[0].toLowerCase());
      if(initials.indexOf((prompt('Enter the first initial of one of the aliens you were given, then click OK.') || '').toLowerCase()) < 0) {
        this.setState({ aliens: [], message: 'Wrong letter.' });
      } else {
        // if passed, then show aliens
        this.setState({ aliens: current, message: 'Choices:' });
      }
    };

    this.redo = () => {
      if(confirm('Redo?')) {
        undo();
        numRedos++;
        this.draw();
      } else {
        this.setState({ aliens: current, message: 'Choices:' });
      }
    };

    this.getDisabledActions = (howManyToChoose, numShown) => ({
      draw: (pool.length < howManyToChoose),
      hide: (numShown < 1),
      show: !(current.length > 0 && numShown < 1),
      redo: (current.length <= 0 || numShown <= 0),
      reset: (current.length <= 0 && given.length <= 0),
    });

    this.getStatus = () => {
      const numGiven = current.length + given.length + restricted.length;
      return numGiven + ' of ' + (numGiven + pool.length) + ' drawn. ' + numRedos + ' redos so far.';
    };

    /**
     * Preference changes
     *
     * restrictNumToChoose takes care of saving settings
     */
    this.change = () => {
      if(this.settings) {
        const names = this.Aliens.getMatchingNames(this.settings.levels, this.settings.games, this.settings.namesExcluded, this.settings.setupLevel);
        pool = names;
        given = [];
        current = [];
        restricted = [];
        numRedos = 0;
        this.restrictNumToChoose();
        this.setState({ aliens: [], message: 'List reset.' });
      }
    };
    this.reset = () => {
      if(confirm('Reset list of aliens?')) { this.change(); } else { this.NOT_RESET++; }

      if(this.NOT_RESET > 2) {
        makePickFinal();
        this.setState({ aliens: given, message: 'Aliens given out so far:' });
        this.NOT_RESET = 0;
      }
    };
  }

  public ngOnInit(): void {
    this.Aliens.init.then(names => {
      this.namesAll = names;
      this.settings = this.Storage.get(STORAGE_PREFIX + 'settings');
      // tslint:disable-next-line:no-object-literal-type-assertion
      if(!this.settings) { this.settings = {} as Generator.Settings; }
      if(!this.settings.levels) { this.settings.levels = [true, true, true]; }
      if(!this.settings.games) { this.settings.games = { Encounter: true }; }
      if(!this.settings.namesExcluded) { this.settings.namesExcluded = []; }
      if(!this.settings.setupLevel) { this.settings.setupLevel = ''; }
      if(!this.settings.numToChoose) { this.settings.numToChoose = 2; }
      if(this.settings.preventConflicts === undefined) { this.settings.preventConflicts = true; }
      this.change();
    });
  }

  /** Hide all aliens but don't actually change lists */
  public hide = () => this.setState({ aliens: [], message: 'Choices hidden.' });

  /** keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick */
  public restrictNumToChoose = () => {
    this.settings.numToChoose = this.getChooseLimit(this.settings.numToChoose);
    this.saveSettings();
  }

  public onSelectGame($event: GameSelection) {
    this.settings.games = $event;
    this.change();
  }
  public onSelectLevel($event: boolean[]) {
    this.settings.levels = $event;
    this.change();
  }

  /**
   * Save settings to storage
   *
   * Called directly from controller when change should not reset Generator
   */
  public saveSettings() {
    this.Storage.set(STORAGE_PREFIX + 'settings', this.settings);
  }

  private setState(newState: Generator.Status) {
    if(!newState) { return; }
    this.state = newState.message;
    this.aliensToShow = newState.aliens.map(e => this.Aliens.get(e));
    if(newState.limit) {
      this.settings.numToChoose = newState.limit;
    }
    this.status = this.getStatus();
    this.disabled = this.getDisabledActions(this.settings.numToChoose, this.aliensToShow.length);
  }
}
