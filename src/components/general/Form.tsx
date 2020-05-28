/** @jsx jsx */
import { FC, useState, createContext } from "react";
import { PrimaryButton, gray5, gray6 } from "../../style/Styles";
import { css, jsx } from "@emotion/core";
import { IValidationProp, IValidation } from "./Validator";

interface IProps {
  submitCaption?: string;
  validationRules?: IValidationProp;
}

interface IValues {
  [key: string]: any;
}

interface IErrors {
  [key: string]: string[];
}

interface ITouched {
  [key: string]: boolean;
}

interface IFormContextProps {
  values: IValues;
  setValue?: (fieldName: string, value: any) => void;
  errors: IErrors;
  validate?: (fieldName: string) => void;
  touched: ITouched;
  setTouched?: (fieldName: string) => void;
}

export const FormContext = createContext<IFormContextProps>({
  values: {},
  errors: {},
  touched: {},
});

// export only Form since other interfaces are meant to be used internally
export const Form: FC<IProps> = ({
  submitCaption,
  children,
  validationRules,
}) => {
  const [values, setValues] = useState<IValues>({});
  const [errors, setErrors] = useState<IErrors>({});
  const [touched, setTouched] = useState<ITouched>({});

  const validate = (fieldName: string): string[] => {
    if (!validationRules) {
      return [];
    }
    if (!validationRules[fieldName]) {
      return [];
    }
    const rules = Array.isArray(validationRules[fieldName])
      ? (validationRules[fieldName] as IValidation[])
      : ([validationRules[fieldName]] as IValidation[]);

    const fieldErrors: string[] = [];

    rules.forEach(rule => {
      const error = rule.validator(values[fieldName], rule.arg);

      if (error) {
        fieldErrors.push(error);
      }
    });

    const newErrors = { ...errors, [fieldName]: fieldErrors };

    setErrors(newErrors);

    return fieldErrors;
  };

  return (
    // read more about setting array key : value combination states feels new and weird
    <FormContext.Provider
      value={{
        values,
        setValue: (fieldName, value) => {
          setValues({ ...values, [fieldName]: value });
        },
        errors,
        validate,
        touched,
        setTouched: (fieldName: string) => {
          setTouched({ ...touched, [fieldName]: true });
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
