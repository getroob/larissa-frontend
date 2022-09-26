import * as React from 'react';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import Fab from '@mui/material/Fab';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Paper from '@mui/material/Paper';
import { useState, createRef } from 'react';
import WordPlayer from './WordPlayer';
import { Typography } from '@mui/material';

const LanguageHelper = () => {
  const [isVisible, setVisible] = useState(false);
  const recordings = [
    'αίτηση',
    'αιτών',
    'αντίγραφο',
    'γάμος',
    'γέννηση',
    'γιατρός',
    'γλώσσα',
    'γονέας',
    'δηλώνω',
    'δήλωση',
    'δήμος',
    'δημόσιος',
    'διαβατήριο',
    'διαδικασία',
    'διευθυντής',
    'δικαστήριο',
    'έγγραφος',
    'έκδοση',
    'επιθυμώ',
    'επώνυμο',
    'έτος',
    'ηλικία',
    'ημέρα',
    'ημερομηνία',
    'κατοικία',
    'ληξιαρχείο',
    'ληξίαρχος',
    'μαία',
    'μαιευτήριο',
    'μήνας',
    'μητέρα',
    'νεογνό',
    'νοσοκομείο',
    'ξένος',
    'όνομα',
    'παιδί',
    'πατέρας',
    'πατρότητα',
    'πιστοποιητικό',
    'πολίτης',
    'τέκνο',
    'τοκετός',
    'τόπος',
    'χώρα',
  ];

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 2 }}>
      <Box sx={{ position: 'absolute', bottom: 62, right: 0 }}>
        {isVisible && (
          <Grow
            in={isVisible}
            style={{
              transformOrigin: 'bottom right',
            }}
            {...(isVisible ? { timeout: 800 } : {})}
          >
            <Paper
              elevation={3}
              style={{
                width: '250px',
                padding: '8px',
              }}
            >
              <div style={{ height: '400px', overflowX: 'hidden' }}>
                {recordings.map((word) => (
                  <WordPlayer key={word} word={word} lang="eng" />
                ))}
              </div>
              <Box sx={{ color: 'darkgray', fontStyle: 'italic' }}>
                <Typography style={{ textAlign: 'right' }}>
                  Powered by
                  <a href="https://testcalst.hf.ntnu.no/Exercise/no/3093?wrid=1404" alt="CALST">
                    <img
                      src="./assets/calst.png"
                      target="_blank"
                      rel="noreferrer"
                      width="90px"
                      alt="CALST"
                      style={{ verticalAlign: 'bottom' }}
                    ></img>
                  </a>
                </Typography>
              </Box>
            </Paper>
          </Grow>
        )}
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
