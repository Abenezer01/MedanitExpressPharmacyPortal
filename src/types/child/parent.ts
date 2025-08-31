import Member from "../member/member";
import Child from "./child";
import { ChildParent, ChildParentRelationshipType } from "./child-parent";

export default interface Parent {
  id: string; // UUID
  name: string; // Parent's name
  phone: string; // Parent's phone number
  email: string;
  is_parent_christian?: boolean; // Optional: Indicates if the parent is Christian
  is_parent_member?: boolean; // Optional: Indicates if the parent is a member
  childParent: ChildParent;
  member?: Member;
  relationship?: ChildParentRelationshipType;
  child: Child;
  member_id?: string | null; // Optional: UUID reference to the Member table
  created_at: Date; // Timestamp for when the record was created
  updated_at: Date; // Timestamp for when the record was last updated
}
