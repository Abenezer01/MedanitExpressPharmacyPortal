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

// ** Custom Table Components Imports
import { Class } from "src/types/school/class";
import RowOptions from "src/views/shared/listing/row-options";
// Add this import if you have the component

interface CellType {
  row: Class;
}



export const classColumns = (
  onEdit: (classItem: Class) => void,
  onDelete: (id: string) => void,
  transl: (item: string) => string,
) => {
  return [
    {
      flex: 0.25,
      minWidth: 280,
      field: "title",
      headerName: transl("class"),
      sortable: true,
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Uncomment if you have this component */}
            {/* <ClassProfileSmall class={row} /> */}
            <Typography>{row.title}</Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.25,
      minWidth: 280,
      field: "description",
      headerName: transl("description"),
      sortable: true,
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.description}
        </Typography>
      ),
    },
    {
      flex: 0.1,
      minWidth: 110,
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
          options={[

          ]}
          editPermissionRule={{
            action: "update",
            subject: "class",
          }}
          deletePermissionRule={{
            action: "delete",
            subject: "class",
          }}
        />
      ),
    },
  ] as GridColDef[];
};
