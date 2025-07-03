import { Game, type GameSelection } from "@/data/games";
import { Card, CardContent, CardHeader, FormGroup, Stack } from "@mui/material";
import SlimCheckbox from "../SlimCheckbox";

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
      <CardContent sx={{ paddingTop: 0 }}>
        <Stack>
          <FormGroup>
            {games.map((game) => (
              <SlimCheckbox
                value={game}
                label={game}
                key={game}
                checked={enabled[game] ?? false}
                onChange={onChange}
              />
            ))}
          </FormGroup>
        </Stack>
      </CardContent>
    </Card>
  );
}
