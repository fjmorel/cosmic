import { Stack } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reference")({
  component: ReferencePage,
});

function ReferencePage() {
  return <Stack spacing={2}>page</Stack>;
}
