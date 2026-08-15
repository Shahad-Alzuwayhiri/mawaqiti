import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import cities from "../data/cities.json";

function PrayerTimes() {
  const [searchParams] = useSearchParams();

  const city = searchParams.get("city");

  const cityData = cities.find((item) => item.nameEn === city);

  const [timings, setTimings] = useState(null);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nextPrayer, setNextPrayer] = useState(null);

  const prayers = [
    {
      name: "الفجر",
      time: timings?.Fajr,
      icon: "bi-moon-stars",
    },
    {
      name: "الشروق",
      time: timings?.Sunrise,
      icon: "bi-sunrise",
    },
    {
      name: "الظهر",
      time: timings?.Dhuhr,
      icon: "bi-sun",
    },
    {
      name: "العصر",
      time: timings?.Asr,
      icon: "bi-cloud-sun",
    },
    {
      name: "المغرب",
      time: timings?.Maghrib,
      icon: "bi-sunset",
    },
    {
      name: "العشاء",
      time: timings?.Isha,
      icon: "bi-moon",
    },
  ];

  // جلب مواقيت الصلاة
  useEffect(() => {
    if (!city) {
      setLoading(false);
      setError("لم يتم اختيار مدينة");
      return;
    }

    const getPrayerTimes = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Saudi%20Arabia&method=4`
        );

        if (!response.ok) {
          throw new Error("فشل الاتصال بالخادم");
        }

        const data = await response.json();

        if (data.code !== 200 || !data.data) {
          throw new Error("فشل جلب البيانات");
        }

        setTimings(data.data.timings);
        setDate(data.data.date);
      } catch (err) {
        console.error(err);
        setError("حدث خطأ أثناء جلب مواقيت الصلاة");
      } finally {
        setLoading(false);
      }
    };

    getPrayerTimes();
  }, [city]);

  // معرفة الصلاة القادمة
  useEffect(() => {
    if (!timings) return;

    const calculateNextPrayer = () => {
      const now = new Date();

      const prayerList = [
        { name: "الفجر", time: timings.Fajr },
        { name: "الظهر", time: timings.Dhuhr },
        { name: "العصر", time: timings.Asr },
        { name: "المغرب", time: timings.Maghrib },
        { name: "العشاء", time: timings.Isha },
      ];

      for (let prayer of prayerList) {
        const [hours, minutes] = prayer.time.split(":").map(Number);

        const prayerTime = new Date();

        prayerTime.setHours(hours, minutes, 0, 0);

        if (prayerTime > now) {
          const difference = prayerTime - now;

          const totalMinutes = Math.floor(
            difference / (1000 * 60)
          );

          const remainingHours = Math.floor(
            totalMinutes / 60
          );

          const remainingMinutes = totalMinutes % 60;

          setNextPrayer({
            name: prayer.name,
            time: prayer.time,
            hours: remainingHours,
            minutes: remainingMinutes,
          });

          return;
        }
      }

      // إذا انتهت جميع صلوات اليوم
      // فالصلاة القادمة هي فجر اليوم التالي

      const [fajrHours, fajrMinutes] =
        timings.Fajr.split(":").map(Number);

      const tomorrowFajr = new Date();

      tomorrowFajr.setDate(
        tomorrowFajr.getDate() + 1
      );

      tomorrowFajr.setHours(
        fajrHours,
        fajrMinutes,
        0,
        0
      );

      const difference = tomorrowFajr - now;

      const totalMinutes = Math.floor(
        difference / (1000 * 60)
      );

      const remainingHours = Math.floor(
        totalMinutes / 60
      );

      const remainingMinutes =
        totalMinutes % 60;

      setNextPrayer({
        name: "الفجر",
        time: timings.Fajr,
        hours: remainingHours,
        minutes: remainingMinutes,
      });
    };

    // نحسب مباشرة
    calculateNextPrayer();

    // نحدث الوقت كل دقيقة
    const interval = setInterval(
      calculateNextPrayer,
      60000
    );

    return () => clearInterval(interval);

  }, [timings]);

  // التحميل
  if (loading) {
    return (
      <div className="container py-5 text-center">

        <div
          className="spinner-border"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <p className="mt-3">
          جاري تحميل مواقيت الصلاة...
        </p>

      </div>
    );
  }

  // الخطأ
  if (error) {
    return (
      <div className="container py-5 text-center">

        <div className="alert alert-danger">
          {error}
        </div>

        <Link
          to="/"
          className="btn btn-primary"
        >
          اختيار مدينة
        </Link>

      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* عنوان الصفحة */}

      <div className="text-center mb-4">

        <h1 className="fw-bold">
          مواقيت الصلاة
        </h1>

        <p className="text-muted">
          مواقيت الصلاة اليومية حسب مدينتك
        </p>

      </div>

      {/* المدينة */}

      <div className="date-info text-center mb-4">

        <div className="city-name mb-3">

          <i className="bi bi-geo-alt-fill"></i>

          <span>
            {cityData?.nameAr || city}
          </span>

        </div>

        {/* اليوم والتاريخ */}

        {date && (
          <>

            <h3 className="day-name">
              {date.hijri.weekday.ar}
            </h3>

            <div className="row justify-content-center mt-3 g-3">

              <div className="col-lg-4 col-md-5 col-12">

                <div className="date-box">

                  <i className="bi bi-calendar3"></i>

                  <span>
                    التاريخ الميلادي
                  </span>

                  <strong>
                    {date.gregorian.date}
                  </strong>

                </div>

              </div>

              <div className="col-lg-4 col-md-5 col-12">

                <div className="date-box">

                  <i className="bi bi-moon-stars"></i>

                  <span>
                    التاريخ الهجري
                  </span>

                  <strong>
                    {date.hijri.day}{" "}
                    {date.hijri.month.ar}{" "}
                    {date.hijri.year} هـ
                  </strong>

                </div>

              </div>

            </div>

          </>
        )}

      </div>

      {/* الصلاة القادمة */}

      {nextPrayer && (
        <div className="row justify-content-center mb-5">

          <div className="col-lg-8">

            <div className="next-prayer-card text-center">

              <p className="next-prayer-label">
                الصلاة القادمة
              </p>

              <h2>
                {nextPrayer.name}
              </h2>

              <div className="next-prayer-time">
                {nextPrayer.time}
              </div>

              <p className="remaining-time">
                متبقي{" "}

                {nextPrayer.hours > 0 &&
                  `${nextPrayer.hours} ساعة و `}

                {nextPrayer.minutes} دقيقة
              </p>

            </div>

          </div>

        </div>
      )}

      {/* مواقيت الصلاة */}

      {timings && (
        <div className="row g-4">

          {prayers.map((prayer) => (

            <div
              className="col-lg-4 col-md-6 col-12"
              key={prayer.name}
            >

              <div className="card prayer-card text-center p-4 h-100">

                <i
                  className={`bi ${prayer.icon} fs-2 mb-3`}
                ></i>

                <h4>
                  {prayer.name}
                </h4>

                <p className="fs-4 fw-bold mb-0">
                  {prayer.time}
                </p>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* تغيير المدينة */}

      <div className="text-center mt-5">

        <Link
          to="/"
          className="btn btn-primary"
        >
          <i className="bi bi-geo-alt ms-2"></i>

          اختيار مدينة أخرى
        </Link>

      </div>

    </div>
  );
}

export default PrayerTimes;