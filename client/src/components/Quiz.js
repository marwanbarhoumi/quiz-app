import React, { useState } from "react";
import Questions from "./Questions";
import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion";
import { PushAnswer } from "../hooks/setResult";

/**redux store import */
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
export default function Quiz() {
  const [check, setChecked] = useState(""); // Initialize with an appropriate default value

  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  /** next button event handler */
  function onNext() {
    if(trace < queue.length){
    dispatch(MoveNextQuestion());

    //console.log("On Next Click");
    if (trace < queue.length) {
      dispatch(PushAnswer(check)); // Dispatch PushAnswer after MoveNextQuestion
    }
  }

  /** reset the value of the checked variable*/
 setChecked(undefined)

  }



  /** Prev button event handler */
  function onPrev() {
    if (trace > 0) {
      dispatch(MovePrevQuestion());
    }
  }

  function onChecked(check) {
    console.log(check);
    setChecked(check);
  }

  /** finished exam after the last question */
  if (result.length && result.length >= queue.length && queue.length > 0) { // Add check for queue length
    return <Navigate to={"/result"} replace={true}></Navigate>;
  }

  return (
    <div className="container">
      <h1 className="title text-ligth">Quiz Application</h1>
      {/* display question */}
      <Questions onChecked={onChecked} />

      <div className="grid">
        {trace > 0 ? (
          <button className="btn prev" onClick={onPrev}>
            Prev
          </button>
        ) : (
          <div> </div>
        )}
        <button className="btn next" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

