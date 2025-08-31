import Member from "../member/member";

export interface Child {
  id: string; // UUID
  member_id?: string;
  member: Member;
  created_at?: Date;
  updated_at?: Date;
}

export default Child;
