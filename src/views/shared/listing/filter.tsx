import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid } from "@mui/material";
import { Formik, FormikProps } from "formik";
import React from "react";
import Translations from "src/layouts/components/Translations";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";

interface FilterListProps {
  open: boolean;
  toggle: () => void;
  handleFilter: (filters: any) => void; // Function to fetch data based on filters
  FilterComponentItems: React.ComponentType<{ formik: FormikProps<any> }>; // Correct prop type definition
  initialValues: any;
}

const FilterList: React.FC<FilterListProps> = ({
  open,
  toggle,
  handleFilter,
  FilterComponentItems,
  initialValues = {},
}) => {
  const handleClose = () => {
    toggle();
  };

  const handleApplyFilter = async (values: any, { setStatus }: any) => {
    handleFilter(values);
    setStatus({ success: true });
  };

  return (
    <CustomSideDrawer title="Filter" handleClose={handleClose} open={open}>
      {() => (
        <>
          {FilterComponentItems && (
            <Formik initialValues={initialValues} onSubmit={handleApplyFilter}>
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Box>
                        <FilterComponentItems formik={formik} />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 5 }}>
                      <LoadingButton
                        loading={formik.isSubmitting}
                        loadingPosition="center"
                        disabled={formik.isSubmitting || !formik.isValid}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        <span>
                          <Translations text={"Search"} />
                        </span>
                      </LoadingButton>
                      <Button
                        onClick={() => {
                          formik.resetForm({});
                        }}
                        sx={{ ml: 2 }}
                        type="reset"
                        variant="contained"
                        color="secondary"
                      >
                        <Translations text={"cancel"} />
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          )}
        </>
      )}
    </CustomSideDrawer>
  );
};

export default FilterList;
