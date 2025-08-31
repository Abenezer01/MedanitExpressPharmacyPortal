import { GridColDef } from "@mui/x-data-grid";

// ** React Imports
import { Fragment } from "react";

// ** Next Imports
import Link from "next/link";

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Types Imports

// ** Custom Table Components Imports
import moment from "moment";
import CustomAvatar from "src/@core/components/mui/avatar";
import Position from "src/types/team/position";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: Position;
}

export const positionColumns = (
  onEdit: (position: Position) => void,
  onDelete: (id: string) => void,
  transl: (key: string) => string
) =>
  [
    {
      flex: 0.25,
      minWidth: 280,
      field: "name",
      headerName: transl("Position"),
      renderCell: ({ row }: CellType) => {
        return (
          <Fragment>
            {row.is_head && (
              <CustomAvatar
                skin="light"
                color={"primary"}
                sx={{ width: 20, height: 20, mr: 2 }}
              >
                <Icon icon={"tabler:star-filled"} />
              </CustomAvatar>
            )}

            <Typography
              noWrap
              component={Link}
              href={`/team/positions/${row.id}/sub-positions/`}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {row.name}
            </Typography>
          </Fragment>
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
      headerName: "Actions",
      renderCell: ({ row }: CellType) => (
        <RowOptions
          onEdit={onEdit}
          editPermissionRule={{
            action: "update",
            subject: "position",
          }}
          deletePermissionRule={{
            action: "delete",
            subject: "position",
          }}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
        />
      ),
    },
  ] as GridColDef[];
