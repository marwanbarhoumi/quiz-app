import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import data, {answers} from "../database/data.js"

import * as Action from "../redux/question_reducer";
import { getServerData } from "../helper/helper.js";


export const useFetchQuestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    setGetData(prev => ({ ...prev, isLoading: true }));

    (async () => {
      try {
        let question = await data;

         //const [{ questions, answers }] =await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data) => data);
         //console.log({questions, answers})

        if (question.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, apiData: question }));

          dispatch(Action.startExamAction({ question, answers }));
        } else {
          throw new Error("No Question Available");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);

  return [getData, setGetData];
};

export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction());
  } catch (error) {
    console.error(error); // Consider logging errors for debugging purposes
  }
};

export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction());
  } catch (error) {
    console.error(error); // Consider logging errors for debugging purposes
  }
};
