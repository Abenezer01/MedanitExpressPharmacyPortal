import "react-international-phone/style.css";

import {
  BaseTextFieldProps,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import {
  CountryIso2,
  FlagImage,
  defaultCountries,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";
import CustomTextField from "src/@core/components/mui/text-field";

export interface MUIPhoneProps extends BaseTextFieldProps {
  value: string;
  onChange: (phone: string) => void;
}

export const MuiPhone: React.FC<MUIPhoneProps> = ({
  value,
  onChange,
  ...restProps
}) => {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: "et",
      value,
      countries: defaultCountries,
      onChange: (data) => {
        onChange(data.phone);
      },
      defaultMask: "... ... ...",
    });

  return (
    <CustomTextField
      size="medium"
      placeholder="Phone number"
      value={inputValue}
      onChange={handlePhoneValueChange}
      type="tel"
      inputRef={inputRef}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            style={{ marginRight: "2px", marginLeft: "-12px" }}
          >
            <Select
              MenuProps={{}}
              value={country.iso2}
              onChange={(e) => setCountry(e.target.value as CountryIso2)}
              renderValue={(value) => (
                <FlagImage iso2={value} style={{ display: "flex" }} />
              )}
              sx={{ maxWidth: "75px" }}
            >
              {defaultCountries.map((c) => {
                const country = parseCountry(c);

                return (
                  <MenuItem key={country.iso2} value={country.iso2}>
                    <FlagImage
                      iso2={country.iso2}
                      style={{ marginRight: "8px" }}
                    />
                    <Typography marginRight="8px">{country.name}</Typography>
                    <Typography color="gray">+{country.dialCode}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </InputAdornment>
        ),
      }}
      {...restProps}
    />
  );
};
