"use client";

import React, { forwardRef, useMemo, useState } from "react";
import Swal from "sweetalert2";
import {
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Fab,
  Pagination,
} from "@mui/material";
import { Close, Create, Done, FilterList, FormatListNumbered, Search } from "@mui/icons-material";
import { convertISOForBR } from "../AgendaPage/AgendaPage";
import { format, parse, parseISO } from "date-fns";
import { ptBR } from 'date-fns/locale';
import {
  filtrarProcessosAPI,
  getMovimentacoes,
  getProcessos,
  salvarProcessoAPI
} from "@/app/api/server/processo";
import { useMediaQuery } from "@mui/system";
import 'react-datepicker/dist/react-datepicker.css';
import { getEndpointByProcessNumber, limparNumeroProcesso } from "../../components/Tribunais";
import SmallScreen from "./components/SmallScreen";
import BigScreen, { BigScreenHeader } from "./components/BigScreen";
import DrawerMovimentacoesProcesso from "./components/DrawerMovimentacoesProcesso";
import DrawerDadosProcesso from "./components/DrawerDadosProcesso";
import DrawerFiltros from "./components/DrawerFiltros";
import { procurarProcesso } from "@/app/api/client/processo";

type ProcessosProps = {
  list: any[];
};

export const CustomInput = forwardRef((props: any, ref: any) => (
  <TextField {...props} inputRef={ref} InputLabelProps={{ shrink: true }} style={{ width: '100% !important' }} fullWidth={true} />
));

CustomInput.displayName = 'CustomInputTextField'

