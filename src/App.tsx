/** @jsx jsx */

import React from "react";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { css, jsx } from "@emotion/core";
import { fontFamily, fontSize, gray2 } from "./style/Styles";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";
import { SignInPage } from "./pages/SignInPage";
import { AskPage } from "./pages/AskPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { QuestionPage } from "./pages/QuestionPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          color: ${gray2};
        `}
      >
        <Header />
        <Switch>
          <Redirect from="/home" to="/" />
          <Route exact path="/" component={HomePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/ask" component={AskPage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/questions/:questionId" component={QuestionPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
