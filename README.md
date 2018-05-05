
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Cosmic Encounter Utilities

A utility to make picking aliens in Cosmic Encounter games easier. Can be found at <http://www.fmorel.net/cosmic/> and on the [Google Play Store](https://play.google.com/store/apps/details?id=net.fmorel.cosmicgenerator).

## Actions

### Draw

Will give out a number of choices based on the "# per player" option until it runs out.

### Hide
Will hide the options you were given. Useful before letting someone else use the page. The button changes to *Show* to let you bring them back (but asks for the initial of one of the choices to discourage cheating).

### Redo
Will put the current picks back in the pool and give out new ones. This is useful for aliens like the Reincarnator, where you want a random alien, if you're ok with repeats.

### Reset
Resets list of aliens given out and to give out. Changing any of the Include/Exclude options will also reset the list.

## Other Things to Note

### Prevent Conflicts option
This one is permanently on to avoid games with conflicting aliens like the Oracle and Magician.

### "!" badge on aliens
That means the alien has Game Setup or conflicts with another alien. For details on any alien, click the "+" button.

### So much purple!
I really like purple.

## Credits
	The copyrightable portions of Cosmic Encounter are © 2008 Fantasy Flight Publishing, Inc.
	Cosmic Encounter is a registered trademark of Eon Products, Inc.

## License
	Copyright 2017 Frederic Morel

    This file is part of Cosmic Companion.

    Cosmic Companion is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Cosmic Companion is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Cosmic Companion.  If not, see <http://www.gnu.org/licenses/>.