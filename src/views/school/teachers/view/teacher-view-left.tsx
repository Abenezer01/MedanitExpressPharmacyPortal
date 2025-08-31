

// ** React Imports

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// ** Custom Components
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import CustomChip from "src/@core/components/mui/chip";
import { getProfilePictureURL, uploadFile } from "src/services/utils/file";
import { Teacher } from "src/types/school/teacher";
import UserAvatar from "src/views/admin/user/user-avatar";
import RowOptions from "src/views/shared/listing/row-options";

const TeacherViewLeft = ({ teacher, onDelete, onEdit }: {
  teacher: Teacher,
  onEdit: (teacher: Teacher) => void,
  onDelete: (id: string) => void,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(getProfilePictureURL(teacher?.id));

  useEffect(() => {
    setPreviewUrl(getProfilePictureURL(teacher?.id));
  }, [teacher]);

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
      handleUpload(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async (file: File) => {
    if (!teacher?.id) return;
    try {
      await uploadFile({
        file,
        type: "profile_picture",
        fileable_id: teacher.id,
        fileable_type: "teacher",
        file_description: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  if (!teacher) return null;

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
            {/* QR Code for Teacher ID */}
            {teacher && (
              <Box sx={{ mb: 2 }}>
                <QRCode value={JSON.stringify({
                  id: teacher?.id,
                  type: "teacher",
                  member_id: teacher?.member_id,
                  bio: teacher?.bio,
                  member: {
                    id: teacher?.member?.id,
                    name: teacher?.member?.name,
                    email: teacher?.member?.email,
                  },
                })} />
              </Box>
            )}
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
              user={teacher?.member}
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="profile-photo-input"
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <Typography variant="h4" sx={{ mb: 3 }}>
              {teacher?.member?.full_name}
            </Typography>
            <CustomChip
              rounded
              skin="light"
              size="small"
              label={"teacher"}
              sx={{ textTransform: "capitalize" }}
            />
            <RowOptions
              onEdit={onEdit}
              onDelete={() => onDelete(teacher.id)}
              item={teacher}
              editPermissionRule={{
                action: "update",
                subject: "teacher",
              }}
              deletePermissionRule={{
                action: "delete",
                subject: "teacher",
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
                <Typography sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}>
                  BirthDate:
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {teacher?.member?.birth_date?.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}>
                  Gender:
                </Typography>
                <Typography sx={{ color: "text.secondary", textTransform: "capitalize" }}>
                  {teacher?.member?.gender}
                </Typography>
              </Box>


            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TeacherViewLeft;
