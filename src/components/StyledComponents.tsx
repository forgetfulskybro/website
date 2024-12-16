import { styled } from "@mui/material/styles";
import { IconButton, Button, Menu, Paper, Box } from "@mui/material";

export const ColorButton = styled(IconButton)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: 6,
  margin: '0 4px',
  border: '2px solid transparent',
  '&:hover': {
    border: '2px solid rgba(255,255,255,0.2)',
  },
  '&.active': {
    border: '2px solid white',
  }
}));

export const CustomColorPicker = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(23,23,23,0.8)',
  backdropFilter: 'blur(8px)',
  borderRadius: '16px',
  border: '1px solid rgba(255,255,255,0.1)',
  padding: '16px',
  width: '400px',
  maxWidth: '90vw',
  marginBottom: '8px',
  transition: 'all 0.3s ease-in-out',
  maxHeight: '0',
  opacity: '0',
  overflow: 'hidden',
  '&.show': {
    maxHeight: '100px',
    opacity: '1',
    marginTop: '8px',
  }
}));

export const SettingsCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(23,23,23,0.8)',
  backdropFilter: 'blur(8px)',
  borderRadius: '16px',
  border: '1px solid rgba(255,255,255,0.1)',
  padding: '16px',
  width: '300px',
  maxWidth: '90vw',
  '& .MuiButton-contained': {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: 'rgba(255,255,255,0.9)',
    textTransform: 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.15)',
    }
  },
  '& .MuiTypography-root': {
    color: 'rgba(255,255,255,0.9)',
  },
  '& .MuiSelect-select': {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.9)',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderColor: 'rgba(255,255,255,0.2)',
    },
    '&:focus': {
      backgroundColor: 'rgba(0,0,0,0.3)',
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  }
}));

export const LanguageButton = styled(Button)(({ theme }) => ({
  width: '180px',
  height: '36px',
  backgroundColor: 'rgba(0,0,0,0.2)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: 'rgba(255,255,255,0.9)',
  textTransform: 'none',
  justifyContent: 'space-between',
  padding: '8px 12px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderColor: 'rgba(255,255,255,0.2)',
  },
  '& .arrow': {
    width: '0',
    height: '0',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '5px solid rgba(255,255,255,0.9)',
    marginLeft: '8px',
  }
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    marginTop: "5px",
    color: "rgba(255,255,255,0.9)",
    backgroundColor: "transparent",
    boxShadow: "none",
    backgroundImage: "none",
  },
  "& .MuiMenu-list": {
    color: "rgba(255,255,255,0.9)",
    borderRadius: "8px",
    border: "0.002px solid rgba(255,255,255,0.1)",
    padding: "8px",
    "& .MuiMenuItem-root": {
      borderRadius: "8px",
      margin: "2px 0",
      "&:hover": {
        backgroundColor: "rgba(255,255,255,0.1)",
      },
    },
  },
}));
