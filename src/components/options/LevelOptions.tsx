import {
  getLevelColor,
  getLevelTheme,
  type Level,
  type LevelValues,
} from "@/data/levels";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormGroup,
} from "@mui/material";
import SlimCheckbox from "../SlimCheckbox";

export type LevelOptionsProps = {
  enabled: LevelValues<boolean>;
  onChange: (level: Level) => void;
};

export function LevelOptions({ enabled, onChange }: LevelOptionsProps) {
  const levels: Level[] = [0, 1, 2];

  return (
    <Card>
      <Button color="primary" />
      <CardHeader title="Levels to include" />
      <CardContent sx={{ paddingTop: 0 }}>
        <FormGroup>
          {levels.map((level) => (
            <SlimCheckbox
              value={level}
              label={getLevelColor(level)}
              key={level}
              color={getLevelTheme(level)}
              checked={enabled[level] ?? false}
              onChange={onChange}
            />
          ))}
        </FormGroup>
      </CardContent>
    </Card>
  );
}
