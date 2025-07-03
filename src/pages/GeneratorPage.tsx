import { AlienGrid } from "@/components/AlienGrid";
import {
  ExclusionOptions,
  GameOptions,
  LevelOptions,
  PickingOptions,
} from "@/components/options";
import { MainContainer } from "@/components/MainContainer";
import { getMatchingAliens, useAlienFilters, useAliens } from "@/data/aliens";
import { cardGridSize } from "@/data/styles";
import { useGeneratorState } from "@/data/generator";
import { Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { GeneratorActions, type Actions } from "@/components/GeneratorActions";

export default function GeneratorPage() {
  const [cancelledResets, setCancelledResets] = useState(0);
  const { aliens, names } = useAliens();
  const {
    levels,
    onLevelChange,
    games,
    onGameChange,
    removeSetup,
    setRemoveSetup,
    excluded,
    setExcluded,
  } = useAlienFilters();

  const matchingAliens = getMatchingAliens(
    aliens,
    names,
    levels,
    games,
    excluded,
    removeSetup,
  );
  const {
    numChoices,
    setNumChoices,
    preventConflicts,
    setPreventConflicts,
    hidden,
    status,
    setStatus,
    current,
    setCurrent,
    given,
    aliensLeft,
    aliensDrawn,
    hide,
    show,
    redo,
    draw,
    makePickFinal,
    reset,
  } = useGeneratorState(matchingAliens);

  const onRedo = () => {
    if (confirm("Redo?")) {
      redo();
    }
  };

  const resetEverything = () => {
    reset();
    setCancelledResets(0);
  };

  const onReset = () => {
    if (confirm("Reset list of aliens?")) {
      resetEverything();
    } else {
      setCancelledResets((prev) => prev + 1);
    }

    if (cancelledResets > 2) {
      makePickFinal();
      setCurrent(given);
      setStatus("Aliens given out so far:");
      setCancelledResets(0);
    }
  };

  const limitNumChoices = (newValue: number) => {
    const min = Math.min(aliensLeft.length, newValue);
    setNumChoices(Math.max(1, min));
  };

  const optionCards = [
    <GameOptions
      key="games"
      enabled={games}
      onChange={(game) => {
        onGameChange(game);
        resetEverything();
      }}
    />,
    <LevelOptions
      key="levels"
      enabled={levels}
      onChange={(level) => {
        onLevelChange(level);
        resetEverything();
      }}
    />,
    <ExclusionOptions
      key="exclude"
      setupLevel={removeSetup}
      onChangeSetupLevel={(level) => {
        setRemoveSetup(level);
        resetEverything();
      }}
      exclusions={excluded}
      onChangeExclusions={(newExclusions) => {
        setExcluded(newExclusions);
        resetEverything();
      }}
      names={matchingAliens.map((x) => x.name)}
    />,
    <PickingOptions
      key="picking"
      numberOfChoices={numChoices}
      onChangeNumber={limitNumChoices}
      preventConflicts={preventConflicts}
      onChangePreventConflicts={setPreventConflicts}
    />,
  ];
  const disabledButtons: Record<Actions, boolean> = {
    draw: aliensLeft.length < numChoices,
    hide: hidden || current.length < 1,
    show: !hidden || current.length < 1,
    redo: !hidden && current.length < 1,
    reset: aliensDrawn < 1 && current.length < 1,
  };

  return (
    <Stack spacing={2}>
      <MainContainer>
        <Grid container spacing={2}>
          {optionCards.map((card) => (
            <Grid key={card.key} size={cardGridSize}>
              {card}
            </Grid>
          ))}
        </Grid>
      </MainContainer>
      <GeneratorActions
        disabled={disabledButtons}
        draw={draw}
        hide={hide}
        show={show}
        redo={onRedo}
        reset={onReset}
      />
      <MainContainer>
        <Typography variant="body1">{status}</Typography>
        {!hidden && <AlienGrid aliens={current} />}
      </MainContainer>
    </Stack>
  );
}
