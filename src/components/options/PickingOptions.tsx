import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";

export type PickingOptionsProps = {
  numberOfChoices: number;
  onChangeNumber: (value: number) => void;
  preventConflicts: boolean;
  onChangePreventConflicts: (newValue: boolean) => void;
};

export function PickingOptions({
  numberOfChoices,
  onChangeNumber,
  preventConflicts,
  onChangePreventConflicts,
}: PickingOptionsProps) {
  return (
    <Card>
      <CardHeader title="How to choose" />
      <CardContent>
        <Stack spacing={2}>
          <TextField
            type="number"
            label="Choices per player"
            value={numberOfChoices}
            onChange={(event) =>
              onChangeNumber(parseInt(event.target.value, 10))
            }
            slotProps={{
              htmlInput: { min: 1, step: 1 },
            }}
          />
          <FormControlLabel
            label="Prevent conflicts (like Oracle vs. Magician)"
            control={
              <Checkbox
                value={preventConflicts}
                onChange={() => onChangePreventConflicts(!preventConflicts)}
              />
            }
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
