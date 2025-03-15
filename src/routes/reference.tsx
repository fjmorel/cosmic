/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlienGrid } from "@/components/AlienGrid";
import { GameOptions } from "@/components/GameOptions";
import { LevelOptions } from "@/components/LevelOptions";
import { MainContainer } from "@/components/MainContainer";
import { useFilteredAliens } from "@/data/aliens";
import { groupItems } from "@/data/groupItems";
import { getLevelColor, getLevelStars } from "@/data/levels";
import {
  Box,
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
  type Breakpoint,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

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
    matchingAliens,
    isLoading,
  } = useFilteredAliens();
  const groups = groupItems(matchingAliens, ["game", "level"], ["name"]);
  const optionCardSize: Partial<Record<Breakpoint, number>> = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
  };

  return (
    <MainContainer>
      <Stack spacing={2}>
        <Grid2 container spacing={2}>
          <Grid2 size={optionCardSize}>
            <GameOptions enabled={games} onChange={onGameChange} />
          </Grid2>
          <Grid2 size={optionCardSize}>
            <LevelOptions enabled={levels} onChange={onLevelChange} />
          </Grid2>
          <Grid2 size={optionCardSize}>
            <Card>
              <CardHeader title="Group by" />
              <CardContent>
                <List dense disablePadding>
                  <ListItem>1. Game</ListItem>
                  <ListItem>2. Level</ListItem>
                </List>
              </CardContent>
              <Divider />
              <CardHeader title="Sort by" />
              <CardContent>
                <List dense disablePadding>
                  <ListItem>1. Game</ListItem>
                  <ListItem>2. Level</ListItem>
                  <ListItem>3. Name</ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid2>
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
