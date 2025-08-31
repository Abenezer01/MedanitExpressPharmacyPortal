type MemberContact = {
  id: string;
  type: string;
  phone: string;
  email: string;
  member_id: string;
  is_primary: boolean;
};
export const contactTypes: { label: string; value: string }[] = [
  { label: "Home", value: "home" },
  { label: "Office", value: "office" },
  { label: "Personal", value: "personal" },
];
export default MemberContact;
