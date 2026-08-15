import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg mawaqiti-navbar">
        <div className="container">

          {/* اللوقو */}
          <NavLink
            className="navbar-brand d-flex align-items-center gap-2"
            to="/"
          >
            <img
              src="/images/logo.png"
              alt="شعار مواقيتي"
              className="navbar-logo"
            />

            <span>مواقيتي</span>
          </NavLink>


          {/* زر الجوال */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="فتح القائمة"
          >
            <span className="navbar-toggler-icon"></span>
          </button>


          {/* الروابط */}
          <div
            className="collapse navbar-collapse"
            id="mainNavbar"
          >
            <div className="navbar-nav me-auto">

              <NavLink
                className="nav-link"
                to="/"
              >
                الرئيسية
              </NavLink>

              <NavLink
                className="nav-link"
                to="/prayer-times"
              >
                مواقيت الصلاة
              </NavLink>

              <NavLink
                className="nav-link"
                to="/adhkar"
              >
                الأذكار
              </NavLink>

            </div>
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Header;