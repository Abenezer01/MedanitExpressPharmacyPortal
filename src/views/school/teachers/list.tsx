import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import teacherApiService from "src/services/school/teacher-api-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { Teacher } from "src/types/school/teacher";
import ItemsListing from "src/views/shared/listing";
import TeacherDrawer from "./teacher-drawer";
import { teacherColumns } from "./teacher-row-column";

const TeacherList = ({ }) => {
  const [teacherDrawerOpen, setAddTeacherOpen] = useState<boolean>(false);
  const [editableTeacher, setEditableTeacher] = useState<Teacher>();
  const { t: transl } = useTranslation();
  const toggleTeacherDrawer = () => {
    setEditableTeacher({} as Teacher);
    setAddTeacherOpen(!teacherDrawerOpen);
  };
  const handleEdit = (teacherItem: Teacher) => {
    toggleTeacherDrawer();
    setEditableTeacher(teacherItem);
  }

  // Access the hook methods and state
  const fetchTeachers = (
    params: GetRequestParam
  ): Promise<IApiResponse<Teacher[]>> => {
    return teacherApiService.getAll({ ...params });
  };

  const {
    data: teachers,
    isLoading,
    pagination,
    handlePageChange,

    refetch,
  } = usePaginatedFetch<Teacher[]>({
    queryKey: ["teachers"],
    fetchFunction: fetchTeachers,
  });




  const handleDelete = async (teacherId: string) => {
    await teacherApiService.delete(teacherId);
    refetch();
  };

  return (
    <>
      <ItemsListing
        type={ITEMS_LISTING_TYPE.table.value}
        // Data configuration
        dataConfig={{
          items: teachers || [],
          fetchDataFunction: fetchTeachers,
          isLoading: isLoading
        }}
        // Pagination configuration
        paginationConfig={{
          pagination: pagination,
          onChange: handlePageChange,
        }}
        // Table configuration
        tableConfig={{
          headers: teacherColumns(
            handleEdit,
            handleDelete,
            transl
          ),
        }}
        // Header configuration
        headerConfig={{
          title: "teachers",

        }}
        // Action configuration
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleTeacherDrawer,
          permission: {
            action: "create",
            subject: "teacher",
          },
        }}
      />

      {teacherDrawerOpen && (
        <TeacherDrawer
          refetch={refetch}
          open={teacherDrawerOpen}
          toggle={toggleTeacherDrawer}
          teacherItem={editableTeacher as Teacher}
        />
      )}
    </>
  );
};

export default TeacherList;
