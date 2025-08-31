import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import positionApiService from "src/services/team/position-service";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import Position from "src/types/team/position";

import ItemsListing from "src/views/shared/listing";
import { positionColumns } from "./position-row-column";
import PositionDrawer from "./add/position-drawer";
import Department from "src/types/team/department";

const PositionList = ({ department }: { department: Department }) => {
  const [positionsDrawerOpen, setAddPositionOpen] = useState<boolean>(false);
  const [editablePosition, setEditablePosition] = useState<Position>();
  const handleEdit = (positions: Position) => {
    togglePositionDrawer();
    setEditablePosition(positions);
  };
  const { t: transl } = useTranslation();



  const togglePositionDrawer = () => {
    setEditablePosition({} as Position);
    setAddPositionOpen(!positionsDrawerOpen);
  };
  async function handleDelete(id: string): Promise<void> {
    await positionApiService.delete(id);
  }
  const fetchPositions = (
    params: GetRequestParam
  ): Promise<IApiResponse<Position[]>> => {
    return positionApiService.getAll({ ...params, filter: { ...params.filter, department_id: department?.id } });
  };

  const {
    data: positions,
    isLoading,
    pagination,
    handlePageChange,
    handleSearch,
    refetch,
  } = usePaginatedFetch<Position[]>({
    queryKey: ["positions"],
    fetchFunction: fetchPositions,
  });


  return (
    <>
      <ItemsListing
        type={ITEMS_LISTING_TYPE.table.value}
        dataConfig={{
          items: positions || [],
          fetchDataFunction: fetchPositions,
          isLoading,
        }}
        paginationConfig={{
          pagination,
          onChange: (pageSize, page) => {
            handlePageChange(pageSize, page);
          }
        }}
        tableConfig={{
          headers: positionColumns(handleEdit, handleDelete, transl)
        }}
        headerConfig={{
          title: 'positions',
          features: {
            search: {
              enabled: true,
              onSearch: handleSearch,
              searchKeys: ['name'],
              permission: {
                action: 'read',
                subject: 'position'
              }
            },

          }
        }}
        createActionConfig={{
          show: true,
          onClick: togglePositionDrawer,
          permission: {
            action: 'create',
            subject: 'position'
          }
        }}
      />

      {positionsDrawerOpen && (
        <PositionDrawer
          refetch={refetch}
          open={positionsDrawerOpen}
          toggle={togglePositionDrawer}
          position={editablePosition as Position}
        />
      )}
    </>
  );
};
PositionList.acl = {
  action: "read",
  subject: "position",
};
export default PositionList;
