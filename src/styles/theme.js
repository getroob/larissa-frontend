import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      200: '#c0d8d8',
      300: '#87b5b5',
      main: '#4aa3a3',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#9d9d9d',
      dark: '#000',
      contrastText: '#fff',
    },
    error: {
      main: '#f00',
    },
    overrides: {
      MuiButton: {
        raisedPrimary: {
          color: '#fff',
        },
        raisedSecondary: {
          color: '#fff',
        },
      },
    },
  },
});

export default theme;
