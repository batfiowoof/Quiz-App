import { useEffect, useState } from "react";

export default function Timer({ time, onTimeUp, mode }) {
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    console.log("setting timeout");
    const timer = setTimeout(onTimeUp, time);

    return () => {
      clearTimeout(timer);
    };
  }, [time, onTimeUp]);

  useEffect(() => {
    console.log("setting interval");
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        return prev - 100;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress id="question-time" max={time} value={timeLeft} className={mode} />
  );
}
