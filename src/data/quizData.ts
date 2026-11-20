import type { QuizItem } from '../types/quiz'

export const QUIZ_QUESTIONS: QuizItem[] = [
  {
    id: 1,
    category: '웹앱',
    question: '웹 브라우저에서 페이지를 새로고침하지 않고도 필요한 데이터만 불러와 화면을 바꿀 수 있다.',
    answer: true,
    explanation: '맞습니다! SPA(Single Page Application)나 Fetch API/AJAX 기술을 사용하면 페이지 전체를 다시 로드하지 않고도 필요한 데이터만 가져와 화면을 부드럽게 갱신할 수 있습니다.',
  },
  {
    id: 2,
    category: '인공지능',
    question: '생성형 AI(예: ChatGPT)는 항상 100% 사실만을 말하며 절대 거짓 정보를 지어내지 않는다.',
    answer: false,
    explanation: '틀렸습니다! 생성형 AI는 확률적으로 가장 자연스러운 문장을 만들어내기 때문에 사실과 다른 정보를 그럴듯하게 지어내는 환각(Hallucination) 현상이 발생할 수 있습니다.',
  },
  {
    id: 3,
    category: '웹앱',
    question: '웹페이지의 뼈대와 문서 구조를 만드는 데 사용되는 핵심 언어는 HTML이다.',
    answer: true,
    explanation: '정답입니다! HTML은 웹페이지의 구조(뼈대), CSS는 디자인(스타일링), JavaScript는 사용자와 상호작용하는 동작을 담당합니다.',
  },
  {
    id: 4,
    category: '인공지능',
    question: 'AI 모델을 학습시킬 때 데이터의 양만 많으면 충분하며, 데이터의 정확도나 품질은 중요하지 않다.',
    answer: false,
    explanation: '틀렸습니다! "쓰레기를 넣으면 쓰레기가 나온다(GIGO, Garbage In, Garbage Out)"는 말처럼, 정확하고 편향 없는 양질의 정제된 데이터가 고성능 AI의 필수 조건입니다.',
  },
  {
    id: 5,
    category: '웹 & AI',
    question: '웹 브라우저에서도 사용자의 컴퓨터 자원을 활용해 AI 모델을 직접 실행(온디바이스/클라이언트 AI)할 수 있다.',
    answer: true,
    explanation: '맞습니다! WebGPU, WebAssembly, Transformers.js 등을 사용하면 서버를 거치지 않고도 웹 브라우저 안에서 직접 가벼운 AI 모델을 빠르고 안전하게 구동할 수 있습니다.',
  },
]
