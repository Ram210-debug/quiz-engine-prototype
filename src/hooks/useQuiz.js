import { useEffect, useState } from "react";
import { fetchQuiz, submitQuiz } from "../api/quizApi";

const ANSWERS_STORAGE_KEY = "quiz-engine-answers";

export const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(ANSWERS_STORAGE_KEY);

    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  const [score, setScore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await fetchQuiz();
        setQuestions(data.questions);
      } catch (error) {
        console.error("Failed to load quiz data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuiz();
  }, []);

  useEffect(() => {
    localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const selectAnswer = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const submit = async () => {
    try {
      const result = await submitQuiz(answers);
      setScore(result);
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    }
  };

  const restartQuiz = () => {
    setAnswers({});
    setScore(null);
    localStorage.removeItem(ANSWERS_STORAGE_KEY);
  };

  return {
    questions,
    answers,
    score,
    isLoading,
    selectAnswer,
    submit,
    restartQuiz,
  };
};