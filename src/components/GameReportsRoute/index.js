import {useLocation, useHistory} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const GameReportsRoute = () => {
  const location = useLocation()
  const history = useHistory()
  const {questions = [], ttlQns = 0} = location.state || {}

  const getUnattemptedQuestions = () =>
    questions.filter(question => question.slctOptId === null)

  const getCorrectAnswersCount = () =>
    questions.filter(question => question.slctOptId === question.crctOptId)
      .length

  const getIncorrectQuestionsCount = () =>
    questions.filter(
      question =>
        question.slctOptId !== null &&
        question.slctOptId !== question.crctOptId,
    ).length

  const renderUnattemptedQuestions = () => {
    const unattemptedQuestions = getUnattemptedQuestions()
    if (unattemptedQuestions.length === 0) {
      return (
        <div className="unattempted-questions-container">
          <h1>Attempted all the questions</h1>
        </div>
      )
    }
    return (
      <div className="unattempted-questions-container">
        <h2>Unattempted Questions</h2>
        {unattemptedQuestions.map(question => (
          <div key={question.id} className="question-container">
            <h3>{question.question}</h3>
            <ul className="options-wrapper">
              <li className="options-container">
                {question.options.map(option => (
                  <button
                    key={option.id}
                    className={`option ${
                      option.id === question.crctOptId ? 'correct' : ''
                    }`}
                    type="button"
                  >
                    {question.optionType === 'IMAGE' ? (
                      <img
                        src={option.url}
                        alt={option.text}
                        className="option-image"
                      />
                    ) : (
                      option.text
                    )}
                    {option.id === question.crctOptId && (
                      <img
                        className="option-icon"
                        alt="correct checked circle"
                        src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                      />
                    )}
                  </button>
                ))}
              </li>
            </ul>
          </div>
        ))}
      </div>
    )
  }

  const CorrectAnswers = getCorrectAnswersCount()
  const IncorrectAnswers = getIncorrectQuestionsCount()
  const Unattempted = getUnattemptedQuestions().length
  const ScorePercentage = ((CorrectAnswers / ttlQns) * 100).toFixed(2)

  const handleReportButtonClick = () => {
    history.push('/report') // Adjust this route to where the report page is located
  }

  return (
    <div className="page-container">
      <Header />
      <div className="report-container">
        <div className="score-board">
          {ScorePercentage >= 60 ? (
            <>
              <h1>{ScorePercentage}% Correctly Answered</h1>
              <p>Quiz completed successfully</p>
            </>
          ) : (
            <h1>You lose</h1>
          )}
          <p>
            You attempted {CorrectAnswers} out of {ttlQns} questions as correct
          </p>
          <button type="button" onClick={handleReportButtonClick}>
            Report
          </button>
          <div className="score-container">
            <div className="score-circle">
              <p>
                <span className="score">{CorrectAnswers}</span>/{ttlQns}
              </p>
            </div>
            <div className="score-details">
              <div className="score-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                  alt="correct answer icon"
                  className="score-icon"
                />{' '}
                <p className="count">{CorrectAnswers} Correct answers</p>
              </div>
              <div className="score-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                  alt="incorrect answer icon"
                  className="score-icon"
                />{' '}
                <p className="count">{IncorrectAnswers} Incorrect answers</p>
              </div>
              <div className="score-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                  alt="unattempted icon"
                  className="score-icon"
                />{' '}
                <p className="count">{Unattempted} Unattempted answers</p>
              </div>
            </div>
          </div>
          {renderUnattemptedQuestions()}
        </div>
      </div>
    </div>
  )
}

export default GameReportsRoute
