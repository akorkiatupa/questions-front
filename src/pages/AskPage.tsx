import React from "react";
import { Page } from "../components/Page";
import { Form } from "../components/general/Form";
import { Field } from "../components/general/Field";

export const AskPage = () => {
  return (
    <Page title="Ask a question">
      <Form submitCaption="Ask a question">
        <Field name="title" label="Title"></Field>
        <Field name="content" label="Content" type="TextArea"></Field>
      </Form>
    </Page>
  );
};

export default AskPage;
