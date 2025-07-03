/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlienGrid } from "@/components/AlienGrid";
import {
  DisplayOptions,
  GameOptions,
  LevelOptions,
} from "@/components/options";
import { MainContainer } from "@/components/MainContainer";
import { getMatchingAliens, useAlienFilters, useAliens } from "@/data/aliens";
import { groupItems } from "@/data/groupItems";
import { getLevelColor, getLevelStars } from "@/data/levels";
import { cardGridSize } from "@/data/styles";
import { CircularProgress, Grid, Stack, Typography } from "@mui/material";

export default function ReferencePage() {
  // todo: sort and group by options
  const { isLoading, aliens, names } = useAliens();
  const { games, onGameChange, levels, onLevelChange } = useAlienFilters();

  const matchingAliens = getMatchingAliens(aliens, names, levels, games);

  const groups = groupItems(matchingAliens, ["game", "level"], ["name"]);

  const topCards = [
    <GameOptions key="games" enabled={games} onChange={onGameChange} />,
    <LevelOptions key="levels" enabled={levels} onChange={onLevelChange} />,
    <DisplayOptions key="order" />,
  ];

  return (
    <MainContainer>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          {topCards.map((card) => (
            <Grid key={card.key} size={cardGridSize}>
              {card}
            </Grid>
          ))}
        </Grid>
        {isLoading ? (
          <Stack spacing={2} direction="row" alignItems="center">
            <CircularProgress size="32px" />
            <Typography variant="h6">Loading...</Typography>
          </Stack>
        ) : null}
        {groups.map((gGroup) => (
          <Stack key={gGroup.value}>
            {gGroup.items.map((lGroup) => {
              return (
                <Stack key={(lGroup as any).value}>
                  <Typography variant="h5" gutterBottom paddingTop={4}>
                    Cosmic {gGroup.value} -{" "}
                    {getLevelColor((lGroup as any).value)}{" "}
                    {getLevelStars((lGroup as any).value)}
                  </Typography>
                  <AlienGrid aliens={(lGroup as any).items} />
                </Stack>
              );
            })}
          </Stack>
        ))}
      </Stack>
    </MainContainer>
  );
}
