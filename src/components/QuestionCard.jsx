export default function QuestionCard({ question, onSelect, selected }) {
    return (
      <section className="question-card">
        <h2 className="question-title">{question.text}</h2>
  
        <div className="options-list">
          {question.options.map((option) => {
            const isSelected = selected === option.id;
  
            return (
              <button
                key={option.id}
                type="button"
                className={`option-button ${isSelected ? "selected" : ""}`}
                onClick={() => onSelect(question.id, option.id)}
              >
                {option.text}
              </button>
            );
          })}
        </div>
      </section>
    );
  }