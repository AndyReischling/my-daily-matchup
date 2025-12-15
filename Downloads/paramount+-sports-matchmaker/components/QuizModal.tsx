import React, { useState, useEffect } from 'react';
import { X, Sparkles, CircleDashed } from 'lucide-react';
import { generateQuizQuestion, generateMatchResult } from '../services/geminiService';
import { QuizQuestion, MatchResult } from '../types';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMatchesGenerated: (results: MatchResult[]) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onMatchesGenerated }) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [qaHistory, setQaHistory] = useState<{ question: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  // Updated to 10 questions
  const TOTAL_STEPS = 10;

  useEffect(() => {
    if (isOpen && step === 0 && !currentQuestion && !loading) {
      loadNextQuestion();
    }
  }, [isOpen]);

  const loadNextQuestion = async (previousAnswer?: string) => {
    setLoading(true);
    try {
      const question = await generateQuizQuestion(step + 1, previousAnswer);
      setCurrentQuestion(question);
      setStep(prev => prev + 1);
    } catch (error) {
      console.error("Error loading question:", error);
      // Fallback
      setCurrentQuestion({
        questionText: "How do you typically approach a difficult problem?",
        options: [
           { id: "A", text: "I analyze the data and create a detailed plan." },
           { id: "B", text: "I keep my head down and work harder than anyone else." },
           { id: "C", text: "I trust my gut and look for a bold, creative solution." }
        ]
      });
      setStep(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = async (optionText: string) => {
    if (!currentQuestion) return;

    const newHistory = [...qaHistory, { question: currentQuestion.questionText, answer: optionText }];
    setQaHistory(newHistory);

    if (step >= TOTAL_STEPS) {
      // Finish Quiz
      setLoading(true);
      setCurrentQuestion(null); 
      try {
        const result = await generateMatchResult(newHistory);
        onMatchesGenerated(result.matches);
      } catch (error) {
        console.error("Error generating match:", error);
        // Fallback result array - Updated to Paramount+ Licenses
        onMatchesGenerated([
          {
            name: "Inter Milan",
            category: "Team",
            archetype: "The Strategist",
            justification: "A tactical powerhouse in Serie A known for disciplined dominance.",
            content: { highlights: ["Serie A Highlights"], replays: ["Inter vs Juventus"], documentary: "Calcio Stories" }
          },
          {
             name: "Kansas City Chiefs",
             category: "Team",
             archetype: "The Showman",
             justification: "Explosive offense and star power that demands attention.",
             content: { highlights: ["Mahomes Magic"], replays: ["AFC Championship"], documentary: "Kingdom" }
          },
          {
             name: "Gotham FC",
             category: "Team",
             archetype: "The Underdog",
             justification: "A resilient NWSL team that fights for every inch.",
             content: { highlights: ["NWSL Championship"], replays: ["Gotham vs Thorns"], documentary: "The Turnaround" }
          }
        ]);
      } finally {
        setLoading(false);
      }
    } else {
      // Next Question
      await loadNextQuestion(optionText);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#020C1F]/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#0A1830] border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-gradient-to-r from-blue-900/20 to-transparent">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Sports Matchmaker</h2>
              <p className="text-xs text-blue-300">AI Powered Personalization</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 min-h-[300px] flex flex-col justify-center">
          {loading ? (
            <div className="text-center space-y-4 animate-pulse">
              <CircleDashed size={48} className="text-blue-500 mx-auto animate-spin" />
              <p className="text-gray-300 font-medium">
                {step >= TOTAL_STEPS ? "Curating your perfect matches..." : "Analyzing your preference..."}
              </p>
            </div>
          ) : currentQuestion ? (
            <div className="space-y-6">
               <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <span>Question {step} of {TOTAL_STEPS}</span>
                  <span>{Math.round(((step - 1) / TOTAL_STEPS) * 100)}% Complete</span>
               </div>
               
               <h3 className="text-xl md:text-2xl font-medium text-white leading-relaxed">
                 {currentQuestion.questionText}
               </h3>

               <div className="space-y-3 mt-6">
                 {currentQuestion.options.map((option) => (
                   <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.text)}
                    className="w-full text-left p-4 rounded-xl border border-gray-700 bg-gray-900/50 hover:bg-blue-900/30 hover:border-blue-500/50 transition-all group"
                   >
                     <div className="flex items-start gap-3">
                       <span className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-600 group-hover:border-blue-500 flex items-center justify-center text-xs text-gray-400 group-hover:text-blue-400 mt-0.5">
                         {option.id}
                       </span>
                       <span className="text-gray-200 group-hover:text-white">{option.text}</span>
                     </div>
                   </button>
                 ))}
               </div>
            </div>
          ) : null}
        </div>
        
        {/* Footer Progress Bar */}
        <div className="h-1 bg-gray-800 w-full">
          <div 
            className="h-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;