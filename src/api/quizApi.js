import quizData from "../data/mockQuiz.json";

export const fetchQuiz = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(quizData), 300);
  });
};

export const submitQuiz = (answers) => {
  let score = 0;

  const results = quizData.questions.map((question) => {
    const correctOption = question.options.find((option) => option.isCorrect);
    const selectedOptionId = answers[question.id];
    const isCorrect = selectedOptionId === correctOption.id;

    if (isCorrect) {
      score += 1;
    }

    return {
      questionId: question.id,
      questionText: question.text,
      selectedOptionId,
      selectedOptionText:
        question.options.find((option) => option.id === selectedOptionId)?.text ||
        "No answer selected",
      correctOptionId: correctOption.id,
      correctOptionText: correctOption.text,
      isCorrect,
    };
  });

  return Promise.resolve({
    score,
    total: quizData.questions.length,
    results,
  });
};