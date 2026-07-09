export interface PersonaTrait {
  label: string;
  value: number;
}

export interface PersonaProfile {
  age: string;
  origin: string;
  family: string;
  education: string;
  personality: string[];
  beliefs: string;
  dailyLife: string;
  innerConflict: string;
  traits: PersonaTrait[];
}

export interface HistoricalPersona {
  id: string;
  name: string;
  title: string;
  year: string;
  location: string;
  role: "resistance_fighter" | "exile_student" | "railway_worker" | "civilian";
  avatar_color: string;
  bio: string;
  profile: PersonaProfile;
  responses: {
    [key: string]: {
      content: string;
      mood: string;
      emotion_score: number;
    };
  };
}

export const HISTORICAL_PERSONAS: HistoricalPersona[] = [];

export const EMOTION_TOPICS: string[] = [];
