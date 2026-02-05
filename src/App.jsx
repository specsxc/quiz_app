import { useState } from "react";
import "./App.css";
import WelcomeText from "./components/WelcomeText";
import Questions from "./components/Questions";

export default function App() {
  const [page, setPage] = useState(1);
  const [question, setQuestion] = useState([]);

  return (
    <>
      {page === 1 && <WelcomeText setPage={setPage} />}
      {page === 2 && (
        <Questions setQuestion={setQuestion} question={question} />
      )}
    </>
  );
}
