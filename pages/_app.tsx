import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes/light-theme';
import { darkTheme } from '../themes/dark-theme';
import { UIProvider } from '../context/ui/UIProvider';
import { EntriesProvider } from '../context/entries/EntriesProvider';
import { SnackbarProvider } from 'notistack';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />

          </ThemeProvider>

        </UIProvider>

      </EntriesProvider>
    </SnackbarProvider>
    )
    
}
