export default async function getQuestions() {
  const savedSettings = JSON.parse(localStorage.getItem("quizSettings")) || {
    amount: 5,
    category: "",
    difficulty: "",
    type: "multiple",
  };

  const { amount, category, difficulty, type } = savedSettings;

  let url = `https://opentdb.com/api.php?amount=${amount}`;

  if (category) url += `&category=${category}`;
  if (difficulty) url += `&difficulty=${difficulty}`;
  if (type) url += `&type=${type}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Error fetching data",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.results;
}
