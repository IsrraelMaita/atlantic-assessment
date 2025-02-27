export interface Actor {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: any[]
}

export interface ActorResponse {
  page: number;
  results: Actor[];
  total_pages: number;
  total_results: number;
}