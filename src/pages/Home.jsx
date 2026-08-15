import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cities from "../data/cities.json";

function Home() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const showPrayerTimes = () => {
    if (city === "") {
      alert("الرجاء اختيار المدينة");
      return;
    }

    navigate(`/prayer-times?city=${city}`);
  };

  return (
    <div className="container py-5">

      {/* مقدمة المشروع */}
      <section className="home-hero text-center">

        <div className="home-icon mb-3">
          <i className="bi bi-moon-stars-fill"></i>
        </div>

        <h1 className="fw-bold">
          مواقيتي
        </h1>

        <p className="home-description">
          رفيقك اليومي لمعرفة مواقيت الصلاة
          وقراءة الأذكار بسهولة
        </p>


        {/* اختيار المدينة */}
        <div className="row justify-content-center mt-4">

          <div className="col-lg-6 col-md-8">

            <div className="city-selector">

              <label className="form-label fw-bold">
                <i className="bi bi-geo-alt-fill ms-2"></i>
                اختر مدينتك
              </label>

              <select
                className="form-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >

                <option value="">
                  اختر المدينة
                </option>

                {cities.map((item) => (
                  <option
                    key={item.nameEn}
                    value={item.nameEn}
                  >
                    {item.nameAr}
                  </option>
                ))}

              </select>

              <button
                className="btn btn-primary w-100 mt-3"
                onClick={showPrayerTimes}
              >
                <i className="bi bi-clock ms-2"></i>
                عرض مواقيت الصلاة
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* الخدمات */}

      <section className="home-services mt-5">

        <div className="text-center mb-4">
          <h2 className="fw-bold">
            خدمات مواقيتي
          </h2>

          <p className="text-muted">
            كل ما تحتاجه في مكان واحد
          </p>
        </div>


        <div className="row justify-content-center g-4">

          <div className="col-md-5">

            <div className="card service-card text-center p-4 h-100">

              <i className="bi bi-clock-fill service-icon"></i>

              <h4 className="mt-3">
                مواقيت الصلاة
              </h4>

              <p className="text-muted">
                تعرف على مواقيت الصلاة اليومية
                حسب مدينتك.
              </p>

            </div>

          </div>


          <div className="col-md-5">

            <div
              className="card service-card text-center p-4 h-100"
              onClick={() => navigate("/adhkar")}
            >

              <i className="bi bi-book-fill service-icon"></i>

              <h4 className="mt-3">
                الأذكار
              </h4>

              <p className="text-muted">
                اقرأ واستمع إلى الأذكار
                مع عداد للتكرار.
              </p>

              <span className="service-link">
                عرض الأذكار
                <i className="bi bi-arrow-left me-2"></i>
              </span>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;