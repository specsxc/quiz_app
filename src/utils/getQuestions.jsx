export default async function getQuestions() {
  const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
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
