import Member from "../member/member";

type Attendance = {
  id: string;
  stweeklyreport_id: string;
  member_id: string;
  status: boolean;
  member: Member;
};
export default Attendance;
