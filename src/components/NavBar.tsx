import { AppBar, Button, Menu, MenuItem, Toolbar } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useLocation } from "@tanstack/react-router";
import RouterButton from "./RouterButton";
import { usePopover } from "@/data/usePopover";

export default function NavBar() {
  const { pathname } = useLocation();

  const pageMenu = usePopover();
  const pages = [
    <RouterButton onClick={pageMenu.close} key="home" to="/" title="Home" />,
    <RouterButton
      onClick={pageMenu.close}
      key="generator"
      to="/generator"
      title="Game Generator"
    />,
    <RouterButton
      onClick={pageMenu.close}
      key="reference"
      to="/reference"
      title="Alien Reference"
    />,
    <MenuItem
      onClick={pageMenu.close}
      key="play-store"
      href="https://play.google.com/store/apps/details?id=net.fmorel.cosmicgenerator"
      target="_blank"
    >
      <img src="/cosmic/icons/playstore_badge.png" />
    </MenuItem>,
  ];

  const currentPage = pages.find((x) => pathname.endsWith(x.props.to));
  let currentPageName = currentPage?.props.title;
  if (currentPageName === "Home") currentPageName = "Cosmic Companion";

  //todo: figure out drawer?

  return (
    <AppBar position="static" enableColorOnDark sx={{ marginBottom: "16px" }}>
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
          id="menu-appbar"
          anchorEl={pageMenu.anchor}
          keepMounted
          open={pageMenu.isOpen}
          onClose={pageMenu.close}
        >
          {pages}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
