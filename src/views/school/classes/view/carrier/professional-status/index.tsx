import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "src/@core/components/icon";
import memberApiService from "src/services/member/member-service";
import Member from "src/types/member/member";
import ProfessionalStatus from "src/types/member/professional-status";
import { defaultGetRequestParam } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import ProfessionalStatusCard from "./professional-status-card";
import ProfessionalStatusDrawer from "./professional-status-drawer";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";

const ProfessionalStatusComponent = ({
  member,
  isReadOnly,
}: {
  member: Member;
  isReadOnly: boolean;
}) => {
  const {
    data: professionalStatuses,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["professional-status", member.id],
    queryFn: () =>
      memberApiService
        .getProfessionalStatuses(member.id, defaultGetRequestParam)
        .then((response) => response.payload),
  });
  const hanldeDelete = (contactId: string) => {
    memberApiService.delete(contactId);
    refetch();
  };

  return (
    <ProfessionalStatusView
      onDelete={hanldeDelete}
      isReadOnly={isReadOnly}
      professionalStatuses={professionalStatuses || []}
      refetch={refetch}
      isLoading={isLoading}
      member={member}
    />
  );
};
const ProfessionalStatusView = ({
  professionalStatuses,
  refetch,
  isLoading,
  member,
  isReadOnly,
  onDelete,
}: {
  professionalStatuses: ProfessionalStatus[];
  refetch: () => void;
  isLoading: boolean;
  member: Member;
  onDelete: (memberContactId: string) => void;
  isReadOnly: boolean;
}) => {
  const { t: transl } = useTranslation();

  const [memberContactDrawerOpen, setAddProfessionalStatusOpen] =
    useState<boolean>(false);
  const [editableProfessionalStatus, setEditableProfessionalStatus] =
    useState<ProfessionalStatus>();
  const handleEdit = (memberContact: ProfessionalStatus) => {
    toggleProfessionalStatusDrawer();
    setEditableProfessionalStatus(memberContact);
  };

  // Access the hook methods and state

  const toggleProfessionalStatusDrawer = () => {
    setEditableProfessionalStatus({} as ProfessionalStatus);
    setAddProfessionalStatusOpen(!memberContactDrawerOpen);
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title={transl("professional-status")} sx={{ pb: 1.5 }} />
        <CardContent>
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
              sx={{ mb: 4, color: "text.disabled", textTransform: "uppercase" }}
            >
              {transl("professional-status-list")}
            </Typography>
            <IconButton onClick={toggleProfessionalStatusDrawer}>
              <Icon icon="tabler:plus" fontSize={20} />
            </IconButton>
          </Box>

          <ItemsListing
            type={ITEMS_LISTING_TYPE.list.value}
            dataConfig={
              {
                items: professionalStatuses,
                isLoading: isLoading,
              }
            }
            headerConfig={
              {
                title: "professional-status"
              }
            }
            createActionConfig={{
              onClick: toggleProfessionalStatusDrawer,
              onlyIcon: true,
              permission: {
                action: "create",
                subject: "professionalstatus",
              },
            }}
            ItemViewComponent={(props) => (
              <ProfessionalStatusCard
                isReadOnly={isReadOnly}
                academicInfo={props.data}
                {...props}
                onDelete={onDelete}
                onEdit={handleEdit}
              />
            )}
            hasListHeader={false}
          />
          {memberContactDrawerOpen && (
            <ProfessionalStatusDrawer
              member={member}
              refetch={refetch}
              open={memberContactDrawerOpen}
              toggle={toggleProfessionalStatusDrawer}
              professionalStatus={
                editableProfessionalStatus as ProfessionalStatus
              }
            />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProfessionalStatusComponent;
