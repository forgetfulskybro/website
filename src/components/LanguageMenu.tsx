import { Box, MenuItem, Typography } from "@mui/material";
import Image from "next/image";
import { Fragment } from "react";
import PopupState from "material-ui-popup-state";
import { bindTrigger, bindMenu } from "material-ui-popup-state/hooks";
import { LanguageButton, StyledMenu } from "./StyledComponents";
import Translate from "./translation";

interface LanguageMenuProps {
  language: string | null;
  menuArray: Array<{ small: string; large: string }>;
  onLanguageSwitch: (menuItem: string, popupState: { close: () => void }) => () => void;
}

export default function LanguageMenu({
  language,
  menuArray,
  onLanguageSwitch
}: LanguageMenuProps) {
  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      <PopupState variant="popover" popupId="language-menu">
        {(popupState) => (
          <Fragment>
            <LanguageButton {...bindTrigger(popupState)}>
              <span>{menuArray.find(m => m.small === language)?.large || 'Select Language'}</span>
              <span className="arrow" />
            </LanguageButton>
            <StyledMenu {...bindMenu(popupState)}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: 'rgba(23,23,23,0.7)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  '& .MuiList-root': {
                    padding: '8px',
                  },
                  '& .MuiMenuItem-root': {
                    borderRadius: '8px',
                    margin: '2px 0',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  },
                },
              }}
            >
              {menuArray.map((m) => (
                <MenuItem 
                  key={m.small} 
                  onClick={() => onLanguageSwitch(m.small, popupState)()}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                    <Box sx={{ visibility: language === m.small ? 'visible' : 'hidden', width: 20 }}>
                      <Image
                        src={`check.svg`}
                        width={15}
                        height={15}
                        draggable={false}
                        alt={"Selected"}
                        priority
                      />
                    </Box>
                    <Typography>{m.large}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </StyledMenu>
          </Fragment>
        )}
      </PopupState>
    </Box>
  );
}