export default function FraudeBoletosPage({
  list
}: ProcessosProps) {
  const [processos, setProcessos] = useState<any[] | []>(list);
  const [filtros, setFiltros] = useState<any>({});
  const [movimentacoes, setMovimentacoes] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dadosProcesso, setDadosProcesso] = useState<any>({});
  const [drawerDadosProcesso, setDrawerDadosProcesso] = useState<boolean>(false);
  const [drawerFiltros, setDrawerFiltros] = useState<boolean>(false);

  // pagination
  const [page, setPage] = useState(1)
  const [filteredTickets, setFilteredTickets] = useState<any[]>(processos)
  const MAX_NUMBER_ITEMS_PER_PAGE = 10
  const NUMBER_OF_PAGES = useMemo(() => Math.ceil(filteredTickets.length / MAX_NUMBER_ITEMS_PER_PAGE) || 1, [filteredTickets])

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
  }

  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  function converterDataParaBrasileiro(dataISO: string): string {
    try {
      // Converte a string ISO para um objeto Date
      const dataDate = parseISO(dataISO);

      // Verifica se a data é válida
      if (isNaN(dataDate.getTime())) {
        throw new Error('Data inválida');
      }

      // Formata a data no formato brasileiro
      return format(dataDate, 'dd/MM/yyyy HH:mm:ss');
    } catch (error) {
      console.error('Erro ao converter a data:', error);
      return 'Sem registro';
    }
  }

  const handleMovimentacoes = async (id_processo: string) => {
    setDrawerOpen(true);

    const processo = await getMovimentacoes(id_processo);
    setMovimentacoes(processo.movimentacoes);
  }

  const handleDadosProcesso = async (processo: any) => {
    setDrawerDadosProcesso(true);
    setDadosProcesso({ orgao_julgador: processo.orgao_julgador, numero_processo: processo.numero_processo, data_ajuizamento: processo.data_ajuizamento, classe: processo.classe, cliente_principal: processo.cliente_principal, contrario_principal: processo.contrario_principal });
  }

  const limparFiltros = async (e: any) => {
    e.preventDefault();

    setProcessos(await getProcessos());
    setFiltros({ orgao_julgador: "", numero_processo: "", data_ajuizamento: "", classe: "", cliente_principal: "", contrario_principal: "" })
  }

  const pesquisarProcesso = async () => {
    try {
      const url = getEndpointByProcessNumber(dadosProcesso.numero_processo);
      const dadosProcessoAPI = await procurarProcesso(url, limparNumeroProcesso(dadosProcesso.numero_processo));

      if (dadosProcessoAPI.hits.hits[0]._source) {
        setDadosProcesso({ ...dadosProcesso, orgao_julgador: dadosProcessoAPI.hits.hits[0]._source.orgaoJulgador.nome, data_ajuizamento: parse(convertISOForBR(dadosProcessoAPI.hits.hits[0]._source.dataAjuizamento), "dd/MM/yyyy HH:mm:ss", new Date(), { locale: ptBR }), classe: dadosProcessoAPI.hits.hits[0]._source.classe.nome ? dadosProcessoAPI.hits.hits[0]._source.classe.nome : "" });
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const salvarProcesso = async () => {
    try {
      await salvarProcessoAPI(dadosProcesso);
      const recarregarProcessos = await getProcessos();

      setProcessos(recarregarProcessos);

      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Processo salvo com sucesso!",
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: err.response.data.error,
      });
    }
  }

  const filtrar = async () => {
    const resultadosFiltro = await filtrarProcessosAPI(filtros);
    setProcessos(resultadosFiltro);
  }

  return (
    <Box sx={{ padding: "30px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: 'column', md: 'row' },
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
            width: { xs: '100%', md: '200px' },
            paddingBottom: "10px",
            marginBottom: "30px",
            color: "#00479D",
            borderBottom: "3px solid #006BED",
          }}
        >
          PROCESSOS
        </Typography>
        <Button
          sx={{
            backgroundColor: "#006BED",
            color: "white",
            height: "40px",
            width: { xs: '100%', md: '250px' },
            marginRight: "10px",
            marginTop: "-15px",
            "&:hover": { backgroundColor: "#00479d" },
          }}
          style={{ fontWeight: "bold" }}
          onClick={() => {
            setDrawerDadosProcesso(true)
          }}
        >
          <Create sx={{ mr: "2px" }} />
          Adicionar processo
        </Button>
      </Box>

      {
        isSmallScreen ?
          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>

            {processos && processos.length > 0 && (
              processos.map((processo: any, index) => (
                <SmallScreen
                  key={index}
                  processo={processo}
                  handleDadosProcesso={handleDadosProcesso}
                  handleMovimentacoes={handleMovimentacoes}
                />
              ))
            )}
            < Pagination page={page} onChange={handlePageChange} sx={{ alignSelf: 'center', mt: 5 }} count={NUMBER_OF_PAGES} />
          </Grid>

          :


          <Grid container spacing={2} sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden', py: 4, mr: 'auto', mt: 0, display: 'flex', flexDirection: 'column' }}>
            <BigScreenHeader />

            {processos && processos.length > 0 && (
              processos.map((processo: any, index) => (
                <BigScreen
                  key={index}
                  processo={processo}
                  handleDadosProcesso={handleDadosProcesso}
                  handleMovimentacoes={handleMovimentacoes}
                  converterDataParaBrasileiro={converterDataParaBrasileiro}
                />
              ))
            )}
            < Pagination page={page} onChange={handlePageChange} sx={{ alignSelf: 'center', mt: 5 }} count={NUMBER_OF_PAGES} />
          </Grid>
      }

      <DrawerMovimentacoesProcesso
        open={drawerOpen}
        setOpen={setDrawerOpen}
        movimentacoes={movimentacoes}
        setMovimentacoes={setMovimentacoes}
      />

      <DrawerDadosProcesso
        open={drawerDadosProcesso}
        setOpen={setDrawerDadosProcesso}
        pesquisarProcesso={pesquisarProcesso}
        dadosProcesso={dadosProcesso}
        setDadosProcesso={setDadosProcesso}
        salvarProcesso={salvarProcesso}
      />

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

      <DrawerFiltros
        open={drawerFiltros}
        setOpen={setDrawerFiltros}
        filtros={filtros}
        setFiltros={setFiltros}
        filtrar={filtrar}
        limparFiltros={limparFiltros}
      />
    </Box>

  );
}
