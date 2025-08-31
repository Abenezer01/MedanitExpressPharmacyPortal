import { useQuery } from "@tanstack/react-query";
import Member from "src/types/member/member";
import { defaultGetRequestParam } from "src/types/requests";

// Import necessary MUI components and icons
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Icon from "src/@core/components/icon";
import { useTranslation } from "react-i18next";
import { ProfileTabCommonType } from "src/types/common";
import Address from "src/types/member/address";
import { IconButton } from "@mui/material";
import { useState } from "react";
import MemberAddressDrawer from "./edit";
import dynamic from "next/dynamic";
import addressApiService from "src/services/general/address-service";

const MapComponent = dynamic(() => import("src/views/components/map"), {
  ssr: false,
});

const MemberAddress = ({
  member,
  isReadOnly = false,
}: {
  member: Member;
  isReadOnly?: boolean;
}) => {
  const { data: address, refetch } = useQuery({
    queryKey: ["small-team-address", member.id],
    queryFn: () =>
      addressApiService
        .getByModel(member.id, defaultGetRequestParam)
        .then((response) => response.payload),
  });

  return (
    address && (
      <AddressOverview
        refetch={refetch}
        address={address}
        modelId={member.id}
        isReadOnly={isReadOnly}
      />
    )
  );
};

export default MemberAddress;

// Function to render a list of items
const renderList = (arr: ProfileTabCommonType[]) => {
  if (arr && arr.length) {
    return arr.map((item, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          "&:not(:last-of-type)": { mb: 3 },
          "& svg": { color: "text.secondary" },
        }}
      >
        <Box sx={{ display: "flex", mr: 2 }}>
          <Icon fontSize="1.25rem" icon={item.icon} />
        </Box>

        <Box
          sx={{
            columnGap: 2,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 500, color: "text.secondary" }}>
            {`${
              item.property.charAt(0).toUpperCase() + item.property.slice(1)
            }:`}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>{item.value}</Typography>
        </Box>
      </Box>
    ));
  } else {
    return null;
  }
};

// Function to generate Address information
const generateAddressInfo = (
  address: Address,
  transl: any,
): ProfileTabCommonType[] =>
  [
    address.country && {
      icon: "tabler:world",
      value: address.country,
      property: transl("country"),
    },
    address.city && {
      icon: "tabler:building-skyscraper",
      value: address.city,
      property: transl("city"),
    },
    address.sub_city && {
      icon: "tabler:building-community",
      value: address.sub_city,
      property: transl("sub-city"),
    },
    address.suburb && {
      icon: "tabler:building-bank",
      value: address.suburb,
      property: transl("suburb"),
    },
    address.district && {
      icon: "tabler:layers-subtract",
      value: address.district,
      property: transl("district"),
    },
    address.house_number && {
      icon: "tabler:home",
      value: address.house_number,
      property: transl("house_number"),
    },
    address.postal_address && {
      icon: "tabler:mailbox",
      value: address.postal_address,
      property: transl("postal_address"),
    },
    address.lat && {
      icon: "tabler:location",
      value: `${address.lat} North,${address.lng} West`,
      property: transl("cordinates"),
    },

    // Add more properties as needed
  ].filter(Boolean) as ProfileTabCommonType[];

// AddressOverview component
const AddressOverview = ({
  address,
  refetch,
  modelId,
  isReadOnly = false,
}: {
  address: Address;
  refetch: () => void;
  modelId: string;
  isReadOnly: boolean;
}) => {
  const { t: transl } = useTranslation();

  const [userAdressDrawerOpen, setUserAddressOpen] = useState<boolean>(false);
  const toggleAddressDrawer = () => setUserAddressOpen(!userAdressDrawerOpen);
  const handleEdit = () => {
    toggleAddressDrawer();
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  cursor: "pointer",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    mb: 4,
                    color: "text.disabled",
                    textTransform: "uppercase",
                  }}
                >
                  {transl("address-information")}
                </Typography>
                {!isReadOnly && (
                  <IconButton onClick={handleEdit}>
                    <Icon icon="tabler:edit" fontSize={20} />
                  </IconButton>
                )}
              </Box>
              <Grid container>
                <Grid item xs={12} md={6}>
                  {renderList(generateAddressInfo(address, transl))}
                </Grid>
                <Grid item xs={12} md={6}>
                  <MapComponent center={[address?.lat, address?.lng]} />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
        {userAdressDrawerOpen && (
          <MemberAddressDrawer
            refetch={refetch}
            open={userAdressDrawerOpen}
            toggle={toggleAddressDrawer}
            memberAddress={address}
            modelId={modelId}
          />
        )}
      </Grid>
    </Grid>
  );
};
