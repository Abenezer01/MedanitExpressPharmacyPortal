import { GridColDef } from "@mui/x-data-grid";

// ** React Imports

// ** Next Imports

// ** MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// ** Icon Imports

// ** Store Imports

// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip";

// ** Utils Import

// ** Actions Imports

// ** Third Party Components

// ** Types Imports
import { ThemeColor } from "src/@core/layouts/types";

// ** Custom Table Components Imports
import moment from "moment";
import Member from "src/types/member/member";
import RowOptions from "src/views/shared/listing/row-options";
import MemberProfileSmall from "../member-profile-small";

interface MemberStatusType {
  [key: string]: ThemeColor;
}

interface CellType {
  row: Member;
}

const memberStatusObj: MemberStatusType = {
  active: "success",
  inactive: "warning",
  suspended: "error",
};

export const memberColumns = (
  onEdit: (member: Member) => void,
  onDelete: (id: string) => void,
  notifyUser: (member: Member) => void,
  transl: (item: string) => string,
) => {
  return [
    {
      flex: 0.25,
      minWidth: 280,
      field: "first_name",
      headerName: transl("member"),
      sortable: true,
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MemberProfileSmall member={row} />
          </Box>
        );
      },
    },

    {
      flex: 0.15,
      minWidth: 120,
      headerName: transl("phone"),
      field: "phone",
      sortable: true,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography sx={{ color: "text.secondary" }}>
            {row?.primaryContact?.phone}
          </Typography>
        );
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: transl("registration_date"),
      field: "registration_date",
      sortable: true,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography sx={{ color: "text.secondary" }}>
            {moment(row.registration_date).format("DD MMM YYYY")}
          </Typography>
        );
      },
    },

    {
      flex: 0.1,
      minWidth: 110,
      field: "status",
      headerName: transl("status"),
      sortable: true,
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            rounded
            skin="light"
            size="small"
            label={row.status.toUpperCase()}
            color={memberStatusObj[row.status]}
            sx={{ textTransform: "capitalize" }}
          />
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
          options={[
            {
              icon: "tabler:notification",
              name: "Notify User",
              onClick: () => {
                notifyUser(row);
              },
              permission: {
                action: "read",
                subject: "member",
              },
            },
          ]}
          editPermissionRule={{
            action: "update",
            subject: "member",
          }}
          deletePermissionRule={{
            action: "delete",
            subject: "member",
          }}
        />
      ),
    },
  ] as GridColDef[];
};
