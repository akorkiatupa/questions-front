import React, { FC, useEffect } from "react";
import { Page } from "../components/Page";
import { Form, IValues, ISubmitResult } from "../components/general/Form";
import { Field } from "../components/general/Field";
import FormValidator from "../components/general/Validator";
import { IPostQuestionData } from "../utils/DummyQuestions";

import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  postQuestionActionCreator,
  AppState,
  clearPostedQuestionActionCreator,
} from "../state/Store";
import { AnyAction } from "redux";
import { IQuestionData } from "../utils/InterfaceCollection";

interface IProps {
  postQuestion: (question: IPostQuestionData) => Promise<void>;
  postedQuestionResult?: IQuestionData;
  clearPostedQuestion: () => void;
}

export const AskPage: FC<IProps> = ({
  postQuestion,
  postedQuestionResult,
  clearPostedQuestion,
}) => {
  const handleSubmit = (values: IValues) => {
    postQuestion({
      title: values.title,
      content: values.content,
      userName: "Fred",
      created: new Date(),
    });
  };

  useEffect(() => {
    return function cleanUp() {
      clearPostedQuestion();
    };
  }, [clearPostedQuestion]);

  let submitResult: ISubmitResult | undefined;

  if (postedQuestionResult) {
    submitResult = { success: undefined !== postedQuestionResult };
  }

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
        submitResult={submitResult}
        errorMessage="There was a problem with your question"
        successMessage="Your question was successfully submitted"
      >
        <Field name="title" label="Title"></Field>
        <Field name="content" label="Content" type="TextArea"></Field>
      </Form>
    </Page>
  );
};

const mapStateToProps = (store: AppState) => {
  return {
    postedQuestionResult: store.questions.postedResult,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    postQuestion: (question: IPostQuestionData) =>
      dispatch(postQuestionActionCreator(question)),
    clearPostedQuestion: () => dispatch(clearPostedQuestionActionCreator()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AskPage);
