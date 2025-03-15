import { AlienGrid } from "@/components/AlienGrid";
import { GameOptions } from "@/components/GameOptions";
import { LevelOptions } from "@/components/LevelOptions";
import { MainContainer } from "@/components/MainContainer";
import { useFilteredAliens } from "@/data/aliens";
import { getLevelTheme } from "@/data/levels";
import { cardGridSize } from "@/data/styles";
import { SetupLevel } from "@/data/types";
import { useGeneratorState } from "@/data/generator";
import {
  Replay,
  Restore,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
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
import { useState } from "react";

export const Route = createFileRoute("/generator")({
  component: GeneratorPage,
});

function GeneratorPage() {
  const [cancelledResets, setCancelledResets] = useState(0);
  const {
    levels,
    onLevelChange,
    games,
    onGameChange,
    allAliens,
    matchingAliens,
    removeSetup,
    setRemoveSetup,
    excluded,
    setExcluded,
  } = useFilteredAliens();

  const {
    numChoices,
    setNumChoices,
    preventConflicts,
    setPreventConflicts,
    hidden,
    status,
    setStatus,
    current,
    setCurrent,
    given,
    aliensLeft,
    aliensDrawn,
    hide,
    show,
    redo,
    draw,
    makePickFinal,
    reset,
  } = useGeneratorState(matchingAliens);

  const onRedo = () => {
    if (confirm("Redo?")) {
      redo();
    }
  };

  const resetEverything = () => {
    reset();
    setCancelledResets(0);
  };

  const onReset = () => {
    if (confirm("Reset list of aliens?")) {
      resetEverything();
    } else {
      setCancelledResets((prev) => prev + 1);
    }

    if (cancelledResets > 2) {
      makePickFinal();
      setCurrent(given);
      setStatus("Aliens given out so far:");
      setCancelledResets(0);
    }
  };

  const limitNumChoices = (newValue: number) => {
    const min = Math.min(aliensLeft.length, newValue);
    setNumChoices(Math.max(1, min));
  };

  const topCards = [
    <GameOptions
      key="games"
      enabled={games}
      onChange={(game) => {
        onGameChange(game);
        resetEverything();
      }}
    />,
    <LevelOptions
      key="levels"
      enabled={levels}
      onChange={(level) => {
        onLevelChange(level);
        resetEverything();
      }}
    />,
    <Card key="exclude">
      <CardHeader title="Game Setup" />
      <CardContent>
        <RadioGroup
          value={removeSetup}
          onChange={(event) => {
            setRemoveSetup(event.target.value as SetupLevel);
            resetEverything();
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
          value={excluded}
          onChange={(_event, value) => {
            setExcluded(value);
            resetEverything();
          }}
          limitTags={3}
          options={matchingAliens.map((x) => x.name)}
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
            value={numChoices}
            onChange={(event) =>
              limitNumChoices(parseInt(event.target.value, 10))
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
                onChange={() => setPreventConflicts(!preventConflicts)}
              />
            }
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
            <Button
              variant="contained"
              color="success"
              disabled={aliensLeft.length < numChoices}
              onClick={draw}
            >
              Draw
            </Button>
            <Grid2 container spacing={1}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<VisibilityOff />}
                disabled={hidden || current.length < 1}
                onClick={hide}
              >
                Hide choices
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Visibility />}
                disabled={!hidden || current.length < 1}
                onClick={show}
              >
                Show choices
              </Button>
            </Grid2>
            <Button
              variant="contained"
              color="warning"
              startIcon={<Restore />}
              disabled={!hidden && current.length < 1}
              onClick={onRedo}
            >
              Redo
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<Replay />}
              disabled={aliensDrawn < 1 && current.length < 1}
              onClick={onReset}
            >
              Reset
            </Button>
          </Grid2>
        </Toolbar>
      </AppBar>
      <MainContainer>
        <Typography variant="body1">{status}</Typography>
        {!hidden && <AlienGrid aliens={current} />}
      </MainContainer>
    </Stack>
  );
}
