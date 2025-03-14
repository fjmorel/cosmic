import { getLevelTheme } from "@/data/levels";
import type { Alien } from "@/data/types";
import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
} from "@mui/material";
import { useState } from "react";

export type AlienCardProps = {
  alien: Alien;
};

export function AlienCard({ alien }: AlienCardProps) {
  const color = getLevelTheme(alien.level);
  const [isOpen, setIsOpen] = useState(false);
  const Icon = isOpen ? Remove : Add;

  return (
    <Card>
      <CardHeader
        title={alien.name}
        subheader={alien.power}
        avatar={
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            <Icon />
          </IconButton>
        }
      />
      <CardContent>
        {alien.setup}
        {alien.restriction}
        {alien.game}
      </CardContent>
      {isOpen ? (
        <Stack>
          {/* as html! */}
          <Box>{alien.description}</Box>
          {alien.player ? <Box>{alien.player}</Box> : null}
          {alien.mandatory ? <Box>{alien.mandatory}</Box> : null}
          {alien.phases ? <Box>{alien.phases}</Box> : null}
        </Stack>
      ) : null}
    </Card>
  );
}
