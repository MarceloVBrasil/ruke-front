"use client";

import React, { forwardRef, useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Drawer,
  IconButton,
  Fab,
  Card,
  CardContent,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  visualizarContatoRukeLeadsAPI,
} from "@/app/api/client/rukeleads";
import { Close, Email, FilterList, Search, WhatsApp } from "@mui/icons-material";
import { convertISOForBR } from "../AgendaPage/AgendaPage";
import { getProcessos } from "@/app/api/server/processo";
import { styled } from "@mui/system";
import 'react-datepicker/dist/react-datepicker.css';

type RukeLeadsProps = {
  leads: any[];
};

export default function RukeLeadsPage({
  leads
}: RukeLeadsProps) {
  const [leadsRuke, setLeadsRuke] = useState<any>(leads);
  const [filtros, setFiltros] = useState<any>({ estado: "" });
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dadosLead, setDadosLead] = useState<any>({});
  const [drawerVisualizarContato, setDrawerVisualizarContato] = useState<boolean>(false);
  const [drawerFiltros, setDrawerFiltros] = useState<boolean>(false);

  const StyledDatePickerWrapper = styled('div')({
    '& .react-datepicker__header': {
      backgroundColor: 'white',
    },
    '& .react-datepicker__current-month, & .react-datepicker-time__header, & .react-datepicker-year-header': {
      color: 'black',
    },
    '& .react-datepicker__day, & .react-datepicker__time-name': {
      color: 'black',
    },
    '& .react-datepicker': {
      backgroundColor: 'white',
      width: '100% !important',
    },
    '& .react-datepicker-popper': {
      zIndex: 1500,
    },
  });

  const CustomInput = forwardRef((props: any, ref: any) => (
    <TextField {...props} inputRef={ref} InputLabelProps={{ shrink: true }} style={{ width: '100% !important' }} fullWidth={true} />
  ));

  CustomInput.displayName = 'customInputName'

  const traduzirCategoria = (categoria: string) => {
    if (categoria === "compras_online") {
      return "Compras Online";
    }

    if (categoria === "previdenciario") {
      return "Previdenciário";
    }

    if (categoria === "trabalhista") {
      return "Trabalhista";
    }

    if (categoria === "criminal") {
      return "Criminal";
    }

    if (categoria === "atraso_de_voos") {
      return "Atraso de Voos";
    }

    if (categoria === "juros_abusivos") {
      return "Juros Abusivos";
    }

    if (categoria === "pensao") {
      return "Pensão";
    }

    if (categoria === "tributario") {
      return "Tributário";
    }

    if (categoria === "plano_de_saude") {
      return "Plano de Saúde";
    }

    if (categoria === "consumo") {
      return "Consumo";
    }
    return categoria;
  }

  const CitationCard = ({ dados }: any) => {
    return (
      <Box display="flex" textAlign="left" marginLeft="15px" justifyContent="flex-start" paddingRight="20px" height="100%">
        <Card sx={{ padding: '20px', borderLeft: '5px solid #00479d' }}>
          <CardContent>
            <Typography variant="body2" color="textSecondary" marginTop={1} align="left">
              Categoria: <b>{traduzirCategoria(dados.categoria)}</b>
            </Typography>

            <Typography style={{ marginBottom: 10 }}>
              <i style={{ fontSize: 12, fontWeight: 400 }}>Este lead já teve {dados.visualizacoes} visualizações/contatos</i>
            </Typography>
            <Divider />
            <Typography variant="h6" style={{ fontSize: 15, marginTop: 10 }} component="blockquote" align="left" gutterBottom>
              {dados.texto_duvida}
            </Typography>
            <Typography variant="subtitle1" component="footer" align="left" gutterBottom>
              - {dados.nome_cliente}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="left">
              {convertISOForBR(dados.created_at)}
            </Typography>
            <Typography variant="body2" color="textSecondary" marginTop={1} align="left">
              Fonte: <b><a style={{ color: "black", marginLeft: 2 }} href="https://tenhodireito.com" target="_blank">tenhodireito.com</a></b>
            </Typography>

            <br />
            <Button variant="contained" onClick={() => {
              entrarEmContato(dados, "whatsapp");
            }} style={{ backgroundColor: "#0DC242" }} startIcon={<WhatsApp />} color="success">WHATSAPP</Button>
            <Button variant="contained" onClick={() => {
              entrarEmContato(dados, "email");
            }} style={{ backgroundColor: "black" }} startIcon={<Email />} color="info">E-MAIL</Button>
          </CardContent>
        </Card>
      </Box>
    );
  };


  const entrarEmContato = async (duvida: any, forma: string) => {
    visualizarContatoRukeLeadsAPI(duvida.id)
    const mensagem = encodeURIComponent(`Olá, encontrei a sua dúvida no site tenhodireito.com: \n\n${duvida.texto_duvida}`)

    if (forma === "whatsapp") {
      window.open(`https://wa.me/${duvida.telefone_cliente}?text=${mensagem}`)
    }

    if (forma === "email") {
      const assunto = encodeURIComponent("Resposta à sua dúvida no tenhodireito.com");
      const mailtoLink = `mailto:${duvida.email_cliente}?subject=${assunto}&body=${mensagem}`;

      window.open(mailtoLink, '_blank');
    }
  }

  const limparFiltros = async (e: any) => {
    e.preventDefault();

    setLeadsRuke(await getProcessos());
    setFiltros({ orgao_julgador: "", numero_processo: "", data_ajuizamento: "", classe: "", cliente_principal: "", contrario_principal: "" })
  }

  const filtrar = async () => {
    // const resultadosFiltro = await getRukeLeads(filtros);
    // setLeadsRuke(resultadosFiltro);
  }

  return (
    <Box sx={{ padding: "30px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "600",
            width: "500px",
            paddingBottom: "10px",
            marginBottom: "30px",
            color: "#00479D",
            borderBottom: "3px solid #006BED",
          }}
        >
          DÚVIDAS JURÍDICAS DE LEADS
        </Typography>
        <Box>
          {/* <Button
            sx={{
              backgroundColor: "#006BED",
              color: "white",
              height: "50px",
              width: "300px",
              marginRight: "10px",
              marginTop: "-15px",
              "&:hover": { backgroundColor: "#00479d" },
            }}
            style={{ fontWeight: "bold" }}
            onClick={() => {
              
            }}
          >
            <History sx={{ mr: "2px" }} />
            HISTÓRICO DE CONTATOS
          </Button> */}
        </Box>
      </Box>


      {leadsRuke && leadsRuke.data.length > 0 && (
        <>
          {leadsRuke.data.map((leadRuke: any, index: number) => (
            <>
              <CitationCard dados={leadRuke} />
              <br />
            </>
          ))}
        </>
      )}

      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: 'fixed',
          right: 20,
          bottom: 20,
          zIndex: 1500
        }}
        onClick={() => setDrawerFiltros(!drawerFiltros)}
      >
        <FilterList />
      </Fab>

      <Drawer
        anchor="right"
        open={drawerFiltros}
        onClose={() => {
          setFiltros({ numero_processo: "" });
          setDrawerFiltros(false)
        }}
      >
        <div style={{ width: 400, padding: 20, backgroundColor: 'white', color: '#000', height: '100%', position: 'relative' }}>
          <br /><br /><br /><Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" style={{ color: '#1976D2' }}>
              Filtrar <a style={{ marginLeft: 10 }} href='' onClick={(e) => limparFiltros(e)}>Limpar Filtros</a>
            </Typography>
            <IconButton onClick={() => setDrawerFiltros(false)} style={{ color: '#1976D2' }}>
              <Close />
            </IconButton>
          </Box>
          <Grid container spacing={2} style={{ marginTop: 20 }}>

            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth sx={{ ml: 1, mt: 1, borderRadius: "10px", marginLeft: "-1px" }}>
                <InputLabel id="estado-label">Estado</InputLabel>
                <Select
                  labelId="estado-label"
                  id="estado"
                  label="Estado"
                  value={filtros.estado}
                  onChange={(e) => {
                    setFiltros({ ...filtros, estado: e.target.value });
                  }}
                >
                  <MenuItem value="">
                    <em>Nenhum</em>
                  </MenuItem>
                  <MenuItem value="AC">AC</MenuItem>
                  <MenuItem value="AL">AL</MenuItem>
                  <MenuItem value="AP">AP</MenuItem>
                  <MenuItem value="AM">AM</MenuItem>
                  <MenuItem value="BA">BA</MenuItem>
                  <MenuItem value="CE">CE</MenuItem>
                  <MenuItem value="DF">DF</MenuItem>
                  <MenuItem value="ES">ES</MenuItem>
                  <MenuItem value="GO">GO</MenuItem>
                  <MenuItem value="MA">MA</MenuItem>
                  <MenuItem value="MT">MT</MenuItem>
                  <MenuItem value="MS">MS</MenuItem>
                  <MenuItem value="MG">MG</MenuItem>
                  <MenuItem value="PA">PA</MenuItem>
                  <MenuItem value="PB">PB</MenuItem>
                  <MenuItem value="PR">PR</MenuItem>
                  <MenuItem value="PE">PE</MenuItem>
                  <MenuItem value="PI">PI</MenuItem>
                  <MenuItem value="RJ">RJ</MenuItem>
                  <MenuItem value="RN">RN</MenuItem>
                  <MenuItem value="RS">RS</MenuItem>
                  <MenuItem value="RO">RO</MenuItem>
                  <MenuItem value="RR">RR</MenuItem>
                  <MenuItem value="SC">SC</MenuItem>
                  <MenuItem value="SP">SP</MenuItem>
                  <MenuItem value="SE">SE</MenuItem>
                  <MenuItem value="TO">TO</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth sx={{ ml: 1, mt: 1, borderRadius: "10px", marginLeft: "-1px" }}>
                <InputLabel id="categoria-label">Categoria</InputLabel>
                <Select
                  labelId="categoria-label"
                  id="categoria"
                  label="Categoria"
                  value={filtros.categoria}
                  onChange={(e) => {
                    setFiltros({ ...filtros, categoria: e.target.value });
                  }}
                >
                  <MenuItem value="">
                    <em>Nenhum</em>
                  </MenuItem>
                  <MenuItem value="compras_online">Compras Online</MenuItem>
                  <MenuItem value="previdenciario">Previdenciário</MenuItem>
                  <MenuItem value="trabalhista">Trabalhista</MenuItem>
                  <MenuItem value="criminal">Criminal</MenuItem>
                  <MenuItem value="atraso_de_voos">Atraso de Voos</MenuItem>
                  <MenuItem value="juros_abusivos">Juros abusivos</MenuItem>
                  <MenuItem value="pensao">Pensão</MenuItem>
                  <MenuItem value="plano_de_saude">Plano de Saúde</MenuItem>
                  <MenuItem value="consumo">Consumo</MenuItem>
                  <MenuItem value="outros">Outros</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} style={{ paddingTop: 17, paddingBottom: 17 }}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                style={{ height: "100%", marginTop: 5 }}
                startIcon={<Search style={{ fontSize: 25 }} />}
                onClick={() => filtrar()}
              >BUSCAR</Button>
            </Grid>


          </Grid>
        </div>
      </Drawer>
    </Box>

  );
}
