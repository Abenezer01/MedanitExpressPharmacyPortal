import { Box, FormHelperText, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormikProps } from "formik";
import React from "react";
import Icon from "src/@core/components/icon";
import familyApiService from "src/services/member/family-service";
import familySupportTypeApiService from "src/services/school/family-support-types-service";
import Family from "src/types/member/family";
import { FamilySupportType, FamilySupportTypeWithSessionFamilySupportType, SessionFamilySupport } from "src/types/school/family-support";
import MemberProfileSmall from "src/views/member/members/member-profile-small";
import CustomSelectBox from "src/views/shared/form/custom-select-box";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import GenericEntityAutocomplete from "src/views/shared/form/generic-entity-autocomplete";

interface SessionFamilySupportFormProps {
  formik: FormikProps<SessionFamilySupport>;
}

const SessionFamilySupportForm: React.FC<SessionFamilySupportFormProps> = ({ formik }) => {

  const { data: supportTypes = [] } = useQuery({
    queryKey: ["supportTypes"],
    queryFn: () => familySupportTypeApiService.getAll({}).then(res => res.payload || []),
  });

  const handleAddSupportType = () => {
    const current = formik.values.familySupportTypes || [];
    const available = supportTypes.filter((st: FamilySupportType) => !current.some((c: FamilySupportTypeWithSessionFamilySupportType) => c.id === st.id));
    if (available.length > 0) {
      formik.setFieldValue("familySupportTypes", [
        ...current,
        {
          ...available[0],
          SessionFamilySupportType: { quantity: 0 }
        }
      ]);
    }
  };

  const handleRemoveSupportType = (id: string) => {
    const current = formik.values.familySupportTypes || [];
    formik.setFieldValue("familySupportTypes", current.filter((st: FamilySupportTypeWithSessionFamilySupportType) => st.id !== id));
  };

  const handleQuantityChange = (id: string, value: string) => {
    const current = formik.values.familySupportTypes || [];
    const updated = current.map((item: FamilySupportTypeWithSessionFamilySupportType) =>
      item.id === id
        ? { ...item, SessionFamilySupportType: { quantity: value === '' ? undefined : Math.max(0, Number(value)) } }
        : item
    );
    formik.setFieldValue("familySupportTypes", updated);
  };
  console.log('formik values', formik.values)

  return (
    <>

      <Box sx={{ mb: 3 }}>
        <GenericEntityAutocomplete
          name="family_id"
          label="Family"
          value={formik.values.family}
          error={Boolean(formik.touched.family_id && formik.errors.family_id)}
          helperText={formik.touched.family_id && formik.errors.family_id}
          fullWidth
          sx={{ mb: 1 }}
          fetchOptions={familyApiService.familySearch}
          searchKey="name"
          getOptionLabel={function (option: any): string {
            return option && option.name ? option.name : "";
          }}
          renderOption={(props: React.HTMLAttributes<HTMLLIElement>, option: Family) => (
            <Box component="li" {...props}>
              <MemberProfileSmall member={option.representative} />
            </Box>
          )}
        />
        {formik.touched.family_id && formik.errors.family_id && (
          <FormHelperText error>{formik.errors.family_id}</FormHelperText>
        )}
      </Box >
      <Box sx={{ mb: 3 }}>
        {(formik.values.familySupportTypes || []).map((type: FamilySupportTypeWithSessionFamilySupportType, idx: number) => (
          <Box key={type.id} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <CustomSelectBox
              name={`familySupportTypes.${idx}.id`}
              label="Support Type"
              options={supportTypes.map((st: FamilySupportType) => ({ value: st.id, label: st.name }))}
              value={type.id}
              onValueChange={value => {
                const selectedType = supportTypes.find((st: FamilySupportType) => st.id === value);
                const updated = (formik.values.familySupportTypes || []).map((item, i) =>
                  i === idx
                    ? { ...item, ...selectedType }
                    : item
                );
                formik.setFieldValue("familySupportTypes", updated);
              }}
              fullWidth
              error={Boolean(formik.touched.familySupportTypes && formik.errors.familySupportTypes && Array.isArray(formik.errors.familySupportTypes) && formik.errors.familySupportTypes[idx]?.id)}
              sx={{ flex: 2 }}
            />
            <CustomTextBox
              fullWidth
              type="number"
              name={`familySupportTypes.${type.id}.SessionFamilySupportType.quantity`}
              label="Quantity"
              value={type.SessionFamilySupportType?.quantity ?? ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQuantityChange(type.id, e.target.value)}
              sx={{ flex: 1, minWidth: 120 }}
              error={Boolean(formik.touched.familySupportTypes && formik.errors.familySupportTypes && Array.isArray(formik.errors.familySupportTypes) && formik.errors.familySupportTypes.find((err: any, idx2: number) => (formik.values.familySupportTypes?.[idx2]?.id === type.id && err && err.SessionFamilySupportType?.quantity)))}
              helperText={formik.touched.familySupportTypes && formik.errors.familySupportTypes && Array.isArray(formik.errors.familySupportTypes) && formik.errors.familySupportTypes.find((err: any, idx2: number) => (formik.values.familySupportTypes?.[idx2]?.id === type.id && err && err.SessionFamilySupportType?.quantity))?.SessionFamilySupportType?.quantity}
              inputProps={{ min: 0 }}
            />
            <IconButton color="error" onClick={() => handleRemoveSupportType(type.id)} aria-label="Remove support type" sx={{ alignSelf: 'center' }}>
              <Icon icon="tabler:x" fontSize={20} />
            </IconButton>
          </Box>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <IconButton color="primary" onClick={handleAddSupportType} aria-label="Add support type" disabled={supportTypes.length === (formik.values.familySupportTypes?.length || 0)}>
            <Icon icon="tabler:plus" fontSize={20} />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <CustomTextBox
          name="description"
          label="Description"
          value={formik.values.description || ""}
          onChange={formik.handleChange}
          multiline
          rows={3}
          fullWidth
          sx={{ mb: 1 }}
          error={Boolean(formik.touched.description && formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
      </Box>
    </>
  );
};

export default SessionFamilySupportForm;