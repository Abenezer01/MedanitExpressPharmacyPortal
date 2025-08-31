import { GridColDef } from "@mui/x-data-grid";

// ** React Imports

// ** Next Imports

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Icon Imports

// ** Types Imports
// ** Custom Table Components Imports
import { Box } from "@mui/material";
import Attendance from "src/types/team/weekly-report";
import { formatCalendar } from "src/utils/formatter/date";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: Attendance;
}

export const weeklyReportColumns = (
  onEdit: (weeklyReport: Attendance) => void,
  onDelete: (id: string) => void,
  transl: (item: string) => string,
) =>
  [
    {
      flex: 0.25,
      minWidth: 280,
      field: "Date",
      headerName: transl("date"),
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ color: "text.secondary" }}>
              {formatCalendar(row.date)}
            </Typography>
          </Box>
        );
      },
    },

    {
      flex: 0.15,
      minWidth: 120,
      headerName: "Description",
      field: "description",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography sx={{ color: "text.secondary" }}>
            {String(row.description)}
          </Typography>
        );
      },
    },

    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }: CellType) => (
        <RowOptions
          onEdit={onEdit}
          editPermissionRule={{
            action: "update",
            subject: "stweeklyreport",
          }}
          deletePermissionRule={{
            action: "delete",
            subject: "stweeklyreport",
          }}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
        />
      ),
    },
  ] as GridColDef[];
