import * as React from "react";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Fab from "@mui/material/Fab";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Paper from "@mui/material/Paper";
import { useState, createRef } from "react";
import WordPlayer from "./WordPlayer";
import { Typography } from "@mui/material";

const LanguageHelper = () => {
  const [isVisible, setVisible] = useState(false);

  return (
    <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
      <Box sx={{ position: "absolute", bottom: 62, right: 0 }}>
        <Grow
          in={isVisible}
          style={{
            transformOrigin: "bottom right",
          }}
          {...(isVisible ? { timeout: 800 } : {})}
        >
          <Paper
            elevation={3}
            style={{
              width: "250px",
              padding: "8px",
            }}
          >
            <WordPlayer word="όνομα" lang="eng" />
            <WordPlayer word="επώνυμο" lang="eng" />
            <WordPlayer word="πιστοποιητικό" lang="eng" />
            <Box sx={{ color: "darkgray", fontStyle: "italic" }}>
              <Typography style={{ textAlign: "right" }}>
                Powered by EasyRights
              </Typography>
            </Box>
          </Paper>
        </Grow>
      </Box>
      <Box onClick={() => setVisible(!isVisible)} role="presentation">
        <Fab color="primary" size="large">
          <QuestionMarkIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default LanguageHelper;
