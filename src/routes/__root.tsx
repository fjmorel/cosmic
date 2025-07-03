import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Stack } from "@mui/material";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import NavBar from "@/components/NavBar";

export const Route = createRootRoute({
  component: () => {
    return (
      <Stack spacing={3} sx={{ paddingBottom: 3 }}>
        <NavBar />
        <ErrorBoundary fallback={<Fallback />}>
          <Outlet />
        </ErrorBoundary>
      </Stack>
    );
  },
  notFoundComponent: () => <div>404 Not Found</div>,
});

function Fallback() {
  return <p>Error occured. Please refresh the page to try again.</p>;
}
