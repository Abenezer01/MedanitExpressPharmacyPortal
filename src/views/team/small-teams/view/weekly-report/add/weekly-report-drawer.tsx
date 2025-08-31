import * as yup from "yup";

import { FormikProps } from "formik";
import moment from "moment";
import useWeeklyReport from "src/hooks/team/weekly-report-hook";
import WeeklyReport from "src/types/team/weekly-report";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import WeeklyReportForm from "./weekly-report-form";

interface WeeklyReportDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  weeklyReport: WeeklyReport;
  smallTeamId: string;
}

const validationSchema = yup.object().shape({
  description: yup.string().required(),
});

const WeeklyReportDrawer = (props: WeeklyReportDrawerType) => {
  // ** Props
  const { toggle, weeklyReport, smallTeamId } = props;

  const { addNewWeeklyReport, updateWeeklyReport } = useWeeklyReport();

  const isEdit = weeklyReport?.id ? true : false;

  const getPayload = (values: WeeklyReport) => {
    let memberAttendance: { member_id: string; status: boolean }[] = [];
    if (values.attendance) {
      memberAttendance = Object.entries(values.attendance).map(
        ([memberId, status]) => ({
          member_id: memberId,
          status: status,
        }),
      );
    }
    const payload = {
      data: {
        ...values,
        id: weeklyReport?.id,
        date: values.date,
        description: values.description,
        small_team_id: smallTeamId,
        members_attendance: memberAttendance,
      },
      files: [],
    };

    return payload;
  };
  const handleClose = () => {
    toggle();

    // formik.resetForm()
  };
  const onActionSuccess = () => {
    toggle();
    handleClose();
  };

  return (
    <FormPageWrapper
      edit={isEdit}
      title="weekly-report"
      getPayload={getPayload}
      validationSchema={validationSchema}
      initialValues={
        {
          ...weeklyReport,
          date: moment(weeklyReport.date).format("YYYY-MM-DD"),
        } as WeeklyReport
      }
      createActionFunc={isEdit ? updateWeeklyReport : addNewWeeklyReport}
      onActionSuccess={onActionSuccess}
      onCancel={handleClose}
    >
      {(formik: FormikProps<WeeklyReport>) => {
        return (
          <WeeklyReportForm
            smallTeamId={smallTeamId}
            formik={formik}
            defaultLocaleData={{} as WeeklyReport}
          />
        );
      }}
    </FormPageWrapper>
  );
};

export default WeeklyReportDrawer;
