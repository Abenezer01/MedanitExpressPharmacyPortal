type Department = {
  id: string;
  name: string;
  description: string;
  parent_department_id: string;
  established_date: Date | string;
  createdAt: Date | string;
};
export default Department;
