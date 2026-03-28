import { useState, useEffect } from "react";
import he from "he";
import clsx from "clsx";
import getQuestions from "../utils/getQuestions";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasError, setHasError] = useState(false);

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
      setHasError(true);
      return;
    }
    setHasError(false);
    setQuestions(selectedAnswers);
  }

  function newGame() {
    loadQuestions();
  }

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>There was an error: {error.message}</h2>;

  const questionHtml = questions.map((question) => {
    return (
      <div key={question.decodedQuestion} className="question-box">
        <h2 className="question-header">{question.decodedQuestion}</h2>
        {question.decodedAnswers.map((answer) => {
          const isSelected = question.guessedAnswer === answer;
          const isCorrect = answer === question.decodedCorrect;
          const isFinished = !!question.guessedAnswer;
          return (
            <label
              key={answer}
              className={clsx(
                "label",
                isFinished && {
                  "good--answer": isSelected && isCorrect,
                  "bad--answer": isSelected && !isCorrect,
                  "highlight--answer": isCorrect,
                },
              )}
            >
              <input
                type="radio"
                className="input-radio"
                name={question.decodedQuestion}
                value={answer}
                defaultChecked={isSelected}
                disabled={isFinished}
              />
              {answer}
            </label>
          );
        })}
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
            ${correctQuestions.length}/${questions.length} correct answers!`}
            </p>
            <button type="button" onClick={newGame} className="new-game">
              Play again
            </button>
          </div>
        ) : (
          <button className="check-answers">Check answers</button>
        )}
        {hasError && <p className="error-text">Answer all questions!</p>}
      </form>
    </div>
  );
}
