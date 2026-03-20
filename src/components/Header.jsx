import { NavLink, Link } from "react-router";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function Header() {
  return (
    <div className="header-container">
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
      <MdOutlineAccountCircle className="account-icon" />
    </div>
  );
}
