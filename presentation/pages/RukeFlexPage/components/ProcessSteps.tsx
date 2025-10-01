export function processSteps(ticket: any) {
    let pontuacao = 0;
    let texto = "";

    if (ticket.procuracao_pdf) {
        ++pontuacao;
    } else {
        texto = texto + "Procuração não gerada.\n";
    }

    if (ticket.contrato_pdf) {
        ++pontuacao;
    } else {
        texto = texto + "Contrato não gerado.\n";
    }

    if (ticket.tipo_cliente === "pf") {
        if (ticket.hipossuficiencia_pdf) {
            ++pontuacao;
        } else {
            texto = texto + "Hipossuficiência não gerada!\n";
        }
    }

    return { pontuacao, texto };
}