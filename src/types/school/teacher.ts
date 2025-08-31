
import Member from "../member/member";
import { Class } from "./class";

export interface Teacher {
  id: string;
  member_id: string;
  bio?: string;
  expertise?: string;
  member?: Member;
  classes?: Class[];
  created_at: Date;
  updated_at: Date;
}
