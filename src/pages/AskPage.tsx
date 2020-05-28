import React from "react";
import { Page } from "../components/Page";
import { Form, IValues } from "../components/general/Form";
import { Field } from "../components/general/Field";
import FormValidator from "../components/general/Validator";
import { postQuestion } from "../utils/DummyQuestions";

export const AskPage = () => {
  const handleSubmit = async (values: IValues) => {
    const question = await postQuestion({
      title: values.title,
      content: values.content,
      userName: "Fred",
      created: new Date(),
    });

    return { success: question ? true : false };
  };

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
        onSubmit={handleSubmit}
        errorMessage="There was a problem with your question"
        successMessage="Your question was successfully submitted"
      >
        <Field name="title" label="Title"></Field>
        <Field name="content" label="Content" type="TextArea"></Field>
      </Form>
    </Page>
  );
};

export default AskPage;
