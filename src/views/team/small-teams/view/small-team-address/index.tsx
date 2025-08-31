import { useQuery } from "@tanstack/react-query";
import { defaultGetRequestParam } from "src/types/requests";

// Import necessary MUI components and icons
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "src/@core/components/icon";
import addressApiService from "src/services/general/address-service";
import { ProfileTabCommonType } from "src/types/common";
import Address from "src/types/member/address";
import SmallTeam from "src/types/team/small-team";
import Page from "src/views/components/page/page";
import SmallTeamAddressDrawer from "./edit";

const MapComponent = dynamic(() => import("src/views/components/map"), {
  ssr: false,
});

const SmallTeamAddress = ({ smallTeam }: { smallTeam: SmallTeam }) => {
  const { data: address, refetch } = useQuery({
    queryKey: ["small-team-address", smallTeam.id],
    queryFn: () =>
      addressApiService
        .getByModel(smallTeam.id, defaultGetRequestParam)
        .then((response) => response.payload),
  });

  return (
    address && (
      <AddressOverview
        refetch={refetch}
        address={address}
        modelId={smallTeam.id}
      />
    )
  );
};

export default SmallTeamAddress;

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
}: {
  address: Address;
  refetch: () => void;
  modelId: string;
}) => {
  const { t: transl } = useTranslation();

  const [userAdressDrawerOpen, setUserAddressOpen] = useState<boolean>(false);
  const toggleAddressDrawer = () => setUserAddressOpen(!userAdressDrawerOpen);
  const handleEdit = () => {
    toggleAddressDrawer();
  };

  return (
    <Page titleId="small-team-address">
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
                  <IconButton onClick={handleEdit}>
                    <Icon icon="tabler:edit" fontSize={20} />
                  </IconButton>
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
            <SmallTeamAddressDrawer
              refetch={refetch}
              open={userAdressDrawerOpen}
              toggle={toggleAddressDrawer}
              memberAddress={address}
              modelId={modelId}
            />
          )}
        </Grid>
      </Grid>
    </Page>
  );
};
