import { MainContainer } from "@/components/MainContainer";
import { Button, Stack, Typography } from "@mui/material";
import type { NotFoundRouteProps } from "@tanstack/react-router";
import { Link as RouterLink } from "@tanstack/react-router";

export default function NotFoundPage(_props: NotFoundRouteProps) {
  return (
    <MainContainer>
      <Stack spacing={3}>
        <Typography variant="h4">Page not found</Typography>
        <Typography>
          <Button
            component={RouterLink}
            href="/"
            color="primary"
            variant="contained"
          >
            Return home
          </Button>
        </Typography>
      </Stack>
    </MainContainer>
  );
}
