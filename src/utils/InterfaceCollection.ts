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
