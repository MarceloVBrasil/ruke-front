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
import { filterByNameClient } from "@/domain/RukeFlex";
import { useRouter } from "next/navigation";
import Face5Icon from "@mui/icons-material/Face5";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { handleAddTicket, handleSubmit } from "./helpers/Swal";
import DocumentosModal from "./components/DocumentosModal";
import GridTextField from "../../components/GridTextField";
import SmallScreen from "./components/SmallScreen";
import BigScreen from "./components/BigScreen";
import Loading from "@/app/(main)/loading";

type RukeFlexProps = {
  listRukeFlexTickets: any[];
  regraDominio: any;
};

export default function RukeFlexPage({
  listRukeFlexTickets,
  regraDominio,
}: RukeFlexProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setLoading] = useState(false);
  const [isUniquePageLoading, setIsUniquePageLoading] = useState(false);
  const [ticketsView, setTicketsView] = useState<any[] | []>(
    listRukeFlexTickets
  );
  const [tickets] = useState<any[] | []>(listRukeFlexTickets.reverse());
  const [nameClient, setNameClient] = useState("");

  // pagination
  const [page, setPage] = useState(1)
  const [filteredTickets, setFilteredTickets] = useState<any[]>(tickets)
  const MAX_NUMBER_ITEMS_PER_PAGE = 10
  const NUMBER_OF_PAGES = useMemo(() => Math.ceil(filteredTickets.length / MAX_NUMBER_ITEMS_PER_PAGE) || 1, [ticketsView, filteredTickets])

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
  }

  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  const onAddTicket = (ticket_id: string) => {
    router.push(`/rukeflex/${ticket_id}`);
  }

  useEffect(() => {
    const newFilteredTickets = filterByNameClient(tickets, nameClient);
    setTicketsView(newFilteredTickets);
  }, [nameClient, tickets]);

  const [formData] = useState<FormData>(new FormData());

  if (isUniquePageLoading) return <Loading />

  return (
    <Box sx={{ padding: "30px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexDirection: { xs: 'column', xl: 'row' }
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "600",
            width: { xs: '100%', xl: '300px' },
            paddingBottom: "10px",
            marginBottom: "30px",
            color: "#00479D",
            borderBottom: "3px solid #006BED",
          }}
        >
          Documentos gerados
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row', gap: 10 } }}>
          <Button
            sx={{
              backgroundColor: "#006BED",
              color: "white",
              height: "40px",
              width: { xs: '100%', md: '300px' },
              marginRight: "10px",
              "&:hover": { backgroundColor: "#00479d" },
            }}
            onClick={() => {
              handleOpen();
            }}
          >
            <Face5Icon sx={{ mr: "2px" }} />
            CRIAR DOCUMENTOS PF COM IA
          </Button>

          <Button
            sx={{
              backgroundColor: "#006BED",
              color: "white",
              height: "40px",
              width: { xs: '100%', md: '300px' },
              marginRight: "10px",
              "&:hover": { backgroundColor: "#00479d" },
            }}
            onClick={() => {
              handleAddTicket(setLoading, onAddTicket, "pf");
            }}
          >
            <EditNoteIcon sx={{ mr: "2px" }} />
            CRIAR DOCUMENTOS PF SEM IA
          </Button>

          <Button
            sx={{
              backgroundColor: "#006BED",
              color: "white",
              height: "40px",
              width: { xs: '100%', md: '300px' },
              marginRight: "10px",
              "&:hover": { backgroundColor: "#00479d" },
            }}
            onClick={() => {
              handleAddTicket(setIsUniquePageLoading, onAddTicket, "pj");
            }}
          >
            <EditNoteIcon sx={{ mr: "2px" }} />
            CRIAR DOCUMENTOS PJ
          </Button>
        </Box>
      </Box>
      <DocumentosModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        handleSubmit={(e) => handleSubmit(e, "pf", setLoading, formData, onAddTicket)}
        formData={formData}
        open={open}
        isLoading={isLoading}

      />
      <Box>
        <Grid container spacing={2}>
          <GridTextField
            xs={12} md={6}
            fullWidth
            label="Nome do cliente"
            type="text"
            value={nameClient}
            onChange={(e) => setNameClient(e.target.value)}
            variant="outlined"
            name={""}
          />
        </Grid>
      </Box>
      {
        isSmallScreen ?
          <Grid container spacing={2} sx={{ py: 4, ml: 1, mt: 0, display: 'flex', flexDirection: 'column' }}>
            {ticketsView && ticketsView.length > 0 && (
              ticketsView.map((ticket: any) => (
                <SmallScreen
                  key={ticket.id}
                  ticket={ticket}
                  setLoading={setIsUniquePageLoading}
                />
              ))
            )}
            <Pagination page={page} onChange={handlePageChange} sx={{ alignSelf: 'center', mt: 5 }} count={NUMBER_OF_PAGES} />
          </Grid>
          : <Grid container spacing={2} sx={{ boxShadow: 2, overflow: 'hidden', py: 4, ml: 1, mt: 0, display: 'flex', flexDirection: 'column' }}>
            <Grid item xs={12} container spacing={2} sx={{ padding: "10px", borderBottom: '1px solid #ddd' }}>
              <Grid item xs={12} sm={4} sx={{ fontWeight: "bold", color: 'black' }}>
                Nome do Cliente
              </Grid>
              <Grid item xs={12} sm={4} sx={{ fontWeight: "bold", color: 'black' }}>
                Documentos Gerados
              </Grid>
              <Grid item xs={12} sm={4} sx={{ fontWeight: "bold", textAlign: "center", color: 'black' }}>
                Ações
              </Grid>
            </Grid>

            {ticketsView && ticketsView.length > 0 && (
              ticketsView.map((ticket: any) => (
                <BigScreen
                  key={ticket.id}
                  ticket={ticket}
                  setLoading={setIsUniquePageLoading}
                />
              ))
            )}
            <Pagination page={page} onChange={handlePageChange} sx={{ alignSelf: 'center', mt: 5 }} count={NUMBER_OF_PAGES} />
          </Grid>
      }
    </Box>
  );
}
