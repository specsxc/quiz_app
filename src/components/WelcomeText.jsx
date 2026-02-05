export default function WelcomeText({ setPage }) {
  return (
    <div className="page-layout">
      <h1 className="welcome-title">Quizzical</h1>
      <h2 className="welcome-desc">Some description if needed</h2>
      <button
        className="start-button"
        onClick={() => setPage((prev) => prev + 1)}
      >
        Start quiz
      </button>
    </div>
  );
}
