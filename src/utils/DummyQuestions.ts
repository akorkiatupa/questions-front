import { IQuestionData } from "./InterfaceCollection";

const questions: IQuestionData[] = [
  {
    questionId: 1,
    title: "Why should I learn TypeScript?",
    content:
      "TypeScript seems to be getting popular so I wondered whether it is worth my time learning it? What benefits does it give over JavaScript?",
    userName: "Bob",
    created: new Date(),
    answers: [
      {
        answerId: 1,
        content: "To catch problems earlier speeding up your developments",
        userName: "Jane",
        created: new Date(),
      },
      {
        answerId: 2,
        content:
          "So, that you can use the JavaScript features of tomorrow, today",
        userName: "Fred",
        created: new Date(),
      },
    ],
  },
  {
    questionId: 2,
    title: "Which state management tool should I use?",
    content:
      "There seem to be a fair few state management tools around for React - React, Unstated, ... Which one should I use?",
    userName: "Bob",
    created: new Date(),
    answers: [],
  },
];

export const getAllQuestionsDummy = async (): Promise<IQuestionData[]> => {
  await wait(500);
  return questions;
};

export const getQuestionDummyRequest = async (
  questionId: number,
): Promise<IQuestionData | null> => {
  await wait(500);
  const results = questions.filter(
    question => question.questionId === questionId,
  );

  return results.length === 0 ? null : results[0];
};

export const searchQuestions = async (
  criteria: string,
): Promise<IQuestionData[]> => {
  await wait(500);

  return questions.filter(
    question =>
      question.title.toLowerCase().indexOf(criteria.toLowerCase()) >= 0 ||
      question.content.toLowerCase().indexOf(criteria.toLowerCase()) >= 0,
  );
};

const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
