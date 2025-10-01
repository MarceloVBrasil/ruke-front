'use client'
import { IconButton, List, Toolbar } from "@mui/material"
import { Box } from "@mui/system"
import Link from "next/link"
import BasicList from "./BasicList"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useMenu } from "@/presentation/hook/useMenu";
import MuiDrawer from '@mui/material/Drawer';
import { styled, } from '@mui/material/styles';
import Image from "next/image"
import { useEffect } from "react"
import { getCookie, setCookie } from "cookies-next"
import { converterStringBoolean } from "@/infra/utils/convert"

const drawerWidth: number = 260;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(8),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

type MenuProps = {
  permissoesProduto: string[],
  permissoesTenants: string[],
  permissoesUsuarios: string[],
  permissoesRMC: string[],
  menusPermitidos: string[]
}

export default function Menu({
  permissoesProduto,
  permissoesTenants,
  permissoesUsuarios,
  permissoesRMC,
  menusPermitidos
}: MenuProps) {
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
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // px: [1],
          position: 'relative',
          color: '#CFCFCF',
          borderBottom: open ? '2px solid #00204B' : '',
          width: '100%',
        }}
      >
        <Link href='/'>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image width={300} height={65}
              src="https://ruke.nyc3.cdn.digitaloceanspaces.com/logo_ruke%20(1).png"
              style={{ width: '100%', objectFit: 'contain', maxWidth: '160px', marginRight: '20px' }}
              alt='Logo Ruke'
            />
          </Box>
        </Link>
        <IconButton style={{ position: 'absolute', right: 0 }} onClick={toggleDrawer}>
          <ChevronLeftIcon
            style={{ fontSize: '30px', color: '#00204B' }} />
        </IconButton>
      </Toolbar>
      <List style={{ height: '100%', backgroundColor: '#fff' }} component="nav">
        <BasicList
          permissoesProduto={permissoesProduto}
          permissoesTenants={permissoesTenants}
          permissoesUsuarios={permissoesUsuarios}
          permissoesRMC={permissoesRMC}
          menusPermitidos={menusPermitidos}
        />
      </List>
    </Drawer>
  )
}