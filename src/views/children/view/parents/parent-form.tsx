import { FormikProps } from 'formik';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomPhoneInput from 'src/views/shared/form/custom-phone-box';
import MemberAutocomplete from 'src/views/member/members/list/member-selector';
import Parent from 'src/types/child/parent';
import { ChildParentRelationshipType } from 'src/types/child/child-parent';

interface ParentFormProps {
  formik: FormikProps<Parent>;
}

const ParentForm: React.FC<ParentFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();

  return (
    <>
      <Fragment>
        {/* Relationship Type Selector */}
        <CustomSelect
          fullWidth
          label={transl('relationship-type')}
          placeholder={transl('select-relationship-type')}
          name="relationship"
          options={Object.values(ChildParentRelationshipType).map(value => ({
            value,
            label: transl(value.toLowerCase().replace(/_/g, ' ')),
          }))}
          size="small"
          sx={{ mb: 2 }}
        />


        {/* Is Parent Christian */}
        <CustomSwitch
          fullWidth
          label={transl('is-parent-christian')}
          name="is_parent_christian"
          type="checkbox"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* Is Parent a Member */}
        <CustomSwitch
          fullWidth
          label={transl('is-parent-member')}
          name="is_parent_member"
          type="checkbox"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* Conditional Fields Based on Membership */}
        {formik.values.is_parent_member ? (
          <MemberAutocomplete
            label={transl('select-parent')}
            name="member_id"
            member={formik.values.member}
            sx={{ mb: 2 }}
          />
        ) : (
          <>
            {/* Parent's Name */}
            <CustomTextBox
              fullWidth
              label={transl('parent-name')}
              placeholder={transl('enter-parent-name')}
              name="name"
              size="small"
              sx={{ mb: 2 }}
            />
            {/* Parent's Phone */}
            <CustomPhoneInput
              label={transl('parent-phone')}
              placeholder={transl('enter-parent-phone')}
              name="phone"
              sx={{ mb: 2 }}
            />

            {/* Parent's Email */}
            <CustomTextBox
              fullWidth
              label={transl('parent-email')}
              placeholder={transl('enter-parent-email')}
              name="email"
              size="small"
              sx={{ mb: 2 }}
            />

          </>
        )}
      </Fragment>
    </>
  );
};

export default ParentForm;
