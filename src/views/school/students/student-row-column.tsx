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
import { Student } from "src/types/school/student";
import MemberProfileSmall from "src/views/member/members/member-profile-small";
import RowOptions from "src/views/shared/listing/row-options";
// Add this import if you have the component



interface CellType {
  row: Student;
}



export const studentColumns = (
  onEdit: (studentItem: Student) => void,
  onDelete: (id: string) => void,
  transl: (item: string) => string,
) => {
  return [
    {
      flex: 0.25,
      minWidth: 280,
      field: "member",
      headerName: transl("student"),
      sortable: true,
      renderCell: ({ row }: CellType) => {
        return (
          <MemberProfileSmall member={row.member as Member} route={`/school/students/${row.id}`} />
        );
      },
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: "class",
      headerName: transl("class"),
      sortable: true,
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.class?.title || 'N/A'}
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
          {row.created_at ? moment(row.created_at).format('DD/MM/YYYY') : 'N/A'}
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
            subject: "student",
          }}
          deletePermissionRule={{
            action: "delete",
            subject: "student",
          }}
        />
      ),
    },
  ] as GridColDef[];
};
