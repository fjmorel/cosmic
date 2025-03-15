import { AlienGrid } from "@/components/AlienGrid";
import { GameOptions } from "@/components/GameOptions";
import { LevelOptions } from "@/components/LevelOptions";
import { MainContainer } from "@/components/MainContainer";
import { useFilteredAliens } from "@/data/aliens";
import { getLevelTheme } from "@/data/levels";
import { cardGridSize } from "@/data/styles";
import { SetupLevel, type Alien } from "@/data/types";
import {
  AppBar,
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid2,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/generator")({
  component: GeneratorPage,
});

function GeneratorPage() {
  const [numOfChoices, setNumOfChoices] = useState(2);
  const {
    levels,
    onLevelChange,
    games,
    onGameChange,
    allAliens,
    getNames,
    removeSetup,
    setRemoveSetup,
  } = useFilteredAliens();

  const [aliens, setAliens] = useState<Alien[]>([]);
  useEffect(() => {
    const names = getNames();
    setAliens(names.map((x) => allAliens[x]));
  }, [games, levels, removeSetup, allAliens]);

  const topCards = [
    <GameOptions key="games" enabled={games} onChange={onGameChange} />,
    <LevelOptions key="levels" enabled={levels} onChange={onLevelChange} />,
    <Card key="exclude">
      <CardHeader title="Game Setup" />
      <CardContent>
        <RadioGroup
          value={removeSetup}
          onChange={(event) => setRemoveSetup(event.target.value as SetupLevel)}
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
          limitTags={3}
          options={aliens.map((x) => x.name)}
          // todo: use alien color in tag chips too?
          // renderTags={(values, getTagProps, ownerState) => {

          // }}
          renderOption={(props, alienName, state) => {
            // eslint-disable-next-line react/prop-types
            const { key, ...optionProps } = props;
            const alien = allAliens[alienName];
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
    </Card>,
    <Card key="other">
      <CardHeader title="How to choose" />
      <CardContent>
        <Stack spacing={2}>
          <TextField
            type="number"
            label="Choices per player"
            value={numOfChoices}
            onChange={(event) =>
              setNumOfChoices(parseInt(event.target.value, 10))
            }
            slotProps={{
              htmlInput: { min: 1, step: 1 },
            }}
          />
          <FormControlLabel
            label="Prevent conflicts (like Oracle vs. Magician)"
            control={<Checkbox />}
          />
        </Stack>
      </CardContent>
    </Card>,
  ];

  return (
    <Stack spacing={2}>
      <MainContainer>
        <Grid2 container spacing={2}>
          {topCards.map((card) => (
            <Grid2 key={card.key} size={cardGridSize}>
              {card}
            </Grid2>
          ))}
        </Grid2>
      </MainContainer>
      <AppBar position="static">
        <Toolbar>
          <Grid2 container spacing={4} direction="row">
            <Button variant="contained" color="success">
              Draw
            </Button>
            <Grid2 container spacing={1}>
              <Button variant="contained" color="primary">
                Hide
              </Button>
              <Button variant="contained" color="primary">
                Show
              </Button>
            </Grid2>
            <Button variant="contained" color="warning">
              Redo
            </Button>
            <Button variant="contained" color="error">
              Reset
            </Button>
          </Grid2>
        </Toolbar>
      </AppBar>
      <MainContainer>
        <Typography variant="body1">
          x of y drawn. z redos so far. Choices:
        </Typography>
        <AlienGrid aliens={aliens} />
      </MainContainer>
    </Stack>
  );
}
