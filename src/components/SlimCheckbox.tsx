import type { Color } from "@/data/styles";
import { FormControlLabel, Checkbox } from "@mui/material";
import type { ReactElement } from "react";

export type SlimCheckboxProps<T extends string | number> = {
  value: T;
  label: string;
  checked: boolean;
  color?: Color;
  onChange: (label: T) => void;
};

/** Slimmer version of component, combined with label */
export default function SlimCheckbox<T extends string | number>({
  value,
  label,
  checked,
  color = "primary",
  onChange,
}: SlimCheckboxProps<T>): ReactElement {
  return (
    <FormControlLabel
      control={
        <Checkbox
          sx={{
            paddingBottom: 0.4,
            paddingTop: 0.4,
          }}
          color={color}
          checked={checked}
          onChange={() => onChange(value)}
        />
      }
      label={label}
    />
  );
}
