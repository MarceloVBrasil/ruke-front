import '../globals.css';
import { Metadata } from "next";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '../../presentation/components/Template/Menu';
import AppBarContainer from '../../presentation/components/Template/AppBarContainer';
import Container from '../../presentation/components/Template/Container';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Ruke - Inteligência Jurídica",
  description: "",
  icons: '/ruke-favicon.png'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  if (!cookies().get("regras") || !cookies().get("regras")?.value) {
    redirect("/login")
  }
  const regras = JSON.parse(cookies().get("regras")?.value as string);
  const permissoesProduto = regras.find((regra: any) => regra.dominio === "produtos")?.permissoes || []
  const permissoesTenants = regras.find((regra: any) => regra.dominio === "tenants")?.permissoes || []
  const permissoesUsuarios = regras.find((regra: any) => regra.dominio === "usuarios")?.permissoes || []
  const permissoesRMC = regras.find((regra: any) => regra.dominio === "ticketRMC")?.permissoes || []
  const menusCookies = JSON.parse(cookies().get("menusPermitidos")?.value as string)
  const menusPermitidos = menusCookies.map((menu: any) => menu.nome)
  return (
    <html lang="pt-BR">
      <body>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBarContainer />
          <Menu
            permissoesProduto={permissoesProduto}
            permissoesTenants={permissoesTenants}
            permissoesUsuarios={permissoesUsuarios}
            permissoesRMC={permissoesRMC}
            menusPermitidos={menusPermitidos}
          />
          <Box
            component="main"
            sx={{
              backgroundColor: '#FFF',
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',

            }}
          >
            <Toolbar />
            <Box sx={{ mt: 4, mb: 4, }}>
              <Container>{children}</Container>
            </Box>
          </Box>
        </Box>
      </body>
    </html>
  );
}
