import { getLevelTheme } from "@/data/levels";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
} from "@mui/material";

export function LevelOptions() {
  // todo: proper games list
  const levels = ["Green", "Yellow", "Red"];

  return (
    <Card>
      <CardHeader title="Games to include" />
      <CardContent>
        <List>
          {levels.map((level, index) => (
            <ListItem key={index}>
              <FormControlLabel
                control={
                  <Checkbox defaultChecked color={getLevelTheme(index)} />
                }
                label={level}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
