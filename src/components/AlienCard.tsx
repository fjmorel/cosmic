import { getLevelStars, getLevelTheme } from "@/data/levels";
import type { Alien } from "@/data/types";
import { Add, Remove, Warning } from "@mui/icons-material";
import {
  AppBar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid2,
  IconButton,
  Stack,
  Typography,
  type SxProps,
} from "@mui/material";
import { useState } from "react";

export type AlienCardProps = {
  alien: Alien;
};

export function AlienCard({ alien }: AlienCardProps) {
  const color = getLevelTheme(alien.level);
  const [isOpen, setIsOpen] = useState(false);
  const Icon = isOpen ? Remove : Add;

  const barContentStyle: SxProps = {
    paddingBottom: "8px !important",
    paddingTop: "8px",
  };

  // todo: bring back custom fonts
  return (
    <Card>
      <CardHeader
        slotProps={{
          title: {
            variant: "h6",
            color: color,
            fontWeight: 500,
          },
          subheader: {
            fontSize: "smaller",
          },
        }}
        title={alien.name}
        subheader={alien.power}
        action={
          <IconButton
            color={color}
            size="small"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Icon />
          </IconButton>
        }
      />
      <AppBar position="static" enableColorOnDark color={color}>
        <CardContent sx={barContentStyle}>
          <Grid2
            container
            direction="row"
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Grid2>
              <Typography variant="caption">{alien.game}</Typography>
            </Grid2>
            {alien.setup || alien.restriction ? (
              <Grid2>
                <Warning fontSize="small" />
              </Grid2>
            ) : null}
            <Grid2>{getLevelStars(alien.level)}</Grid2>
          </Grid2>
        </CardContent>
      </AppBar>
      {isOpen ? (
        <>
          <CardContent>
            {/* as html! */}
            <Typography variant="caption">
              <div dangerouslySetInnerHTML={{ __html: alien.description }} />
            </Typography>
          </CardContent>
          {alien.player || alien.mandatory || alien.phases ? (
            <AppBar position="static" enableColorOnDark color={color}>
              <CardContent sx={barContentStyle}>
                <Stack divider={<Divider />}>
                  {alien.player ? (
                    <Typography variant="caption">{alien.player}</Typography>
                  ) : null}
                  {alien.mandatory ? (
                    <Typography variant="caption">{alien.mandatory}</Typography>
                  ) : null}
                  {alien.phases ? (
                    <Typography variant="caption">
                      {alien.phases.split(",").join(", ")}
                    </Typography>
                  ) : null}
                </Stack>
              </CardContent>
            </AppBar>
          ) : null}
        </>
      ) : null}
    </Card>
  );
}
