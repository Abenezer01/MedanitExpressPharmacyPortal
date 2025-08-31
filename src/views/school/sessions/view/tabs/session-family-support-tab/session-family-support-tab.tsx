import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import sessionFamilySupportApiService from "src/services/school/session-family-support-type-api-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { SessionFamilySupport } from "src/types/school/family-support";
import Session from "src/types/school/session";
import ItemsListing from "src/views/shared/listing";
import SupportFamilyDrawer from "./session-family-support-drawer";
import { sessionFamilySupportColumns } from "./session-family-support-row-column";

const SupportFamilyTab = ({ session }: { session: Session }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSessionFamilySupport, setSelectedSessionFamilySupport] = useState<SessionFamilySupport>();
  const { t: transl } = useTranslation();

  const toggleDrawer = () => {
    setSelectedSessionFamilySupport({} as SessionFamilySupport);
    setDrawerOpen(!drawerOpen);
  };

  const handleEdit = (item: SessionFamilySupport) => {
    toggleDrawer();
    setSelectedSessionFamilySupport(item);
  };

  const fetchSessionFamilySupports = (
    params: GetRequestParam
  ): Promise<IApiResponse<any[]>> => {
    return sessionFamilySupportApiService.getAll({ ...params, filter: { ...params.filter, session_id: session.id } });
  };

  const {
    data: sessionFamilySupports,
    isLoading,
    handleSearch,
    refetch,
  } = usePaginatedFetch<any[]>({
    queryKey: ["sessionFamilySupports", session.id],
    fetchFunction: fetchSessionFamilySupports,
  });

  const handleDelete = async (id: string) => {
    await sessionFamilySupportApiService.delete(id);
    refetch();
  };

  return (
    <>
      <ItemsListing
        type={ITEMS_LISTING_TYPE.table.value}
        dataConfig={{
          items: sessionFamilySupports || [],
          fetchDataFunction: fetchSessionFamilySupports,
          isLoading: isLoading
        }}

        tableConfig={{
          headers: sessionFamilySupportColumns(
            handleEdit,
            handleDelete,
            transl
          ),
        }}
        headerConfig={{
          title: ("session-family-supports"),
          features: {
            search: {
              enabled: true,
              searchKeys: ["description"],
              onSearch: handleSearch,
              permission: {
                action: "read",
                subject: "session-family-support",
              }
            },
          }
        }}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          permission: {
            action: "create",
            subject: "session-family-support",
          },
        }}
      />
      {drawerOpen && (
        <SupportFamilyDrawer
          open={drawerOpen}
          toggle={toggleDrawer}
          refetch={refetch}
          sessionFamilySupportItem={selectedSessionFamilySupport as SessionFamilySupport}
          sessionId={session.id} />
      )}
    </>
  );
};

export default SupportFamilyTab;