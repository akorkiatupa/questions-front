/** @jsx jsx */
import { FC, useContext, ChangeEvent } from "react";
import { css, jsx } from "@emotion/core";
import { fontFamily, fontSize, gray5, gray2, gray6 } from "../../style/Styles";

import { FormContext } from "./Form";

interface IProps {
  name: string;
  label?: string;
  type?: "Text" | "TextArea" | "Password";
}

const baseCSS = css`
  box-sizing: border-box;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  margin-bottom: 5px;
  padding: 8px 10px;
  border: 1px solid ${gray5};
  border-radius: 3px;
  color: ${gray2};
  background-color: white;
  width: 100%;
  :focus {
    outline-color: ${gray5};
  }
  :disabled {
    background-color: ${gray6};
  }
`;

export const Field: FC<IProps> = ({ name, label, type = "Text" }) => {
  const { setValue } = useContext(FormContext);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (setValue) {
      setValue(name, e.currentTarget.value);
    }
  };

  return (
    // destructing values from context
    <FormContext.Consumer>
      {({ values }) => (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
          `}
        >
          {label && (
            <label
              css={css`
                font-weight: bold;
              `}
              htmlFor={name}
            >
              {label}
            </label>
          )}
          {(type === "Text" || type === "Password") && (
            <input
              id={name}
              value={values[name] === undefined ? "" : values[name]}
              type={type.toLowerCase()}
              css={baseCSS}
              onChange={handleChange}
            />
          )}
          {type === "TextArea" && (
            <textarea
              id={name}
              value={values[name] === undefined ? "" : values[name]}
              css={css`
                ${baseCSS};
                height: 100px;
              `}
              onChange={handleChange}
            />
          )}
        </div>
      )}
    </FormContext.Consumer>
  );
};
