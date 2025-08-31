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
import RowOptions from "src/views/shared/listing/row-options";
import { Session } from "src/types/school/session";
// Add this import if you have the component

interface SessionStatusType {
  [key: string]: ThemeColor;
}

interface CellType {
  row: Session;
}

const statusColors: SessionStatusType = {
  UPCOMING: 'info',
  ONGOING: 'primary',
  COMPLETED: 'success',
  CANCELLED: 'error',
};


export const sessionColumns = (
  onEdit: (sessionItem: Session) => void,
  onDelete: (id: string) => void,
  transl: (item: string) => string,
) => {
  return [
    {
      flex: 0.25,
      minWidth: 280,
      field: "title",
      headerName: transl("session"),
      sortable: true,
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography component="a" href={`/school/sessions/${row.id}/general`} sx={{ textDecoration: 'none', color: 'inherit' }}>
              {row.title}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: "date",
      headerName: transl("date"),
      sortable: true,
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.date ? moment(row.date).format("DD MMM YYYY") : ""}
        </Typography>
      ),
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: "status",
      headerName: transl("status"),
      sortable: true,
      renderCell: ({ row }: CellType) => (
        <CustomChip
          label={row.status}
          skin="light"
          color={statusColors[row.status] || 'default'}
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: "start_time",
      headerName: transl("start_time"),
      sortable: true,
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.start_time}
        </Typography>
      ),
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: "end_time",
      headerName: transl("end_time"),
      sortable: true,
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.end_time}
        </Typography>
      ),
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: "notes",
      headerName: transl("notes"),
      sortable: true,
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.notes}
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
          options={[]}
          editPermissionRule={{
            action: "update",
            subject: "session",
          }}
          deletePermissionRule={{
            action: "delete",
            subject: "session",
          }}
        />
      ),
    },
  ] as GridColDef[];
};
