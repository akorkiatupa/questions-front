/**@jsx jsx */
import { Page } from "../components/Page";
import { Fragment, FC, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  IQuestionData,
  mapQuestionFromServer,
  IQuestionDataFromServer,
} from "../utils/InterfaceCollection";
import { postAnswer } from "../utils/DummyQuestions";
import { gray6, gray3 } from "../style/Styles";
import { css, jsx } from "@emotion/core";
import { AnswerList } from "../components/AnswerList";
import { Form, IValues } from "../components/general/Form";
import { Field } from "../components/general/Field";
import FormValidator from "../components/general/Validator";
import { getQuestion } from "../api/Questions";

import {
  HubConnectionBuilder,
  HubConnectionState,
  HubConnection,
} from "@aspnet/signalr";

import { server } from "../AppSettings";

interface IRouteParams {
  questionId: string;
}

export const QuestionPage: FC<RouteComponentProps<IRouteParams>> = ({
  match,
}) => {
  const [question, setQuestion] = useState<IQuestionData | null>(null);

  const setUpSignalRConnection = async (questionId: number) => {
    // setup connection to real-time SignalR API
    const connection = new HubConnectionBuilder()
      .withUrl(`${server}/questionshub`)
      .withAutomaticReconnect()
      .build();

    // handle Message function being called
    connection.on("Message", (message: string) => {
      console.log("Message", message);
    });

    // handle ReceiveQuestion function being called
    connection.on("ReceiveQuestion", (question: IQuestionDataFromServer) => {
      console.log("ReceiveQuestion", question);
      setQuestion(mapQuestionFromServer(question));
    });

    // start the connection

    try {
      await connection.start();
    } catch (err) {
      console.log(err);
    }

    // subscribe to question

    if (connection.state === HubConnectionState.Connected) {
      connection.invoke("SubscribeQuestion", questionId).catch((err: Error) => {
        return console.error(err.toString());
      });
    }

    // return the connection
    return connection;
  };

  const cleanUpSignalRConnection = async (
    questionId: number,
    connection: HubConnection,
  ) => {
    // TODO - unsubscribe from the question
    if (connection.state === HubConnectionState.Connected) {
      try {
        await connection.invoke("UnsubscribeQuestion", questionId);
      } catch (err) {
        return console.error(err.toString());
      }
      connection.off("Message");
      connection.off("ReceiveQuestion");
      connection.stop();
    } else {
      connection.off("Message");
      connection.off("ReceiveQuestion");
      connection.stop();
    }

    // TODO - stop the connection
  };

  useEffect(() => {
    const doGetQuestion = async (questionId: number) => {
      const foundQuestion = await getQuestion(questionId);
      setQuestion(foundQuestion);
    };
    let connection: HubConnection;
    if (match.params.questionId) {
      const questionId = Number(match.params.questionId);
      doGetQuestion(questionId);
      setUpSignalRConnection(questionId).then(con => {
        connection = con;
      });
    }
    return function cleanUp() {
      if (match.params.questionId) {
        const questionId = Number(match.params.questionId);
        cleanUpSignalRConnection(questionId, connection);
      }
    };
  }, [match.params.questionId]);

  const handleSubmit = async (values: IValues) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: values.content,
      userName: "Fred",
      created: new Date(),
    });

    return { success: result ? true : false };
  };

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
              <Form
                submitCaption="Submit Your Answer"
                validationRules={{
                  content: [
                    { validator: FormValidator.required },
                    { validator: FormValidator.minLength, arg: 50 },
                  ],
                }}
                onSubmit={handleSubmit}
                errorMessage="There was a problem with your answer"
                successMessage="Your answer was successfully submitted"
              >
                <Field name="content" label="Your Answer" type="TextArea" />
              </Form>
            </div>
          </Fragment>
        )}
      </div>
    </Page>
  );
};
