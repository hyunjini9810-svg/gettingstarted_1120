export interface QuizItem {
  id: number
  category: '웹앱' | '인공지능' | '웹 & AI'
  question: string
  answer: boolean // true = O, false = X
  explanation: string
}

export interface UserHistoryItem {
  questionId: number
  question: string
  userAnswer: boolean
  correctAnswer: boolean
  isCorrect: boolean
  explanation: string
}

