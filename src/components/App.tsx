/** @jsx jsx */

import React from "react";
import { Header } from "./Header";
import { HomePage } from "./HomePage";
import { css, jsx } from "@emotion/core";
import { fontFamily, fontSize, gray2 } from "../style/Styles";

const App: React.FC = () => {
  return (
    <div
      css={css`
        font-family: ${fontFamily};
        font-size: ${fontSize};
        color: ${gray2};
      `}
    >
      <Header />
      <HomePage />
    </div>
  );
};

export default App;
