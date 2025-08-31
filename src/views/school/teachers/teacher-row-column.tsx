import { GridColDef } from "@mui/x-data-grid";

// ** React Imports

// ** Next Imports

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Icon Imports

// ** Store Imports

// ** Custom Components Imports

// ** Utils Import

// ** Actions Imports

// ** Third Party Components

// ** Types Imports

// ** Custom Table Components Imports
import moment from "moment";
import Member from "src/types/member/member";
import { Teacher } from "src/types/school/teacher";
import MemberProfileSmall from "src/views/member/members/member-profile-small";
import RowOptions from "src/views/shared/listing/row-options";
// Add this import if you have the component


interface CellType {
  row: Teacher;
}



export const teacherColumns = (
  onEdit: (teacherItem: Teacher) => void,
  onDelete: (id: string) => void,
  transl: (item: string) => string,
) => {
  return [
    {
      flex: 0.25,
      minWidth: 280,
      field: "member",
      headerName: transl("teacher"),
      sortable: true,
      renderCell: ({ row }: CellType) => {
        return (
          <MemberProfileSmall member={row.member as Member} route={`/school/teachers/${row.id}`} />
        );
      },
    },
    {
      flex: 0.25,
      minWidth: 280,
      field: "bio",
      headerName: transl("bio"),
      sortable: true,
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.bio || 'N/A'}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: "expertise",
      headerName: transl("expertise"),
      sortable: true,
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.expertise || 'N/A'}
        </Typography>
      ),
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: "created_at",
      headerName: transl("created"),
      sortable: true,
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {moment(row.created_at).format('DD/MM/YYYY')}
        </Typography>
      ),
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: "actions",
      headerName: transl("actions"),
      renderCell: ({ row }: CellType) => (
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          editPermissionRule={{
            action: "update",
            subject: "teacher",
          }}
          deletePermissionRule={{
            action: "delete",
            subject: "teacher",
          }}
        />
      ),
    },
  ] as GridColDef[];
};
