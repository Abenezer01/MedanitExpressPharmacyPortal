import { Teacher } from "./teacher";

export interface SessionClass {
  id: string;
  session_id: string;
  class_id: string;
  topic?: string;
  notes?: string;
  created_at?: string; 
  updated_at?: string; 
  teachers?: Teacher[];
  teacher_ids?: string[];
}