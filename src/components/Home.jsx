import { NavLink } from "react-router";

export default function Home() {
  // const activeStyles = {
  //   fontWeight: "bold",
  //   textDecoration: "underline",
  //   color: "#161616",
  // };

  return (
    <div className="page-layout">
      <h1 className="welcome-title">Quizzical</h1>
      <h2 className="welcome-desc">Some description if needed</h2>
      <NavLink
        className="start-button"
        to="/quiz"
        // style={({ isActive }) => (isActive ? activeStyles : null)}
      >
        Start quiz
      </NavLink>
      {/* <button className="start-button">Start quiz</button> */}
    </div>
  );
}
