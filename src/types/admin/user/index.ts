import Role from "../role";

type User = {
  avatar: string;
  name: string;
  roles: Role[];
  id: string;
  role: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  member_id: string | null;
  createdAt: string;
  updatedAt: string;
  password: string;
  role_id: string;
};

export default User;
