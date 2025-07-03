import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { getMainColor } from "./data/levels";
import { deepOrange, deepPurple, green, grey, red } from "@mui/material/colors";
import type { PropsWithChildren } from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: deepPurple,
    secondary: grey,
    // re-use these 3 themes for Alien Levels
    success: { ...green, main: getMainColor(0), contrastText: "#fff" },
    warning: { ...deepOrange, main: getMainColor(1), contrastText: "#fff" },
    error: { ...red, main: getMainColor(2), contrastText: "#fff" },
  },
  components: {
    // Name of the component
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
        spacing: 1,
      },
    },
  },
});

export default function CosmicThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
