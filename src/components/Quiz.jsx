import { useState } from "react";

import DUMMY_DATA from "../questions";

export default function Quiz() {
  const [answers, setAnswers] = useState([]);

  const activeQuestionIndex = answers.length;

  function handleSelectAnswer(selected) {
    setAnswers([...answers, selected]);
  }

  return (
    <div id="question">
      <h2>{DUMMY_DATA[activeQuestionIndex].text}</h2>
      <ul id="answers">
        {DUMMY_DATA[activeQuestionIndex].answers.map((answer) => (
          <li key={answer} className="answer">
            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
