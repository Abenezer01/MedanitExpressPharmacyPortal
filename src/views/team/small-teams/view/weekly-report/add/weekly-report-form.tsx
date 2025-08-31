import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import useWeeklyReport from "src/hooks/team/weekly-report-hook";
import Member from "src/types/member/member";
import { formatCalendar } from "src/utils/formatter/date";
import MemberProfileSmall from "src/views/member/members/member-profile-small";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomWeekPicker from "src/views/shared/form/week-picker";

interface AttendanceFormProps {
  formik: FormikProps<any>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: any;
  smallTeamId: string;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({
  formik,
  smallTeamId,
}) => {
  const { t: transl } = useTranslation();
  const { useGetPrepareAttendance } = useWeeklyReport();
  const { data } = useGetPrepareAttendance(smallTeamId, formik.values.date);

  return (
    <>
      <Card
        sx={{
          mt: 2,
        }}
      >
        <CardHeader
          title={"Weekly Report of " + formatCalendar(formik.values.date)}
        />
        <CardContent>
          <CustomWeekPicker
            label={transl("date")}
            placeholder={transl("date")}
            name="date"
            size="small"
            sx={{ mb: 2 }}
          />

          <CustomTextBox
            fullWidth
            label={transl("description")}
            placeholder={transl("description")}
            name="description"
            multiline
            rows={4}
            size="small"
          />
        </CardContent>
      </Card>

      <Card
        sx={{
          mt: 2,
        }}
      >
        <CardHeader title={"Take Attendance"} />
        {data && (
          <CardContent key={JSON.stringify(data)}>
            {" "}
            {/* Add key prop here */}
            <Grid>
              <Grid item md={6} sm={12}>
                {data?.map((item: { member: Member; status: boolean }) => (
                  <Box
                    key={item.member.id} // Use a unique key for each item
                    sx={{
                      gap: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&:not(:last-of-type)": { mb: 4 },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          mr: 4,
                          minWidth: 57,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <MemberProfileSmall member={item.member} />
                      </Box>
                    </Box>
                    <Box>
                      <RadioGroup
                        row
                        aria-label="colored"
                        name="colored"
                        defaultValue={item.status ? "true" : "false"}
                        onChange={(event) => {
                          formik.setFieldValue(
                            `attendance[${item.member.id}]`,
                            event.target.value === "true",
                          );
                        }}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label={transl("present")}
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio color="secondary" />}
                          label={transl("absent")}
                        />
                      </RadioGroup>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default AttendanceForm;
