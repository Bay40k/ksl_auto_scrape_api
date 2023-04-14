// index.js
import React from 'react';
import { createRoot } from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
