import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AlienService } from '../../aliens/alien.service';

/** Possible actions in Generator */
type Actions = 'draw' | 'hide' | 'show' | 'redo' | 'reset';

/** Generator settings */
interface ISettings {
  levels: boolean[];
  games: GameSelection;
  namesExcluded: string[];
  setupLevel: SetupLevel;
  numToChoose: number;
  preventConflicts: boolean;
}

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
  public getDisabledActions: (howManyToChoose: number, numShown: number) => Record<Actions, boolean>;

  /** Get number given out and size of pool */
  public getStatus: () => string;

  /** Start with defaults, then assign in ngOnInit */
  public settings: ISettings = {
    levels: [true, true, true],
    games: { [Game.Encounter]: true },
    namesExcluded: [],
    setupLevel: SetupLevel.NoSetup,
    numToChoose: 2,
    preventConflicts: true,
  };
  /** Which actions are disabled */
  public disabled: Record<Actions, boolean> = { draw: true, hide: true, show: true, redo: true, reset: true };

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
        this.setState([], 'Not enough potential aliens left.' + (this.settings.preventConflicts ? ' It\'s possible that the "Prevent conflicts" option is preventing me from displaying remaining aliens.' : ''));
      } else {

        // display
        this.setState(current, 'Choices:', this.getChooseLimit(this.settings.numToChoose));
      }
    };

    this.show = () => {
      // ask for initial of one of the aliens before reshowing them
      const initials = current.map(e => e[0].toLowerCase());
      if(initials.indexOf((prompt('Enter the first initial of one of the aliens you were given, then click OK.') || '').toLowerCase()) < 0) {
        this.setState([], 'Wrong letter.');
      } else {
        // if passed, then show aliens
        this.setState(current, 'Choices: ');
      }
    };

    this.redo = () => {
      if(confirm('Redo?')) {
        undo();
        numRedos++;
        this.draw();
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
        this.setState([], 'List reset.');
      }
    };
    this.reset = () => {
      if(confirm('Reset list of aliens?')) { this.change(); } else { this.NOT_RESET++; }

      if(this.NOT_RESET > 2) {
        makePickFinal();
        this.setState(given, 'Aliens given out so far:');
        this.NOT_RESET = 0;
      }
    };
  }

  public ngOnInit(): void {
    this.Aliens.init.subscribe(names => {
      this.namesAll = names;
      const loaded: Partial<ISettings> = this.Storage.get(STORAGE_PREFIX + 'settings');
      if(loaded.levels) { this.settings.levels = loaded.levels; }
      if(loaded.games) { this.settings.games = loaded.games; }
      if(loaded.namesExcluded) { this.settings.namesExcluded = loaded.namesExcluded; }
      if(loaded.setupLevel) { this.settings.setupLevel = loaded.setupLevel; }
      if(loaded.numToChoose) { this.settings.numToChoose = loaded.numToChoose; }
      if(loaded.preventConflicts !== undefined) { this.settings.preventConflicts = loaded.preventConflicts; }
      this.change();
    });
  }

  /** Hide all aliens but don't actually change lists */
  public hide = () => this.setState([], 'Choices hidden.');

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

  /**
   * Update Generator state
   * @param aliens Aliens to display
   * @param message Message to display (errors, # of draws/redos)
   * @param limit Max draw limit
   */
  private setState(aliens: string[], message: string, limit?: number) {
    this.state = message;
    this.aliensToShow = aliens.map(e => this.Aliens.get(e));
    if(limit) { this.settings.numToChoose = limit; }
    this.status = this.getStatus();
    this.disabled = this.getDisabledActions(this.settings.numToChoose, this.aliensToShow.length);
  }
}
