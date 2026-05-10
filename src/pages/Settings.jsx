import { useState, useEffect } from "react";

export default function Settings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("quizSettings");
    return saved
      ? JSON.parse(saved)
      : {
          amount: 5,
          category: "",
          difficulty: "",
          type: "multiple",
        };
  });

  useEffect(() => {
    localStorage.setItem("quizSettings", JSON.stringify(settings));
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-container">
        <h2>Quiz Settings</h2>
        <p>Your choices are saved automatically.</p>
        <div className="setting-item">
          <label htmlFor="amount">Number of Questions:</label>
          <input
            type="number"
            name="amount"
            id="amount"
            min="1"
            max="50"
            value={settings.amount}
            onChange={handleChange}
          />
        </div>

        <div className="setting-item">
          <label htmlFor="category">Select Category:</label>
          <select
            name="category"
            id="category"
            value={settings.category}
            onChange={handleChange}
          >
            <option value="">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals & Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime & Manga</option>
            <option value="32">Entertainment: Cartoon & Animations</option>
          </select>
        </div>

        <div className="setting-item">
          <label htmlFor="difficulty">Select Difficulty:</label>
          <select
            name="difficulty"
            id="difficulty"
            value={settings.difficulty}
            onChange={handleChange}
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="setting-item">
          <label htmlFor="type">Select Type:</label>
          <select
            name="type"
            id="type"
            value={settings.type}
            onChange={handleChange}
          >
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>
      </div>
    </div>
  );
}
