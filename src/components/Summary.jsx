import quizComplete from "../assets/quiz-complete.png";

export default function Summary({ answers, questions }) {
  const skippedAnswers = answers.filter((answer) => answer === null).length;
  const correctAnswers = answers.filter(
    (answer, index) => answer === questions[index].answers[0]
  ).length;

  const skippedPercent = Math.round((skippedAnswers / questions.length) * 100);
  const correctPercent = Math.round((correctAnswers / questions.length) * 100);
  const wrongPercent = 100 - skippedPercent - correctPercent;

  return (
    <div id="summary">
      <img src={quizComplete} alt="Quiz complete" />
      <h2>Quiz complete!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPercent}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctPercent}%</span>
          <span className="text">correctly answered</span>
        </p>
        <p>
          <span className="number">{wrongPercent}%</span>
          <span className="text">incorrectly answered</span>
        </p>
      </div>
      <ol>
        {answers.map((answer, index) => {
          let cssClass = "user-answer";

          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === questions[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{questions[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
