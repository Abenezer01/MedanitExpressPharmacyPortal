import { useState } from "react";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import teamMemberApiService from "src/services/team/team-member-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import Department from "src/types/team/department";
import TeamMember from "src/types/team/team-member";
import ItemsListing from "src/views/shared/listing";
import DepartmentMemberDrawer from "./add/department-member-drawer";
import DepartmentMemberCard from "./department-member-card";

const DepartmentMemberList = ({ department }: { department: Department }) => {
  const [departmentMembersDrawerOpen, setAddDepartmentMemberOpen] = useState<boolean>(false);
  const [editableDepartmentMember, setEditableDepartmentMember] = useState<TeamMember>();

  const handleEdit = (departmentMembers: TeamMember) => {
    toggleDepartmentMemberDrawer();
    setEditableDepartmentMember(departmentMembers);
  };

  // Access the hook methods and state
  const fetchDepartmentMembers = (
    params: GetRequestParam
  ): Promise<IApiResponse<TeamMember[]>> => {
    return teamMemberApiService.getAll({ ...params, filter: { ...params.filter, model_id: department.id } });
  };

  const {
    data: departmentMembers,
    isLoading,
    pagination,
    handlePageChange,
    handleSearch,
    refetch,
  } = usePaginatedFetch<TeamMember[]>({
    queryKey: ["departmentMembers", department.id],
    fetchFunction: fetchDepartmentMembers,
  });



  const toggleDepartmentMemberDrawer = () => {
    setEditableDepartmentMember({} as TeamMember);
    setAddDepartmentMemberOpen(!departmentMembersDrawerOpen);
  };
  const handleDelete = async (departmentMembersId: string) => {
    await teamMemberApiService.delete(departmentMembersId);
    refetch();
  };
  return (
    <>
      <ItemsListing
        type={ITEMS_LISTING_TYPE.list.value}
        // Data configuration
        dataConfig={{
          items: departmentMembers || [],
          fetchDataFunction: fetchDepartmentMembers,
          isLoading: isLoading
        }}
        // Pagination configuration
        paginationConfig={{
          pagination: pagination,
          onChange: handlePageChange,
        }}
        // Table configuration
        ItemViewComponent={(props) => <DepartmentMemberCard departmentMember={props.data} onDelete={handleDelete} onEdit={handleEdit} />}
        // Header configuration
        headerConfig={{
          title: "department-members",
          features: {

            search: {
              enabled: true,
              searchKeys: ["name"],
              onSearch: handleSearch,
              permission: {
                action: "read",
                subject: "departmentmembers",
              }
            },
          }
        }}
        // Action configuration
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDepartmentMemberDrawer,
          permission: {
            action: "create",
            subject: "departmentmembers",
          },
        }}
      />

      {departmentMembersDrawerOpen && (
        <DepartmentMemberDrawer
          refetch={refetch}
          open={departmentMembersDrawerOpen}
          toggle={toggleDepartmentMemberDrawer}
          departmentMember={editableDepartmentMember as TeamMember}
          department={department} />
      )}
    </>
  );
};
DepartmentMemberList.acl = {
  action: "read",
  subject: "departmentMembers",
};
export default DepartmentMemberList;
