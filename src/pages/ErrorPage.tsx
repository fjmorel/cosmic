import { MainContainer } from "@/components/MainContainer";
import { Stack, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";
import React, { type PropsWithChildren, type ReactNode } from "react";

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

type ErrorBoundaryProps = PropsWithChildren<{
  fallback: ReactNode;
}>;
type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: unknown) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error(error);
    console.info(info);
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // logErrorToMyService(error, info.componentStack);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
