import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { ComponentType, MouseEvent, useState } from "react";
import Icon from "src/@core/components/icon";
import NoticeBoard from "src/types/team/notice-board";
import DeleteConfirmationDialog from "src/views/shared/dialog/delete-confirmation-dialog";
import FileDrawer from "src/views/shared/file-viewer";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { getInitials } from "src/@core/utils/get-initials";

const NoticeBoardCard: ComponentType<{
  onEdit: (noticeboard: NoticeBoard) => void;
  noticeboard: NoticeBoard;
  onDelete: (id: string) => void;
  transl: (id:string)=>string;
}> = ({ onEdit, noticeboard, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" className="mbe-2">
          {noticeboard.title}
        </Typography>

        <Typography color="text.secondary">{noticeboard.content}</Typography>
      </CardContent>
      <CardActions className="card-actions-dense">
        <NoticeBoardOptions
          onDelete={onDelete}
          onEdit={onEdit}
          noticeboard={noticeboard}
        />
        <FileDrawer id={noticeboard.id} type={'NOTICEBOARD_BOARD_ATTACHMENT'} /> &nbsp;
        <AvatarGroup max={3} sx={{ justifyContent: "center" }}>
          {
            noticeboard.recipients.map((recipient) =>
              <Avatar key={recipient.id}>{getInitials(recipient.name)}</Avatar>
            )
          }
        </AvatarGroup>
      </CardActions>
    </Card>
  );
};
const NoticeBoardOptions = ({
  noticeboard,
  onEdit,
  onDelete,
}: {
  noticeboard: NoticeBoard;
  onEdit: (noticeboard: NoticeBoard) => void;
  onDelete: (id: string) => void;
}) => {
  // ** Hooks

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const handleDelete = () => {
    onDelete(noticeboard.id);
    handleCloseDeleteDialog();
  };

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const rowOptionsOpen = Boolean(anchorEl);

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(noticeboard);
    handleRowOptionsClose();
  };

  return (
    <>
      <IconButton size="small" onClick={handleRowOptionsClick}>
        <Icon icon="tabler:dots-vertical" />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
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
export default NoticeBoardCard;
