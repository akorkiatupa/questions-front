// typescript type alias
type Validator = (value: any, args?: any) => string;

const required: Validator = (value: any): string => {
  if (undefined === value || null === value || "" === value) {
    return "This is required field and must be populated.";
  }
  return "";
};

const minLength: Validator = (value: any, length: number): string => {
  if (value && value.length < length) {
    return `This must be at least ${length} characters`;
  }
  return "";
};

const FormValidator = {
  required: required,
  minLength: minLength,
};

export interface IValidation {
  validator: Validator;
  arg?: any;
}

export interface IValidationProp {
  [key: string]: IValidation | IValidation[];
}

export default FormValidator;
