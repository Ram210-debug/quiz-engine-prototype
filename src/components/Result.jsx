export default function Result({ score, onRestart }) {
    const percentage = Math.round((score.score / score.total) * 100);
  
    const getFeedback = () => {
      if (percentage === 100) {
        return "Excellent performance. You answered every question correctly.";
      }
  
      if (percentage >= 75) {
        return "Strong result. You demonstrated a solid understanding of the material.";
      }
  
      if (percentage >= 50) {
        return "Good effort. There is a solid foundation, with room for improvement.";
      }
  
      return "A useful first attempt. Reviewing the concepts and trying again should improve the result.";
    };
  
    return (
      <main className="container">
        <section className="result-card">
          <p className="eyebrow">Assessment Complete</p>
          <h2>Final Score</h2>
          <p className="result-text">{getFeedback()}</p>
  
          <div className="score-block">
            <p className="score-value">
              {score.score} / {score.total}
            </p>
            <p className="score-percentage">{percentage}%</p>
          </div>
  
          <div className="results-list">
            {score.results.map((result, index) => (
              <div
                key={result.questionId}
                className={`result-item ${
                  result.isCorrect ? "correct-result" : "incorrect-result"
                }`}
              >
                <div className="result-item-header">
                  <p className="result-label">Question {index + 1}</p>
                  <span className="result-status">
                    {result.isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>
  
                <h3 className="result-question">{result.questionText}</h3>
  
                <p className="result-answer-line">
                  <strong>Your answer:</strong> {result.selectedOptionText}
                </p>
  
                {!result.isCorrect && (
                  <p className="result-answer-line">
                    <strong>Correct answer:</strong> {result.correctOptionText}
                  </p>
                )}
              </div>
            ))}
          </div>
  
          <button type="button" className="restart-button" onClick={onRestart}>
            Restart Quiz
          </button>
        </section>
      </main>
    );
  }