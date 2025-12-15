import { GoogleGenAI, Type, Schema } from "@google/genai";
import { QuizQuestion, MultiMatchResponse } from "../types";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are the Paramount+ Sports Matchmaker.
Your goal is to match a user to sports teams or fighters based on their personality.

Archetypes:
1. The Strategist: Analytical, controlled, seeking technical perfection.
2. The Underdog: Resilient, gritty, loyal, admires a tough fight/comeback.
3. The Showman: Charismatic, dominant, demands attention, values flair.

CRITICAL CONSTRAINTS:
1. LANGUAGE: Use simple, precise, everyday English. Do not use flowery, dramatic, or grandiose adjectives. Be direct.
2. LICENSES: ONLY recommend teams/leagues/fighters from properties available on Paramount+ and CBS Sports.
   - YES: NFL, UEFA Champions League, UEFA Europa League, Serie A, NWSL, SPFL (Scottish), CONCACAF, Bellator/PFL (Combat Sports).
   - NO: NBA, MLB, NHL, English Premier League (EPL).

When providing results: You MUST provide exactly 3 distinct recommendations from the "YES" list above (e.g., 1 NFL Team, 1 European Soccer Team, 1 Combat Sports Fighter or NWSL Team).
`;

const questionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    questionText: { type: Type.STRING, description: "The text of the question. keep it simple." },
    options: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          text: { type: Type.STRING, description: "Simple, direct answer choice starting with 'I...'." }
        }
      }
    }
  },
  required: ["questionText", "options"]
};

// Updated schema to return a list of matches
const resultSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    matches: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          category: { type: Type.STRING, enum: ["Team", "Fighter", "League"] },
          archetype: { type: Type.STRING },
          justification: { type: Type.STRING, description: "Why this fits the user." },
          content: {
            type: Type.OBJECT,
            properties: {
              highlights: { type: Type.ARRAY, items: { type: Type.STRING } },
              replays: { type: Type.ARRAY, items: { type: Type.STRING } },
              documentary: { type: Type.STRING }
            },
            required: ["highlights", "replays", "documentary"]
          }
        },
        required: ["name", "category", "archetype", "justification", "content"]
      },
      description: "Exactly 3 distinct recommendations from Paramount+ properties."
    }
  },
  required: ["matches"]
};

export const generateQuizQuestion = async (round: number, previousAnswer?: string): Promise<QuizQuestion> => {
  const model = "gemini-2.5-flash";
  
  // 10 distinct psychological themes for the extended quiz
  const themes = [
    "Problem Solving (Analytic vs. Gritty vs. Creative)",
    "Handling Failure (Correction vs. Resilience vs. Deflection)",
    "Role in a Group (Leader/planner vs. Reliable support vs. Star)",
    "Risk Taking (Calculated vs. Desperate vs. Showy)",
    "Conflict Style (Diplomatic/Strategic vs. Head-on/Tough vs. Loud/Dominant)",
    "Work Ethic (Efficiency vs. Hard Work vs. Talent)",
    "Motivation (Perfection vs. Proving doubters wrong vs. Applause)",
    "Pressure (Calm/Cold vs. Intense/Focused vs. Excited)",
    "Loyalty (To the system vs. To the people vs. To oneself)",
    "Success (Execution vs. Overcoming odds vs. Glory)"
  ];
  
  const currentTheme = themes[round - 1] || "General Personality";

  let prompt = `Generate Question #${round} of 10. Theme: ${currentTheme}.`;
  
  if (previousAnswer) {
    prompt += `\nThe user's previous answer was: "${previousAnswer}".`;
  }
  
  prompt += "\nCONSTRAINT 1: The question must be about the user's PERSONALITY or PSYCHOLOGY (e.g. 'How do you handle stress?', 'What is your role in a team?'). Do NOT ask about sports, stadiums, or games.";
  prompt += "\nCONSTRAINT 2: All answer options MUST be first-person statements starting with 'I...' (e.g. 'I analyze...', 'I fight...', 'I perform...').";
  prompt += "\nCONSTRAINT 3: Options must map psychologically to: (A) The Strategist, (B) The Underdog, (C) The Showman.";
  prompt += "\nCONSTRAINT 4: Keep wording simple and precise. No grandiose language.";

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: questionSchema
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as QuizQuestion;
  }
  throw new Error("Failed to generate question");
};

export const generateMatchResult = async (qaHistory: { question: string; answer: string }[]): Promise<MultiMatchResponse> => {
  const model = "gemini-2.5-flash";

  const historyText = qaHistory.map((qa, i) => `Q${i + 1}: ${qa.question}\nA: ${qa.answer}`).join("\n\n");
  const prompt = `Based on these PSYCHOLOGICAL quiz answers, provide 3 DISTINCT sports recommendations from Paramount+ licensed properties.
  
  The user has described their personality. Match them to teams/fighters that embody that personality.
  
  Constraints:
  1. One European Soccer Team (from UEFA Champions League, Serie A, or SPFL).
  2. One NFL Team.
  3. One NWSL Team OR Combat Sports Fighter (Bellator/PFL).
  
  User History:\n${historyText}`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: resultSchema
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as MultiMatchResponse;
  }
  throw new Error("Failed to generate match result");
};