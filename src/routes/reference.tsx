/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlienGrid } from "@/components/AlienGrid";
import { GameOptions } from "@/components/GameOptions";
import { LevelOptions } from "@/components/LevelOptions";
import { getMatchingNames, useAliens } from "@/data/aliens";
import { groupItems } from "@/data/groupItems";
import { getLevelColor, getLevelStars } from "@/data/levels";
import { Grid2, Stack, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reference")({
  component: ReferencePage,
});

function ReferencePage() {
  // todo: sort and group by options
  // todo: properly hook up forms to page
  // todo: properly display games
  const { names, aliens } = useAliens();
  const filteredNames = getMatchingNames(aliens, names, [true, true, true], {
    Encounter: true,
  });
  const list = filteredNames.map((x) => aliens[x]);
  const groups = groupItems(list, ["game", "level"], ["name"]);

  return (
    <Stack spacing={2}>
      <Grid2 container spacing={2}>
        <GameOptions />
        <LevelOptions />
      </Grid2>
      {groups.map((gGroup) => (
        <Stack key={gGroup.value}>
          {gGroup.items.map((lGroup) => {
            return (
              <Stack key={(lGroup as any).value}>
                <Typography>
                  Cosmic {gGroup.value} - {getLevelColor((lGroup as any).value)}{" "}
                  {getLevelStars((lGroup as any).value)}
                </Typography>
                <AlienGrid aliens={(lGroup as any).items} />
              </Stack>
            );
          })}
        </Stack>
      ))}
    </Stack>
  );
}
