import { useState } from "react";
import "./AboutModal.scss";

export default function AboutModal({ onClose }) {
  const [dontShow, setDontShow] = useState(false);

  const handleClose = () => {
    if (dontShow) localStorage.setItem("sw_about_seen", "99");
    onClose();
  };

  return (
    <div className="about-modal">
      <div className="about-modal__backdrop" onClick={handleClose} />
      <div className="about-modal__card">
        <header className="about-modal__head">
          <h3 className="about-modal__title">SaveWords — So‘z yodlash va test</h3>
          <p className="about-modal__subtitle">
            Eshit, yoz va esla — oddiy, tez va samarali. So‘zlaringizni kiriting va testni boshlang.
          </p>
        </header>

        <div className="about-modal__body">
          <ul className="about-modal__list">
            <li><strong>So‘zlarni kiritish:</strong> "English - Uzbek" formatida yozing.</li>
            <li><strong>Avtomatik talaffuz:</strong> har bir so‘z brauzer tomonidan o‘qiladi.</li>
            <li><strong>Vaqt:</strong> foydalanuvchi belgilagan daqiqalar asosida.</li>
            <li><strong>Maxfiylik:</strong> dastlab maʼlumot faqat sizning brauzeringizda saqlanadi.</li>
          </ul>

          <div className="about-modal__quick">
            <h4>Qanday boshlash:</h4>
            <ol>
              <li>So‘zlarni textarea-ga kiriting.</li>
              <li>Vaqtni belgilang va "Boshlash" tugmasini bosing.</li>
              <li>So‘zni eshitib inglizchasini kiriting va natijani ko‘ring.</li>
            </ol>
          </div>
        </div>

        <footer className="about-modal__foot">
          <label className="about-modal__dont">
            <input
              type="checkbox"
              checked={dontShow}
              onChange={(e) => setDontShow(e.target.checked)}
            />
            Keyin ko‘rsatmasin
          </label>

          <div className="about-modal__actions">
            <button className="btn btn--primary" onClick={handleClose}>Boshlash</button>
            <button className="btn" onClick={handleClose}>Yopish</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
