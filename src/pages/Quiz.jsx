import { useState, useEffect } from "react";
import he from "he";
import clsx from "clsx";
import getQuestions from "../utils/getQuestions";
import supabase from "../services/supabase-client.js";
import { Loader } from "@mantine/core";
import { useAuth } from "../context/AuthContext";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [points, setPoints] = useState(0);
  const { session } = useAuth();

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
    const goodAnswers = selectedAnswers.filter(
      (q) => q.guessedAnswer === q.decodedCorrect,
    ).length;
    console.log(`Good answers: ${goodAnswers}/${questions.length}`);
    setPoints(goodAnswers * 2);
    if (session) {
      insertData(goodAnswers);
    }
  }

  async function insertData(value) {
    if (!session?.user?.id) return;
    const score = value * 2;

    const { data: currentData, error: selectError } = await supabase
      .from("user_profiles")
      .select("points")
      .eq("id", session.user.id)
      .maybeSingle();

    if (selectError) {
      console.error("Error fetching data: ", selectError.message);
      return;
    }

    const currentScore = currentData?.points || 0;
    const finalScore = currentScore + score;

    console.log("Current score in database: ", currentScore);

    const { error: upsertError } = await supabase.from("user_profiles").upsert(
      {
        id: session.user.id,
        name: session.user.user_metadata.name,
        points: finalScore,
      },
      { onConflict: "id" },
    );

    if (upsertError) {
      console.error("Incorrect record: ", error.message);
      return;
    } else {
      console.log(
        `Points saved successfully: ${currentScore} + ${score} = ${finalScore}`,
      );
    }
  }

  function newGame() {
    setPoints(0);
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
              </p>
              <button type="button" onClick={newGame} className="new-game">
                Play again
              </button>
            </div>
            <div className="score-container">Your score: {points}</div>
          </>
        ) : (
          <button className="check-answers">Check answers</button>
        )}
        {hasError && <p className="error-text">Answer all questions!</p>}
      </form>
    </div>
  );
}
