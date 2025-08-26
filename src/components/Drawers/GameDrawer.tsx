import { DrawerHeader, StyledDrawer, RatingItem, BlueTypography, Container, ListContainer } from "./DrawerStyles";
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
        <Typography variant="h6" align="center" className="drawerTitle">
          Game Rating Guide
        </Typography>
      </DrawerHeader>
      <Divider className="drawerDivider" />
      <ListContainer>
        <RatingItem>
          <BlueTypography variant="h6" className="ratingScore">
            1
          </BlueTypography>
          <Typography className="ratingDescription">
            Awful - Major flaws
          </Typography>
        </RatingItem>
        <RatingItem>
          <BlueTypography variant="h6" className="ratingScore">
            5
          </BlueTypography>
          <Typography className="ratingDescription">Average - Solid</Typography>
        </RatingItem>
        <RatingItem>
          <BlueTypography variant="h6" className="ratingScore">
            10
          </BlueTypography>
          <Typography className="ratingDescription">Masterpiece</Typography>
        </RatingItem>
      </ListContainer>
      <Divider className="drawerDivider" />
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
