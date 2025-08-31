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
import { FamilySupportType } from "src/types/school/family-support";
import { formatToCalendar } from "src/utils/formatter/date";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: FamilySupportType;
}

export const familySupportTypeColumns = (
  onEdit: (familySupportTypeItem: FamilySupportType) => void,
  onDelete: (id: string) => void,
  transl: (item: string) => string,
) => {
  return [

    {
      flex: 0.25,
      minWidth: 280,
      field: "name",
      headerName: transl("Name"),
      sortable: true,
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.name}
        </Typography>
      ),
    },
    {
      flex: 0.25,
      minWidth: 280,
      field: "description",
      headerName: transl("Description"),
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
      field: "created_at",
      headerName: transl("Created"),
      sortable: true,
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.created_at ? formatToCalendar(row.created_at) : 'N/A'}
        </Typography>
      ),
    },

    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: "actions",
      headerName: transl("Actions"),
      renderCell: ({ row }: CellType) => (
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          editPermissionRule={{
            action: "update",
            subject: "familysupporttype",
          }}
          deletePermissionRule={{
            action: "delete",
            subject: "familysupporttype",
          }}
        />
      ),
    },
  ] as GridColDef[];
}
