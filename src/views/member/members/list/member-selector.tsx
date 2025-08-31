import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "@mui/material/utils";
import { useField, useFormikContext } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CustomTextField from "src/@core/components/mui/text-field";
import memberApiService from "src/services/member/member-service";
import Member from "src/types/member/member";
import MemberProfileSmall from "../member-profile-small";

interface MemberAutocompleteProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  [key: string]: any;
  filter?:{}
}

const MemberAutocomplete: React.FC<MemberAutocompleteProps> = (props) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  field;
  const { isSubmitting } = useFormikContext();
  const hasError = !!(meta.touched && meta.error);

  const [value, setValue] = useState<Member | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly Member[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const controller = useRef(new AbortController());

  const fetchMembers = async (searchText: string): Promise<Member[]> => {
    setLoading(true);
    if (searchText.length > 1) {
      try {
        const response = await memberApiService.searchMember({
          filter: { ...(props.filter || {}) },
          search: { name: searchText },
        });
        return Array.isArray(response) ? response : [];
      } catch (error) {
        console.error("Error fetching member options:", error);
        return [];
      } finally {
        setLoading(false);
      }
    }
    setLoading(false);
    return [];
  };

  const fetch = useMemo(
    () =>
      debounce(
        async (
          request: { input: string },
          callback: (results?: readonly Member[]) => void,
        ) => {
          controller.current.abort();
          controller.current = new AbortController();

          const results = await fetchMembers(request.input);
          const uniqueResults = results.filter(
            (result) => !options.some((opt) => opt.id === result.id),
          );
          callback(uniqueResults);
        },
        300, // Increased debounce delay for reliability
      ),
    [options, props.filter], // Add props.filter to dependencies
  );

  useEffect(() => {
    let active = true;

    const fetchOptions = async () => {
      try {
        setOptions([props.member]);
        setValue(props.member);
        setFieldValue(props.name, props.member?.id);
      } catch (error) {
        console.error("Error setting member options:", error);
      }
    };

    if (inputValue === "" && props.member) {
      fetchOptions();
      return undefined;
    }

    if (inputValue.length > 1) {
      fetch({ input: inputValue }, (results?: readonly Member[]) => {
        if (active) {
          let newOptions: readonly Member[] = [];

          if (props.member) {
            newOptions = [props.member];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
        }
      });
    } else {
      // If input is too short, clear options (except the selected member)
      setOptions(props.member ? [props.member] : []);
    }

    return () => {
      active = false;
    };
  }, [props.member, inputValue]);

  return (
    <Autocomplete
      id={props.name}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText={loading ? "Loading..." : "No members found"} // Display loading text
      onChange={(event: any, newValue: Member | null) => {
        if (newValue === null) {
          // Clear the Autocomplete value
          setOptions([]); // Clear the options
          setFieldValue(props.name, null); // Clear the form field value
        } else {
          setOptions([newValue, ...options]); // Add the selected option
          setValue(newValue); // Set the Autocomplete value
          setFieldValue(props.name, newValue?.id); // Set the form field value
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      getOptionLabel={(option: Member) => option.full_name ?? ""}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          placeholder={props.placeholder}
          fullWidth
          error={hasError}
          helperText={hasError ? meta.error : ""}
          disabled={props.disabled || isSubmitting}
          {...props}
        />
      )}
      renderOption={(renderProps, option: Member) =>
        !props?.disabled && (
          <li {...renderProps}>
            <MemberProfileSmall readonly={true} member={option} />
          </li>
        )
      }
      {...props}
      clearOnEscape={false} // Set clearOnEscape to false
    />
  );
};

export default MemberAutocomplete;
