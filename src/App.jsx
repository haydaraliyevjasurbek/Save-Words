import { useState } from "react";
import "./App.scss";
import WordForm from "./components/WordForm/WordForm.jsx";
import Quiz from "./components/Quiz/Quiz.jsx";
import Result from "./components/Result/Result.jsx";
import AboutModal from "./components/AboutModal/AboutModal.jsx";
import AdBanner from "./components/GoogleAds/AdsBanner.jsx";

function App() {
  const [words, setWords] = useState([]);
  const [step, setStep] = useState("form");
  const [score, setScore] = useState(0);
  const [quizTime, setQuizTime] = useState(3);
  const [showAbout, setShowAbout] = useState(
    () => !localStorage.getItem("sw_about_seen")
  );

  const handleStartQuiz = (list, time) => {
    setWords(list);
    setQuizTime(time);
    setStep("quiz");
  };

  const handleFinishQuiz = (correctCount) => {
    setScore(correctCount);
    setStep("result");
  };

  const handleRestart = () => {
    setWords([]);
    setScore(0);
    setStep("form");
  };

  const handleCloseAbout = () => {
    localStorage.setItem("sw_about_seen", "1");
    setShowAbout(false);
  };

  return (
    <div className="app">
      <div className="app__container">
        {step === "form" && <WordForm onSubmit={handleStartQuiz} />}

        {step === "quiz" && (
          <Quiz words={words} time={quizTime} onFinish={handleFinishQuiz} />
        )}

        {step === "result" && (
          <Result score={score} total={words.length} onRestart={handleRestart} />
        )}
      </div>

      {showAbout && <AboutModal onClose={handleCloseAbout} />}

      {/* Reklama faqat result sahifasida ko‘rsatilsin */}
      {step === "result" && <AdBanner />}
    </div>
  );
}

export default App;
