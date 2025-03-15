import { type Alien } from "./types";
import { useState } from "react";

export function useGeneratorState(matchingAliens: Alien[]) {
  const [numChoices, setNumChoices] = useState(2);
  const [preventConflicts, setPreventConflicts] = useState(true);

  const [numRedo, setNumRedo] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [status, setStatus] = useState("Loading...");

  const [current, setCurrent] = useState<Alien[]>([]);
  const [restricted, setRestricted] = useState<Alien[]>([]);
  const [given, setGiven] = useState<Alien[]>([]);

  const [aliensLeft, setAliensLeft] = useState<Alien[]>([...matchingAliens]);

  const aliensDrawn =
    matchingAliens.length - aliensLeft.length - current.length;

  const getSummary = () =>
    `${aliensDrawn} of ${matchingAliens.length} drawn. ${numRedo} redos so far.`;

  const hide = () => {
    setHidden(true);
    setStatus("Choices hidden. " + getSummary());
  };

  const show = () => {
    // ask for initial of one of the aliens before reshowing them
    const initials = current.map((alien) => alien.name[0].toLowerCase());
    const answer = (
      prompt(
        "Enter the first initial of one of the aliens you were given, then click OK.",
      ) || ""
    ).toLowerCase();
    if (initials.indexOf(answer) < 0) {
      setStatus(
        "Someone tried to show hidden aliens, but guessed the wrong letter.",
      );
    } else {
      setHidden(false);
      setStatus(getSummary());
    }
  };

  /** Move current to given and move on */
  const makePickFinal = () => {
    setGiven((prev) => [...prev, ...current, ...restricted]);
    setRestricted([]);
    setCurrent([]);
  };

  const undo = () => {
    setAliensLeft((prev) => [...prev, ...current, ...restricted]);
    setRestricted([]);
    setCurrent([]);
  };

  /** Choose aliens from the pool */
  const draw = () => {
    makePickFinal();

    const { choices: newCurrent, restricted: newRestricted } = getChoices(
      [...aliensLeft],
      numChoices,
      preventConflicts,
    );

    // if unable to pick desired number, do nothing besides letting user know.
    if (newCurrent.length < numChoices) {
      setStatus(
        "Not enough potential aliens left." +
          (preventConflicts
            ? ' It\'s possible that the "Prevent conflicts" option is preventing me from displaying remaining aliens.'
            : ""),
      );
    } else {
      // display
      setGiven((prev) => [...prev, ...current]);
      setCurrent(newCurrent);
      setRestricted((prev) => [...prev, ...newRestricted]);
      setAliensLeft((prev) =>
        prev.filter(
          (x) => !newRestricted.includes(x) && !newCurrent.includes(x),
        ),
      );
      setStatus(getSummary() + " Choices:");
    }
  };

  const redo = () => {
    undo();
    setNumRedo((prev) => prev + 1);
    draw();
  };

  const reset = () => {
    console.log("resetting");
    setAliensLeft(matchingAliens);
    setHidden(false);
    setCurrent([]);
    setGiven([]);
    setRestricted([]);
    setNumRedo(0);
    setStatus(`Game reset. ${matchingAliens.length} aliens available.`);
  };

  return {
    numChoices,
    setNumChoices,
    preventConflicts,
    setPreventConflicts,
    numRedo,
    setNumRedo,
    hidden,
    setHidden,
    status,
    setStatus,
    current,
    setCurrent,
    restricted,
    setRestricted,
    given,
    setGiven,
    aliensLeft,
    setAliensLeft,
    aliensDrawn,
    hide,
    show,
    redo,
    draw,
    undo,
    makePickFinal,
    reset,
  };
}

function getChoices(aliens: Alien[], num: number, preventConflicts: boolean) {
  const choices = [];
  const restricted = [];

  while (num > 0) {
    // select name (return if wasn't able to select
    const choice = Math.floor(Math.random() * aliens.length);
    if (!aliens[choice]) continue;
    const alien = aliens.splice(choice, 1)[0];
    choices.push(alien);

    // if current choice has any restrictions, remove them from pool as well
    if (preventConflicts) {
      if (alien.restriction) {
        for (const restriction of alien.restriction.split(",")) {
          const index = aliens.findIndex((x) => x.name == restriction);
          if (index > -1) {
            restricted.push(aliens.splice(index, 1)[0]);
          }
        }
      }
    }
    num--;
  }
  return { choices, restricted };
}
