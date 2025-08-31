import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import weeklyReportApiService from "src/services/team/weekly-report-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import SmallTeam from "src/types/team/small-team";
import WeeklyReport from "src/types/team/weekly-report";
import ItemsListing from "src/views/shared/listing";
import WeeklyReportDrawer from "./add/weekly-report-drawer";
import { weeklyReportColumns } from "./weekly-report-row-column";

const WeeklyReportList = ({ smallTeam }: { smallTeam: SmallTeam }) => {
  const [weeklyreportDrawerOpen, setAddWeeklyReportOpen] = useState<boolean>(false);
  const [editableWeeklyReport, setEditableWeeklyReport] = useState<WeeklyReport>();
  const { t: transl } = useTranslation();

  const handleEdit = (weeklyreport: WeeklyReport) => {
    toggleWeeklyReportDrawer();
    setEditableWeeklyReport(weeklyreport);
  };

  // Access the hook methods and state
  const fetchWeeklyReports = (
    params: GetRequestParam
  ): Promise<IApiResponse<WeeklyReport[]>> => {
    return weeklyReportApiService.getAll({ ...params });
  };
  
  const {
    data: weeklyreports,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<WeeklyReport[]>({
    queryKey: ["weeklyreports"],
    fetchFunction: fetchWeeklyReports,
  });


  const toggleWeeklyReportDrawer = () => {
    setEditableWeeklyReport({} as WeeklyReport);
    setAddWeeklyReportOpen(!weeklyreportDrawerOpen);
  };
  const handleDelete = async (weeklyreportId: string) => {
    await weeklyReportApiService.delete(weeklyreportId);
    refetch();
  };

  return (
    <>
      <ItemsListing
          type={ITEMS_LISTING_TYPE.table.value}
        // Data configuration
        dataConfig={{
          items: weeklyreports || [],
          fetchDataFunction: fetchWeeklyReports,
          isLoading
        }}
        // Pagination configuration
        paginationConfig={{
          pagination: pagination,
          onChange: handlePageChange,
        }}
        // Table configuration
        tableConfig={{
          headers: weeklyReportColumns(
            handleEdit,
            handleDelete,
            transl
          ),
        }}
        // Header configuration
        headerConfig={{
          title: "weeklyreports",
          features: {
        
            export: {
              enabled: true,
              permission: {
                action: "export",
                subject: "weeklyreport",
              }
            }
          }
        }}
        // Action configuration
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleWeeklyReportDrawer,
          permission: {
            action: "create",
            subject: "weeklyreport",
          },
        }}
      />

      {weeklyreportDrawerOpen && (
        <WeeklyReportDrawer
          smallTeamId={smallTeam.id}
          refetch={refetch}
          open={weeklyreportDrawerOpen}
          toggle={toggleWeeklyReportDrawer}
          weeklyReport={editableWeeklyReport as WeeklyReport}
        />
      )}
    </>
  );
};
WeeklyReportList.acl = {
  action: "read",
  subject: "weeklyreport",
};
export default WeeklyReportList;
