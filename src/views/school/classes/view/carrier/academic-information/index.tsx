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
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import memberApiService from "src/services/member/member-service";
import AcademicInformation from "src/types/member/academic-information";
import Member from "src/types/member/member";
import { defaultGetRequestParam } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import AcademicInformationCard from "./academic-information-card";
import AcademicInformationDrawer from "./academic-information-drawer";

const AcademicInformationComponent = ({
  member,
  isReadOnly,
}: {
  member: Member;
  isReadOnly: boolean;
}) => {
  const {
    data: academicInformations,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["academic-information", member.id],
    queryFn: () =>
      memberApiService
        .getAcademicInformations({ ...defaultGetRequestParam, filter: { member_id: member.id } })
        .then((response) => response.payload),
  });
  const hanldeDelete = (contactId: string) => {
    memberApiService.delete(contactId);
    refetch();
  };

  return (
    <AcademicInformationView
      onDelete={hanldeDelete}
      isReadOnly={isReadOnly}
      academicInformations={academicInformations}
      refetch={refetch}
      isLoading={isLoading}
      member={member}
    />
  );
};
const AcademicInformationView = ({
  academicInformations,
  refetch,
  isLoading,
  member,
  isReadOnly,
  onDelete,
}: {
  academicInformations: AcademicInformation[];
  refetch: () => void;
  isLoading: boolean;
  member: Member;
  isReadOnly: boolean;
  onDelete: (memberContactId: string) => void;
}) => {
  const { t: transl } = useTranslation();

  const [memberContactDrawerOpen, setAddAcademicInformationOpen] =
    useState<boolean>(false);
  const [editableAcademicInformation, setEditableAcademicInformation] =
    useState<AcademicInformation>();
  const handleEdit = (memberContact: AcademicInformation) => {
    toggleAcademicInformationDrawer();
    setEditableAcademicInformation(memberContact);
  };

  // Access the hook methods and state

  const toggleAcademicInformationDrawer = () => {
    setEditableAcademicInformation({} as AcademicInformation);
    setAddAcademicInformationOpen(!memberContactDrawerOpen);
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title={transl("academic-information")} sx={{ pb: 1.5 }} />
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
              {transl("academic-information-list")}
            </Typography>
            {!isReadOnly && (
              <IconButton onClick={toggleAcademicInformationDrawer}>
                <Icon icon="tabler:plus" fontSize={20} />
              </IconButton>
            )}
          </Box>

          <ItemsListing
            type={ITEMS_LISTING_TYPE.list.value}
            dataConfig={
              {
                items: academicInformations,
                isLoading: isLoading,
              }
            }
            headerConfig={
              {
                title: "academic-information",
              }
            }
            createActionConfig={{
              onClick: toggleAcademicInformationDrawer,
              onlyIcon: true,
              permission: {
                action: "create",
                subject: "acadamicinformation",
              },
            }}
            ItemViewComponent={(props) => (
              <AcademicInformationCard
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
            <AcademicInformationDrawer
              member={member}
              refetch={refetch}
              open={memberContactDrawerOpen}
              toggle={toggleAcademicInformationDrawer}
              academicInformation={
                editableAcademicInformation as AcademicInformation
              }
            />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AcademicInformationComponent;
