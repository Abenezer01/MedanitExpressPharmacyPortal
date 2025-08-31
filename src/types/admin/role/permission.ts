type Permission = {
  id: string;
  name: string;
  model: string;
  module: string;
  description: string;
  selected: boolean;
  createdAt: string;
  updatedAt: string;
};

// Define the type for the ability rule
type Action = string;
type Subject = string;

export interface AbilityRule {
  action: Action;
  subject: Subject;
}
export default Permission;
