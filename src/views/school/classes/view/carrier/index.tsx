import { Grid } from "@mui/material";
import { gridSpacing } from "src/configs/app-constants";
import Member from "src/types/member/member";
import AcademicInformationComponent from "./academic-information";
import ProfessionalStatusComponent from "./professional-status";
import Page from "src/views/components/page/page";

const CarrierComponent = ({
  member,
  isReadOnly = false,
}: {
  member: Member;
  isReadOnly?: boolean;
}) => {
  return (
    <Page titleId="member-professional-status">
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <AcademicInformationComponent
            isReadOnly={isReadOnly}
            member={member}
          />
          <ProfessionalStatusComponent
            isReadOnly={isReadOnly}
            member={member}
          />
        </Grid>
      </Grid>
    </Page>
  );
};
export default CarrierComponent;
