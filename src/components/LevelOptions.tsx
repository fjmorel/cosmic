import { getLevelTheme, type Level, type LevelValues } from "@/data/levels";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
} from "@mui/material";

export type LevelOptionsProps = {
  enabled: LevelValues<boolean>;
  onChange: (level: Level) => void;
};

export function LevelOptions({ enabled, onChange }: LevelOptionsProps) {
  const levels: LevelValues<Level> = [0, 1, 2];
  const levelLabels: LevelValues<string> = ["Green", "Yellow", "Red"];

  return (
    <Card>
      <CardHeader title="Levels to include" />
      <CardContent>
        <Stack>
          <FormGroup>
            {levels.map((level) => (
              <FormControlLabel
                key={level}
                control={
                  <Checkbox
                    size="small"
                    color={getLevelTheme(level)}
                    checked={enabled[level]}
                    onChange={() => onChange(level)}
                  />
                }
                label={levelLabels[level]}
              />
            ))}
          </FormGroup>
        </Stack>
      </CardContent>
    </Card>
  );
}
