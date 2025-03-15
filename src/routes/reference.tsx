/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlienGrid } from "@/components/AlienGrid";
import { GameOptions } from "@/components/GameOptions";
import { LevelOptions } from "@/components/LevelOptions";
import { MainContainer } from "@/components/MainContainer";
import { useFilteredAliens } from "@/data/aliens";
import { groupItems } from "@/data/groupItems";
import { getLevelColor, getLevelStars } from "@/data/levels";
import { cardGridSize } from "@/data/styles";
import type { Alien } from "@/data/types";
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid2,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/reference")({
  component: ReferencePage,
});

function ReferencePage() {
  // todo: sort and group by options
  const {
    games,
    onGameChange,
    levels,
    onLevelChange,
    getNames,
    allAliens,
    isLoading,
  } = useFilteredAliens();

  const [aliens, setAliens] = useState<Alien[]>([]);
  useEffect(() => {
    const names = getNames();
    setAliens(names.map((x) => allAliens[x]));
  }, [games, levels, allAliens]);
  const groups = groupItems(aliens, ["game", "level"], ["name"]);

  const topCards = [
    <GameOptions key="games" enabled={games} onChange={onGameChange} />,
    <LevelOptions key="levels" enabled={levels} onChange={onLevelChange} />,
    <Card key="order">
      <CardHeader title="Group by" />
      <CardContent sx={{ paddingTop: 0 }}>
        <List dense disablePadding>
          <ListItem>1. Game</ListItem>
          <ListItem>2. Level</ListItem>
        </List>
      </CardContent>
      <Divider />
      <CardHeader title="Sort by" />
      <CardContent sx={{ paddingTop: 0 }}>
        <List dense disablePadding>
          <ListItem>1. Game</ListItem>
          <ListItem>2. Level</ListItem>
          <ListItem>3. Name</ListItem>
        </List>
      </CardContent>
    </Card>,
  ];

  return (
    <MainContainer>
      <Stack spacing={2}>
        <Grid2 container spacing={2}>
          {topCards.map((card) => (
            <Grid2 key={card.key} size={cardGridSize}>
              {card}
            </Grid2>
          ))}
        </Grid2>
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
