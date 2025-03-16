import { useAliens } from "@/data/aliens";
import { getLevelTheme } from "@/data/levels";
import { SetupLevel } from "@/data/types";
import {
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

export type ExclusionOptionsProps = {
  setupLevel: SetupLevel;
  onChangeSetupLevel: (level: SetupLevel) => void;
  exclusions: string[];
  onChangeExclusions: (newExclusions: string[]) => void;
  names: string[];
};

export function ExclusionOptions({
  setupLevel,
  onChangeSetupLevel,
  exclusions,
  onChangeExclusions,
  names,
}: ExclusionOptionsProps) {
  const { aliens } = useAliens();
  return (
    <Card>
      <CardHeader title="Game Setup" />
      <CardContent sx={{ paddingTop: 0 }}>
        <RadioGroup
          value={setupLevel}
          onChange={(event) => {
            onChangeSetupLevel(event.target.value as SetupLevel);
          }}
        >
          <FormControlLabel value="" control={<Radio />} label="Remove none" />
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
      <CardHeader title="Exclude by name" />
      <CardContent>
        <Autocomplete
          multiple
          disableCloseOnSelect
          value={exclusions}
          onChange={(_event, value) => {
            onChangeExclusions(value);
          }}
          limitTags={1}
          options={names}
          renderOption={(props, alienName, state) => {
            // eslint-disable-next-line react/prop-types
            const { key, ...optionProps } = props;
            const alien = aliens[alienName];
            const theme = getLevelTheme(alien.level);
            if (state.selected) return null;
            return (
              <Typography key={key} color={theme} {...optionProps}>
                {alien.name}
              </Typography>
            );
          }}
          renderInput={(params) => <TextField {...params} label="Names" />}
        />
      </CardContent>
    </Card>
  );
}
