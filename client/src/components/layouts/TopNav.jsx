import React from "react";
import CoronavirusOutlinedIcon from "@mui/icons-material/CoronavirusOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import {
  AppBar,
  Avatar,
  colors,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";

const TopNav = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: colors.common.white,
        color: colors.common.black,
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: "0px 1px 4px 1px rgb(0 0 0 / 12%)",
      }}
      elevation={0}
    >
      <Toolbar>
        <CoronavirusOutlinedIcon
          sx={{
            color: colors.red["800"],
            marginRight: "10px",
          }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          VACCINE DETAILS
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar alt="User Image" sx={{ height: "30px ", width: "30px" }} />
          <IconButton
            aria-label="logout"
            sx={{ color: colors.blue["800"] }}
            onClick={() => logout(navigate)}
          >
            <ExitToAppOutlinedIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
