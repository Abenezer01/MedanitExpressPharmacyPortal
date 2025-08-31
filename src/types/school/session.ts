export type Session = {
  id: string; // UUID
  title: string;
  date: Date | string;
  start_time: string; // TIME as string (e.g., "14:00:00")
  end_time: string;   // TIME as string (e.g., "15:00:00")
  notes: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  status: SessionStatus;
};
export default Session;

export enum SessionStatus {
  Upcoming = "UPCOMING",
  Ongoing = "ONGOING",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED"
}