import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import classApiService from "src/services/school/class-api-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { Class } from "src/types/school/class";
import ItemsListing from "src/views/shared/listing";
import ClassDrawer from "./class-drawer";
import { classColumns } from "./class-row-column";

const ClassList = ({ }) => {
  const [classDrawerOpen, setAddClassOpen] = useState<boolean>(false);
  const [editableClass, setEditableClass] = useState<Class>();
  const { t: transl } = useTranslation();
  const toggleClassDrawer = () => {
    setEditableClass({} as Class);
    setAddClassOpen(!classDrawerOpen);
  };
  const handleEdit = (classItem: Class) => {
    toggleClassDrawer();
    setEditableClass(classItem);
  }

  // Access the hook methods and state
  const fetchClasses = (
    params: GetRequestParam
  ): Promise<IApiResponse<Class[]>> => {
    return classApiService.getAll({ ...params });
  };

  const {
    data: classes,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<Class[]>({
    queryKey: ["classes"],
    fetchFunction: fetchClasses,
  });




  const handleDelete = async (classId: string) => {
    await classApiService.delete(classId);
    refetch();
  };

  return (
    <>
      <ItemsListing
        type={ITEMS_LISTING_TYPE.table.value}
        // Data configuration
        dataConfig={{
          items: classes || [],
          fetchDataFunction: fetchClasses,
          isLoading: isLoading
        }}
        // Pagination configuration
        paginationConfig={{
          pagination: pagination,
          onChange: handlePageChange,
        }}
        // Table configuration
        tableConfig={{
          headers: classColumns(
            handleEdit,
            handleDelete,
            transl
          ),
        }}
        // Header configuration
        headerConfig={{
          title: "classes",

        }}
        // Action configuration
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleClassDrawer,
          permission: {
            action: "create",
            subject: "class",
          },
        }}
      />

      {classDrawerOpen && (
        <ClassDrawer
          refetch={refetch}
          open={classDrawerOpen}
          toggle={toggleClassDrawer}
          classItem={editableClass as Class}
        />
      )}
    </>
  );
};

export default ClassList;
