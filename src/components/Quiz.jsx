import { useState, useCallback } from "react";

import Timer from "./Timer";

import DUMMY_DATA from "../questions";
import quizComplete from "../assets/quiz-complete.png";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [answers, setAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? answers.length : answers.length - 1;

  const quizIsOver = activeQuestionIndex >= DUMMY_DATA.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selected) {
      setAnswerState("answered");
      setAnswers((prev) => {
        return [...prev, selected];
      });

      setTimeout(() => {
        if (selected === DUMMY_DATA[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (quizIsOver) {
    return (
      <div id="summary">
        <img src={quizComplete} alt="Quiz complete" />
        <h2>Quiz complete!</h2>
      </div>
    );
  }

  const shuffledAnswers = [...DUMMY_DATA[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <Timer
          key={activeQuestionIndex}
          time={10000}
          onTimeUp={handleSkipAnswer}
        />
        <h2>{DUMMY_DATA[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            const isSelected = answers[answers.length - 1] === answer;
            let cssClasses = "";

            if (answerState === "answered" && isSelected) {
              cssClasses = "selected";
            }
            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              cssClasses = answerState;
            }
            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClasses}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
