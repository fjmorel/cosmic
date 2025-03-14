import { Game } from "@/data/types";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
} from "@mui/material";

export function GameOptions() {
  const games = [
    Game.Encounter,
    Game.Alliance,
    Game.Conflict,
    Game.Dominion,
    Game.Eons,
    Game.Incursion,
    Game.Storm,
    Game.Odyssey,
  ] as Game[];

  return (
    <Card>
      <CardHeader title="Games to include" />
      <CardContent>
        <List>
          {games.map((name) => (
            <ListItem key={name}>
              <FormControlLabel
                control={<Checkbox defaultChecked color="primary" />}
                label={name}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
