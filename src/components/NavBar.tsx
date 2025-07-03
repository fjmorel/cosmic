import { AppBar, Button, Menu, MenuItem, Toolbar } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import {
  Link,
  useLocation,
  useMatchRoute,
  type RegisteredRouter,
  type ValidateToPath,
} from "@tanstack/react-router";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import type { MouseEventHandler } from "react";

export default function NavBar() {
  const { pathname } = useLocation();

  const pageMenu = usePopupState({ variant: "popover", popupId: "navbar" });
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

  return (
    <AppBar position="static" enableColorOnDark>
      <Toolbar variant="dense" disableGutters>
        <Button
          size="large"
          color="inherit"
          startIcon={<MenuIcon />}
          {...bindTrigger(pageMenu)}
        >
          {currentPageName}
        </Button>
        <Menu {...bindMenu(pageMenu)} keepMounted>
          {pages}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

type RouterButtonProps = {
  to: ValidateToPath<RegisteredRouter>;
  title: string;
  onClick: MouseEventHandler<HTMLElement>;
};

function RouterButton({ to, title, onClick }: RouterButtonProps) {
  const matchRoute = useMatchRoute();
  const isActive = matchRoute({ to }) ? true : false;

  return (
    <MenuItem component={Link} to={to} selected={isActive} onClick={onClick}>
      {title}
    </MenuItem>
  );
}
