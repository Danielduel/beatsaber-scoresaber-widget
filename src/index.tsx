import React from "react";
import ReactDOM from "react-dom";
import {createGlobalStyle, css} from "styled-components";
import App from "./App";
import {searchParsed} from "./searchParsed";

const lightTheme = css`
  body {
    color: black;
  }
  :root {
    --top-background: white;
  }
`;

const darkTheme = css`
  body {
    color: white;
  }
  :root {
    --top-background: black;
  }
`;

const GlobalStyle = createGlobalStyle`${searchParsed.dark ? darkTheme : lightTheme}`;


ReactDOM.render(
  <React.StrictMode>
    <>
      <GlobalStyle />
      <App />
    </>
  </React.StrictMode>,
  document.getElementById("root")
);
