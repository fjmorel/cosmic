import { AlienGrid } from "@/components/AlienGrid";
import { GameOptions } from "@/components/GameOptions";
import { LevelOptions } from "@/components/LevelOptions";
import { useAliens } from "@/data/aliens";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grid2,
  Radio,
  RadioGroup,
  Stack,
  Toolbar,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/generator")({
  component: GeneratorPage,
});

function GeneratorPage() {
  const { aliens, names } = useAliens();
  const aliensToShow = names.map((x) => aliens[x]);

  return (
    <Stack spacing={2}>
      <Grid2 container>
        <GameOptions />
        <LevelOptions />
        <Card>
          <CardHeader title="Game Setup" />
          <CardContent>
            <RadioGroup>
              <FormControlLabel
                value=""
                control={<Radio />}
                label="Remove none"
              />
              <FormControlLabel
                value="color"
                control={<Radio />}
                label="Remove those requiring extra color"
              />
              <FormControlLabel
                value="all"
                control={<Radio />}
                label="Remove all"
              />
            </RadioGroup>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Exclude by name" />
          {/* <mat-form-field>
        <mat-select multiple [(ngModel)]="settings.namesExcluded" (selectionChange)="change()"
          placeholder="Select names">
          <mat-option *ngFor="let name of namesAll" [value]="name">{{name}}</mat-option>
        </mat-select>
      </mat-form-field> */}
        </Card>
        <Card>
          <CardHeader title="How to choose" />
          <CardContent>
            {/* <mat-form-field>
        <input matInput type="number" [(ngModel)]="settings.numToChoose" placeholder="Choices per player" step="1"
          min="1" (change)="restrictNumToChoose()">
      </mat-form-field>
        <mat-checkbox class="mat-primary" (change)="saveSettings()" [(ngModel)]="settings.preventConflicts">Prevent
          conflicts (like Oracle vs. Magician)</mat-checkbox> */}
          </CardContent>
        </Card>
      </Grid2>
      <AppBar position="static" enableColorOnDark>
        <Toolbar variant="dense" disableGutters>
          <Stack direction="row">
            <Button variant="contained" color="primary">
              Draw
            </Button>
            {/** Hide, Show, Redo, Reset buttons, with proper spacing */}
          </Stack>
        </Toolbar>
      </AppBar>
      <AlienGrid aliens={aliensToShow} />
    </Stack>
  );
}
