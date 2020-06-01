/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PrimaryButton, PageTitle } from "../style/Styles";
import { QuestionList } from "../components/QuestionList";
import { Page } from "../components/Page";
import { useEffect, FC } from "react";
import { IQuestionData } from "../utils/InterfaceCollection";
import { RouteComponentProps } from "react-router-dom";

import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { getUnansweredQuestionsActionCreator, AppState } from "../state/Store";

interface IProps extends RouteComponentProps {
  getUnansweredQuestions: () => Promise<void>;
  questions: IQuestionData[] | null;
  questionsLoading: boolean;
}

const HomePage: FC<IProps> = ({
  history,
  questions,
  questionsLoading,
  getUnansweredQuestions,
}) => {
  useEffect(() => {
    if (null === questions) {
      getUnansweredQuestions();
    }
  }, [questions, getUnansweredQuestions]);

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

// map Propertioes with store state
const mapStateToProps = (store: AppState) => {
  return {
    questions: store.questions.unanswered,
    questionsLoading: store.questions.loading,
  };
};

// map action action creators to properties
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getUnansweredQuestions: () =>
      dispatch(getUnansweredQuestionsActionCreator()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
