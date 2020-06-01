/** @jsx jsx */

import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { configureStore } from "./state/Store";
import { HeaderWithRouter as Header } from "./components/Header";
import HomePage from "./pages/HomePage";
import { css, jsx } from "@emotion/core";
import { fontFamily, fontSize, gray2 } from "./style/Styles";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";
import { SignInPage } from "./pages/SignInPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { QuestionPage } from "./pages/QuestionPage";

const AskPage = lazy(() => import("./pages/AskPage"));

const store = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
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
            <Route path="/ask">
              <Suspense
                fallback={
                  <div
                    css={css`
                      margin-top: 100px;
                      text-align: center;
                    `}
                  >
                    Loading...
                  </div>
                }
              >
                <AskPage />
              </Suspense>
            </Route>
            <Route path="/signin" component={SignInPage} />
            <Route path="/questions/:questionId" component={QuestionPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
