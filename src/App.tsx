import React from "react";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import ContextContainer from "./Context";

function App() {
  return (
    <BrowserRouter>
      <ContextContainer>
        <Routes />
      </ContextContainer>
    </BrowserRouter>
  );
}

export default App;
