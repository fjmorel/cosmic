import { Container } from "@mui/material";
import type { PropsWithChildren } from "react";

export function MainContainer({ children }: PropsWithChildren) {
  return (
    <Container maxWidth={false} sx={{ paddingBottom: 4 }}>
      {children}
    </Container>
  );
}
