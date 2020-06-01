/** @jsx jsx */
import { FC, useState, createContext, FormEvent } from "react";
import { PrimaryButton, gray5, gray6 } from "../../style/Styles";
import { css, jsx } from "@emotion/core";
import { IValidationProp, IValidation } from "./Validator";

interface IFormProps {
  submitCaption?: string;
  validationRules?: IValidationProp;
  onSubmit: (values: IValues) => Promise<ISubmitResult> | void;
  submitResult?: ISubmitResult;
  successMessage?: string;
  errorMessage?: string;
}

export interface IValues {
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

export interface ISubmitResult {
  success: boolean;
  errors?: IErrors;
}

// export only Form since other interfaces are meant to be used internally
export const Form: FC<IFormProps> = ({
  submitCaption,
  children,
  validationRules,
  onSubmit,
  submitResult,
  successMessage = "Default Success!",
  errorMessage = "Default something went wrong message",
}) => {
  /**
   * Component states
   */
  const [values, setValues] = useState<IValues>({});
  const [errors, setErrors] = useState<IErrors>({});
  const [touched, setTouched] = useState<ITouched>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

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

    rules.forEach((rule) => {
      const error = rule.validator(values[fieldName], rule.arg);

      if (error) {
        fieldErrors.push(error);
      }
    });

    const newErrors = { ...errors, [fieldName]: fieldErrors };

    setErrors(newErrors);

    return fieldErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitting(true);
      setSubmitError(false);
      const result = await onSubmit(values);

      // The result may be passed through as a prop
      if (undefined === result) {
        return;
      }

      setErrors(result.errors || {});
      setSubmitError(false === result.success);
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const validateForm = () => {
    const newErrors: IErrors = {};

    let hasErrors: boolean = false;

    if (validationRules) {
      Object.keys(validationRules).forEach((fieldName) => {
        newErrors[fieldName] = validate(fieldName);
        if (newErrors[fieldName].length > 0) {
          hasErrors = true;
        }
      });
    }
    setErrors(newErrors);

    const formValid = false === hasErrors; // form is valid if no errors have ocurred.

    return formValid;
  };

  const disabled = submitResult
    ? submitResult.success
    : submitting || (submitted && !submitError);

  const showError = submitResult
    ? !submitResult.success
    : submitted && submitError;

  const showSuccess = submitResult
    ? submitResult.success
    : submitted && !submitError;

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
      <form noValidate={true} onSubmit={handleSubmit}>
        <fieldset
          disabled={disabled}
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
          {showError && (
            <p
              css={css`
                color: red;
              `}
            >
              {errorMessage}
            </p>
          )}
          {showSuccess && (
            <p
              css={css`
                color: green;
              `}
            >
              {successMessage}
            </p>
          )}
        </fieldset>
      </form>
    </FormContext.Provider>
  );
};
