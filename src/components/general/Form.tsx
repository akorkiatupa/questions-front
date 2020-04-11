/** @jsx jsx */
import { FC, useState, createContext } from "react";
import { PrimaryButton, gray5, gray6 } from "../../style/Styles";
import { css, jsx } from "@emotion/core";

export interface IProps {
  submitCaption?: string;
}

export interface IValues {
  [key: string]: any;
}

interface IFormContextProps {
  values: IValues;
  setValue?: (fieldName: string, value: any) => void;
}

export const FormContext = createContext<IFormContextProps>({
  values: {},
});

export const Form: FC<IProps> = ({ submitCaption, children }) => {
  const [values, setValues] = useState<IValues>({});
  return (
    // read more about setting array key : value combination states feels new and weird
    <FormContext.Provider
      value={{
        values,
        setValue: (fieldName, value) => {
          setValues({ ...values, [fieldName]: value });
        },
      }}
    >
      <form noValidate={true}>
        <fieldset
          css={css`
            margin: 10px auto 0 auto;
            padding: 30px;
            width: 350px;
            background-color: ${gray6};
            border-radius: 4px;
            border: 1px solid ${gray5};
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
          `}
        >
          {children}
          <div
            css={css`
              margin: 30px 0px 0px 0px;
              padding: 20px 0px 0px 0px;
              border-top: 1px solid ${gray5};
            `}
          >
            <PrimaryButton type="submit">{submitCaption}</PrimaryButton>
          </div>
        </fieldset>
      </form>
    </FormContext.Provider>
  );
};
