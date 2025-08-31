import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { Session } from "src/types/school/session";
import ItemsListing from "src/views/shared/listing";
import SessionDrawer from "./sesssion-drawer";
import { sessionColumns } from "./session-row-column";
import sessionApiService from "src/services/school/session-api-service";

const SessionList = ({ }) => {
  const [sessionDrawerOpen, setAddSessionOpen] = useState<boolean>(false);
  const [editableSession, setEditableSession] = useState<Session>();
  const { t: transl } = useTranslation();
  const toggleSessionDrawer = () => {
    setEditableSession({} as Session);
    setAddSessionOpen(!sessionDrawerOpen);
  };
  const handleEdit = (sessionItem: Session) => {
    toggleSessionDrawer();
    setEditableSession(sessionItem);
  }

  // Access the hook methods and state
  const fetchSessions = (
    params: GetRequestParam
  ): Promise<IApiResponse<Session[]>> => {
    return sessionApiService.getAll({ ...params });
  };

  const {
    data: sessions,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<Session[]>({
    queryKey: ["sessions"],
    fetchFunction: fetchSessions,
  });




  const handleDelete = async (sessionId: string) => {
    await sessionApiService.delete(sessionId);
    refetch();
  };

  return (
    <>
      <ItemsListing
        type={ITEMS_LISTING_TYPE.table.value}
        // Data configuration
        dataConfig={{
          items: sessions || [],
          fetchDataFunction: fetchSessions,
          isLoading: isLoading
        }}
        // Pagination configuration
        paginationConfig={{
          pagination: pagination,
          onChange: handlePageChange,
        }}
        // Table configuration
        tableConfig={{
          headers: sessionColumns(
            handleEdit,
            handleDelete,
            transl
          ),
        }}
        // Header configuration
        headerConfig={{
          title: "sessions",

        }}
        // Action configuration
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleSessionDrawer,
          permission: {
            action: "create",
            subject: "session",
          },
        }}
      />

      {sessionDrawerOpen && (
        <SessionDrawer
          refetch={refetch}
          open={sessionDrawerOpen}
          toggle={toggleSessionDrawer}
          sessionItem={editableSession as Session}
        />
      )}
    </>
  );
};

export default SessionList;
