import type { Alien } from "@/data/types";
import { Grid2 } from "@mui/material";
import { AlienCard } from "./AlienCard";

export type AlienGridProps = {
  aliens: Alien[];
};

export function AlienGrid({ aliens }: AlienGridProps) {
  return (
    <Grid2 container spacing={2}>
      {aliens.map((alien) => (
        <AlienCard key={alien.name} alien={alien} />
      ))}
    </Grid2>
  );
}
