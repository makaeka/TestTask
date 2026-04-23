// src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: #FFFFFF;
    color: #1E293B;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: 'Inter', sans-serif;
  }

  input, textarea, select {
    font-family: 'Inter', sans-serif;
  }
`;