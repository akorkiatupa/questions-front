import { IQuestionData } from "../utils/InterfaceCollection";
import {
  Action,
  ActionCreator,
  Dispatch,
  Reducer,
  combineReducers,
  Store,
  createStore,
  applyMiddleware,
} from "redux";

import thunk, { ThunkAction } from "redux-thunk";

import {
  getAllQuestionsDummy,
  IPostQuestionData,
  postQuestion,
} from "../utils/DummyQuestions";
// NOTE these should be always protected by readonly to reduce change of misusage
interface IQuestionsState {
  readonly loading: boolean;
  readonly unanswered: IQuestionData[] | null;
  readonly postedResult?: IQuestionData;
}

const initialQuestionState: IQuestionsState = {
  loading: false,
  unanswered: null,
};

// APP STATE STRUCTURE
export interface AppState {
  readonly questions: IQuestionsState;
}

// combine all question actions into single type
type QuestionActions =
  | IGettingUnansweredQuestionsAction
  | IGotUnansweredQuestionsAction
  | IPostedQuestionAction;

interface IGettingUnansweredQuestionsAction
  extends Action<"GettingUnansweredQuestions"> {}

export interface IGotUnansweredQuestionsAction
  extends Action<"GotUnansweredQuestions"> {
  questions: IQuestionData[];
}

// action creator
export const getUnansweredQuestionsActionCreator: ActionCreator<ThunkAction<
  Promise<void>,
  IQuestionData[],
  null,
  IGotUnansweredQuestionsAction
>> = () => {
  return async (dispatch: Dispatch) => {
    const gettingUnansweredQuestionsAction: IGettingUnansweredQuestionsAction = {
      type: "GettingUnansweredQuestions",
    };

    dispatch(gettingUnansweredQuestionsAction);

    const questions = await getAllQuestionsDummy();

    const gotUnansweredQuestions: IGotUnansweredQuestionsAction = {
      type: "GotUnansweredQuestions",
      questions: questions,
    };

    dispatch(gotUnansweredQuestions);
  };
};

export interface IPostedQuestionAction extends Action<"PostedQuestion"> {
  result: IQuestionData | undefined;
}

// action creator, async
export const postQuestionActionCreator: ActionCreator<ThunkAction<
  Promise<void>,
  IQuestionData,
  IPostQuestionData,
  IPostedQuestionAction
>> = (question: IPostQuestionData) => {
  return async (dispatch: Dispatch) => {
    const result = await postQuestion(question);
    const postedQuestionAction: IPostedQuestionAction = {
      type: "PostedQuestion",
      result: result,
    };

    dispatch(postedQuestionAction);
  };
};

// action creator, synchronous
export const clearPostedQuestionActionCreator: ActionCreator<IPostedQuestionAction> = () => {
  const postedQuestionAction: IPostedQuestionAction = {
    type: "PostedQuestion",
    result: undefined,
  };
  return postedQuestionAction;
};

// reducer for questions
const questionsReducer: Reducer<IQuestionsState, QuestionActions> = (
  state = initialQuestionState, // current application state
  action, // action to be processed, has to be presented in questionActions type
) => {
  // TODO - handle the different actions adn return new state

  switch (action.type) {
    case "GettingUnansweredQuestions": {
      // TODO: return new state
      return {
        ...state,
        unanswered: null,
        loading: true,
      };
    }
    case "GotUnansweredQuestions": {
      return {
        ...state,
        unanswered: action.questions,
        loading: false,
      };
    }
    case "PostedQuestion": {
      return {
        ...state,
        unanswered: action.result
          ? (state.unanswered || []).concat(action.result)
          : state.unanswered,
        postedResult: action.result,
      };
    }
    default:
      neverReached(action);
  }

  return state;
};

// to throw typescript error if reached
const neverReached = (never: never) => {};

const rootReducer = combineReducers<AppState>({ questions: questionsReducer });

// finally creating the store object. In real world application should split the reducers actions & action creators
export function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
