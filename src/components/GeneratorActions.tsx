import type { HasCallbacks } from "@/data/types";
import {
  Replay,
  Restore,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { AppBar, Button, Grid2, Toolbar } from "@mui/material";

export type Actions = "draw" | "hide" | "show" | "redo" | "reset";

export type GeneratorActionsProps = HasCallbacks<Actions> & {
  disabled: Record<Actions, boolean>;
};

export function GeneratorActions({
  draw,
  hide,
  show,
  redo,
  reset,
  disabled,
}: GeneratorActionsProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid2 container spacing={4} direction="row">
          <Button
            variant="contained"
            color="success"
            disabled={disabled.draw}
            onClick={draw}
          >
            Draw
          </Button>
          <Grid2 container spacing={1}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<VisibilityOff />}
              disabled={disabled.hide}
              onClick={hide}
            >
              Hide choices
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Visibility />}
              disabled={disabled.show}
              onClick={show}
            >
              Show choices
            </Button>
          </Grid2>
          <Button
            variant="contained"
            color="warning"
            startIcon={<Restore />}
            disabled={disabled.redo}
            onClick={redo}
          >
            Redo
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Replay />}
            disabled={disabled.reset}
            onClick={reset}
          >
            Reset
          </Button>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
}
