import { QueryFilter } from "./CommonSpec";

export interface CreateActivityRequestSpec extends FetchActivitiesResponseSpec {
  custom?: boolean;
}

export interface FetchActivitiesRequestSpec extends QueryFilter {
  custom?: boolean;
}

export interface FetchActivitiesResponseSpec {
  id: string;
  name: string;
  description: string;
  actionGif?: string;
}

export interface UpdateActivityRequestSpec {
  id?: string;
  name?: string;
  description?: string;
  actionGif?: string;
}

export interface RemoveActivityRequestSpec {
  id: string;
}
