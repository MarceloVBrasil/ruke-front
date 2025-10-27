import { Box, Typography } from "@mui/material";
import Peticao from "@/presentation/pages/TrabalhistaUniquePage/components/Peticao/Peticao";
import Procuracao from "@/presentation/pages/TrabalhistaUniquePage/components/Procuracao/Procuracao";
import ContratoHonorarios from "@/presentation/pages/TrabalhistaUniquePage/components/ContratoHonorarios/ContratoHonorarios";
import DocumentoHipossuficiencia from "@/presentation/pages/TrabalhistaUniquePage/components/DocumentoHipossuficiencia/DocumentoHipossuficiencia";

// ==============================|| SAMPLE PAGE ||============================== //

export type TrabalhistaProps = {
    ticketUnique: any;
    regraDominio: any;
};

const TrabalhistaUniquePage = ({ ticketUnique, regraDominio }: TrabalhistaProps) => {

    return (
        <Box
            sx={{
                maxWidth: "100vw",
                padding: "5px",
                borderRadius: "10px",
                margin: "10px",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    sx={{
                        fontSize: "30px",
                        marginBottom: "30px",
                        color: "#00479D",
                        borderBottom: "3px solid #006BED",
                    }}
                >
                    Informação do Processo Trabalhista
                </Typography>
            </Box>

            <Peticao regraDominio={regraDominio} ticketUnique={ticketUnique} />
            <Procuracao regraDominio={regraDominio} ticketUnique={ticketUnique} />
            <ContratoHonorarios regraDominio={regraDominio} ticketUnique={ticketUnique} />
            <DocumentoHipossuficiencia regraDominio={regraDominio} ticketUnique={ticketUnique} />

        </Box>
    );
};

export default TrabalhistaUniquePage