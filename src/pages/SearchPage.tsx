/** @jsx jsx */

import { FC, useState, useEffect } from "react";
import { Page } from "../components/Page";
import { RouteComponentProps } from "react-router-dom";
import { IQuestionData } from "../utils/InterfaceCollection";
import { searchQuestions } from "../utils/DummyQuestions";
import { css, jsx } from "@emotion/core";
import { QuestionList } from "../components/QuestionList";

const searchStyle = css`
  font-size: 16px;
  font-style: italic;
  margin-top: 0px;
`;

export const SearchPage: FC<RouteComponentProps> = ({ location }) => {
  const [questions, setQuestions] = useState<IQuestionData[]>([]);

  const searchParams = new URLSearchParams(location.search);

  const search = searchParams.get("criteria") || "";

  useEffect(() => {
    const doSearch = async (criteria: string) => {
      const searchResults = await searchQuestions(criteria);
      setQuestions(searchResults);
    };
    doSearch(search);
  }, [search]);

  return (
    <Page title="Search results">
      {search && <p css={searchStyle}>for "{search}"</p>}
      <QuestionList data={questions} />
    </Page>
  );
};
