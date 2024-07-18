import { useState, useCallback } from "react";

import Question from "./Question";

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

  return (
    <div id="quiz">
      <Question
        questionText={DUMMY_DATA[activeQuestionIndex].text}
        answers={DUMMY_DATA[activeQuestionIndex].answers}
        onSelectAnswer={handleSelectAnswer}
        answerState={answerState}
        selected={answers[answers.length - 1]}
        onSkip={handleSkipAnswer}
        key={activeQuestionIndex}
      />
    </div>
  );
}
