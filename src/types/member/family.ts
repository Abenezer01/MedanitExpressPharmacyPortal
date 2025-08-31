import Member from "./member";

export type FamilyMember = {
  id: string;
  member_id: string;
  family_id: string;
  family_role: string;
  member: Member;
  created_at: string;
};
type Family = {
  representative_id: string;
  id: string;
  name: string;
  members: FamilyMember[];
  representative: Member;
  created_at: string;
};

export default Family;
