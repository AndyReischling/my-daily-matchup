export interface Clip {
  id: string;
  title: string;
  league: string; // Maps to "sport" in the brief
  team1: string;
  team2: string;
  duration: number; // in seconds
  thumbnail: string;
  videoUrl: string;
  description: string;
  timestamp: string;
  badges: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  explicitInterests: string[];
  inferredInterests: string[];
}

export interface PlaylistResponse {
  playlistId: string;
  clips: Clip[];
  totalDuration: number;
  narrativeSummary: string;
}