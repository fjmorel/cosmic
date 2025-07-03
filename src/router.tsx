import { createRootRoute, createRoute, Outlet } from "@tanstack/react-router";
import { Stack } from "@mui/material";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import NavBar from "@/components/NavBar";
import HomePage from "./pages/HomePage";
import GeneratorPage from "./pages/GeneratorPage";
import PrivacyPage from "./pages/PrivacyPage";
import ReferencePage from "./pages/ReferencePage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";

const rootRoute = createRootRoute({
  component: () => {
    return (
      <Stack spacing={3} sx={{ paddingBottom: 3 }}>
        <NavBar />
        <ErrorBoundary fallback={<ErrorPage />}>
          <Outlet />
        </ErrorBoundary>
      </Stack>
    );
  },
  notFoundComponent: NotFoundPage,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const generatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/generator",
  component: GeneratorPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: PrivacyPage,
});

const referenceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reference",
  component: ReferencePage,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  generatorRoute,
  privacyRoute,
  referenceRoute,
]);
