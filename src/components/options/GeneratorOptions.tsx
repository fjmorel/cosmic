import { GameOptions } from "@/components/options/GameOptions";
import { LevelOptions } from "@/components/options/LevelOptions";
import { MainContainer } from "@/components/MainContainer";
import { getMatchingAliens, useAlienFilters, useAliens } from "@/data/aliens";
import { cardGridSize } from "@/data/styles";
import { Grid2 } from "@mui/material";
import { ExclusionOptions } from "@/components/options/ExclusionOptions";
import { PickingOptions } from "@/components/options/PickingOptions";
import type { Alien } from "@/data/types";
import { useEffect, useState } from "react";

export type GeneratorOptionsProps = {
  onFilterChange: (matchingAliens: Alien[]) => void;
};

export function GeneratorOptions({ onFilterChange }: GeneratorOptionsProps) {
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

  const [numChoices, setNumChoices] = useState(2);
  const [preventConflicts, setPreventConflicts] = useState(true);

  const resetEverything = () => {
    const newAliens = getMatchingAliens(
      aliens,
      names,
      levels,
      games,
      excluded,
      removeSetup,
    );
    onFilterChange(newAliens);
  };
  useEffect(resetEverything, [levels, games, removeSetup, excluded]);

  const topCards = [
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
      // todo: only show filtered names in dropdown again
      names={names}
    />,
    <PickingOptions
      key="picking"
      numberOfChoices={numChoices}
      onChangeNumber={setNumChoices}
      preventConflicts={preventConflicts}
      onChangePreventConflicts={setPreventConflicts}
    />,
  ];

  return (
    <MainContainer>
      <Grid2 container spacing={2}>
        {topCards.map((card) => (
          <Grid2 key={card.key} size={cardGridSize}>
            {card}
          </Grid2>
        ))}
      </Grid2>
    </MainContainer>
  );
}
