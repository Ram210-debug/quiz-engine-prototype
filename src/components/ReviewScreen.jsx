export default function ReviewScreen({
    questions,
    answers,
    onEditQuestion,
    onBack,
    onSubmit,
  }) {
    return (
      <section className="review-card">
        <div className="review-header">
          <p className="eyebrow">Review Before Submission</p>
          <h2>Answer Summary</h2>
          <p className="subtext">
            Review your selected answers before submitting the assessment.
          </p>
        </div>
  
        <div className="review-list">
          {questions.map((question, index) => {
            const selectedOption = question.options.find(
              (option) => option.id === answers[question.id]
            );
  
            return (
              <div key={question.id} className="review-item">
                <div className="review-item-top">
                  <div>
                    <p className="review-label">Question {index + 1}</p>
                    <h3 className="review-question">{question.text}</h3>
                  </div>
  
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => onEditQuestion(index)}
                  >
                    Edit
                  </button>
                </div>
  
                <p className="review-answer">
                  {selectedOption ? selectedOption.text : "No answer selected"}
                </p>
              </div>
            );
          })}
        </div>
  
        <div className="navigation">
          <button type="button" className="secondary-button" onClick={onBack}>
            Back to Quiz
          </button>
  
          <button type="button" className="primary-button" onClick={onSubmit}>
            Confirm & Submit
          </button>
        </div>
      </section>
    );
  }