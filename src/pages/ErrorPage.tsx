import { MainContainer } from "@/components/MainContainer";
import { Stack, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";

export default function ErrorPage() {
  return (
    <MainContainer>
      <Stack spacing={3}>
        <Typography variant="h4">
          Error occured. Please refresh the page to try again.
        </Typography>
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
