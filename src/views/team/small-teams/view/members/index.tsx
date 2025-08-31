import { useState, useCallback } from "react";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import teamMemberApiService from "src/services/team/team-member-service";
import Member from "src/types/member/member";
import Attendance from "src/types/team/attendance";
import SmallTeam from "src/types/team/small-team";
import ItemsListing from "src/views/shared/listing";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import smallTeamApiService from "src/services/team/small-team-service";
import SmallTeamMemberCard from "./small-team-member-card";
import SmallTeamMemberDrawer from "./add/small-team-member-drawer";

const SmallTeamMemberList = ({ smallTeam }: { smallTeam: SmallTeam }) => {
  const [memberDrawerOpen, setAddMemberOpen] = useState<boolean>(false);
  const [editableMember, setEditableMember] = useState<Member>();

  // Access the hook methods and state
  const fetchSmallTeamMembers = useCallback(
    (params: GetRequestParam): Promise<IApiResponse<Member[]>> => {
      return smallTeamApiService.getSmallTeamMembers(smallTeam.id, params);
    },
    [smallTeam.id]
  );

  const {
    data: smallTeamMembers,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<Member[]>({
    queryKey: ["small-team-member", smallTeam.id],
    fetchFunction: fetchSmallTeamMembers,
  });



  const handleEdit = (member: Member) => {
    toggleMemberDrawer();
    setEditableMember(member);
  };

  const toggleMemberDrawer = () => {
    setEditableMember({} as Member);
    setAddMemberOpen(!memberDrawerOpen);
  };

  const handleDelete = async (memberToDeleteId: string) => {
    await teamMemberApiService.delete(memberToDeleteId);
    refetch();
  };
  return (
    <>
      <ItemsListing
        type={ITEMS_LISTING_TYPE.list.value}
        headerConfig={
          {
            title: "small-team-members",
          }
        }
        paginationConfig={
          {
            pagination: pagination,
            onChange: handlePageChange,
          }
        }
        dataConfig={
          {
            items: smallTeamMembers || [],
            isLoading: isLoading,

          }
        }
        ItemViewComponent={(props) => (
          <SmallTeamMemberCard
            smallTeamMember={
              props.data as Member & { attendance: Attendance[] }
            }
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
        createActionConfig={{
          onClick: toggleMemberDrawer,
          permission: {
            action: "create",
            subject: "teammember",
          },
        }}
      />

      {memberDrawerOpen && (
        <SmallTeamMemberDrawer
          refetch={refetch}
          open={memberDrawerOpen}
          toggle={toggleMemberDrawer}
          smallTeamMember={editableMember as Member}
          smallTeam={smallTeam}
        />
      )}
    </>
  );
};
export default SmallTeamMemberList;
