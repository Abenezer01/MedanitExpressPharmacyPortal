import Member from "../member/member";
import { Class } from "./class";

export interface Student {
  id: string;
  member_id: string;
  member: Member;
  class_id?: string | null;
  class?: Class;
  created_at?: string;
  updated_at?: string;
}