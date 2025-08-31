import Session from "./session";
import { Student } from "./student";
import { Teacher } from "./teacher";

export interface SchoolAttendance {
  id: string;
  user_type: AttendanceUserType;
  user_id: string;
  teacher?: Teacher;
  student?: Student;
  sessionclass_id?: string | null;
  session_id?: string | null;
  session: Session;
  status: AttendanceStatus;
  notes: string;
  remarks?: string | null;
  attendance_date: string;
  created_at?: string;
  updated_at?: string;
}
export enum AttendanceUserType {
  Student = "STUDENT",
  Teacher = "TEACHER"
}
export enum AttendanceStatus {
  Present = "PRESENT",
  Absent = "ABSENT",
  Late = "LATE",
  Excused = "EXCUSED"
}