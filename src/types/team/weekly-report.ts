interface WeeklyReport {
  id: string;
  small_team_id: string;
  description: string;
  date: Date | string;
  createdAt: Date | string;
  attendance: { [memberId: string]: boolean };
}
export default WeeklyReport;
