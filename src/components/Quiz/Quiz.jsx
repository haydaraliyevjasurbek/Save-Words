import { useState, useEffect, useCallback } from "react";
import './Quiz.scss'

export default function Quiz({ words, time, onFinish }) {
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const [quizWords] = useState(shuffle(words));
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState(0);
  const [wrongList, setWrongList] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(time * 60);

  const current = quizWords[index];

  const finishQuiz = useCallback(() => {
    onFinish(correct);
  }, [correct, onFinish]);

  useEffect(() => {
    if (timeLeft <= 0) {
      finishQuiz();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, finishQuiz]);

  useEffect(() => {
    if (current) speak(current.en, "en-US");
  }, [current]);

  const speak = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    const isCorrect = answer.trim().toLowerCase() === current.en.toLowerCase();

    if (isCorrect) {
      setCorrect((c) => c + 1);
      setFeedback("✅ To‘g‘ri!");
    } else {
      setWrongList((w) => [...w, current]);
      setFeedback(`❌ Xato! To‘g‘risi: ${current.en}`);
    }

    setTimeout(() => {
      setFeedback("");
      setAnswer("");

      if (index + 1 < quizWords.length) {
        setIndex((i) => i + 1);
      } else {
        finishQuiz();
      }
    }, 2000);
  };

  if (!current) return null;

  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  const percent = Math.round(((index + 1) / quizWords.length) * 100);

  return (
    <div className="quiz">
      <h2 className="quiz__title">📢 So‘z eshiting va inglizchasini yozing</h2>
      <button className="quiz__speaker" onClick={() => speak(current.en, "en-US")}>
        🔊 Qayta eshittir
      </button>

      <div className="quiz__input-wrapper">
        <input
          className="quiz__input"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Inglizcha so‘zni kiriting"
        />
        <button className="quiz__button" onClick={handleNext}>Yuborish</button>
      </div>

      <div className="quiz__stats">
        <p className="quiz__time">⏳ Qolgan vaqt: {min}:{sec.toString().padStart(2, "0")}</p>
        <p className="quiz__progress">📌 {index + 1} / {quizWords.length} ({percent}%)</p>
        <p className="quiz__score">✅ To‘g‘ri: {correct} | ❌ Xato: {wrongList.length}</p>
      </div>

      {feedback && <p className="quiz__feedback">{feedback}</p>}
    </div>
  );
}
