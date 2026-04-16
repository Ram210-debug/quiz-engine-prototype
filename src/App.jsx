import { useEffect, useState } from "react";
import { useQuiz } from "./hooks/useQuiz";
import QuestionCard from "./components/QuestionCard";
import Result from "./components/Result";
import ReviewScreen from "./components/ReviewScreen";

const QUESTION_INDEX_STORAGE_KEY = "quiz-engine-current-question";

function App() {
  const {
    questions,
    answers,
    score,
    isLoading,
    selectAnswer,
    submit,
    restartQuiz,
  } = useQuiz();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedIndex = localStorage.getItem(QUESTION_INDEX_STORAGE_KEY);
    return savedIndex ? Number(savedIndex) : 0;
  });

  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      QUESTION_INDEX_STORAGE_KEY,
      String(currentQuestionIndex)
    );
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex > questions.length - 1) {
      setCurrentQuestionIndex(0);
    }
  }, [questions, currentQuestionIndex]);

  if (isLoading) {
    return (
      <div className="container">
        <p className="status-text">Loading quiz...</p>
      </div>
    );
  }

  if (score) {
    return (
      <Result
        score={score}
        onRestart={() => {
          restartQuiz();
          setCurrentQuestionIndex(0);
          setIsReviewing(false);
          localStorage.removeItem(QUESTION_INDEX_STORAGE_KEY);
        }}
      />
    );
  }

  if (isReviewing) {
    return (
      <main className="container">
        <ReviewScreen
          questions={questions}
          answers={answers}
          onEditQuestion={(index) => {
            setCurrentQuestionIndex(index);
            setIsReviewing(false);
          }}
          onBack={() => setIsReviewing(false)}
          onSubmit={submit}
        />
      </main>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isLastQuestion && currentAnswer) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleReview = () => {
    if (currentAnswer) {
      setIsReviewing(true);
    }
  };

  return (
    <main className="container">
      <section className="quiz-shell">
        <header className="quiz-header">
          <p className="eyebrow">Frontend Assessment</p>
          <h1>Quiz Engine Prototype</h1>
          <p className="subtext">
            A structured assessment designed to evaluate core frontend
            engineering concepts.
          </p>
        </header>

        <div className="progress-meta">
          <span>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="question-jumper">
          {questions.map((question, index) => {
            const isCurrent = index === currentQuestionIndex;
            const isAnswered = Boolean(answers[question.id]);

            return (
              <button
                key={question.id}
                type="button"
                className={`jump-button ${isCurrent ? "current" : ""} ${
                  isAnswered ? "answered" : ""
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        <QuestionCard
          question={currentQuestion}
          selected={currentAnswer}
          onSelect={selectAnswer}
        />

        <div className="navigation">
          <button
            type="button"
            className="secondary-button"
            onClick={handlePrevious}
            disabled={isFirstQuestion}
          >
            Previous
          </button>

          {!isLastQuestion ? (
            <button
              type="button"
              className="primary-button"
              onClick={handleNext}
              disabled={!currentAnswer}
            >
              Next Question
            </button>
          ) : (
            <button
              type="button"
              className="primary-button"
              onClick={handleReview}
              disabled={!currentAnswer}
            >
              Review Answers
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;