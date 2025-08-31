import Member from "./member";

type MaritalStatus = {
  id: string;
  status?: MaritalStatusType;
  spouse?: Member;
  date_of_marriage?: Date;
  spouse_name?: string;
  spouse_phone?: string;
  is_your_spouse_christian?: boolean;
  is_your_spouse_member?: boolean;
  spouse_id?: string;
  member_id?: string;
  spouse_church?: string;
};
export enum MaritalStatusType {
  Single = "Single",
  Married = "Married",
  Divorced = "Divorced",
  Widowed = "Widowed",
}
export default MaritalStatus;
