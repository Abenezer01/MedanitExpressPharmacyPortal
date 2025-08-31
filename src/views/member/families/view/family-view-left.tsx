// ** React Imports
import { useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";

// ** Icon Imports

// ** Custom Components
import CustomChip from "src/@core/components/mui/chip";
import { getProfilePictureURL, uploadFile } from "src/services/utils/file";

// ** Types

// ** Utils Import
import Family from "src/types/member/family";
import UserAvatar from "src/views/admin/user/user-avatar";

const FamilyViewLeft = ({ family }: { family: Family }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    getProfilePictureURL(family?.id),
  );
  useEffect(() => {
    setPreviewUrl(getProfilePictureURL(family?.id));
  }, [family]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);

      // Trigger upload after file selection
      handleUpload(file);
    }
  };
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async (file: File) => {
    if (!family?.id) return; // Ensure family ID is available

    try {
      await uploadFile({
        file,
        type: "profile_picture",
        fileable_id: family.id,
        fileable_type: "family",
        file_description: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  if (family) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent
              sx={{
                pt: 13.5,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <UserAvatar
                photoSrc={previewUrl}
                onClick={handleImageClick}
                variant="rounded"
                sx={{
                  width: "100%",
                  height: 150,
                  mb: 4,
                  fontSize: "3rem",
                  cursor: "pointer",
                }}
                user={family?.representative}
              />
              <input
                accept="image/*"
                style={{
                  display: "none",
                }}
                id="profile-photo-input"
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <Typography variant="h4" sx={{ mb: 3 }}>
                {family?.representative?.first_name
                  ? `${family.representative.first_name.trim().endsWith('s') ? family.representative.first_name.trim() + "'" : family.representative.first_name.trim() + "'s"} family`
                  : ""
                }
              </Typography>
              <CustomChip
                rounded
                skin="light"
                size="small"
                label={"family"}
                sx={{ textTransform: "capitalize" }}
              />
            </CardContent>

            <Divider sx={{ my: "0 !important", mx: 6 }} />

            <CardContent sx={{ pb: 4 }}>
              <Typography
                variant="body2"
                sx={{ color: "text.disabled", textTransform: "uppercase" }}
              >
                Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                  >
                    Members Count:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {(family?.members?.length)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default FamilyViewLeft;
