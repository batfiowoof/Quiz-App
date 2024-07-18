import { useState, useCallback } from "react";

import Timer from "./Timer";

import DUMMY_DATA from "../questions";
import quizComplete from "../assets/quiz-complete.png";

export default function Quiz() {
  const [answers, setAnswers] = useState([]);

  const activeQuestionIndex = answers.length;

  const quizIsOver = activeQuestionIndex >= DUMMY_DATA.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selected) {
    setAnswers((prev) => [...prev, selected]);
  }, []);

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
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
