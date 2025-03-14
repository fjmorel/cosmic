import { AppBar, Box, Button, Menu, Toolbar } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useLocation } from "@tanstack/react-router";
import RouterButton from "./RouterButton";
import { usePopover } from "@/data/usePopover";

export default function NavBar() {
  const location = useLocation();

  const pageMenu = usePopover();
  const pages = [
    <RouterButton key="home" to="/" title="Home" />,
    <RouterButton key="generator" to="/generator" title="Game Generator" />,
    <RouterButton key="reference" to="/reference" title="Alien Reference" />,
    <a href="https://play.google.com/store/apps/details?id=net.fmorel.cosmicgenerator">
      <img src="../icons/playstore_badge.png" />
    </a>,
  ];

  let currentPageName = pages.find((x) => x.props.to === location.pathname)!
    .props.title as string;
  if (currentPageName === "Home") currentPageName = "Cosmic Companion";

  //todo: figure out drawer?

  return (
    <Box sx={{ paddingBottom: "20px", flexGrow: 1 }}>
      <AppBar position="static" enableColorOnDark>
        <Toolbar variant="dense" disableGutters>
          <Button
            size="large"
            aria-label="page menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(evt) => pageMenu.open(evt, null)}
            color="inherit"
            startIcon={<MenuIcon />}
          >
            {currentPageName}
          </Button>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={pageMenu.anchor}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={pageMenu.isOpen}
            onClose={pageMenu.close}
          >
            {pages}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
