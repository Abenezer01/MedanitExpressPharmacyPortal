// ** React Imports
import React, { useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import moment from "moment";

// ** Custom Components
import CustomChip from "src/@core/components/mui/chip";
import RowOptions from "src/views/shared/listing/row-options";

// ** Utils Import
import Session, { SessionStatus } from "src/types/school/session";

const SessionViewLeft = ({
  session,
  onDelete,
  onEdit,
}: {
  session: Session;
  onEdit: (session: Session) => void;
  onDelete: (id: string) => void;
}) => {
  const [isElapsed, setIsElapsed] = useState(false);
  const [elapsedTime, setElapsedTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [countdownTime, setCountdownTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const sessionStartDate =
    session?.date && session?.start_time
      ? moment(`${session.date} ${session.start_time}`, "YYYY-MM-DD HH:mm").toDate()
      : null;

  useEffect(() => {
    if (!sessionStartDate) return;

    const checkTime = () => {
      const now = new Date();
      if (now >= sessionStartDate) {
        setIsElapsed(true);
      } else {
        const diff = moment.duration(moment(sessionStartDate).diff(moment(now)));
        setCountdownTime({
          days: Math.floor(diff.asDays()),
          hours: diff.hours(),
          minutes: diff.minutes(),
          seconds: diff.seconds(),
        });
      }
    };

    checkTime(); // initial check

    const interval = setInterval(() => {
      checkTime();
      if (new Date() >= sessionStartDate) {
        setIsElapsed(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStartDate]);

  useEffect(() => {
    if (!sessionStartDate || !isElapsed) return;

    const interval = setInterval(() => {
      const diff = moment.duration(moment().diff(sessionStartDate));
      setElapsedTime({
        days: Math.floor(diff.asDays()),
        hours: diff.hours(),
        minutes: diff.minutes(),
        seconds: diff.seconds(),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStartDate, isElapsed]);

  if (!session) return null;

  // Determine counter display based on session.status
  let counterDisplay = null;
  if (session.status === SessionStatus.Upcoming && sessionStartDate) {
    counterDisplay = (
      <Box sx={{ mb: 2 }}>
        <CustomChip
          rounded
          skin="light"
          size="small"
          color="info"
          label={`Starts in: ${countdownTime.days}d ${String(countdownTime.hours).padStart(2, "0")}h:${String(countdownTime.minutes).padStart(2, "0")}m:${String(countdownTime.seconds).padStart(2, "0")}s`}
          sx={{ fontWeight: 600, fontSize: "1rem" }}
        />
      </Box>
    );
  } else if (session.status === SessionStatus.Ongoing && sessionStartDate) {
    counterDisplay = (
      <Box sx={{ mb: 2 }}>
        <CustomChip
          rounded
          skin="light"
          size="small"
          color="primary"
          label={`Elapsed: ${elapsedTime.days}d ${String(elapsedTime.hours).padStart(2, "0")}h:${String(elapsedTime.minutes).padStart(2, "0")}m:${String(elapsedTime.seconds).padStart(2, "0")}s`}
          sx={{ fontWeight: 600, fontSize: "1rem" }}
        />
      </Box>
    );
  } else if (session.status === SessionStatus.Completed) {
    counterDisplay = (
      <Box sx={{ mb: 2 }}>
        <CustomChip
          rounded
          skin="light"
          size="small"
          color="success"
          label="Session Completed"
          sx={{ fontWeight: 600, fontSize: "1rem" }}
        />
      </Box>
    );
  } else if (session.status === SessionStatus.Cancelled) {
    counterDisplay = (
      <Box sx={{ mb: 2 }}>
        <CustomChip
          rounded
          skin="light"
          size="small"
          color="error"
          label="Session Cancelled"
          sx={{ fontWeight: 600, fontSize: "1rem" }}
        />
      </Box>
    );
  }

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
            {counterDisplay}
            <Typography variant="h4" sx={{ mb: 3 }}>
              {session.title}
            </Typography>

            <CustomChip
              rounded
              skin="light"
              size="small"
              label={"session"}
              sx={{ textTransform: "capitalize" }}
            />

            <RowOptions
              onEdit={onEdit}
              onDelete={() => onDelete(session.id)}
              item={session}
              editPermissionRule={{
                action: "update",
                subject: "session",
              }}
              deletePermissionRule={{
                action: "delete",
                subject: "session",
              }}
            />
          </CardContent>

          <Divider sx={{ my: "0 !important", mx: 6 }} />

          <CardContent sx={{ pb: 4 }}>
            <Typography
              variant="body2"
              sx={{ color: "text.disabled", textTransform: "uppercase", mb: 2 }}
            >
              Details
            </Typography>

            <Box sx={{ pt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                    Date
                  </Typography>
                  <Typography variant="h6" sx={{ color: "primary.main" }}>
                    {session.date ? moment(session.date).format("dddd, MMMM D, YYYY") : ""}
                  </Typography>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

                <Box>
                  <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                    Start Time
                  </Typography>
                  <Typography variant="h6" sx={{ color: "success.main" }}>
                    {session.start_time}
                  </Typography>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

                <Box>
                  <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                    End Time
                  </Typography>
                  <Typography variant="h6" sx={{ color: "error.main" }}>
                    {session.end_time}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "background.default",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary", mb: 1 }}
                >
                  Notes
                </Typography>
                <Typography sx={{ color: "text.primary" }}>{session.notes}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SessionViewLeft;
