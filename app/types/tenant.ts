export interface Tenant {
  id: string;
  nome: string;
  cnpj: string;
  cpf: string;
  razao_social?: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  dados_ourtorgado_procuracao_rmc: string;
  dados_contratado_contrato_honorarios_rmc: string;

  danos_morais_rmc?: number;
  percentual_exito_rmc?: number;
  parcela_fixa_rmc?: string;
  indice_correcao_monetaria_rmc?: string;
  juros_de_mora_calculo_rmc?: number;

  percentual_exito_bpc?: number;
  parcela_fixa_bpc?: string;

  percentual_exito_fraude_em_boletos?: number;
  parcela_fixa_fraude_em_boletos?: string;

  termo_uso_sistema: boolean

  quantidade_usuarios_agenda?: number;
}
