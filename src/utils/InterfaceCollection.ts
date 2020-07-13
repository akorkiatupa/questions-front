export interface IQuestionData {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  answers: IAnswerData[];
}

export interface IAnswerData {
  answerId: number;
  content: string;
  userName: string;
  created: Date;
}

export interface IQuestionDataFromServer {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: string;
  answers: IAnswerDataFromServer[];
}

export interface IAnswerDataFromServer {
  answerId: number;
  content: string;
  userName: string;
  created: string;
}

export const mapQuestionFromServer = (
  question: IQuestionDataFromServer,
): IQuestionData => ({
  ...question,
  created: new Date(question.created.substr(0, 19)),
  answers: question.answers.map(answer => ({
    ...answer,
    created: new Date(answer.created.substr(0, 19)),
  })),
});
