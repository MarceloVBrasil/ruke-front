import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HardwareIcon from '@mui/icons-material/Hardware';
import {
  Dashboard,
  AccountBalanceWallet,
  ProductionQuantityLimitsOutlined,
  SupervisedUserCircleSharp,
  Leaderboard,
} from "@mui/icons-material";
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import { LinearProgress, Link, Typography } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ElderlyWomanIcon from "@mui/icons-material/ElderlyWoman";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GavelIcon from '@mui/icons-material/Gavel';

import { deleteCookie } from "cookies-next";
import { ListItemText, Collapse } from "@mui/material";
import '../../styles/BasicListStyle.css'

type BasicListProps = {
  permissoesProduto: string[];
  permissoesTenants: string[];
  permissoesUsuarios: string[];
  permissoesRMC: string[];
  menusPermitidos: string[];
};

const Logout = () => {
  sessionStorage.removeItem("ruke-storage");
  deleteCookie("ruke_token");
  deleteCookie("refreshToken");
  deleteCookie("regras");
  deleteCookie("menusPermitidos");

  window.location.href = "/login";
};

export default function BasicList({
  permissoesProduto,
  permissoesTenants,
  permissoesUsuarios,
  permissoesRMC,
  menusPermitidos,
}: BasicListProps) {
  function ProgressBarWithLabel({ value, label }: any) {
    return (
      <Box
        display="flex"
        alignItems="start"
        sx={{ flexDirection: "column" }}
        width="100%"
      >
        <Box flex={1} mr={1}>
          <LinearProgress
            sx={{
              width: "200px",
              borderRadius: "5px",
              padding: "2px",
              margin: "2px",
            }}
            variant="determinate"
            value={value}
          />
        </Box>
        <Box>
          <Typography
            style={{ fontSize: "10px" }}
            variant="body2"
            color="textSecondary"
          >
            {label}
          </Typography>
        </Box>
      </Box>
    );
  }

  const [open, setOpen] = React.useState(false);
  const [openBancario, setOpenBancario] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickBancario = () => {
    setOpenBancario(!openBancario);
  };

  return (
    <Box sx={{ width: "100%", height: "90vh", maxWidth: 360, color: "white" }}>
      <nav aria-label="main mailbox folders">
        <List
          className="basic_list"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            position: "relative",
            color: "#212121",
            alignItems: "start",
            justifyContent: "space-evenly",
          }}
        >
          {(permissoesTenants.includes("getAll") ||
            permissoesTenants.includes("add") ||
            permissoesTenants.includes("update") ||
            permissoesTenants.includes("delete")) && (
              <Link
                href="/tenants"
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                <ListItem disablePadding className="">
                  <ListItemButton>
                    <ListItemIcon style={{ minWidth: "40px" }}>
                      <Dashboard style={{ color: '#0067e3' }} />
                    </ListItemIcon>
                    <Typography className="basic_list_item_label">
                      ÁREA DO CLIENTE
                    </Typography>
                  </ListItemButton>
                </ListItem>
              </Link>
            )}

          {(permissoesProduto.includes("getAll") ||
            permissoesProduto.includes("add") ||
            permissoesProduto.includes("update") ||
            permissoesProduto.includes("delete")) && (
              <Link
                href="/produtos"
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                <ListItem disablePadding className="">
                  <ListItemButton>
                    <ListItemIcon style={{ minWidth: "40px" }}>
                      <ProductionQuantityLimitsOutlined style={{ color: '#0067e3' }} />
                    </ListItemIcon>
                    <Typography className="basic_list_item_label">PRODUTOS</Typography>
                  </ListItemButton>
                </ListItem>
              </Link>
            )}

          <ListItem disabled={!menusPermitidos.includes("BPC")} style={{ marginBottom: 5 }} disablePadding className="">
            <ListItemButton onClick={handleClick}>
              <ListItemIcon style={{ minWidth: "40px" }}>
                <ElderlyWomanIcon style={{ color: '#0067e3' }} />
              </ListItemIcon>
              <Typography className="basic_list_item_label">
                PREVIDENCIÁRIAS
              </Typography>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            style={{ width: "100%", marginBottom: 10 }}
          >
            {menusPermitidos.includes("BPC") && (
              <Link
                href="/bpc"
                style={{
                  width: "100%",
                  marginBottom: "40px",
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                <ListItem disablePadding className="">
                  <ListItemButton>
                    <ListItemIcon style={{ minWidth: "30px", marginLeft: 15 }}>
                      <AccountBalanceWallet style={{ color: '#0067e3' }} />
                    </ListItemIcon>
                    <Typography className="basic_list_item_label">BPC</Typography>
                  </ListItemButton>
                </ListItem>
              </Link>
            )}
          </Collapse>

          <ListItem disabled={!menusPermitidos.includes('RMC') && !menusPermitidos.includes('superendividamento')} disablePadding style={{ marginTop: 10 }} className="">
            <ListItemButton onClick={handleClickBancario}>
              <ListItemIcon style={{ minWidth: "40px" }}>
                <AccountBalanceIcon style={{ color: '#0067e3' }} />
              </ListItemIcon>
              <Typography className="basic_list_item_label">BANCÁRIAS</Typography>
              {openBancario ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse
            in={openBancario}
            timeout="auto"
            unmountOnExit
            style={{ width: "100%" }}
          >
            {menusPermitidos.includes("RMC") &&
              (permissoesRMC.includes("getAll") ||
                permissoesRMC.includes("add") ||
                permissoesRMC.includes("update") ||
                permissoesRMC.includes("delete")) && (
                <Link
                  href="/tickets"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    textDecoration: "none",
                    color: 'black',
                  }}
                >
                  <ListItem
                    component="div"
                    style={{ marginTop: 10, width: "100%" }}
                    disablePadding
                    className=""
                  >
                    <ListItemButton style={{ width: "100%" }}>
                      <ListItemIcon
                        style={{ minWidth: "30px", marginLeft: 15 }}
                      >
                        <CreditCardIcon style={{ color: '#0067e3' }} />
                      </ListItemIcon>
                      <Typography className="basic_list_item_label" style={{ width: "100%" }}>
                        RMC
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                </Link>
              )}
            {menusPermitidos.includes("RMC") &&
              (permissoesRMC.includes("getAll") ||
                permissoesRMC.includes("add") ||
                permissoesRMC.includes("update") ||
                permissoesRMC.includes("delete")) && (
                <Link
                  href="/superendividamento"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    textDecoration: "none",
                    color: "#000",
                  }}
                >
                  <ListItem
                    component="div"
                    style={{ marginTop: 10, width: "100%" }}
                    disablePadding
                    className=""
                  >
                    <ListItemButton style={{ width: "100%" }}>
                      <ListItemIcon
                        style={{ minWidth: "30px", marginLeft: 15 }}
                      >
                        <CreditCardOffOutlinedIcon style={{ color: '#0067e3' }} />
                      </ListItemIcon>
                      <Typography className="basic_list_item_label" style={{ width: "100%" }}>
                        SUPERENDIVIDAMENTO
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                </Link>
              )}

          </Collapse>



          <Link
            onClick={Logout}
            style={{
              width: "100%",
              marginBottom: "20px",
              textDecoration: "none",
              color: "#000",
            }}
          ></Link>

          <Link
            href={menusPermitidos.includes("agenda") ? "/agenda" : "/tenants"}
            style={{
              width: "100%",
              marginBottom: "15px",
              textDecoration: "none",
              color: "#000",
            }}
          >
            <ListItem disabled={menusPermitidos.includes("agenda") ? false : true} disablePadding className="">
              <ListItemButton>
                <ListItemIcon style={{ minWidth: "40px" }}>
                  <CalendarMonthIcon style={{ color: '#0067e3' }} />
                </ListItemIcon>
                <Typography className="basic_list_item_label">AGENDA JURÍDICA</Typography>
              </ListItemButton>
            </ListItem>
          </Link>


          <Link
            href={menusPermitidos.includes("processos") ? "/processos" : "/tenants"}
            style={{
              width: "100%",
              marginBottom: "15px",
              textDecoration: "none",
              color: "#000",
            }}
          >
            <ListItem disabled={menusPermitidos.includes("processos") ? false : true} disablePadding className="">
              <ListItemButton>
                <ListItemIcon style={{ minWidth: "40px" }}>
                  <GavelIcon style={{ color: '#0067e3' }} />
                </ListItemIcon>
                <Typography className="basic_list_item_label">PROCESSOS</Typography>
              </ListItemButton>
            </ListItem>
          </Link>

          <Link
            href={menusPermitidos.includes("trabalhista") ? '/trabalhista' : '#'}
            style={{
              width: "100%",
              marginBottom: "15px",
              textDecoration: "none",
              color: "#000",
            }}
          >
            <ListItem disabled={menusPermitidos.includes("trabalhista") ? false : true} disablePadding className="">
              <ListItemButton>
                <ListItemIcon style={{ minWidth: "40px" }}>
                  <HardwareIcon color="primary" />
                </ListItemIcon>
                <Typography className="basic_list_item_label">TRABALHISTA</Typography>
              </ListItemButton>
            </ListItem>
          </Link>

        </List>
      </nav>
    </Box>
  );
}
