import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import Router from "./Router";
import GlobalStyle from "./styles/GlobalStyles";
import { lightTheme } from "./theme";
import "./styles/GlobalStyle.css";

function App() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen></ReactQueryDevtools>
      </ThemeProvider>
    </>
  );
}

export default App;
