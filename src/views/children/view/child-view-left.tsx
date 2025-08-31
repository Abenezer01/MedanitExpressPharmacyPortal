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
import Child from "src/types/child/child";
import { formatCalendar } from "src/utils/formatter/date";
import UserAvatar from "src/views/admin/user/user-avatar";

const ChildViewLeft = ({ child }: { child: Child }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    getProfilePictureURL(child?.id),
  );
  useEffect(() => {
    setPreviewUrl(getProfilePictureURL(child?.id));
  }, [child]);
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
    console.log("image clic");
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async (file: File) => {
    if (!child?.id) return; // Ensure child ID is available

    try {
      await uploadFile({
        file,
        type: "profile_picture",
        fileable_id: child.id,
        fileable_type: "child",
        file_description: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  if (child) {
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
                  width: 100,
                  height: 100,
                  mb: 4,
                  fontSize: "3rem",
                  cursor: "pointer",
                }}
                user={child?.member}
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
                {child?.member?.full_name}
              </Typography>
              <CustomChip
                rounded
                skin="light"
                size="small"
                label={"child"}
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
                    BirthDate:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {formatCalendar(child?.member?.birth_date)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                  >
                    Gender:
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      textTransform: "capitalize",
                    }}
                  >
                    {child?.member?.gender}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                  >
                    Nationality:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {child?.member?.nationality}
                  </Typography>
                </Box>


              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid >
    );
  } else {
    return null;
  }
};

export default ChildViewLeft;
