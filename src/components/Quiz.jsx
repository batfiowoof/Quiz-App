import { useState, useCallback } from "react";

import Question from "./Question";
import Summary from "./Summary";

import DUMMY_DATA from "../questions";

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
    return <Summary answers={answers} questions={DUMMY_DATA} />;
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
