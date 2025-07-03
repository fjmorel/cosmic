import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import CosmicRouter from "./router";
import CosmicThemeProvider from "./theme";
import CosmicQueryClient from "./queryClient";

// todo: localstorage of game/level options and other state

const container = document.getElementById("root")!;

if (!container) throw Error("Root not found.");

const root = ReactDOM.createRoot(container);
root.render(
  <StrictMode>
    <CosmicQueryClient>
      <CosmicThemeProvider>
        <CosmicRouter />
      </CosmicThemeProvider>
    </CosmicQueryClient>
  </StrictMode>,
);
