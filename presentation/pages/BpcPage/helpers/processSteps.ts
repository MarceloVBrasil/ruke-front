export function processSteps(ticket: any) {
    let pontuacao = 0;
    let texto = "";

    if (ticket.peticao_pdf) {
        ++pontuacao;
    } else {
        texto = texto + "Petição não gerada.\n";
    }

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

    if (ticket.hipossuficiencia_pdf) {
        ++pontuacao;
    } else {
        texto = texto + "Hipossuficiência não gerada!\n";
    }

    return { pontuacao, texto };
}