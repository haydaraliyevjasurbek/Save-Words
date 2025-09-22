import "./Result.scss"

export default function Result({ score, total, onRestart }) {
  return (
    <div className="result">
      <h2 className="result__title">Natija:</h2>
      <p className="result__score">
        Sizning natijangiz: {score} / {total}
      </p>
      <button className="result__button" onClick={onRestart}>
        Yangi testga o‘tish
      </button>
    </div>
  );
}
