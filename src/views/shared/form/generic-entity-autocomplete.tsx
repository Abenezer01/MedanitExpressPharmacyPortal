import React, { useEffect, useMemo, useRef, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "@mui/material/utils";
import { useField, useFormikContext } from "formik";
import CustomTextField from "src/@core/components/mui/text-field";
import { GetRequestParam } from "src/types/requests";

interface GenericEntityAutocompleteProps<T> {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    fetchOptions: (params: GetRequestParam) => Promise<T[]>;
    searchKey?: string | string[];
    getOptionLabel: (option: T) => string;
    renderOption?: (renderProps: React.HTMLAttributes<HTMLLIElement>, option: T) => React.ReactNode;
    valueProp?: keyof T;
    initialOption?: T;
    minSearchLength?: number;
    [key: string]: any;
}

function GenericEntityAutocomplete<T = any>(props: GenericEntityAutocompleteProps<T>) {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    field;
    const { isSubmitting } = useFormikContext();
    const hasError = !!(meta.touched && meta.error);

    const [value, setValue] = useState<T | null>(props.initialOption ?? null);
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<readonly T[]>(props.initialOption ? [props.initialOption] : []);
    const [loading, setLoading] = useState<boolean>(false);
    const controller = useRef(new AbortController());
    const minSearchLength = props.minSearchLength ?? 2;

    const fetch = useMemo(
        () =>
            debounce(
                async (
                    request: { input: string },
                    callback: (results?: readonly T[]) => void,
                ) => {
                    controller.current.abort();
                    controller.current = new AbortController();
                    setLoading(true);
                    try {
                        const searchObj: Record<string, string> = {};
                        if (Array.isArray(props.searchKey)) {
                            props.searchKey.forEach(key => {
                                searchObj[key] = request.input;
                            });
                        } else if (typeof props.searchKey === 'string' && props.searchKey.length > 0) {
                            searchObj[props.searchKey] = request.input;
                        } else {
                            searchObj[''] = request.input;
                        }
                        const results = await props.fetchOptions({
                            search: searchObj,
                        });
                        callback(results || []);
                    } catch (e) {
                        callback([]);
                    } finally {
                        setLoading(false);
                    }
                },
                300,
            ),
        [props.fetchOptions, props.searchKey],
    );

    useEffect(() => {
        let active = true;
        if (inputValue === "" && props.initialOption) {
            setOptions([props.initialOption]);
            setValue(props.initialOption);
            setFieldValue(props.name, props.valueProp ? props.initialOption[props.valueProp] : props.initialOption);
            return;
        }
        if (inputValue.length >= minSearchLength) {
            fetch({ input: inputValue }, (results?: readonly T[]) => {
                if (active) {
                    let newOptions: readonly T[] = [];
                    if (props.initialOption) {
                        newOptions = [props.initialOption];
                    }
                    if (results) {
                        newOptions = [...newOptions, ...results];
                    }
                    setOptions(newOptions);
                }
            });
        } else {
            setOptions(props.initialOption ? [props.initialOption] : []);
        }
        return () => {
            active = false;
        };
    }, [props.initialOption, inputValue]);

    return (
        <Autocomplete
            id={props.name}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value === undefined ? null : value}
            noOptionsText={loading ? "Loading..." : "No options found"}
            onChange={(event: any, newValue: T | null | undefined) => {
                if (newValue === null || newValue === undefined) {
                    setOptions([]);
                    setValue(null);
                    setFieldValue(props.name, null);
                } else {
                    setOptions([newValue, ...options]);
                    setValue(newValue);
                    // Always store the valueProp (ID or primitive) if specified, otherwise default to newValue.id if present, else the whole object
                    if (props.valueProp) {
                        setFieldValue(props.name, newValue[props.valueProp]);
                    } else if (typeof newValue === 'object' && newValue !== null && 'id' in newValue) {
                        setFieldValue(props.name, newValue['id']);
                    } else {
                        setFieldValue(props.name, newValue);
                    }
                }
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            getOptionLabel={props.getOptionLabel}
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
            renderOption={props.renderOption}
            // Remove getOptionLabel from {...props} to avoid duplicate prop
            {...Object.fromEntries(Object.entries(props).filter(([key]) => key !== "getOptionLabel"))}
            clearOnEscape={false}
        />
    );
}

export default GenericEntityAutocomplete;