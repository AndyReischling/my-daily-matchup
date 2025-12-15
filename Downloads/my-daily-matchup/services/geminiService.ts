import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, Clip, PlaylistResponse } from "../types";
import { AVAILABLE_CLIPS } from "../constants";

export const generatePersonalizedPlaylist = async (user: UserProfile): Promise<PlaylistResponse> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY not found. Returning fallback playlist.");
      return getFallbackPlaylist();
    }

    const ai = new GoogleGenAI({ apiKey });

    // Schema for structured output
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
          playlistId: { type: Type.STRING },
          clipIds: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "An ordered list of clip IDs that form a narrative."
          },
          narrativeSummary: { type: Type.STRING, description: "A short text describing why these clips were chosen for the user." }
        },
        required: ["clipIds", "narrativeSummary"]
      };

    const prompt = `
      You are a personalization engine for the 'My Daily Matchup' feature on Paramount+.
      Date: Sunday, December 14, 2025.
      
      User Profile:
      - Name: ${user.name}
      - Explicit Interests: ${user.explicitInterests.join(', ')}
      - Inferred Interests: ${user.inferredInterests.join(', ')}

      Available Clips Library (JSON):
      ${JSON.stringify(AVAILABLE_CLIPS.map(c => ({ 
        id: c.id, 
        title: c.title, 
        league: c.league, 
        description: c.description,
        badges: c.badges
      })))}

      Task:
      Select 10 clips from the library for the user's "Daily 10".
      Order them to create a dramatic flow (e.g., start with the 'Headliner' or 'Game of the Week', mix in variety, end with a 'Daily Recap').
      Prioritize clips with badges like "Game of the Week", "Must Watch", or "Exclusive".
      
      Return JSON containing the ordered list of clip IDs and a narrative summary.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("Empty response from Gemini");

    const data = JSON.parse(jsonText);
    
    // Map IDs back to full clip objects
    const orderedClips = data.clipIds
      .map((id: string) => AVAILABLE_CLIPS.find(c => c.id === id))
      .filter((c: Clip | undefined): c is Clip => c !== undefined);

    // Ensure we have clips even if AI hallucinates IDs
    const finalClips = orderedClips.length > 0 ? orderedClips : AVAILABLE_CLIPS;

    return {
      playlistId: data.playlistId || 'gen_' + Date.now(),
      clips: finalClips,
      totalDuration: finalClips.reduce((acc: number, c: Clip) => acc + c.duration, 0),
      narrativeSummary: data.narrativeSummary || "Your curated Daily Matchup."
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return getFallbackPlaylist();
  }
};

const getFallbackPlaylist = (): PlaylistResponse => {
  return {
    playlistId: 'daily_matchup_fallback',
    clips: AVAILABLE_CLIPS, // Return the curated daily list
    totalDuration: AVAILABLE_CLIPS.reduce((acc, c) => acc + c.duration, 0),
    narrativeSummary: "Here is your Daily 10: The biggest moments from NFL Week 15, Serie A, and Champions League."
  };
};