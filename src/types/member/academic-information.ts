interface AcademicInformation {
  id: string;
  member_id: string;
  type: string;
  level: string;
  institution: string;
  started_year: string | Date;
  completed_year: string | Date;
}
export default AcademicInformation;
