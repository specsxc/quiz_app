import { useState, useEffect } from "react";
import he from "he";
import clsx from "clsx";
import getQuestions from "../utils/getQuestions";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const showResults =
    questions.length > 0 && questions.every((q) => !!q.guessedAnswer);

  const correctQuestions = questions.filter(
    (q) => q.guessedAnswer === q.decodedCorrect,
  );

  async function loadQuestions() {
    setLoading(true);
    try {
      const data = await getQuestions();
      const data2 = data.map((question) => {
        const decodedQuestion = he.decode(question.question);
        const decodedCorrect = he.decode(question.correct_answer);
        const decodedAnswers = [
          ...question.incorrect_answers.map((ans) => he.decode(ans)),
        ];
        const randomIndex = Math.floor(
          Math.random() * (decodedAnswers.length + 1),
        );
        decodedAnswers.splice(randomIndex, 0, decodedCorrect);
        return {
          ...question,
          decodedAnswers,
          decodedQuestion,
          decodedCorrect,
        };
      });
      setQuestions(data2);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  function checkAnswers(formData) {
    const selectedAnswers = questions.map((data) => ({
      ...data,
      guessedAnswer: formData.get(data.decodedQuestion),
    }));

    if (selectedAnswers.some((q) => !q.guessedAnswer)) {
      return alert("Answer all questions!");
    }
    setQuestions(selectedAnswers);
  }

  function newGame() {
    loadQuestions();
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>There was an error: {error.message}</h2>;
  }

  const questionHtml = questions.map((chall, index) => {
    return (
      <div key={index} className="question-box">
        <h2 className="question-header">{chall.decodedQuestion}</h2>
        {chall.decodedAnswers.map((answer, index) => (
          <label
            htmlFor={answer}
            key={index}
            className={clsx(
              "label",
              chall.guessedAnswer && {
                "good--answer": chall.decodedCorrect === chall.guessedAnswer,
                "bad--answer": chall.decodedCorrect !== chall.guessedAnswer,
                "highlight--answer": answer === chall.decodedCorrect,
              },
            )}
          >
            <input
              type="radio"
              id={answer}
              className="input-radio"
              name={chall.decodedQuestion}
              value={answer}
              defaultChecked={chall.guessedAnswer === answer}
              disabled={!!chall.guessedAnswer}
            />
            {answer}
          </label>
        ))}
      </div>
    );
  });

  return (
    <div className="questions-container">
      <form action={checkAnswers}>
        {questionHtml}
        {showResults ? (
          <div className="new-game-container">
            <p className="new-game-text">
              {`You scored
            ${correctQuestions.length}/${questions.length} correct answers`}
            </p>
            <button type="button" onClick={newGame} className="new-game">
              Play again
            </button>
          </div>
        ) : (
          <button className="check-answers">Check answers</button>
        )}
      </form>
    </div>
  );
}
