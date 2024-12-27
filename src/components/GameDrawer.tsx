import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "center",
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "rgba(34, 34, 38, 0.3)", 
    backdropFilter: "blur(12px)", 
    border: "1px solid rgba(255, 255, 255, 0.05)",
    color: "#fff",
    borderRadius: "8px 8px 0 0", 
    padding: "12px", 
  },
}));


const RatingItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(1, 2),
  width: '100%',
  alignItems: 'center', 
}));

const BlueTypography = styled(Typography)(({ theme }) => ({
  color: "rgba(54, 54, 241, 0.99)",
  marginRight: theme.spacing(2),
}));

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', 
  height: '100%', 

}));

const ListContainer = styled(List)(({ theme }) => ({
    width: '80%', 
}));


export default function TemporaryDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const list = () => (
    <Container>
      <DrawerHeader>
        <Typography variant="h5" align="center">Game Rating Guide</Typography>
      </DrawerHeader>
      <Divider />
      <ListContainer>
        <RatingItem>
          <BlueTypography variant="h6">1</BlueTypography> <Typography>Awful</Typography>
        </RatingItem>
        <RatingItem>
          <BlueTypography variant="h6">5</BlueTypography> <Typography>Mid/Average</Typography>
        </RatingItem>
        <RatingItem>
          <BlueTypography variant="h6">10</BlueTypography> <Typography>Amazing</Typography>
        </RatingItem>
      </ListContainer>
      <Divider />
    </Container>
  );

  return (
    <div>

      <StyledDrawer
        anchor={"bottom"}
        open={open}
        onClose={onClose}
      >
        {list()}
      </StyledDrawer>
    </div>
  );
}