import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Stack } from "@mui/material";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import NavBar from "@/components/NavBar";

export const Route = createRootRoute({
  component: () => {
    const location = useLocation();
    console.log(location);
    return (
      <Stack spacing={2}>
        <NavBar />
        <ErrorBoundary fallback={<Fallback />}>
          <Outlet />
        </ErrorBoundary>
      </Stack>
    );
  },
});

function Fallback() {
  return <p>Error occured. Please refresh the page to try again.</p>;
}
