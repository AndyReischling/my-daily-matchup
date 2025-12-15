export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  questionText: string;
  options: QuizOption[];
}

export interface MatchContent {
  highlights: string[];
  replays: string[];
  documentary: string;
}

export interface MatchResult {
  name: string;
  category: 'Team' | 'Fighter' | 'League';
  archetype: string;
  justification: string;
  content: MatchContent;
}

export interface MultiMatchResponse {
  matches: MatchResult[];
}

export enum AppState {
  ONBOARDING = 'ONBOARDING',
  QUIZ = 'QUIZ',
  SELECTION = 'SELECTION',
  DASHBOARD = 'DASHBOARD'
}