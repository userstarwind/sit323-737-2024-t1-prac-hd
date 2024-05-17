import React from "react";
import { Box, Typography, Avatar, Stack } from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function EventDetailsHero(props) {
  return (
    <>
        <Box sx={{
          display: 'flex',
          alignItems: 'center', 
          justifyContent: 'space-between',
          background: 'linear-gradient(to right, #1769aa, #4dabf5)',
          color: 'white',
          padding: 12
        }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {props.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', marginTop: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <EventIcon />
                <Typography variant="body1">
                  {props.date}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2} marginLeft={4}>
                <AccessTimeIcon />
                <Typography variant="body1">
                  {`${props.startTime}-${props.endTime}`}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2} marginLeft={4}>
                <LocationOnIcon />
                <Typography variant="body1">
                  {props.location}
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Avatar
            sx={{
              width: 300,
              height: 300,
              marginLeft: 2
            }}
            src={props.src}
            alt="Event Logo"
          />
        </Box>

    </>
  );
}
