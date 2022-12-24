import { createTheme } from '@mui/material';
import { grey, red } from '@mui/material/colors';

export const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: grey[300]
      },
      primary: {
        main: '#0000FF',
      },
      secondary: {
        main: '#0B3861',
      },
      error: {
        main: red.A400,
      }
    },

    components: {
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundColor: '#424242',
          }
        }
      }
    }
  })