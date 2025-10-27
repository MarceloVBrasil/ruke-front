"use client";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { useMenu } from "@/presentation/hook/useMenu";
import { Button } from "@mui/material";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useEffect } from "react";
import { converterStringBoolean } from "@/infra/utils/convert";

const drawerWidth: number = 260;

const Logout = async (router: any) => {
  sessionStorage.removeItem("ruke-storage");
  deleteCookie("ruke_token");
  deleteCookie("refreshToken");
  deleteCookie("regras");
  deleteCookie("menusPermitidos");

  // Limpar Local Storage
  localStorage.clear();

  // Limpar Session Storage
  sessionStorage.clear();

  // Limpar Cache API
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(cache => caches.delete(cache)));
  }

  // Remover Service Workers
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (let registration of registrations) {
      registration.unregister();
    }
  }

  // Esperar um pequeno tempo para garantir que os caches sejam limpos
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Recarregar a página
  window.location.reload();

  router.push("/login");
};
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AppBarContainer() {
  const router = useRouter();
  const { open, setOpen } = useMenu();
  const toggleDrawer = () => {
    const is_drawer_open = converterStringBoolean(getCookie('ruke_drawer_open') || 'true')

    if (is_drawer_open) setCookie('ruke_drawer_open', 'false')
    else setCookie('ruke_drawer_open', 'true')

    setOpen(!open);
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 900) {
        setCookie('ruke_drawer_open', 'false')
        setOpen(false)
      }
      else {
        setCookie('ruke_drawer_open', 'true')
        setOpen(true)
      }
    })

    const is_drawer_open = converterStringBoolean(getCookie('ruke_drawer_open') || 'true')
    if (is_drawer_open) setOpen(true)
    else setOpen(false)
  }, [])

  return (

    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "25px",
          backgroundColor: "#00204B",
        }}
      >
        <IconButton
          edge="start"
          color="primary"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h4"
          color="primary"
          noWrap
          fontFamily={"Neue Kaine"}
          sx={{ flexGrow: 1, color: "#fff", fontSize: "20px" }}
        >
          Dashboard
        </Typography>

        <Button
          style={{
            textDecoration: "none",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            color: "#fff",
          }}
          color="primary"
          onClick={() => Logout(router)}
        >
          <LogoutIcon style={{ color: "white", marginRight: "5px" }} />
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
}
