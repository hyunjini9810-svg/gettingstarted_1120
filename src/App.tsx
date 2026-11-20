import { useState } from 'react'
import { QUIZ_QUESTIONS } from './data/quizData'
import type { UserHistoryItem } from './types/quiz'
import './App.css'

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [history, setHistory] = useState<UserHistoryItem[]>([])
  const [isFinished, setIsFinished] = useState(false)
  const [showReview, setShowReview] = useState(false)

  const currentQuiz = QUIZ_QUESTIONS[currentIndex]
  const totalQuestions = QUIZ_QUESTIONS.length
  const progressPercent = Math.round(((currentIndex + (selectedAnswer !== null ? 1 : 0)) / totalQuestions) * 100)

  // O or X 선택 핸들러
  const handleSelect = (answer: boolean) => {
    if (selectedAnswer !== null) return // 이미 선택했으면 중복 선택 방지

    setSelectedAnswer(answer)
    const isCorrect = answer === currentQuiz.answer

    if (isCorrect) {
      setScore((prev) => prev + 1)
    }

    setHistory((prev) => [
      ...prev,
      {
        questionId: currentQuiz.id,
        question: currentQuiz.question,
        userAnswer: answer,
        correctAnswer: currentQuiz.answer,
        isCorrect,
        explanation: currentQuiz.explanation,
      },
    ])
  }

  // 다음 문제로 이동
  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedAnswer(null)
    } else {
      setIsFinished(true)
    }
  }

  // 다시 풀기 (초기화)
  const handleRestart = () => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setHistory([])
    setIsFinished(false)
    setShowReview(false)
  }

  // 결과 피드백 메시지 생성
  const getFeedback = (score: number) => {
    if (score === 5) {
      return {
        badge: '🏆 만점 달성!',
        title: '완벽합니다! 웹 & AI 퀴즈 마스터!',
        desc: '웹과 인공지능에 대한 기초 지식이 완벽하게 잡혀 있으시네요!',
      }
    }
    if (score >= 3) {
      return {
        badge: '👏 우수한 실력!',
        title: '훌륭해요! 기본기가 탄탄해요!',
        desc: '대부분의 핵심 개념을 잘 이해하고 계십니다. 틀린 문제만 다시 확인해 보세요!',
      }
    }
    return {
      badge: '🌱 성장하는 단계!',
      title: '수고하셨습니다! 한 번 더 도전해볼까요?',
      desc: '해설을 꼼꼼히 읽어보고 다시 풀기에 도전해보세요. 금방 마스터할 수 있어요!',
    }
  }

  const feedback = getFeedback(score)

  return (
    <div className="quiz-container">
      {/* 상단 헤더 */}
      <header className="quiz-header">
        <span className="app-badge">💡 상식 퀴즈</span>
        <h1 className="app-title">웹앱 & AI 기초 OX 퀴즈</h1>
        <p className="app-subtitle">웹 개발과 인공지능의 기본 상식을 5개의 퀴즈로 확인해보세요!</p>
      </header>

      {!isFinished ? (
        /* 퀴즈 진행 화면 */
        <main className="quiz-card">
          {/* 진행도 표시 */}
          <div className="progress-section">
            <div className="progress-info">
              <span className="step-text">
                문제 <strong>{currentIndex + 1}</strong> / {totalQuestions}
              </span>
              <span className="score-live">현재 점수: {score}점</span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          {/* 문제 영역 */}
          <div className="question-box">
            <div className="category-pill">{currentQuiz.category}</div>
            <h2 className="question-text">{currentQuiz.question}</h2>
          </div>

          {/* O / X 버튼 영역 */}
          <div className="choice-grid">
            <button
              type="button"
              className={`choice-btn btn-o ${selectedAnswer === true ? 'selected' : ''} ${
                selectedAnswer !== null
                  ? currentQuiz.answer === true
                    ? 'is-correct'
                    : selectedAnswer === true
                    ? 'is-wrong'
                    : 'is-dimmed'
                  : ''
              }`}
              onClick={() => handleSelect(true)}
              disabled={selectedAnswer !== null}
            >
              <span className="symbol">O</span>
              <span className="label">그렇다 (참)</span>
            </button>

            <button
              type="button"
              className={`choice-btn btn-x ${selectedAnswer === false ? 'selected' : ''} ${
                selectedAnswer !== null
                  ? currentQuiz.answer === false
                    ? 'is-correct'
                    : selectedAnswer === false
                    ? 'is-wrong'
                    : 'is-dimmed'
                  : ''
              }`}
              onClick={() => handleSelect(false)}
              disabled={selectedAnswer !== null}
            >
              <span className="symbol">X</span>
              <span className="label">아니다 (거짓)</span>
            </button>
          </div>

          {/* 정답 및 해설 피드백 영역 */}
          {selectedAnswer !== null && (
            <div
              className={`feedback-box ${
                selectedAnswer === currentQuiz.answer ? 'correct' : 'wrong'
              }`}
            >
              <div className="feedback-header">
                <span className="feedback-icon">
                  {selectedAnswer === currentQuiz.answer ? '🎉' : '😅'}
                </span>
                <span className="feedback-title">
                  {selectedAnswer === currentQuiz.answer
                    ? '정답입니다!'
                    : `아쉬워요! 정답은 [ ${currentQuiz.answer ? 'O' : 'X'} ] 입니다.`}
                </span>
              </div>
              <p className="feedback-explanation">{currentQuiz.explanation}</p>

              <button
                type="button"
                className="next-btn"
                onClick={handleNext}
              >
                {currentIndex + 1 === totalQuestions ? '결과 확인하기 📊' : '다음 문제로 이동 👉'}
              </button>
            </div>
          )}
        </main>
      ) : (
        /* 최종 결과 화면 */
        <main className="quiz-card result-card">
          <div className="result-header">
            <span className="result-badge">{feedback.badge}</span>
            <h2 className="result-title">{feedback.title}</h2>
            <p className="result-desc">{feedback.desc}</p>
          </div>

          {/* 최종 점수 원형 디스플레이 */}
          <div className="score-summary">
            <div className="score-circle">
              <span className="score-number">{score}</span>
              <span className="score-total">/ {totalQuestions}</span>
            </div>
            <div className="score-percentage">
              정답률: <strong>{Math.round((score / totalQuestions) * 100)}%</strong>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="result-actions">
            <button
              type="button"
              className="restart-btn"
              onClick={handleRestart}
            >
              🔄 다시 풀기
            </button>
            <button
              type="button"
              className="review-toggle-btn"
              onClick={() => setShowReview(!showReview)}
            >
              {showReview ? '📝 해설 닫기 ▲' : '📝 오답노트 & 전체 해설 보기 ▼'}
            </button>
          </div>

          {/* 문제별 복습 내역 */}
          {showReview && (
            <div className="review-list">
              <h3 className="review-title">문제별 결과 및 해설</h3>
              {history.map((item, idx) => (
                <div
                  key={item.questionId}
                  className={`review-item ${item.isCorrect ? 'correct' : 'wrong'}`}
                >
                  <div className="review-item-header">
                    <span className="review-item-index">문제 {idx + 1}</span>
                    <span className={`review-item-status ${item.isCorrect ? 'correct' : 'wrong'}`}>
                      {item.isCorrect ? '✅ 정답' : '❌ 오답'}
                    </span>
                  </div>
                  <p className="review-question">{item.question}</p>
                  <div className="review-answer-row">
                    <span>
                      내 선택: <strong>{item.userAnswer ? 'O' : 'X'}</strong>
                    </span>
                    <span>
                      정답: <strong className="highlight">{item.correctAnswer ? 'O' : 'X'}</strong>
                    </span>
                  </div>
                  <p className="review-explanation">{item.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* 푸터 */}
      <footer className="quiz-footer">
        <p>Vite + React + TypeScript로 제작된 웹앱 & AI OX 퀴즈</p>
      </footer>
    </div>
  )
}

export default App
