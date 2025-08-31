import Typography from "@mui/material/Typography";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import Link from "next/link";
import Role from "src/types/admin/role";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: Role;
}

export const roleColumns = (
  onEdit: (role: Role) => void,
  onDelete: (id: string) => void,
  transl: (word: string) => void,
) => {
  return [
    {
      flex: 0.25,
      minWidth: 280,
      field: "name",
      headerName: transl("role"),
      renderCell: ({ row }: CellType) => {
        return (
          <Typography
            component={Link}
            href={`/admin/roles/${row.id}`}
            sx={{ color: "text.secondary" }}
          >
            {row.name}
          </Typography>
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
          options={[]}
          editPermissionRule={{
            action: "update",
            subject: "role",
          }}
          deletePermissionRule={{
            action: "delete",
            subject: "role",
          }}
        />
      ),
    },
  ] as GridColDef[];
};
