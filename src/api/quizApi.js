import quizData from "../data/mockQuiz.json";

export const fetchQuiz = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(quizData), 500);
  });
};

export const submitQuiz = (answers) => {
  let score = 0;

  quizData.questions.forEach((q) => {
    const correct = q.options.find((o) => o.isCorrect);
    if (answers[q.id] === correct.id) {
      score++;
    }
  });

  return Promise.resolve({
    score,
    total: quizData.questions.length,
  });
};