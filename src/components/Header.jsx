import { NavLink, Link } from "react-router";
import { useState, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";
import BurgerMenu from "./BurgerMenu";

export default function Header() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div className="header-container">
      {width < 720 ? (
        <BurgerMenu />
      ) : (
        <>
          <Link className="site-logo" to="/">
            Quizzical
          </Link>
          <div className="link-container">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : null}`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/quiz"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : null}`
              }
            >
              Start quiz
            </NavLink>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : null}`
              }
            >
              Leaderboard
            </NavLink>
          </div>
        </>
      )}
      <DropdownMenu />
    </div>
  );
}
