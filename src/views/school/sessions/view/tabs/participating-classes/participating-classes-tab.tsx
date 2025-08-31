import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import classApiService from "src/services/school/class-api-service";
import sessionClassApiService from "src/services/school/session-class-api-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { Class } from "src/types/school/class";
import Session from "src/types/school/session";
import { SessionClass } from "src/types/school/session-class";
import ItemsListing from "src/views/shared/listing";
import { participatingClassColumns } from "./participating-class-columns";
import ParticipatingClassesDrawer from "./participating-classes-drawer";

const ParticipatingClasses = ({ session }: { session: Session }) => {
  const [classDrawerOpen, setAddClassOpen] = useState<boolean>(false);
  const [editableSessionClass, setEditableSessionClass] = useState<SessionClass>();
  const { t: transl } = useTranslation();

  const toggleClassDrawer = () => {
    setEditableSessionClass({} as SessionClass);
    setAddClassOpen(!classDrawerOpen);
  };
  const handleEdit = (classItem: Class) => {
    toggleClassDrawer();
    setEditableSessionClass(sessionClasses.find((sc) => sc.class_id === classItem.id) as SessionClass);
  };

  // Fetch classes
  const fetchClasses = (
    params: GetRequestParam
  ): Promise<IApiResponse<Class[]>> => {
    return classApiService.getAll({ ...params });
  };

  const {
    data: classes,
    isLoading,
    refetch,
  } = usePaginatedFetch<Class[]>({
    queryKey: ["classes"],
    fetchFunction: fetchClasses,
  });

  // Fetch class sessions
  const { data: sessionClasses = [], refetch: refetchParticipatingClasses } = useQuery(
    {
      queryKey: ["session-classes"],
      queryFn: () => sessionClassApiService.getAll({ filter: { session_id: session?.id } }).then(res => res.payload || [])
    }
  );

  const handleDelete = async (classSessionId: string) => {
    await sessionClassApiService.delete(classSessionId);
    refetch();
  };

  const handleRegister = (classItem: Class) => {
    setEditableSessionClass({
      class_id: classItem.id,
      session_id: session.id,
      topic: "",
      notes: "",
    } as SessionClass);
    setAddClassOpen(true);
  };

  // Helper: Check if class is registered in a session
  const isClassRegistered = (classId: string) =>
    sessionClasses.some((sc) => sc.class_id === classId);

  // Pass a custom render function for the action button
  const renderRegisterOrEdit = (classItem: Class) => {
    if (isClassRegistered(classItem.id)) {
      return (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => handleEdit(classItem)}
          sx={{ minWidth: 90, textTransform: "capitalize" }}
        >
          {transl("edit")}
        </Button>
      );
    }
    return (
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={() => handleRegister(classItem)}
        sx={{ minWidth: 90, textTransform: "capitalize" }}
      >
        {transl("register")}
      </Button>
    );
  };

  return (
    <>
      <ItemsListing
        type={ITEMS_LISTING_TYPE.table.value}
        dataConfig={{
          items: classes || [],
          fetchDataFunction: fetchClasses,
          isLoading: isLoading,
        }}

        tableConfig={{
          headers: participatingClassColumns(
            handleEdit,
            handleDelete,
            transl,
            // Pass a custom action renderer to the columns
            renderRegisterOrEdit
          ),
        }}
        headerConfig={{
          title: "classes",
        }}
        createActionConfig={{
          ...defaultCreateActionConfig,
          show: false,
        }}
      />

      {classDrawerOpen && (
        <ParticipatingClassesDrawer
          open={classDrawerOpen}
          toggle={toggleClassDrawer}
          sessionClassItem={editableSessionClass as SessionClass}
          refetch={refetchParticipatingClasses}
          sessionId={session.id}
        />
      )}
    </>
  );
};

export default ParticipatingClasses;
