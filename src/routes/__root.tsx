import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Container, Stack } from "@mui/material";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

// https://tanstack.com/router/latest/docs/framework/react/devtools#devtools
// add <TanStackRouterDevtools /> for debugging routes

export const Route = createRootRoute({
  component: () => {
    return (
      <Stack spacing={2}>
        <Container maxWidth={false} sx={{ paddingBottom: 4 }}>
          <ErrorBoundary fallback={<p>test</p>}>
            <>
              <Outlet />
              <TanStackRouterDevtools />
            </>
          </ErrorBoundary>
        </Container>
      </Stack>
    );
  },
});
