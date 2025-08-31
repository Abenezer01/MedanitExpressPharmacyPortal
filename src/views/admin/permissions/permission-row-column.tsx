import { GridColDef } from "@mui/x-data-grid";

// ** React Imports

// ** Next Imports

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Icon Imports

// ** Types Imports

// ** Custom Table Components Imports
import moment from "moment";
import Permission from "src/types/admin/role/permission";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: Permission;
}

export const permissionColumns = (
  onEdit: (permission: Permission) => void,
  onDelete: (id: string) => void,
  transl: (item: string)=>void
) =>
  [
    {
      flex: 0.25,
      minWidth: 280,
      field: "name",
      headerName: transl('permission'),
      renderCell: ({ row }: CellType) => {
        return (
          <Typography sx={{ color: "text.secondary" }}>{row.name}</Typography>
        );
      },
    },

    {
      flex: 0.25,
      minWidth: 280,
      field: "model",
      headerName: transl('model'),
      renderCell: ({ row }: CellType) => {
        return (
          <Typography sx={{ color: "text.secondary" }}>{row.model}</Typography>
        );
      },
    },

    {
      flex: 0.25,
      minWidth: 280,
      field: "module",
      headerName: transl('module'),
      renderCell: ({ row }: CellType) => {
        return (
          <Typography sx={{ color: "text.secondary" }}>{row.module}</Typography>
        );
      },
    },

    {
      flex: 0.15,
      minWidth: 120,
      headerName: transl('created_at'),
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
      headerName: transl('actions'),
      renderCell: ({ row }: CellType) => (
        <RowOptions
          onEdit={onEdit}
          editPermissionRule={{
            action: "update",
            subject: "permission",
          }}
          deletePermissionRule={{
            action: "delete",
            subject: "permission",
          }}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
        />
      ),
    },
  ] as GridColDef[];
