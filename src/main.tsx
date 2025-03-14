import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { colors } from "./data/levels";
import { deepOrange, deepPurple, green, grey, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: deepPurple,
    secondary: grey,
    // re-use these 3 themes for Alien Levels
    success: { ...green, main: colors[0] },
    warning: { ...deepOrange, main: colors[1] },
    error: { ...red, main: colors[2] },
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

const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const container = document.getElementById("root")!;
if (!container.innerHTML) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
