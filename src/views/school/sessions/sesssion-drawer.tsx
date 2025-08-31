import * as yup from "yup";

import { FormikProps } from "formik";
import { Session, SessionStatus } from "src/types/school/session";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import SessionForm from "./session-form";
import sessionApiService from "src/services/school/session-api-service";
import moment from "moment";

interface SessionDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  sessionItem: Session;
}

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  date: yup.date().required(),
  start_time: yup.string().required(),
  end_time: yup.string().required(),
  notes: yup.string().required(),
});

// Use moment to get next Sunday, week number, and time formatting
const now = moment();
// If today is Sunday, nextSunday is today; otherwise, it's the upcoming Sunday
const nextSunday = now.clone().day(7);
if (now.day() !== 0 && nextSunday.isBefore(now, 'day')) {
  nextSunday.add(7, 'days');
}
const weekNumber = now.isoWeek();
// Set start time to 9:00 AM and end time to 12:00 PM
const start = nextSunday.clone().hour(9).minute(0).second(0).millisecond(0);
const end = start.clone().add(3, 'hours');

const initialSessionValues: Session = {
  id: "",
  title: `Week ${weekNumber} School Session`,
  date: nextSunday.format("YYYY-MM-DD"),
  start_time: start.format("HH:mm"),
  end_time: end.format("HH:mm"),
  notes: "Weekly school session.",
  status: SessionStatus.Upcoming,
};

const SessionDrawer = (props: SessionDrawerType) => {
  // ** Props
  const { open, toggle, refetch, sessionItem } = props;
  console.log("editable session", sessionItem);

  const isEdit = sessionItem?.id ? true : false;

  const getPayload = (values: Session) => {
    const payload = {
      data: {
        ...values,
        id: sessionItem?.id,
        title: values.title,
        date: values.date,
        start_time: values.start_time,
        end_time: values.end_time,
        notes: values.notes,
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
    refetch();
    handleClose();
  };
  const updateSession = async (body: {
    data: Session;
    files: any[];
  }) => {
    return await sessionApiService.update(body.data.id, body);
  };
  const createSession = async (body: {
    data: Session;
    files: any[];
  }) => {
    return await sessionApiService.create(body);
  };
  return (
    <CustomSideDrawer
      title={isEdit ? "edit-session" : "create-session"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        (sessionItem || initialSessionValues) && (
          <FormPageWrapper
            edit={isEdit}
            title="session"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={{
              ...initialSessionValues,
              ...sessionItem,
              date: moment(sessionItem?.date || initialSessionValues.date).format("YYYY-MM-DD"),
              start_time: moment(sessionItem?.start_time || initialSessionValues.start_time, "HH:mm").format("HH:mm"),
              end_time: moment(sessionItem?.end_time || initialSessionValues.end_time, "HH:mm").format("HH:mm"),
            } as Session}
            createActionFunc={isEdit ? updateSession : createSession}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<Session>) => {
              return (
                <SessionForm formik={formik} defaultLocaleData={{} as Session} />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default SessionDrawer;
