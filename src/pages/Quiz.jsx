import { useState, useEffect } from "react";
import he from "he";
import clsx from "clsx";
import getQuestions from "../utils/getQuestions";
import supabase from "../services/supabase-client.js";
import { Loader } from "@mantine/core";

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

  const score = (correctQuestions.length / questions.length) * 10;

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
    // oblicz ile poprawnych odpowiedzi
    const goodAnswers = selectedAnswers.filter(
      (q) => q.guessedAnswer === q.decodedCorrect,
    ).length;
    console.log("tutaj: ", goodAnswers);
    // jesli jest sesja usera -> uruchom funkcję która doda wynik ("score") do bazy
    insertData(goodAnswers);
  }

  async function insertData(value) {
    console.log("Questions log:", questions.length);
    console.log("Value log:", value);
    const score = (value / questions.length) * 10;

    const { data: currentData } = await supabase
      .from("names")
      .select("points")
      .eq("id", 4)
      .maybeSingle();

    const currentScore = currentData?.points || 0;

    console.log("Current score: ", currentScore);
    console.log("Score achieved: ", score);

    const { error } = await supabase.from("names").upsert(
      {
        id: 4,
        points: currentScore + score,
      },
      { onConflict: "id" },
    );

    if (error) {
      console.error("Błąd zapisu:", error.message);
    } else {
      console.log("Dane zapisane pomyślnie:", currentScore + score);
    }
  }

  function newGame() {
    loadQuestions();
  }

  if (loading)
    return (
      <div className="full-section">
        <Loader color="blue" size={150} />
      </div>
    );

  if (error)
    return (
      <h2 className="full-section">There was an error: {error.message}</h2>
    );

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
          <>
            <div className="new-game-container">
              <p className="new-game-text">
                {`You scored
            ${correctQuestions.length}/${questions.length} correct answers!`}
                {console.log(score)}
              </p>
              <button type="button" onClick={newGame} className="new-game">
                Play again
              </button>
            </div>
            <div>Your score: {score}</div>
          </>
        ) : (
          <button className="check-answers">Check answers</button>
        )}
        {hasError && <p className="error-text">Answer all questions!</p>}
      </form>
    </div>
  );
}
