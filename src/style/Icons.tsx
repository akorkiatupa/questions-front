/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import userIcon from "./user.svg";

export const UserIcon = () => (
  <img
    src={userIcon}
    alt="User"
    width="12px"
    css={css`
      width: 12px;
      opacity: 0.6;
    `}
  ></img>
);
