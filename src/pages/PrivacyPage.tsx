import { MainContainer } from "@/components/MainContainer";
import { Stack, Typography } from "@mui/material";

/** Basic page for privacy policy in Play Store */
export default function PrivacyPage() {
  return (
    <MainContainer>
      <Stack spacing={2}>
        <Typography variant="h3">Cosmic Companion Privacy Policy</Typography>
        <Typography variant="body1">
          I collect no data from this app. The only metadata I see is what
          Google collects and makes available in the Play Console to track app
          crashes and installation base.
        </Typography>
      </Stack>
    </MainContainer>
  );
}
