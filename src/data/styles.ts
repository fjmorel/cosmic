import type { Breakpoint } from "@mui/material";

export const cardGridSize: Partial<Record<Breakpoint, number>> = {
  xs: 12,
  sm: 6,
  md: 4,
  lg: 3,
};

export type Color =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";
