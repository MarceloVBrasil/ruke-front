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
import { deleteTicket } from "@/app/api/client/tickets";
import { filterByNameClient } from "@/domain/TicketPage";
import { useRouter } from "next/navigation";
import Face5Icon from "@mui/icons-material/Face5";
import EditNoteIcon from "@mui/icons-material/EditNote";
import GridTextField from "../../components/GridTextField";
import { handleAddTicket, handleSubmit } from "./helpers/Swal";
import DocumentosModal from "./components/DocumentosModal";
import SmallScreen from "./components/SmallScreen";
import BigScreen, { BigScreenHeader } from "./components/BigScreen";
import Loading from "@/app/(main)/loading";

interface Ticket {
  id: string;
  contact_name: string;
  tag: string;
  analysis_result: string;
}

type TicketProps = {
  listTickets: Ticket[];
  regraDominio: any;
};

export default function TicketsPage({
  listTickets,
  regraDominio,
}: TicketProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setLoading] = useState(false);
  const [isUniquePageLoading, setIsUniquePageLoading] = useState(false);
  const [ticketsView, setTicketsView] = useState<any[] | []>(listTickets);
  const [tickets] = useState<Ticket[] | []>(listTickets);
  const [nameClient, setNameClient] = useState("");

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
    router.push(`/tickets/${ticket_id}`);
  }

  useEffect(() => {
    const newFilteredTickets = filterByNameClient(ticketsView, nameClient);
    setFilteredTickets(newFilteredTickets);
  }, [nameClient, tickets, ticketsView]);


  const [formData] = useState<FormData>(new FormData());

  const onTicketDelete = async (id: string) => {
    await deleteTicket(id)
    setTicketsView(tickets.filter((item) => item.id !== id));
  }

  if (isUniquePageLoading) return <Loading />

  return (
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: "space-between",
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
          Tickets
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row', gap: 10 } }}>
          {regraDominio?.permissoes?.includes("create") && (
            <Button
              sx={{
                backgroundColor: "#006BED",
                color: "white",
                height: "40px",
                width: { xs: '100%', md: '250px' },
                marginRight: "10px",
                "&:hover": { backgroundColor: "#00479d" },
              }}
              onClick={() => {
                handleOpen();
              }}
            >
              <Face5Icon sx={{ mr: "2px" }} />
              CADASTRAR COM IA
            </Button>
          )}
          <Button
            sx={{
              backgroundColor: "#006BED",
              color: "white",
              height: "40px",
              width: { xs: '100%', md: '250px' },
              "&:hover": { backgroundColor: "#00479d" },
            }}
            onClick={() => {
              handleAddTicket(setIsUniquePageLoading, onAddTicket);
            }}
          >
            <EditNoteIcon sx={{ mr: "2px" }} />
            CADASTRAR SEM IA
          </Button>
        </Box>
      </Box>

      {regraDominio?.permissoes?.includes("create") && (
        <DocumentosModal
          handleClose={handleClose}
          handleOpen={handleOpen}
          handleSubmit={(e) => handleSubmit(e, setLoading, formData, onAddTicket)}
          isLoading={isLoading}
          open={open}
          formData={formData}
        />
      )}
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
            placeholder="Nome do Cliente"
            style={{ marginLeft: '10px' }}
          />
        </Grid>
      </Box>

      {
        isSmallScreen ?
          (
            <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
              {filteredTickets && filteredTickets.length > 0 && (
                filteredTickets.slice((page - 1) * MAX_NUMBER_ITEMS_PER_PAGE, page * MAX_NUMBER_ITEMS_PER_PAGE).map((ticket) => (
                  <SmallScreen
                    key={ticket.id}
                    ticket={ticket}
                    regraDominio={regraDominio}
                    onTicketDelete={onTicketDelete}
                    setLoading={setIsUniquePageLoading}
                  />
                ))
              )}
              <Pagination page={page} onChange={handlePageChange} sx={{ mx: 'auto', mt: 5 }} count={NUMBER_OF_PAGES} />
            </Grid>
          )
          :
          (
            <Box sx={{ pl: 2, ml: 2, mt: 4, width: '100%' }}>
              <Grid container spacing={2} sx={{ boxShadow: 2, overflow: 'hidden', py: 4 }}>
                {/* Header Row */}
                <BigScreenHeader />
                {filteredTickets && filteredTickets.length > 0 ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                    {
                      filteredTickets.slice((page - 1) * MAX_NUMBER_ITEMS_PER_PAGE, page * MAX_NUMBER_ITEMS_PER_PAGE).map((ticket) => (
                        <BigScreen
                          key={ticket.id}
                          ticket={ticket}
                          regraDominio={regraDominio}
                          onTicketDelete={onTicketDelete}
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
    </Box>
  );
}
