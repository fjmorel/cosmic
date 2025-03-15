import { SetupLevel, type Alien } from "@/data/types";
import { getMatchingNames } from "./aliens";
import { type GameSelection, Game } from "./games";
import type { LevelValues } from "./levels";

/** Possible actions in Generator */
type Actions = "draw" | "hide" | "show" | "redo" | "reset";

/** Generator settings */
interface ISettings {
  levels: LevelValues<boolean>;
  games: GameSelection;
  namesExcluded: string[];
  setupLevel: SetupLevel;
  numToChoose: number;
  preventConflicts: boolean;
}

export class AlienGeneratorPageComponent {
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
  public getDisabledActions: (
    howManyToChoose: number,
    numShown: number,
  ) => Record<Actions, boolean>;

  /** Get number given out and size of pool */
  public getStatus: () => string;

  public undo: () => void;
  public drawOne: (preventConflicts?: boolean) => string | void;
  public makePickFinal: () => void;

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
  public disabled: Record<Actions, boolean> = {
    draw: true,
    hide: true,
    show: true,
    redo: true,
    reset: true,
  };

  /** Names of all aliens, for Exclude by name */
  public namesAll!: string[];

  /** Number of draws, redos, etc */
  public status!: string;
  /** Extra message to display */
  public state!: string;
  /** Aliens to display */
  public aliensToShow: Alien[] = [];
  /** How many times Reset has been clicked, without Resetting */
  private NOT_RESET = 0;

  public constructor(private aliens: Map<string, Alien>) {
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
    this.drawOne = (preventConflicts = false): string | void => {
      // select name (return if wasn't able to select
      const choice = Math.floor(Math.random() * pool.length);
      if (!pool[choice]) {
        return;
      }
      const name = pool.splice(choice, 1)[0];
      current.push(name);

      // if current choice has any restrictions, remove them from pool as well
      if (preventConflicts) {
        const alien = aliens.get(name)!;
        if (alien.restriction) {
          for (const restriction of alien.restriction.split(",")) {
            const index = pool.indexOf(restriction);
            if (index > -1) {
              restricted.push(pool.splice(index, 1)[0]);
            }
          }
        }
      }
      // return selected name
      return name;
    };

    /** Move current to given and move on */
    this.makePickFinal = () => {
      given.push(...current, ...restricted);
      restricted = [];
      current = [];
    };

    /** Move current selection back to pool */
    this.undo = () => {
      pool.push(...current, ...restricted);
      restricted = [];
      current = [];
    };

    this.getChooseLimit = (original) => {
      let numToGive = original;
      const max = pool.length;
      if (max > 0 && numToGive > max) {
        numToGive = max;
      }
      if (numToGive < 1) {
        numToGive = 1;
      }
      return numToGive;
    };

    this.draw = () => {
      // this.settings.numToChoose, this.settings.preventConflicts
      this.makePickFinal();
      for (let i = 0; i < this.settings.numToChoose; i++) {
        const name = this.drawOne(this.settings.preventConflicts);
        if (!name) {
          break;
        }
      }

      // if unable to pick desired number, undo
      if (current.length < this.settings.numToChoose) {
        this.undo();
        this.setState(
          [],
          "Not enough potential aliens left." +
            (this.settings.preventConflicts
              ? ' It\'s possible that the "Prevent conflicts" option is preventing me from displaying remaining aliens.'
              : ""),
        );
      } else {
        // display
        this.setState(
          current,
          "Choices:",
          this.getChooseLimit(this.settings.numToChoose),
        );
      }
    };

    this.show = () => {
      // ask for initial of one of the aliens before reshowing them
      const initials = current.map((e) => e[0].toLowerCase());
      if (
        initials.indexOf(
          (
            prompt(
              "Enter the first initial of one of the aliens you were given, then click OK.",
            ) || ""
          ).toLowerCase(),
        ) < 0
      ) {
        this.setState([], "Wrong letter.");
      } else {
        // if passed, then show aliens
        this.setState(current, "Choices: ");
      }
    };

    this.redo = () => {
      if (confirm("Redo?")) {
        this.undo();
        numRedos++;
        this.draw();
      }
    };

    this.getDisabledActions = (howManyToChoose, numShown) => ({
      draw: pool.length < howManyToChoose,
      hide: numShown < 1,
      show: !(current.length > 0 && numShown < 1),
      redo: current.length <= 0 || numShown <= 0,
      reset: current.length <= 0 && given.length <= 0,
    });

    this.getStatus = () => {
      const numGiven = current.length + given.length + restricted.length;
      return (
        numGiven +
        " of " +
        (numGiven + pool.length) +
        " drawn. " +
        numRedos +
        " redos so far."
      );
    };

    /**
     * Preference changes
     *
     * restrictNumToChoose takes care of saving settings
     */
    this.change = () => {
      if (this.settings) {
        const names = getMatchingNames(
          Object.fromEntries(aliens.entries()),
          this.namesAll,
          this.settings.levels,
          this.settings.games,
          this.settings.namesExcluded,
          this.settings.setupLevel,
        );
        pool = names;
        given = [];
        current = [];
        restricted = [];
        numRedos = 0;
        this.restrictNumToChoose();
        this.setState([], "List reset.");
      }
    };
    this.reset = () => {
      if (confirm("Reset list of aliens?")) {
        this.change();
      } else {
        this.NOT_RESET++;
      }

      if (this.NOT_RESET > 2) {
        this.makePickFinal();
        this.setState(given, "Aliens given out so far:");
        this.NOT_RESET = 0;
      }
    };
  }

  /** Hide all aliens but don't actually change lists */
  public hide = () => this.setState([], "Choices hidden.");

  /** keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick */
  public restrictNumToChoose() {
    this.settings.numToChoose = this.getChooseLimit(this.settings.numToChoose);
  }

  public onSelectGame($event: GameSelection) {
    this.settings.games = $event;
    this.change();
  }
  public onSelectLevel($event: LevelValues<boolean>) {
    this.settings.levels = $event;
    this.change();
  }

  /**
   * Update Generator state
   *
   * @param alienNames Aliens to display
   * @param message Message to display (errors, # of draws/redos)
   * @param limit Max draw limit
   */
  private setState(alienNames: string[], message: string, limit?: number) {
    this.state = message;
    this.aliensToShow = alienNames.map((e) => this.aliens.get(e)!);
    if (limit) {
      this.settings.numToChoose = limit;
    }
    this.status = this.getStatus();
    this.disabled = this.getDisabledActions(
      this.settings.numToChoose,
      this.aliensToShow.length,
    );
  }
}
