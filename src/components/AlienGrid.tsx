import type { Alien } from "@/data/types";
import { Grid2 } from "@mui/material";
import { AlienCard } from "./AlienCard";
import { cardGridSize } from "@/data/styles";

export type AlienGridProps = {
  aliens: Alien[];
};

export function AlienGrid({ aliens }: AlienGridProps) {
  return (
    <Grid2
      container
      spacing={2}
      sx={{
        alignItems: "stretch",
      }}
    >
      {aliens.map((alien) => (
        <Grid2 key={alien.name} size={cardGridSize}>
          <AlienCard alien={alien} />
        </Grid2>
      ))}
    </Grid2>
  );
}
