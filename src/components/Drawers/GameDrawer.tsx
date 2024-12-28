import {
  DrawerHeader,
  StyledDrawer,
  RatingItem,
  BlueTypography,
  Container,
  ListContainer,
} from "./DrawerStyles";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import * as React from "react";

export default function TemporaryDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const list = () => (
    <Container>
      <DrawerHeader>
        <Typography variant="h5" align="center">
          Game Rating Guide
        </Typography>
      </DrawerHeader>
      <Divider />
      <ListContainer>
        <RatingItem>
          <BlueTypography variant="h6">1</BlueTypography>{" "}
          <Typography>Awful</Typography>
        </RatingItem>
        <RatingItem>
          <BlueTypography variant="h6">5</BlueTypography>{" "}
          <Typography>Mid/Average</Typography>
        </RatingItem>
        <RatingItem>
          <BlueTypography variant="h6">10</BlueTypography>{" "}
          <Typography>Amazing</Typography>
        </RatingItem>
      </ListContainer>
      <Divider />
    </Container>
  );

  return (
    <div>
      <StyledDrawer anchor={"bottom"} open={open} onClose={onClose}>
        {list()}
      </StyledDrawer>
    </div>
  );
}
