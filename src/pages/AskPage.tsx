import React from "react";
import { Page } from "../components/Page";
import { Form } from "../components/general/Form";
import { Field } from "../components/general/Field";
import FormValidator from "../components/general/Validator";

export const AskPage = () => {
  return (
    <Page title="Ask a question">
      <Form
        submitCaption="Ask a question"
        validationRules={{
          title: [
            { validator: FormValidator.required },
            { validator: FormValidator.minLength, arg: 10 },
          ],
          content: [
            { validator: FormValidator.required },
            { validator: FormValidator.minLength, arg: 10 },
          ],
        }}
      >
        <Field name="title" label="Title"></Field>
        <Field name="content" label="Content" type="TextArea"></Field>
      </Form>
    </Page>
  );
};

export default AskPage;
