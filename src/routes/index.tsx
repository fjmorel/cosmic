import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { createFileRoute, Link as RouterLink } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const cards = [
    {
      title: "Alien Generator",
      content: (
        <Typography variant="body1">
          Let a random number generator give you choices to start a game of
          Cosmic Encounter.
        </Typography>
      ),
      action: (
        <Button
          component={RouterLink}
          href="/generator"
          color="primary"
          variant="contained"
        >
          Use Generator
        </Button>
      ),
    },
    {
      title: "Alien Reference",
      content: (
        <Typography variant="body1">
          Look up aliens by game and/or level for easy reference.
        </Typography>
      ),
      action: (
        <Button
          component={RouterLink}
          href="/reference"
          color="primary"
          variant="contained"
        >
          View Reference
        </Button>
      ),
    },
    {
      title: "Android App",
      content: (
        <Typography variant="body1">
          Companion for Cosmic Encounter is available on the Google Play Store,
          and includes both the Alien Generator and Reference tools.
        </Typography>
      ),
      action: (
        <Button
          component="a"
          href="https://play.google.com/store/apps/details?id=net.fmorel.cosmicgenerator"
          color="primary"
          variant="contained"
        >
          Download from Google Play
        </Button>
      ),
    },
  ];
  return (
    <Stack>
      <Typography variant="h3" gutterBottom>
        Cosmic Companion
      </Typography>
      <Grid2 container spacing={2} id="home-cards">
        {cards.map((card, index) => (
          <Grid2 key={index} size={{ xs: 12, md: 6, lg: 4 }}>
            <Card>
              <CardHeader title={card.title} />
              <CardContent>{card.content}</CardContent>
              <CardActions>{card.action}</CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}
