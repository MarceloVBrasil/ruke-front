"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Grid,
  useMediaQuery,
  Pagination,
} from "@mui/material";
import {
  deleteFraudeBoletos,
} from "@/app/api/client/fraudeboleto";
import { filterByNameClient } from "@/domain/RukeFlex";
import { useRouter } from "next/navigation";
import Face5Icon from "@mui/icons-material/Face5"
import EditNoteIcon from "@mui/icons-material/EditNote";
import GridTextField from "../../components/GridTextField";
import { handleAddTicket, handleDelete, handleSubmit } from "./helpers/Swal";
import DocumentosModal from "./components/DocumentosModal";
import SmallScreen from "./components/SmallScreen";
import BigScreen, { BigScreenHeader } from "./components/BigScreen";
import Loading from "@/app/(main)/loading";

type FraudeBoletosProps = {
  listFraudeBoletosTickets: any[];
  regraDominio: any;
};

export default function ProcessosPage({
  listFraudeBoletosTickets,
  regraDominio,
}: FraudeBoletosProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [openPJ, setOpenPJ] = React.useState(false);
  const handleOpenPJ = () => setOpenPJ(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClosePJ = () => setOpenPJ(false)
  const [isLoading, setLoading] = useState(false);
  const [isUniquePageLoading, setIsUniquePageLoading] = useState(false);
  const [ticketsView, setTicketsView] = useState<any[] | []>(listFraudeBoletosTickets);
  const [tickets] = useState<any[] | []>(listFraudeBoletosTickets);
  const [nameClient, setNameClient] = useState("");
  const [statusText, setStatusText] = useState("Enviando documentos...");

  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  // pagination
  const [page, setPage] = useState(1)
  const [filteredTickets, setFilteredTickets] = useState<any[]>(tickets)
  const MAX_NUMBER_ITEMS_PER_PAGE = 10
  const NUMBER_OF_PAGES = useMemo(() => Math.ceil(filteredTickets.length / MAX_NUMBER_ITEMS_PER_PAGE) || 1, [ticketsView, filteredTickets])

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
  }

  const onAddTicket = (ticket_id: string) => {
    router.push(`/fraude-boleto/${ticket_id}`);
  }

  useEffect(() => {
    // Timer para mudar o texto após 3 segundos
    const timer1 = setTimeout(() => {
      setStatusText("Lendo documentos...");
    }, 3000); // 3000ms = 3 segundos

    // Timer para mudar o texto após mais 2 segundos (total 5 segundos)
    const timer2 = setTimeout(() => {
      setStatusText("Relaxe enquanto a IA da Ruke faz o trabalho pesado");
    }, 5000); // 5000ms = 5 segundos após o início

    // Limpeza dos timers ao desmontar o componente
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    const newFilteredTickets = filterByNameClient(ticketsView, nameClient);
    setFilteredTickets(newFilteredTickets);
  }, [nameClient, tickets, ticketsView]);

  const [formData] = useState<FormData>(new FormData());

  const onTicketDelete = async (id: string) => {
    await deleteFraudeBoletos(id)
    setTicketsView(tickets.filter((item) => item.id !== id));
  }

  if (isUniquePageLoading) return <Loading />

  return (
    <Grid container spacing={1} rowSpacing={3} sx={{ py: 2, px: 2 }}>
      <Grid item xs={12}>
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "600",
            paddingBottom: "10px",
            marginBottom: "30px",
            color: "#00479D",
            borderBottom: "3px solid #006BED",
            textWrap: 'wrap',
          }}
        >
          AÇÕES DE FRAUDE EM BOLETOS
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Button
          sx={{
            backgroundColor: "#006BED",
            color: "white",
            height: "40px",
            width: "100%",
            marginRight: "10px",
            marginTop: "-15px",
            textWrap: 'nowrap',
            "&:hover": { backgroundColor: "#00479d" },
          }}
          style={{ fontWeight: "bold" }}
          onClick={() => {
            handleOpen();
          }}
        >
          <Face5Icon sx={{ mr: "2px" }} />
          CRIAR DOCUMENTOS PF COM IA
        </Button>
      </Grid>


      <Grid item xs={12} sm={6} md={4}>
        <Button
          sx={{
            backgroundColor: "#006BED",
            color: "white",
            height: "40px",
            width: "100%",
            marginRight: "10px",
            marginTop: "-15px",
            textWrap: 'nowrap',
            "&:hover": { backgroundColor: "#00479d" },
          }}
          style={{ fontWeight: "bold" }}
          onClick={() => {
            handleOpenPJ();
          }}
        >
          <Face5Icon sx={{ mr: "2px" }} />
          CRIAR DOCUMENTOS PJ COM IA
        </Button>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Button
          sx={{
            backgroundColor: "#006BED",
            color: "white",
            height: "40px",
            width: "100%",
            marginRight: "10px",
            marginTop: "-15px",
            textWrap: 'nowrap',
            "&:hover": { backgroundColor: "#00479d" },
          }}
          style={{ fontWeight: "bold" }}
          onClick={() => {
            handleAddTicket("pf", setLoading, onAddTicket);
          }}
        >
          <EditNoteIcon sx={{ mr: "2px" }} />
          CRIAR DOCUMENTOS PF SEM IA
        </Button>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Button
          sx={{
            backgroundColor: "#006BED",
            color: "white",
            height: "40px",
            width: "100%",
            textWrap: 'nowrap',
            marginTop: "-15px",
            "&:hover": { backgroundColor: "#00479d" },
          }}
          style={{ fontWeight: "bold" }}
          onClick={() => {
            handleAddTicket("pj", setIsUniquePageLoading, onAddTicket);
          }}
        >
          <EditNoteIcon sx={{ mr: "2px" }} />
          CRIAR DOCUMENTOS PJ SEM IA
        </Button>
      </Grid>

      <DocumentosModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        handleSubmit={(e) => handleSubmit(e, "pf", setLoading, formData, onAddTicket)}
        formData={formData}
        open={open}
        isLoading={isLoading}
        statusText={statusText}

      />

      <DocumentosModal
        handleClose={handleClosePJ}
        handleOpen={handleOpen}
        handleSubmit={(e) => handleSubmit(e, "pj", setLoading, formData, onAddTicket)}
        formData={formData}
        open={openPJ}
        isLoading={isLoading}
        statusText={statusText}

      />

      {/* Grid para acertar o layout */}
      <Grid item xs={8} />

      <Grid item xs={12} md={6}>
        <GridTextField
          xs={12}
          placeholder="Nome do Cliente"
          fullWidth
          label="Nome do cliente"
          type="text"
          value={nameClient}
          onChange={(e) => setNameClient(e.target.value)}
          variant="outlined"
          name={""}
          style={{ marginLeft: '10px' }}
        />
      </Grid>
      {
        isSmallScreen ? (
          <Grid container spacing={2} sx={{ mt: 0 }}>
            {filteredTickets.slice((page - 1) * MAX_NUMBER_ITEMS_PER_PAGE, page * MAX_NUMBER_ITEMS_PER_PAGE).map((ticket) => (
              <SmallScreen
                key={ticket.id}
                ticket={ticket}
                onTicketDelete={onTicketDelete}
                regraDominio={regraDominio}
                setLoading={setIsUniquePageLoading}
              />
            ))}
            <Pagination page={page} onChange={handlePageChange} sx={{ mx: 'auto', mt: 5 }} count={NUMBER_OF_PAGES} />
          </Grid>
        ) : (
          <Box sx={{ pl: 2, ml: 2, mt: 4, width: '100%' }}>
            <Grid container spacing={2} sx={{ boxShadow: 2, overflow: 'hidden', py: 4 }}>
              {/* Header Row */}
              <BigScreenHeader />

              {/* Tickets List */}
              {filteredTickets && filteredTickets.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                  {
                    filteredTickets.slice((page - 1) * MAX_NUMBER_ITEMS_PER_PAGE, page * MAX_NUMBER_ITEMS_PER_PAGE).map((ticket) => (
                      <BigScreen
                        key={ticket.id}
                        ticket={ticket}
                        onTicketDelete={onTicketDelete}
                        regraDominio={regraDominio}
                        setLoading={setIsUniquePageLoading}
                      />
                    ))
                  }
                  <Pagination page={page} onChange={handlePageChange} sx={{ alignSelf: 'center', mt: 5 }} count={NUMBER_OF_PAGES} />
                </Box>
              ) : (
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography color='black' variant="body1" sx={{ textAlign: "center", padding: "20px" }}>
                    Nenhum ticket encontrado.
                  </Typography>
                  <Pagination count={1} disabled />
                </Grid>
              )}
            </Grid>
          </Box>
        )
      }
    </Grid>
  );
}
