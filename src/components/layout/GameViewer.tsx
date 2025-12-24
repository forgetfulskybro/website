import { Dialog, Typography, Box, Button, DialogContent } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Translate from "@/components/translation";
import { ThemeColors } from "../Lyrics/theme";
import { GameType } from "../GamesArray";
import Image from "next/image";

interface GameViewerProps {
  open: boolean;
  onClose: () => void;
  game: GameType | null;
  data: string;
  themeColors: ThemeColors;
}

export const GameViewer: React.FC<GameViewerProps> = ({
  open,
  onClose,
  game,
  data,
  themeColors,
}) => {
  const translate = new Translate();

  if (!game) return null;

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'rgba(23,23,23,0.7)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: 'none',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: `${themeColors.dark}20`,
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: themeColors.lighter,
            borderRadius: '4px',
            '&:hover': {
              background: `${themeColors.lighter}cc`,
            },
          },
        },
      }}
      fullWidth={true}
      maxWidth={"sm"}
      open={open}
      onClose={onClose}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={game.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box sx={{ padding: '24px 24px 0', display: 'flex', alignItems: 'center' }}>
            {game.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                style={{ marginRight: '16px' }}
              >
                <Image
                  src={game.image}
                  alt={game.title}
                  width={48}
                  height={48}
                  style={{
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                />
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <Typography 
                variant="h5" 
                component="div" 
                sx={{
                  color: themeColors.lighter,
                  fontWeight: 600,
                  marginBottom: '4px',
                }}
              >
                {game.title}
              </Typography>
              {game.myRating && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Image
                    src="/star.svg"
                    width={14}
                    height={14}
                    alt="Rating"
                    style={{ marginRight: '4px' }}
                  />
                  <span style={{ 
                    color: themeColors.light,
                    fontSize: '0.9rem',
                    opacity: 0.8
                  }}>
                    {game.myRating}/10
                  </span>
                </div>
              )}
            </motion.div>
          </Box>
          
          <DialogContent 
            sx={{ 
              padding: '16px 24px 24px',
              '&.MuiDialogContent-root': {
                paddingTop: '8px',
              },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              style={{
                maxHeight: '50vh',
                overflowY: 'auto',
                paddingRight: '8px',
              }}
            >
              <Box mb={3}>
                <Typography 
                  variant="subtitle2"
                  sx={{
                    color: themeColors.lighter,
                    opacity: 0.8,
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                    letterSpacing: '1px',
                    marginBottom: '8px',
                  }}
                >
                  {translate.get(data!, "Games.review")}
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                  }}
                >
                  {game.review
                    ? translate.get(data, `Games.${game.target}.review`)
                    : translate.get(data, "Games.noReview")}
                </Typography>
              </Box>

              <Box mb={3}>
                <Typography 
                  variant="subtitle2"
                  sx={{
                    color: themeColors.lighter,
                    opacity: 0.8,
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                    letterSpacing: '1px',
                    marginBottom: '8px',
                  }}
                >
                  {translate.get(data, "Games.progress")}
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                  }}
                >
                  {translate.get(data, `Games.${game.target}.progress`)}
                </Typography>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {game.website && (
                <Button
                  component="a"
                  href={game.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: themeColors.light,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      borderColor: themeColors.lighter,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    textTransform: 'none',
                    padding: '6px 16px',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  variant="outlined"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z" fill="currentColor"/>
                  </svg>
                  {translate.get(data, "Games.visit")}
                </Button>
              )}
              <Button 
                onClick={onClose}
                sx={{ 
                  ml: 2,
                  color: themeColors.light,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    borderColor: themeColors.lighter,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  textTransform: 'none',
                  padding: '6px 16px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                }}
                variant="outlined"
              >
                Close
              </Button>
            </motion.div>
          </DialogContent>
        </motion.div>
      </AnimatePresence>
    </Dialog>
  );
};
