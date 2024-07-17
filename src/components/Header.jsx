import quizLogo from "../assets/quiz-logo.png";

export default function Header() {
  return (
    <header>
      <img src={quizLogo} alt="Empty notebook" />
      <h1>Quiz App</h1>
    </header>
  );
}
