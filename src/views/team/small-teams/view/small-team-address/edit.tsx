import * as yup from "yup";

import { FormikProps } from "formik";
import addressApiService from "src/services/general/address-service";
import Address from "src/types/member/address";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import MemberAddressForm from "./address-form";

interface MemberAddressDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  memberAddress: Address;
  modelId: string;
}

const validationSchema = yup.object().shape({
  country: yup.string().required(),
  city: yup.string().required(),
  sub_city: yup.string().required(),
  suburb: yup.string().required(),
  district: yup.string().required(),
});

const MemberAddressDrawer = (props: MemberAddressDrawerType) => {
  // ** Props
  const { open, toggle, refetch, memberAddress, modelId } = props;

  const updateMemberAddress = async (body: { data: Address; files: any[] }) => {
    return await addressApiService.update(body.data.id, body);
  };
  const isEdit = memberAddress?.id ? true : false;

  const getPayload = (values: Address) => {
    const payload = {
      data: {
        id: memberAddress?.id,
        country: values.country,
        city: values.city,
        sub_city: values.sub_city,
        suburb: values.suburb,
        district: values.district,
        house_number: values.house_number,
        postal_address: values.postal_address,
        model_id: modelId,
        lat: values.lat,
        lng: values.lng,
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

  return (
    <CustomSideDrawer
      title={isEdit ? "edit-memberAddress" : "create-memberAddress"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        memberAddress && (
          <FormPageWrapper
            edit={isEdit}
            title="memberAddress"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={{ ...memberAddress } as Address}
            createActionFunc={updateMemberAddress}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<Address>) => {
              return (
                <MemberAddressForm
                  formik={formik}
                  defaultLocaleData={{} as Address}
                />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default MemberAddressDrawer;
