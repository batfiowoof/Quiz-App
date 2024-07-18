import { useState, useCallback } from "react";

import Question from "./Question";

import DUMMY_DATA from "../questions";
import quizComplete from "../assets/quiz-complete.png";

export default function Quiz() {
  const [answers, setAnswers] = useState([]);

  const activeQuestionIndex = answers.length;

  const quizIsOver = activeQuestionIndex >= DUMMY_DATA.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selected) {
    setAnswers((prev) => {
      return [...prev, selected];
    });
  }, []);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, []);

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
        onSelectAnswer={handleSelectAnswer}
        onSkip={handleSkipAnswer}
        key={activeQuestionIndex}
        index={activeQuestionIndex}
      />
    </div>
  );
}
