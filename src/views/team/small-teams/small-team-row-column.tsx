import { GridColDef } from "@mui/x-data-grid";

// ** React Imports
import { MouseEvent, useState } from "react";

// ** Next Imports
import Link from "next/link";

// ** MUI Imports
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Types Imports

// ** Custom Table Components Imports
import { Box } from "@mui/material";
import moment from "moment";
import SmallTeam from "src/types/team/small-team";
import MemberProfileSmall from "src/views/member/members/member-profile-small";
import DeleteConfirmationDialog from "src/views/shared/dialog/delete-confirmation-dialog";

interface CellType {
  row: SmallTeam;
}

const SmallTeamOptions = ({
  smallTeam,
  onEdit,
  onDelete,
}: {
  smallTeam: SmallTeam;
  onEdit: (smallTeam: SmallTeam) => void;
  onDelete: (id: string) => void;
}) => {
  // ** Hooks

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const handleDelete = () => {
    onDelete(smallTeam.id);
    handleCloseDeleteDialog();
  };

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const rowOptionsOpen = Boolean(anchorEl);

  const handleSmallTeamOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSmallTeamOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(smallTeam);
    handleSmallTeamOptionsClose();
  };

  return (
    <>
      <IconButton size="small" onClick={handleSmallTeamOptionsClick}>
        <Icon icon="tabler:dots-vertical" />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleSmallTeamOptionsClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{ style: { minWidth: "8rem" } }}
      >
        <MenuItem onClick={handleEdit} sx={{ "& svg": { mr: 2 } }}>
          <Icon icon="tabler:edit" fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleOpenDeleteDialog} sx={{ "& svg": { mr: 2 } }}>
          <Icon icon="tabler:trash" fontSize={20} />
          Delete
          <DeleteConfirmationDialog
            handleClose={handleCloseDeleteDialog}
            open={isDeleteDialogOpen}
            onCancel={handleCloseDeleteDialog}
            onConfirm={handleDelete}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export const smallTeamColumns = (
  onEdit: (smallTeam: SmallTeam) => void,
  onDelete: (id: string) => void,
  transl: (item: string) => string,
) => {
  return [
    {
      flex: 0.25,
      minWidth: 280,
      field: "name",
      headerName: transl("small-team"),
      renderCell: ({ row }: CellType) => {
        return (
          <Typography
            noWrap
            component={Link}
            href={`/team/small-teams/list/${row.id}/members/`}
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
      flex: 0.25,
      minWidth: 280,
      field: "lead_id",
      headerName: transl("leader"),
      renderCell: ({ row }: CellType) => {
        return (
          row.leader?.id && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <MemberProfileSmall member={row.leader} />
            </Box>
          )
        );
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: "Created At",
      field: "createdAt",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography sx={{ color: "text.secondary" }}>
            {moment(row.created_at).format("DD MMM YYYY")}
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
        <SmallTeamOptions onEdit={onEdit} onDelete={onDelete} smallTeam={row} />
      ),
    },
  ] as GridColDef[];
};
