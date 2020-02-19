import React from 'react';
/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { IQuestionData } from '../utils/InterfaceCollection';
import { gray2, gray3 } from '../style/Styles';
import RenderHelper from '../utils/RenderHelper';

interface IProps {
  data: IQuestionData;
  showContent?: boolean;
}

export const Question: React.FC<IProps> = ({ data, showContent = true }) => (
  <div
    css={css`
      padding: 10px 0px;
    `}
  >
    <div
      css={css`
        padding: 10px 0px;
        font-size: 19px;
      `}
    >
      {data.title}
    </div>
    {showContent && (
      <div
        css={css`
          padding-bottom: 10px;
          font-size: 15px;
          color: ${gray2};
        `}
      >
        {RenderHelper.truncateContent(data.content)}
      </div>
    )}
    <div
      css={css`
        font-size: 12px;
        font-style: italic;
        color: ${gray3};
      `}
    >
      {`Asked by ${data.userName} on
        ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
    </div>
  </div>
);
