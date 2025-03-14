import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { AppBar, Button, Container, Stack, Toolbar } from "@mui/material";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import NavBar from "@/components/NavBar";

export const Route = createRootRoute({
  component: () => {
    const location = useLocation();
    console.log(location);
    return (
      <Stack spacing={2}>
        <NavBar />
        <Container maxWidth={false} sx={{ paddingBottom: 4 }}>
          <ErrorBoundary fallback={<p>test</p>}>
            <>
              <Outlet />
            </>
          </ErrorBoundary>
        </Container>
        {location.pathname === "/" ? (
          <AppBar position="static" enableColorOnDark>
            <Toolbar variant="dense" disableGutters>
              <Stack direction="row">
                <Button
                  component="a"
                  href="//www.fmorel.net"
                  color="secondary"
                  variant="text"
                >
                  Return home
                </Button>
              </Stack>
            </Toolbar>
          </AppBar>
        ) : null}
      </Stack>
    );
  },
});
