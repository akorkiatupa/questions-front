import { http } from "../utils/HttpClient";
import {
  IQuestionData,
  IQuestionDataFromServer,
  mapQuestionFromServer,
} from "../utils/InterfaceCollection";

export const getUnansweredQuestions = async (): Promise<IQuestionData[]> => {
  try {
    const result = await http<undefined, IQuestionDataFromServer[]>({
      path: "/questions/unanswered",
    });

    if (result.parsedBody) {
      return result.parsedBody.map(mapQuestionFromServer);
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getQuestion = async (
  questionId: number,
): Promise<IQuestionData | null> => {
  try {
    const result = await http<undefined, IQuestionDataFromServer>({
      path: `/questions/${questionId}`,
    });

    if (result.ok && result.parsedBody) {
      return mapQuestionFromServer(result.parsedBody);
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const searchQuestions = async (
  criteria: string,
): Promise<IQuestionData[]> => {
  try {
    const request = await http<undefined, IQuestionDataFromServer[]>({
      path: `/questions?search=${criteria}`,
    });

    if (request.ok && request.parsedBody) {
      return request.parsedBody.map(mapQuestionFromServer);
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
