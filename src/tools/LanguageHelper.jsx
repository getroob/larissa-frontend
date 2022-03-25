import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Fab from '@mui/material/Fab';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Tooltip from '@mui/material/Tooltip';
import { useState, createRef } from 'react';

const LanguageHelper = () => {
  const [isVisible, setVisible] = useState(false);

  return (
    <Box onClick={() => setVisible(!isVisible)} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
      <Tooltip title="Add" placement="bottom" arrow>
        <Fab color="primary" size="large">
          <QuestionMarkIcon />
        </Fab>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        keepMounted
        PaperProps={{
          elevation: 1,
        }}
        open={Boolean(isVisible)}
      >
        Test
      </Menu>
    </Box>
  );
};

export default LanguageHelper;
