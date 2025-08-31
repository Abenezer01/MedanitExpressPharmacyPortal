import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import { Class } from "src/types/school/class";
import CustomChip from "src/views/components/chips/CustomeChip";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: Class;
}

export const participatingClassColumns = (
  onEdit: (classItem: Class) => void,
  onDelete: (id: string) => void,
  transl: (item: string) => string,
  renderRegisterOrEdit?: (classItem: Class) => React.ReactNode, // <-- add this
): GridColDef[] => [
    {
      flex: 0.3,
      minWidth: 100,
      field: "title",
      headerName: transl("title"),
      sortable: true,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>{row.title}</Typography>
        </Box>
      ),
    },

    {
      flex: 0.1,
      minWidth: 100,
      field: "level",
      headerName: transl("level"),
      sortable: true,
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.level}
        </Typography>
      ),
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: "active",
      headerName: transl("status"),
      sortable: true,
      renderCell: ({ row }: CellType) => (
        <CustomChip
          rounded
          skin="light"
          size="small"
          label={row.active ? transl("active").toUpperCase() : transl("inactive").toUpperCase()}
          color={row.active ? "success" : "warning"}
          sx={{ textTransform: "capitalize" }}
        />
      ),
    },
    {
      flex: 0.15,
      minWidth: 120,
      sortable: false,
      field: "actions",
      headerName: transl("actions"),
      renderCell: ({ row }: { row: Class }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <RowOptions
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id)}
            item={row}
            editPermissionRule={{
              action: "update",
              subject: "class",
            }}
            deletePermissionRule={{
              action: "delete",
              subject: "class",
            }}
          />
          {renderRegisterOrEdit && renderRegisterOrEdit(row)}
        </Box>
      ),
    },
  ];