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
              <div style={{ height: '380px', overflowX: 'hidden' }}>
                {recordings.map(word => (
                  <WordPlayer key={word} word={word} lang='eng' />
                ))}
              </div>
              <Box sx={{ color: 'darkgray', fontStyle: 'italic' }}>
                <Typography style={{ textAlign: 'right' }}>
                  Powered by
                  <a
                    href='https://testcalst.hf.ntnu.no/Exercise/no/3093?wrid=1404'
                    alt='CALST'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/easyrights-logo.jpg`}
                      target='_blank'
                      rel='noreferrer'
                      width='90px'
                      alt='easyright logo'
                      style={{ verticalAlign: 'bottom' }}
                    ></img>
                  </a>
                </Typography>
              </Box>
            </Paper>
          </Grow>
        )}
      </Box>
      <Box onClick={() => setVisible(!isVisible)} role='presentation'>
        <Fab color='primary' size='large' sx={{ borderRadius: '50%', overflow: 'hidden'}}>
          <img
            id='calst-logo'
            src={`${process.env.PUBLIC_URL}/assets/calst-logo.png`}
            width='85px'
            alt='CALST logo'
          />
        </Fab>
      </Box>
    </Box>
  )
};

export default LanguageHelper;
