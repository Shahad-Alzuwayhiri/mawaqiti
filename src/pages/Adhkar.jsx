import { useState } from "react";
import adhkar from "../data/adhkar.json";

/* كارد الذكر */
function DhikrCard({ zekr }) {
  const [counter, setCounter] = useState(0);

  const target = Number(zekr.count);

  const handleCounter = () => {
    if (counter < target) {
      setCounter(counter + 1);
    }
  };

  const resetCounter = () => {
    setCounter(0);
  };

  return (
    <div className="card adhkar-card p-4 h-100">

      {/* نص الذكر */}
      <p className="adhkar-text">
        {zekr.text}
      </p>

      {/* الصوت */}
      {zekr.audio && (
  <div className="adhkar-audio mt-3">

    <p className="audio-title">
      <i className="bi bi-volume-up-fill ms-2"></i>
      الاستماع للذكر
    </p>

    <audio
      key={zekr.audio}
      controls
      preload="metadata"
      className="w-100"
      src={`https://mawaqiti-sa.netlify.app${zekr.audio}`}
    >
      المتصفح لا يدعم تشغيل الصوت.
    </audio>

  </div>
)}

      {/* معلومات التكرار */}
      <div className="dhikr-counter-area mt-4">

        <span className="adhkar-count">
          التكرار المطلوب: {target}
        </span>

        {/* العداد */}
        <div className="counter-number my-3">

          {counter >= target ? (
            <span className="completed-text">
              تم ✓
            </span>
          ) : (
            <span>
              {counter} / {target}
            </span>
          )}

        </div>

        {/* الأزرار */}
        <div className="d-flex justify-content-center gap-2">

          <button
            className="btn btn-primary counter-btn"
            onClick={handleCounter}
            disabled={counter >= target}
          >
            {counter >= target ? "أحسنت ✓" : "سبّح"}
          </button>

          {counter > 0 && (
            <button
              className="btn btn-outline-secondary reset-btn"
              onClick={resetCounter}
            >
              إعادة
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

function Adhkar() {
  const [selectedCategory, setSelectedCategory] = useState(adhkar[0]);

  const changeCategory = (e) => {
    const category = adhkar.find(
      (item) => item.id === Number(e.target.value)
    );

    setSelectedCategory(category);
  };

  return (
    <div className="container py-5">

      {/* عنوان الصفحة */}
      <div className="text-center mb-5">

        <h1 className="fw-bold">
          الأذكار
        </h1>

        <p className="text-muted">
          اختر القسم لعرض الأذكار
        </p>

      </div>

      {/* اختيار التصنيف */}
      <div className="row justify-content-center mb-5">

        <div className="col-lg-8">

          <label className="form-label">
            قسم الأذكار
          </label>

          <select
            className="form-select"
            value={selectedCategory.id}
            onChange={changeCategory}
          >

            {adhkar.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.category}
              </option>
            ))}

          </select>

        </div>

      </div>

      {/* اسم القسم */}
      <div className="text-center mb-4">

        <h3 className="fw-bold">
          {selectedCategory.category}
        </h3>

        <p className="text-muted">
          عدد الأذكار: {selectedCategory.array.length}
        </p>

      </div>

      {/* عرض الأذكار */}
      <div className="row g-4">

        {selectedCategory.array.map((zekr) => (
          <div
            className="col-12"
            key={`${selectedCategory.id}-${zekr.id}`}
          >
            <DhikrCard zekr={zekr} />
          </div>
        ))}

      </div>

    </div>
  );
}

export default Adhkar;