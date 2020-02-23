/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PrimaryButton, PageTitle } from "../style/Styles";
import { QuestionList } from "../components/QuestionList";
import { getAllQuestionsDummy } from "../utils/DummyQuestions";
import { Page } from "../components/Page";
import { useEffect, useState, FC } from "react";
import { IQuestionData } from "../utils/InterfaceCollection";
import { RouteComponentProps } from "react-router-dom";

export const HomePage: FC<RouteComponentProps> = ({ history }) => {
  const [questions, setQuestions] = useState<IQuestionData[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState<boolean>(true);

  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getAllQuestionsDummy();
      setQuestions(unansweredQuestions);
      setQuestionsLoading(false);
    };
    doGetUnansweredQuestions();
  }, []);

  const handleAskAQuestionClick = () => {
    history.push("/ask"); // navigate programmatically
  };

  return (
    <Page>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <PageTitle>Unanswered question</PageTitle>
        <PrimaryButton onClick={handleAskAQuestionClick}>
          Ask a question
        </PrimaryButton>
      </div>
      {questionsLoading ? (
        <div
          css={css`
            font-size: 16px;
            font-style: italic;
          `}
        >
          Loading...
        </div>
      ) : (
        <QuestionList data={questions || []} />
      )}
    </Page>
  );
};
