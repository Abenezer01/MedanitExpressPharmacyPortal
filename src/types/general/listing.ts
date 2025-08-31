import { AbilityRule } from "../admin/role/permission";

export interface CreateActionConfig {
  onClick?: () => void;
  permission?: AbilityRule;
  onlyIcon?: boolean;
  show?: boolean;
}
export interface ExportActionConfig {
  onClick: () => void;
  permission: AbilityRule;
  onlyIcon?: boolean;
  show?: boolean;
}
export const defaultCreateActionConfig = {
  show: true,
  permission: { action: "", subject: "" },
  onlyIcon: false,
  onClick: () => {
    console.log("create action");
  },
};

export const defaultExportActionConfig = {
  show: true,
  permission: { action: "", subject: "" },
  onlyIcon: false,
  onClick: () => {
    console.log("create action");
  },
};
