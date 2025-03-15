import type { Alien } from "@/data/types";
import { Grid2 } from "@mui/material";
import { AlienCard } from "./AlienCard";

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
        <Grid2 key={alien.name} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <AlienCard alien={alien} />
        </Grid2>
      ))}
    </Grid2>
  );
}
