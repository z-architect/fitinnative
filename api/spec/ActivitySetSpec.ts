import { QueryFilter } from "./CommonSpec";

interface ActivitySpec {
  id: string;
  name: string;
  description: string;
  actionGif?: string;
}

export interface CreateActivitySetRequestSpec {
  met: number;
  duration?: number;
  reps?: number;
  activity?: string;
  forReps: boolean;
}

export interface FetchActivitySetsResponseSpec {
  id: string;
  met: number;
  duration?: number;
  reps?: number;
  forReps: boolean;
  activity: ActivitySpec;
}

export interface UpdateActivitySetRequestSpec {
  id: string;
  met?: number;
  duration?: number;
  reps?: number;
  forReps?: boolean;
  activity?: string;
}

export interface RemoveActivitySetRequestSpec {
  id: string;
}
