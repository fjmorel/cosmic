import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
} from "@mui/material";

export function DisplayOptions() {
  return (
    <Card>
      <CardHeader title="Group by" />
      <CardContent sx={{ paddingTop: 0 }}>
        <List dense disablePadding>
          <ListItem>1. Game</ListItem>
          <ListItem>2. Level</ListItem>
        </List>
      </CardContent>
      <Divider />
      <CardHeader title="Sort by" />
      <CardContent sx={{ paddingTop: 0 }}>
        <List dense disablePadding>
          <ListItem>1. Game</ListItem>
          <ListItem>2. Level</ListItem>
          <ListItem>3. Name</ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
