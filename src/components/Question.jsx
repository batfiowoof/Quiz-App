import Timer from "./Timer";
import Answers from "./Answers";

export default function Question({
  questionText,
  answers,
  onSelectAnswer,
  answerState,
  selected,
  onSkip,
}) {
  return (
    <div id="question">
      <Timer time={10000} onTimeUp={onSkip} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selected={selected}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}
