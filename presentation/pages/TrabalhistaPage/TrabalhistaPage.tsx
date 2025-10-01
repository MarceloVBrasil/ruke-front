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
import { useRouter } from "next/navigation";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { deleteTrabalhistaTicket } from "@/app/api/server/trabalhista";
import GridTextField from "../../components/GridTextField";
import { handleSubmit, handleAddTicket } from "./helpers/Swal";
import SmallScreen from "./components/SmallScreen";
import BigScreen, { BigScreenHeader } from "./components/BigScreen";
import DocumentosModal from "./components/DocumentosModal";
import Loading from "@/app/(main)/loading";

interface Trabalhista {
    id: string;
    nome_cliente: string;
    tag: string;
    analysis_result: string;
}

type TrabalhistaProps = {
    listTickets: Trabalhista[];
    regraDominio: any;
};

export default function TrabalhistaPage({
    listTickets,
    regraDominio,
}: TrabalhistaProps) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isLoading, setLoading] = useState(false);
    const [isUniquePageLoading, setIsUniquePageLoading] = useState(false);
    const [ticketsView, setTicketsView] = useState<any[] | []>(listTickets);
    const [tickets] = useState<Trabalhista[] | []>(listTickets);
    const [nameClient, setNameClient] = useState("");

    // pagination
    const [page, setPage] = useState(1)
    const [filteredTickets, setFilteredTickets] = useState<any[]>(tickets)
    const MAX_NUMBER_ITEMS_PER_PAGE = 10
    const NUMBER_OF_PAGES = useMemo(() => Math.ceil(filteredTickets.length / MAX_NUMBER_ITEMS_PER_PAGE) || 1, [ticketsView, filteredTickets])

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage)
    }

    const onAddTicket = (ticket_id: string) => {
        router.push(`/trabalhista/${ticket_id}?step=1`);
    }

    useEffect(() => {
        setFilteredTickets(ticketsView.filter((ticket: any) => ticket.nome_reclamante?.toLowerCase().includes(nameClient.toLowerCase())))
    }, [nameClient, tickets, ticketsView]);

    const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

    const [formData] = useState<FormData>(new FormData());

    async function onTicketDelete(id: string): Promise<void> {
        await deleteTrabalhistaTicket(id)
        setTicketsView(tickets.filter((item) => item.id !== id));
    }

    if (isUniquePageLoading) return <Loading />


    return (
        <Box sx={{ padding: "20px" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                    flexDirection: { xs: 'column', md: 'row' }
                }}
            >
                <Typography
                    sx={{
                        width: { xs: '100%', sm: 'auto' },
                        fontSize: "30px",
                        fontWeight: "600",
                        paddingBottom: "10px",
                        marginBottom: "30px",
                        color: "#00479D",
                        borderBottom: "3px solid #006BED",
                    }}
                >
                    Ações Trabalhistas
                </Typography>
                <Box>
                    {regraDominio?.permissoes?.includes("create") && (
                        <Button
                            sx={{
                                backgroundColor: "#006BED",
                                color: "white",
                                height: "40px",
                                width: { xs: '100%', md: "250px" },
                                marginBottom: 1,
                                marginRight: "10px",
                                "&:hover": { backgroundColor: "#00479d" },
                            }}
                            onClick={() => {
                                handleOpen();
                            }}
                        >
                            <EditNoteIcon sx={{ mr: "2px" }} />
                            CADASTRAR COM IA
                        </Button>
                    )}
                    <Button
                        sx={{
                            backgroundColor: "#006BED",
                            color: "white",
                            height: "40px",
                            width: { xs: '100%', md: "250px" },
                            marginBottom: 1,
                            "&:hover": { backgroundColor: "#00479d" },
                        }}
                        onClick={() => {
                            handleAddTicket(setIsUniquePageLoading, onAddTicket);
                        }}
                    >
                        <EditNoteIcon sx={{ mr: "2px" }} />
                        CADASTRAR
                    </Button>
                </Box>
            </Box>

            {regraDominio?.permissoes?.includes("create") && (
                <DocumentosModal
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                    handleSubmit={(e) => handleSubmit(e, setLoading, formData, onAddTicket)}
                    formData={formData}
                    open={open}
                    isLoading={isLoading}
                />
            )}
            <Box>
                <Grid container spacing={2} sx={{ mb: { xs: 0, md: 5 } }}>
                    <GridTextField
                        xs={12} md={6}
                        fullWidth
                        label="Nome do cliente"
                        type="text"
                        value={nameClient}
                        onChange={(e) => setNameClient(e.target.value)} name={""}
                        variant={"outlined"}
                        placeholder="Nome do Cliente"
                    />
                </Grid>
            </Box>

            {isSmallScreen ? (
                <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                    {filteredTickets.slice((page - 1) * MAX_NUMBER_ITEMS_PER_PAGE, page * MAX_NUMBER_ITEMS_PER_PAGE).map((ticket) => (
                        <SmallScreen
                            key={ticket.id}
                            ticket={ticket}
                            regraDominio={regraDominio}
                            onTicketDelete={onTicketDelete}
                            setLoading={setIsUniquePageLoading}
                        />
                    ))}
                    <Pagination page={page} onChange={handlePageChange} sx={{ alignSelf: 'center', my: 5 }} count={NUMBER_OF_PAGES} />
                </Grid>
            ) : (
                <Box sx={{ px: 2 }}>
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

            )}

        </Box>
    );
}
