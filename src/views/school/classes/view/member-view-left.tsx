// ** React Imports
import { Fragment, useEffect } from "react";

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
import Link from "next/link";
import Member from "src/types/member/member";
import { formatCalendar } from "src/utils/formatter/date";
import UserAvatar from "src/views/admin/user/user-avatar";
import RowOptions from "src/views/shared/listing/row-options";

const MemberViewLeft = ({ member, onDelete, onEdit }: {
  member: Member, onEdit: (member: Member) => void,
  onDelete: (id: string) => void,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);


  const [previewUrl, setPreviewUrl] = useState<string | null>(
    getProfilePictureURL(member?.id),
  );


  useEffect(() => {
    setPreviewUrl(getProfilePictureURL(member?.id));
  }, [member]);
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
    if (!member?.id) return; // Ensure member ID is available

    try {
      await uploadFile({
        file,
        type: "profile_picture",
        fileable_id: member.id,
        fileable_type: "member",
        file_description: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


  if (member) {
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
                user={member}
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
                {member.full_name}
              </Typography>
              <CustomChip
                rounded
                skin="light"
                size="small"
                label={"member"}
                sx={{ textTransform: "capitalize" }}
              />
              <RowOptions
                onEdit={onEdit}
                onDelete={() => onDelete(member.id)}
                item={member}
                editPermissionRule={{
                  action: "update",
                  subject: "member",
                }}
                deletePermissionRule={{
                  action: "delete",
                  subject: "member",
                }}
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
                    {formatCalendar(member?.birth_date)}
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
                    {member.gender}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                  >
                    Nationality:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {member.nationality}
                  </Typography>
                </Box>
                {
                  member?.smallTeam && <Box sx={{ display: "flex", mb: 3 }}>
                    <Typography
                      sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                    >
                      Small Team:
                    </Typography>
                    <Typography
                      noWrap
                      component={Link}
                      href={`/team/small-teams/list/${member?.smallTeam.id}/members/`}
                      sx={{
                        fontWeight: 500,
                        textDecoration: "none",
                        color: "text.secondary",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      {member?.smallTeam.name}
                    </Typography>
                  </Box>

                }
                {member?.departments?.length > 0 && (
                  <Box sx={{ display: "flex", mb: 3, alignItems: "center" }}>
                    <Typography
                      sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                    >
                      Departments:
                    </Typography>
                    <Typography component="span" sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {member.departments.map((department, index) => (
                        <Fragment key={department.id}>
                          <Typography
                            noWrap
                            component={Link}
                            href={`/team/departments/${department.id}/sub-departments/`}
                            sx={{
                              fontWeight: 500,
                              textDecoration: "none",
                              color: "text.secondary",
                              "&:hover": { color: "primary.main" },
                            }}
                          >
                            {department.name}
                          </Typography>
                          {index < member.departments.length - 1 && ","}
                        </Fragment>
                      ))}
                    </Typography>
                  </Box>
                )}


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

export default MemberViewLeft;
