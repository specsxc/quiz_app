import { useEffect, useCallback } from "react";
import he from "he";
import clsx from "clsx";

export default function Questions({ setQuestion, question }) {
  const showResults = question.length > 0 && !!question[0].guessedAnswer;

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple",
      );
      if (!res.ok) throw new Error("Błąd API: " + res.status);
      const data = await res.json();
      const formattedData = data.results.map((question) => {
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
      setQuestion(formattedData);
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    }
  }, [setQuestion]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const questionHtml = question.map((chall, index) => {
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

  function checkAnswers(formData) {
    const selectedAnswers = question.map((data) => {
      const guessedAnswer = formData.get(data.decodedQuestion);
      return { ...data, guessedAnswer };
    });
    setQuestion(selectedAnswers);
  }

  function newGame() {
    setQuestion([]);
    fetchData();
  }

  return question.length === 0 ? (
    <h2 className="loading">Loading...</h2>
  ) : (
    <div className="questions-container">
      <form action={checkAnswers}>
        {questionHtml}
        {!showResults && (
          <button className="check-answers">Check answers</button>
        )}
      </form>
      {showResults && (
        <div className="new-game-container">
          <p className="new-game-text">
            {`You scored
            ${
              question.filter((q) => q.guessedAnswer === q.decodedCorrect)
                .length
            }/${question.length} correct answers`}
          </p>
          <button type="button" onClick={newGame} className="new-game">
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
