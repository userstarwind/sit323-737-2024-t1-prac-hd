import { Container, Button, Box, Typography, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { useNavigate } from "react-router-dom";
import {
  deleteEvent,
  removeParticipantFromEvent,
  addParticipantToEvent,
} from "../api/database";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "./Snackbar";
const EventDetailsContent = (props) => {
  const { currentUser } = useContext(UserContext);
  const [whetherUserLogin, setWhetherUserLogin] = React.useState(false);
  const [whetherIsOrganizer, setWhetherIsOrganizer] = React.useState(false);
  const [whetherIsParticipant, setWhetherIsParticipant] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClose = () => {
    setOpenSnackBar(false);
  };
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    if (currentUser) {
      setWhetherUserLogin(true);
      setWhetherIsOrganizer(props.organizerID === currentUser.id);
      setWhetherIsParticipant(props.participantIDs?.includes(currentUser.id));
  } else {
      setWhetherUserLogin(false);
  }
  }, [currentUser, props.organizerID, props.participantIDs]);
  const renderButton = () => {
    if (!whetherUserLogin) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/login");
          }}
        >
          BOOK NOW
        </Button>
      );
    } else if (whetherIsOrganizer) {
      return (
        <Button
          variant="contained"
          color="error"
          onClick={handleClickOpenDialog}
        >
          Cancel
        </Button>
      );
    } else if (whetherIsParticipant) {
      return (
        <Button
          variant="contained"
          color="error"
          onClick={async () => {
            const response = await removeParticipantFromEvent(
              currentUser.id,
              props.eid,
              currentUser.token
            );
            if (response.success) {
              setMessage(response.message);
              setOpenSnackBar(true);
              setWhetherIsParticipant(!whetherIsParticipant);
            } else {
              setMessage(response.message);
              setOpenSnackBar(true);
            }
          }}
        >
          Cancel
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            const response = await addParticipantToEvent(
              currentUser.id,
              props.eid,
              currentUser.token
            );
            if (response.success) {
              setMessage(`${response.message}`);
              setOpenSnackBar(true);
              setWhetherIsParticipant(!whetherIsParticipant);
            } else {
              setMessage(`${response.message}`);
              setOpenSnackBar(true);
            }
          }}
        >
          BOOK NOW
        </Button>
      );
    }
  };
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Event Cancel Alert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Since you are the organizer of this event, this operation means
            canceling this event. Are you sure you want to do this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deleteEvent(props.eid, currentUser.token);
              handleCloseDialog();
              navigate("/event");
            }}
            color="error"
          >
            Yes
          </Button>
          <Button onClick={handleCloseDialog} autoFocus>
            No, don't do that
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="body1" gutterBottom>
          {props.content}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        {renderButton()}
        <Box>
          <Typography variant="body1" component="span">
            Share
          </Typography>
          <IconButton color="primary">
            <FacebookIcon />
          </IconButton>
          <IconButton color="secondary">
            <InstagramIcon />
          </IconButton>
        </Box>
      </Box>
      <Snackbar
        open={openSnackBar}
        closeFunc={handleClose}
        message={message}
        onClose={handleClose}
      />
    </Container>
  );
};
export default EventDetailsContent;
