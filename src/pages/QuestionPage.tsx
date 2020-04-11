/**@jsx jsx */
import { Page } from "../components/Page";
import { Fragment, FC, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IQuestionData } from "../utils/InterfaceCollection";
import { getQuestionDummyRequest } from "../utils/DummyQuestions";
import { gray6, gray3 } from "../style/Styles";
import { css, jsx } from "@emotion/core";
import { AnswerList } from "../components/AnswerList";
import { Form } from "../components/general/Form";
import { Field } from "../components/general/Field";

interface IRouteParams {
  questionId: string;
}

export const QuestionPage: FC<RouteComponentProps<IRouteParams>> = ({
  match,
}) => {
  const [question, setQuestion] = useState<IQuestionData | null>(null);

  useEffect(() => {
    const doGetQuestion = async (questionId: number) => {
      const foundQuestion = await getQuestionDummyRequest(questionId);
      setQuestion(foundQuestion);
    };
    if (match.params.questionId) {
      const questionId = Number(match.params.questionId);
      doGetQuestion(questionId);
    }
  }, [match.params.questionId]);

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {question === null ? "" : question.title}
        </div>
        {!!question && (
          <Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Asked by ${
                question.userName
              } on ${question.created.toLocaleDateString()} ${question.created.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />
            <div
              css={css`
                margin-top: 20px;
              `}
            >
              <Form submitCaption="Submit Your Answer">
                <Field name="content" label="Your Answer" type="TextArea" />
              </Form>
            </div>
          </Fragment>
        )}
      </div>
    </Page>
  );
};
