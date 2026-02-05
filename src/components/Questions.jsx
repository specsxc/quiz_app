import { useEffect } from "react";
import he from "he";

export default function Questions({ setQuestion, question }) {
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => {
        if (!res.ok) throw new Error("Błąd API: " + res.status);
        return res.json();
      })
      .then((data) => {
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
      });
  }, [setQuestion]);

  const questionHtml = question.map((chall, index) => {
    return (
      <div key={index} className="question-box">
        <h2 className="question-header">{chall.decodedQuestion}</h2>
        {chall.decodedAnswers.map((answer, index) => (
          <label key={index} className="label">
            <input
              type="radio"
              className="input-radio"
              name={chall.decodedQuestion}
              value={answer}
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
    const isGuessedCorrect = question.map(
      (check) => check.decodedCorrect === check.guessedAnswer,
    );
    console.log(isGuessedCorrect);
    console.log(question);
  }

  return (
    <div className="questions-container">
      <form action={checkAnswers}>
        {questionHtml}
        <button className="check-answers">Check answers</button>
      </form>
    </div>
  );
}
