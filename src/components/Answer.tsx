/** @jsx jsx */

import { IAnswerData } from "../utils/InterfaceCollection";
import { FC } from "react";
import { css, jsx } from "@emotion/core";
import { gray3 } from "../style/Styles";

interface IProps {
  data: IAnswerData;
}

export const Answer: FC<IProps> = ({ data }) => {
  return (
    <div
      css={css`
        padding: 10px 0px;
      `}
    >
      <div
        css={css`
          padding: 10px 0px;
          font-size: 13px;
        `}
      >
        {data.content}
      </div>
      <div
        css={css`
          font-size: 12px;
          font-style: italic;
          color: ${gray3};
        `}
      >
        {`Answered by ${data.userName} on
      ${data.created.toLocaleDateString()} 
      ${data.created.toLocaleTimeString()}`}
      </div>
    </div>
  );
};
