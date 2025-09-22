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
  const [time, setTime] = useState(3);
  const [showAbout, setShowAbout] = useState(
    () => !localStorage.getItem("sw_about_seen")
  );

  return (
    <div className="app">
      <div className="app__container">
        {step === "form" && (
          <WordForm
            onSubmit={(list, time) => {
              setWords(list);
              setTime(time);
              setStep("quiz");
            }}
          />
        )}

        {step === "quiz" && (
          <Quiz
            words={words}
            time={time}
            onFinish={(correctCount) => {
              setScore(correctCount);
              setStep("result");
            }}
          />
        )}

        {step === "result" && (
          <Result
            score={score}
            total={words.length}
            onRestart={() => setStep("form")}
          />
        )}
      </div>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      <AdBanner />
    </div>
  );
}

export default App;
