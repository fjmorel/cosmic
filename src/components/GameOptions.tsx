import { Game, type GameSelection } from "@/data/games";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
} from "@mui/material";

export type GameOptionsProps = {
  enabled: GameSelection;
  onChange: (game: Game) => void;
};
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

export function GameOptions({ enabled, onChange }: GameOptionsProps) {
  return (
    <Card>
      <CardHeader title="Games to include" />
      <CardContent>
        <Stack>
          <FormGroup>
            {games.map((game) => (
              <FormControlLabel
                key={game}
                control={
                  <Checkbox
                    color="primary"
                    checked={enabled[game] ?? false}
                    onChange={() => onChange(game)}
                  />
                }
                label={game}
              />
            ))}
          </FormGroup>
        </Stack>
      </CardContent>
    </Card>
  );
}
