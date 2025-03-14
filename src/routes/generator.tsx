import { Stack } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/generator")({
  component: GeneratorPage,
});

function GeneratorPage() {
  return <Stack spacing={2}>page</Stack>;
}
