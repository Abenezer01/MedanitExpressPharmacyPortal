import {
  Box,
  Card,
  CardHeader,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "src/@core/components/icon";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import Can from "src/layouts/components/acl/Can";
import parentApiService from "src/services/child/parent-service";
import Child from "src/types/child/child";
import Parent from "src/types/child/parent";
import { defaultGetRequestParam } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import ParentCard from "./parent-card";
import ParentDrawer from "./parent-drawer";

const ParentList = ({
  child,
  isReadOnly = false,
}: {
  child: Child;
  isReadOnly?: boolean;
}) => {

  const {
    data: parents,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parents-by-child", child.id],
    queryFn: () =>
      parentApiService.getParentsByChildId(child.id, defaultGetRequestParam)
        .then((response) => response.payload),
  });

  const handleDelete = async (parentId: string) => {
    try {
      await parentApiService.delete(parentId);
      refetch();
    } catch (error) {
      console.error("Error deleting parent:", error);
    }
  };

  return (
    <ParentView
      isReadOnly={isReadOnly}
      onDelete={handleDelete}
      parents={parents || []}
      refetch={refetch}
      isLoading={isLoading}
      child={child}
    />
  );
};

const ParentView = ({
  parents = [],
  refetch,
  isLoading,
  onDelete,
  isReadOnly = false,
  child,
}: {
  parents: Parent[];
  refetch: () => void;
  isLoading: boolean;
  onDelete: (parentId: string) => void;
  isReadOnly: boolean;
  child: Child;
}) => {
  const [parentDrawerOpen, setAddParentOpen] = useState<boolean>(false);

  const [editableParent, setEditableParent] = useState<Parent>();
  const handleEdit = (parent: Parent) => {
    toggleParentDrawer();
    setEditableParent(parent);
  };
  const { t: transl } = useTranslation();


  const toggleParentDrawer = () => {
    setEditableParent({} as Parent);
    setAddParentOpen(!parentDrawerOpen);
  };


  return (
      <Grid item xs={12}>
        <Card sx={{ mb: 5 }}>
          <CardHeader title={transl("parents")} sx={{ pb: 1.5 }} />
          <Box
            sx={{
              display: "flex",
              cursor: "pointer",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                mb: 4,
                color: "text.disabled",
                textTransform: "uppercase",
                pl: 6,
              }}
            >
              {transl("parent-list")}
            </Typography>
            <Can do={"create"} on={"parent"}>
              <IconButton onClick={toggleParentDrawer}>
                <Icon icon="tabler:plus" fontSize={20} />
              </IconButton>
            </Can>
          </Box>
        </Card>

        <ItemsListing 
          type={ITEMS_LISTING_TYPE.grid.value}
        dataConfig={{
          items: parents,
          fetchDataFunction: undefined,
          isLoading
        }} 
        ItemViewComponent={(props) => (
          <ParentCard
            isReadOnly={isReadOnly}
            parent={props.data}
            {...props}
            onDelete={onDelete}
            onEdit={handleEdit}
          />
        )}      
        />

        {parentDrawerOpen && (
          <ParentDrawer
            open={parentDrawerOpen}
            toggle={toggleParentDrawer}
            parent={editableParent as Parent}
            refetch={refetch}
            child={child}
          />
        )}
      </Grid>
  
  );
};

export default ParentList;
