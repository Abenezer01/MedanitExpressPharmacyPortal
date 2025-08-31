import { GridColDef } from "@mui/x-data-grid";

// ** React Imports

// ** Next Imports

// ** MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Store Imports

// ** Custom Components Imports
import CustomAvatar from "src/@core/components/mui/avatar";

// ** Utils Import

// ** Actions Imports

// ** Third Party Components

// ** Types Imports
import { ThemeColor } from "src/@core/layouts/types";

// ** Custom Table Components Imports
import moment from "moment";
import User from "src/types/admin/user";
import RowOptions from "src/views/shared/listing/row-options";
import UserProfileSmall from "../user-profile-small";

interface UserRoleType {
  [key: string]: { icon: string; color: string };
}

interface CellType {
  row: User;
}

// ** renders client column
const userRoleObj: UserRoleType = {
  admin: { icon: "tabler:device-laptop", color: "secondary" },
  author: { icon: "tabler:circle-check", color: "success" },
  editor: { icon: "tabler:edit", color: "info" },
  maintainer: { icon: "tabler:chart-pie-2", color: "primary" },
  subscriber: { icon: "tabler:user", color: "warning" },
};

export const userColumns = (
  onEdit: (user: User) => void,
  onDelete: (id: string) => void,
  transl: (word: string) => void,
) =>
  [
    {
      flex: 0.25,
      minWidth: 280,
      field: "full_name",
      headerName: transl("user"),
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <UserProfileSmall user={row} />
          </Box>
        );
      },
    },
    {
      flex: 0.15,
      field: "role",
      minWidth: 170,
      headerName: transl("role"),
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CustomAvatar
              skin="light"
              sx={{ mr: 4, width: 30, height: 30 }}
              color={(userRoleObj["admin"]?.color as ThemeColor) || "primary"}
            >
              <Icon icon={userRoleObj["admin"]?.icon} />
            </CustomAvatar>
            <Typography
              noWrap
              sx={{ color: "text.secondary", textTransform: "capitalize" }}
            >{row?.roles ? row?.roles[0]?.name : ""}</Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: "Phone",
      field: transl("phone"),
      renderCell: ({ row }: CellType) => {
        return (
          <Typography sx={{ color: "text.secondary" }}>{row.phone}</Typography>
        );
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: transl("created_at"),
      field: "createdAt",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography sx={{ color: "text.secondary" }}>
            {moment(row.createdAt).format("DD MMM YYYY")}
          </Typography>
        );
      },
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: "actions",
      headerName: transl("actions"),
      renderCell: ({ row }: CellType) => (
        <RowOptions
          onEdit={onEdit}
          onDelete={() => onDelete(row.id)}
          item={row}
          editPermissionRule={{
            action: "update",
            subject: "user",
          }}
          deletePermissionRule={{
            action: "delete",
            subject: "user",
          }}
        />
      ),
    },
  ] as GridColDef[];
