import { Container } from "@mui/material";
import type { PropsWithChildren } from "react";

/** Wrap part of page in a little bit of padding */
export function MainContainer({ children }: PropsWithChildren) {
  return (
    <Container maxWidth={false} sx={{ paddingBottom: 4 }}>
      {children}
    </Container>
  );
}
