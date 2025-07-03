import type { Alien } from "@/data/types";
import { Grid } from "@mui/material";
import { AlienCard } from "./AlienCard";
import { cardGridSize } from "@/data/styles";

export type AlienGridProps = {
  aliens: Alien[];
};

/** Display a list of aliens */
export function AlienGrid({ aliens }: AlienGridProps) {
  return (
    <Grid container spacing={2}>
      {aliens.map((alien) => (
        <Grid key={alien.name} size={cardGridSize}>
          <AlienCard alien={alien} />
        </Grid>
      ))}
    </Grid>
  );
}
