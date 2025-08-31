import Member from "../member/member";
import Position from "./position";

interface TeamMember {
  id: string;
  is_leader: boolean;
  model_id: string;
  position_id: string;
  member_id: string;
  member: Member;
  position: Position;
}
export default TeamMember;
