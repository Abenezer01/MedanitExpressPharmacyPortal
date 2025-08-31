import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import userApiService from "src/services/admin/user-service";
import User from "src/types/admin/user";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import UserDrawer from "src/views/admin/user/list/user-drawer";
import { userColumns } from "src/views/admin/user/list/user-row-column";
import ItemsListing from "src/views/shared/listing";

const UserList = ({ }) => {
  const [userDrawerOpen, setAddUserOpen] = useState<boolean>(false);
  const [editableUser, setEditableUser] = useState<User>();
  const handleEdit = (user: User) => {
    toggleUserDrawer();
    setEditableUser(user);
  };
  const { t: transl } = useTranslation();



  const toggleUserDrawer = () => {  
    setEditableUser({} as User);
    setAddUserOpen(!userDrawerOpen);
  };
  const handleDelete = async (userId: string) => {
    await userApiService.delete(userId);
    refetch();
  };
  const fetchUsers = (params: GetRequestParam): Promise<IApiResponse<User[]>> => {
    return userApiService.getAll({ ...params });
  };

  const {
    data: users,
    isLoading,
    pagination,
    handlePageChange,
    handleSearch,
    refetch,
  } = usePaginatedFetch<User[]>({
    queryKey: ["users"],
    fetchFunction: fetchUsers,
  });

  return (
    <>
      <ItemsListing
          type={ITEMS_LISTING_TYPE.table.value}
        dataConfig={{
          items: users || [],
          fetchDataFunction: fetchUsers,
          isLoading,
        }}
        paginationConfig={{
          pagination,
          onChange: (pageSize, page) => {
            handlePageChange(pageSize, page);
          }
        }}
        tableConfig={{
          headers: userColumns(handleEdit, handleDelete, transl)
        }}
        headerConfig={{
          title: 'Users',
          features: {
            search: {
              enabled: true,
              searchKeys: ['name'],
              onSearch: handleSearch,
              permission: {
                action: 'read',
                subject: 'user'
              }
            },
    
          }
        }}
        createActionConfig={{
          show: true,
          onClick: toggleUserDrawer,
          permission: {
            action: 'create',
            subject: 'user'
          }
        }}
      />

      {userDrawerOpen && (
        <UserDrawer
          refetch={refetch}
          open={userDrawerOpen}
          toggle={toggleUserDrawer}
          user={editableUser as User}
        />
      )}
    </>
  );
};
UserList.acl = {
  action: "read",
  subject: "user"
}
export default UserList;
