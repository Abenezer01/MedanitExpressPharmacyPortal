

// ** React Imports

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// ** Custom Components
import CustomChip from "src/@core/components/mui/chip";
import { getProfilePictureURL, uploadFile } from "src/services/utils/file";
import Link from "next/link";
import UserAvatar from "src/views/admin/user/user-avatar";
import RowOptions from "src/views/shared/listing/row-options";
import { useEffect, useRef, useState } from "react";
import { Student } from "src/types/school/student";
import QRCode from "react-qr-code";
import { AttendanceUserType } from "src/types/school/attendance";

const StudentViewLeft = ({ student, onDelete, onEdit }: {
  student: Student,
  onEdit: (student: Student) => void,
  onDelete: (id: string) => void,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(getProfilePictureURL(student?.id));

  useEffect(() => {
    setPreviewUrl(getProfilePictureURL(student?.id));
  }, [student]);

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
    if (!student?.id) return;
    try {
      await uploadFile({
        file,
        type: "profile_picture",
        fileable_id: student.id,
        fileable_type: "student",
        file_description: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  if (!student) return null;

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
            {/* QR Code for Student ID */}
            {student && (
              <Box sx={{ mb: 2 }}>
                <QRCode value={JSON.stringify({
                  id: student?.id,
                  type: AttendanceUserType.Student,
                  member_id: student.member.id,
                  class_id: student.class_id,
                  member: {
                    id: student.member.id,
                    name: student?.member.name,
                    email: student?.member.email,
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
              user={student?.member}
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
              {student.member.full_name}
            </Typography>
            <CustomChip
              rounded
              skin="light"
              size="small"
              label={"student"}
              sx={{ textTransform: "capitalize" }}
            />
            <RowOptions
              onEdit={onEdit}
              onDelete={() => onDelete(student.id)}
              item={student}
              editPermissionRule={{
                action: "update",
                subject: "student",
              }}
              deletePermissionRule={{
                action: "delete",
                subject: "student",
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
                  {student?.member?.birth_date?.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}>
                  Gender:
                </Typography>
                <Typography sx={{ color: "text.secondary", textTransform: "capitalize" }}>
                  {student.member.gender}
                </Typography>
              </Box>

              {student.class && (
                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}>
                    Class:
                  </Typography>
                  <Typography noWrap component={Link} href={`#`} sx={{ color: "primary.main" }}>
                    {student.class.title}
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StudentViewLeft;
