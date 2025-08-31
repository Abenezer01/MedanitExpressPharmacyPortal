import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { addWeeks, endOfWeek, format, startOfWeek } from "date-fns";
import { useField, useFormikContext } from "formik";
import React from "react";
import CustomTextField from "src/@core/components/mui/text-field";

interface CustomWeekPickerProps {
  name: string;
  label: string;
  [key: string]: any;
}

const CustomWeekPicker: React.FC<CustomWeekPickerProps> = ({
  name,
  label,
  ...otherProps
}) => {
  const { isSubmitting, setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>(
    () => (field.value && new Date(field.value)) || new Date(),
  );

  const handleWeekChange = (newDate: Date | null) => {
    if (newDate !== null) {
      setSelectedDate(newDate);
      setFieldValue(name, newDate); // Update Formik field value
    }
  };

  const togglePicker = () => {
    setOpen(!open);
  };

  const handlePreviousWeek = () => {
    const newDate = addWeeks(selectedDate, -1);
    setSelectedDate(newDate);
    setFieldValue(name, newDate); // Update Formik field value
  };

  const handleNextWeek = () => {
    const newDate = addWeeks(selectedDate, 1);
    setSelectedDate(newDate);
    setFieldValue(name, newDate); // Update Formik field value
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CustomTextField
        type="text"
        {...field}
        {...otherProps}
        label={label}
        fullWidth
        value={format(selectedDate, "MMMM do, yyyy")} // Display selected date in the text field
        onClick={togglePicker}
        disabled={isSubmitting}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <Button onClick={togglePicker} disabled={isSubmitting}>
              Select
            </Button>
          ),
        }}
      />
      <Dialog open={open} onClose={togglePicker}>
        <DialogTitle>
          <Grid container alignItems="center" justifyContent="space-between">
            <Button onClick={handlePreviousWeek}>&lt;</Button>
            <Typography variant="h6">
              {format(startOfWeek(selectedDate), "MMMM do")} -{" "}
              {format(endOfWeek(selectedDate), "MMMM do")}
            </Typography>
            <Button onClick={handleNextWeek}>&gt;</Button>
          </Grid>
        </DialogTitle>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={handleWeekChange}
          views={["year", "month", "day"]}
          minDate={new Date("1900-01-01")}
          maxDate={new Date("2100-12-31")}
          shouldDisableDate={(date) => {
            // Disable all days except Mondays
            return date.getDay() !== 1;
          }}
        />

        <DialogActions>
          <Button onClick={togglePicker}>Cancel</Button>
          <Button onClick={togglePicker} variant="contained" color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </LocalizationProvider>
  );
};

export default CustomWeekPicker;
