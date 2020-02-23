/** @jsx jsx */
import { IAnswerData } from "../utils/InterfaceCollection";
import { FC } from "react";
import { css, jsx } from "@emotion/core";
import { gray5 } from "../style/Styles";
import { Answer } from "./Answer";

interface IProps {
  data: IAnswerData[];
}

export const AnswerList: FC<IProps> = ({ data }) => {
  return (
    <ul
      css={css`
        list-style: none;
        margin: 10px 0 0 0;
        padding: 0;
      `}
    >
      {data.map(answer => (
        <li
          css={css`
            border-top: 1px solid ${gray5};
          `}
          key={answer.answerId}
        >
          <Answer data={answer} />
        </li>
      ))}
    </ul>
  );
};
