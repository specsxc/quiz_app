import { NavLink, Link } from "react-router";
import DropdownMenu from "./DropdownMenu";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";
import { useState, useEffect } from "react";

export default function Header() {
  const [opened, { toggle }] = useDisclosure();
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
        <Burger
          opened={opened}
          onClick={toggle}
          aria-label="Toggle navigation"
        />
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
