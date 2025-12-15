import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Onboarding from './components/Onboarding';
import QuizModal from './components/QuizModal';
import ResultsSelection from './components/ResultsSelection';
import ContentDashboard from './components/ContentDashboard';
import { AppState, MatchResult } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.ONBOARDING);
  const [recommendations, setRecommendations] = useState<MatchResult[]>([]);
  
  // State for the item currently being viewed on the dashboard
  const [viewingMatch, setViewingMatch] = useState<MatchResult | null>(null);
  
  // State for the user's saved list (Favorites)
  const [favorites, setFavorites] = useState<MatchResult[]>([]);
  
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleStartQuiz = () => {
    setIsQuizOpen(true);
  };

  const handleCloseQuiz = () => {
    setIsQuizOpen(false);
  };

  // Called when AI finishes generating results
  const handleMatchesGenerated = (results: MatchResult[]) => {
    setRecommendations(results);
    setIsQuizOpen(false);
    setAppState(AppState.SELECTION);
  };

  // Called when user selects a match from the results page to view details
  const handleViewMatch = (match: MatchResult) => {
    setViewingMatch(match);
    setAppState(AppState.DASHBOARD);
  };

  // Handle adding/removing from favorites
  const handleToggleFavorite = (match: MatchResult) => {
    const isAlreadyFavorite = favorites.some(fav => fav.name === match.name);
    
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter(fav => fav.name !== match.name));
    } else {
      setFavorites([...favorites, match]);
    }
  };

  // Direct selection (Simulated search result)
  const handleDirectSelect = (name: string) => {
    const simulatedResult: MatchResult = {
      name: name,
      category: 'Team',
      archetype: 'The Fan Selection',
      justification: `You chose ${name}, a team with a rich history and passionate fanbase.`,
      content: {
        highlights: [`${name} Top Goals`, `${name} vs Rivals Highlights`, "Season Review"],
        replays: [`${name} vs Championship`, "Classic Match Replay"],
        documentary: `Inside ${name}: All or Nothing`
      }
    };
    setViewingMatch(simulatedResult);
    setAppState(AppState.DASHBOARD);
  };

  const handleHomeClick = () => {
    setAppState(AppState.ONBOARDING);
    setViewingMatch(null);
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen bg-[#020C1F] text-white font-sans selection:bg-blue-500/30">
      {/* Navbar is always present */}
      <Navbar 
        favorites={favorites} 
        onHomeClick={handleHomeClick} 
        onSelectFavorite={handleViewMatch}
      />

      {appState === AppState.ONBOARDING && (
        <Onboarding 
          onStartQuiz={handleStartQuiz} 
          onDirectSelect={handleDirectSelect}
        />
      )}

      {appState === AppState.SELECTION && (
        <ResultsSelection 
          matches={recommendations}
          onSelect={handleViewMatch}
        />
      )}

      {appState === AppState.DASHBOARD && viewingMatch && (
        <ContentDashboard 
          match={viewingMatch} 
          isFavorite={favorites.some(f => f.name === viewingMatch.name)}
          onToggleFavorite={() => handleToggleFavorite(viewingMatch)}
        />
      )}

      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={handleCloseQuiz} 
        onMatchesGenerated={handleMatchesGenerated}
      />
    </div>
  );
}

export default App;