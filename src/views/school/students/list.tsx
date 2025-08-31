import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import studentApiService from "src/services/school/student-api-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { Student } from "src/types/school/student";
import ItemsListing from "src/views/shared/listing";
import StudentDrawer from "./student-drawer";
import { studentColumns } from "./student-row-column";

const StudentList = ({ }) => {
  const [studentDrawerOpen, setAddStudentOpen] = useState<boolean>(false);
  const [editableStudent, setEditableStudent] = useState<Student>();
  const { t: transl } = useTranslation();
  const toggleStudentDrawer = () => {
    setEditableStudent({} as Student);
    setAddStudentOpen(!studentDrawerOpen);
  };
  const handleEdit = (studentItem: Student) => {
    toggleStudentDrawer();
    setEditableStudent(studentItem);
  }

  // Access the hook methods and state
  const fetchStudents = (
    params: GetRequestParam
  ): Promise<IApiResponse<Student[]>> => {
    return studentApiService.getAll({ ...params });
  };

  const {
    data: students,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<Student[]>({
    queryKey: ["students"],
    fetchFunction: fetchStudents,
  });




  const handleDelete = async (studentId: string) => {
    await studentApiService.delete(studentId);
    refetch();
  };

  return (
    <>
      <ItemsListing
        type={ITEMS_LISTING_TYPE.table.value}
        // Data configuration
        dataConfig={{
          items: students || [],
          fetchDataFunction: fetchStudents,
          isLoading: isLoading
        }}
        // Pagination configuration
        paginationConfig={{
          pagination: pagination,
          onChange: handlePageChange,
        }}
        // Table configuration
        tableConfig={{
          headers: studentColumns(
            handleEdit,
            handleDelete,
            transl
          ),
        }}
        // Header configuration
        headerConfig={{
          title: "students",

        }}
        // Action configuration
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleStudentDrawer,
          permission: {
            action: "create",
            subject: "student",
          },
        }}
      />

      {studentDrawerOpen && (
        <StudentDrawer
          refetch={refetch}
          open={studentDrawerOpen}
          toggle={toggleStudentDrawer}
          studentItem={editableStudent as Student}
        />
      )}
    </>
  );
};

export default StudentList;
