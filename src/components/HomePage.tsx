/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { PrimaryButton, PageTitle } from '../style/Styles';
import { QuestionList } from './QuestionList';
import { getUnansweredQuestions } from '../utils/DummyQuestions';
import { Page } from './Page';
import { useEffect, useState } from 'react';
import { IQuestionData } from '../utils/InterfaceCollection';

export const HomePage = () => {
  const [questions, setQuestions] = useState<IQuestionData[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      setQuestions(unansweredQuestions);
      setQuestionsLoading(false);
    };
    doGetUnansweredQuestions();
  }, []);

  console.log('rendered');

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
        <PrimaryButton>Ask a question</PrimaryButton>
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
