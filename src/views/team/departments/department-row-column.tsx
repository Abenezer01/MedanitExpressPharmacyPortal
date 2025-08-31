import { GridColDef } from "@mui/x-data-grid";

// ** React Imports

// ** Next Imports
import Link from "next/link";

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Icon Imports

// ** Types Imports

// ** Custom Table Components Imports
import moment from "moment";
import Department from "src/types/team/department";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: Department;
}



export const departmentColumns = (
  onEdit: (department: Department) => void,
  onDelete: (id: string) => void,
  transl:(key:string)=>void 
) =>
  [
    {
      flex: 0.25,
      minWidth: 280,
      field: "name",
      headerName: transl("Department"),
      renderCell: ({ row }: CellType) => {
        return (
          <Typography
            noWrap
            component={Link}
            href={`/team/departments/${row.id}/sub-departments/`}
            sx={{
              fontWeight: 500,
              textDecoration: "none",
              color: "text.secondary",
              "&:hover": { color: "primary.main" },
            }}
          >
            {row.name}
          </Typography>
        );
      },
    },

    {
      flex: 0.15,
      minWidth: 120,
      headerName: "Created At",
      field: transl("created_at"),
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
          subject: "department",
        }}
        deletePermissionRule={{
          action: "delete",
          subject: "department",
        }}
      />
      ),
    },
  ] as GridColDef[];
