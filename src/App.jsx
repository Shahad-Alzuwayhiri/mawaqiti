import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import PrayerTimes from "./pages/PrayerTimes";
import Adhkar from "./pages/Adhkar";

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prayer-times" element={<PrayerTimes />} />
          <Route path="/adhkar" element={<Adhkar />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;