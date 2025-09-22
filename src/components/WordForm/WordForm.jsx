import { useState } from "react";
import "./WordForm.scss";

export default function WordForm({ onSubmit }) {
  const [input, setInput] = useState("");
  const [time, setTime] = useState(3);

  const handleSubmit = () => {
    // Bo‘sh joylarni olib tashlab, satrlarni ajratish
    const lines = input
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    const list = lines
      .map((line) => {
        const parts = line.split("-").map((p) => p.trim());
        if (parts.length < 2) return null; // xato formatni rad etish
        return {
          en: parts[0],
          uz: parts.slice(1).join("-").replace(/,$/, ""), // ko‘p "-" bo‘lsa qo‘shib olish
        };
      })
      .filter(Boolean); // nulllarni olib tashlash

    if (list.length === 0) {
      alert("Iltimos, so‘zlarni 'English - Uzbek' formatida kiriting!");
      return;
    }

    const parsedTime = parseInt(time, 10);
    if (isNaN(parsedTime) || parsedTime <= 0) {
      alert("Iltimos, to‘g‘ri vaqtni kiriting!");
      return;
    }

    // Hammasi to‘g‘ri bo‘lsa submit qilamiz
    onSubmit(list, parsedTime);
  };
  const example = `
  Misol uchun:
  Run - Yugurmoq,
  Hunt - Ov qilmoq, 
  Apple - Olma
  `
  return (
    <div className="word-form">
      <h2 className="word-form__title">
        So‘zlar ro‘yxatini va vaqtni kiriting:
      </h2>
      <textarea
        className="word-form__textarea"
        rows={6}
        cols={40}
        placeholder={example}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="word-form__controls">
        <label className="word-form__label">Vaqtni kiriting (daqiqa):</label>
        <input
          className="word-form__input"
          type="number"
          value={time}
          onChange={(e) => setTime(Math.max(1, e.target.value))}
          min="1"
        />
      </div>
      <button className="word-form__button" onClick={handleSubmit}>
        Boshlash
      </button>
    </div>
  );
}
