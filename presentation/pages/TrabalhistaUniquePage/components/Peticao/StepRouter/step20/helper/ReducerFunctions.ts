import { AcidenteTrabalho } from "./AcidenteTrabalho/actions";
import { AssedioMoralHorizontal } from "./AssedioMoralHorizontal/actions";
import { AssedioMoralVertical } from "./AssedioMoralVertical/actions";
import { DemaisCampos } from "./DemaisCampos/actions";
import { DispensaArbirtariaEstabilidadeProvisoria } from "./DispensaArbitrariaComEstabilidadeProvisoria/actions";
import { DispensaDiscriminatoriaDoenca } from "./DispensaDiscriminatoriaDoenca/actions";
import { ExcessoHorasExtras } from "./ExcessoHorasExtras/actions";
import { Actions, FormField, FormState, PEDIDO_DANOS_MORAIS } from "./FormTypesAndFields";
import { JustaCausaRevertidaEmJuizo } from "./JustaCausaConvertidaEmJuizo/actions";
import { NaoFornecimentoEpiLaborPerigoso } from "./NaoFornecimentoEPILabelPerigoso/actions";
import { NaoFornecimentoEpiLaborInsalubre } from "./NaoFornecimentoEPILaborInsalubre/actions";
import { NaoPagamentoVerbasRescisorias } from "./NaoPagamentoVerbasRescisorias/actions";
import { PagamentoParceladoVerbasRescisorias } from "./PagamentoParceladoVerbasRescisorias/actions";
import { PagamentoVerbasRescisoriasForaPrazo } from "./PagamentoVerbasRescisoriasForaPrazo/actions";
import { SonegacaoVerbasTrabalhistas } from "./SonegacaoVerbasTrabalhistas/actions";

const justaCausaRevertidaEmJuizo = new JustaCausaRevertidaEmJuizo()
const pagamentoVerbasRescisoriasForaPrazo = new PagamentoVerbasRescisoriasForaPrazo()
const pagamentoParceladoVerbasRescisorias = new PagamentoParceladoVerbasRescisorias()
const naoPagamentoVerbasRescisorias = new NaoPagamentoVerbasRescisorias()
const assedioMoralHorizontal = new AssedioMoralHorizontal()
const assedioMoralVertical = new AssedioMoralVertical()
const dispensaDiscriminatoriaDoenca = new DispensaDiscriminatoriaDoenca()
const sonegacaoVerbasTrabalhistas = new SonegacaoVerbasTrabalhistas()
const dispensaArbitrariaEstabilidadeProvisoria = new DispensaArbirtariaEstabilidadeProvisoria()
const acidenteTrabalho = new AcidenteTrabalho()
const naoFornecimentoEpiLaborInsalubre = new NaoFornecimentoEpiLaborInsalubre()
const naoFornecimentoEpiLaborPerigoso = new NaoFornecimentoEpiLaborPerigoso()
const excessoHorasExtras = new ExcessoHorasExtras()
const demaisCampos = new DemaisCampos()

function formReducer(state: FormState, action: Actions) {
    if (action.field == PEDIDO_DANOS_MORAIS.JUSTA_CAUSA_REVERTIDA_EM_JUIZO) {
        switch (action.type) {
            case 'SET_VALOR_ESTIMADO':
                return justaCausaRevertidaEmJuizo.setValorEstimado(state, action)
        }
    }

    else if (action.field === PEDIDO_DANOS_MORAIS.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO) {
        switch (action.type) {
            case 'SET_VALOR_ESTIMADO':
                return pagamentoVerbasRescisoriasForaPrazo.setValorEstimado(state, action)
        }
    }

    else if (action.field === PEDIDO_DANOS_MORAIS.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS) {
        switch (action.type) {
            case 'SET_VALOR_ESTIMADO':
                return pagamentoParceladoVerbasRescisorias.setValorEstimado(state, action)
        }
    }

    else if (action.field === PEDIDO_DANOS_MORAIS.NAO_PAGAMENTO_VERBAS_RESCISORIAS) {
        switch (action.type) {
            case 'SET_VALOR_ESTIMADO':
                return naoPagamentoVerbasRescisorias.setValorEstimado(state, action)
            case 'SET_DATA_PROJECAO_TERMINO':
                return naoPagamentoVerbasRescisorias.setDataProjecaoTermino(state, action)
        }
    }

    else if (action.field === PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL) {
        switch (action.type) {
            case 'SET_DESCRICAO_ASSEDIO':
                return assedioMoralHorizontal.setDescricaoAssedio(state, action)
            case 'SET_NOME_ASSEDIADOR':
                return assedioMoralHorizontal.setNomeAssediador(state, action)
            case 'SET_VALOR_ESTIMADO':
                return assedioMoralHorizontal.setValorEstimado(state, action)
        }
    }

    else if (action.field === PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL) {
        switch (action.type) {
            case 'SET_DESCRICAO_ASSEDIO':
                return assedioMoralVertical.setDescricaoAssedio(state, action)
            case 'SET_NOME_SUPERIOR_ASSEDIADOR':
                return assedioMoralVertical.setNomeSuperiorAssediador(state, action)
            case 'SET_VALOR_ESTIMADO':
                return assedioMoralVertical.setValorEstimado(state, action)
        }
    }

    else if (action.field === PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA) {
        switch (action.type) {
            case 'SET_DATA_DIAGNOSTICO':
                return dispensaDiscriminatoriaDoenca.setDataDiagnostico(state, action)
            case 'SET_DOENCA_DIAGNOSTICADA_RECLAMANTE':
                return dispensaDiscriminatoriaDoenca.setDoencaReclamante(state, action)
            case 'SET_VALOR_ESTIMADO':
                return dispensaDiscriminatoriaDoenca.setValorEstimado(state, action)
        }
    }

    else if (action.field === PEDIDO_DANOS_MORAIS.SONEGACAO_VERBAS_TRABALHISTAS) {
        switch (action.type) {
            case 'SET_VALOR_ESTIMADO':
                return sonegacaoVerbasTrabalhistas.setValorEstimado(state, action)
            case 'SET_VERBAS_SONEGADAS':
                return sonegacaoVerbasTrabalhistas.setVerbasSonegadas(state, action)
        }
    }

    else if (action.field === PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA) {
        switch (action.type) {
            case 'SET_MOTIVO_ESTABILIDADE':
                return dispensaArbitrariaEstabilidadeProvisoria.setMotivoEstabilidade(state, action)
            case 'SET_VALOR_ESTIMADO':
                return dispensaArbitrariaEstabilidadeProvisoria.setValorEstimado(state, action)
            case 'SET_DATA_PROJECAO_TERMINO':
                return dispensaArbitrariaEstabilidadeProvisoria.setDataProjecaoTermino(state, action)
        }
    }

    else if (action.field === PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO) {
        switch (action.type) {
            case 'SET_DATA_ACIDENTE':
                return acidenteTrabalho.setDataAcidente(state, action)
            case 'SET_DESCRICAO_ACIDENTE':
                return acidenteTrabalho.setDescricaoAcidente(state, action)
            case 'SET_VALOR_ESTIMADO':
                return acidenteTrabalho.setValorEstimado(state, action)
        }
    }

    else if (action.field === PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE) {
        switch (action.type) {
            case 'SET_VALOR_ESTIMADO':
                return naoFornecimentoEpiLaborInsalubre.setValorEstimado(state, action)
        }
    }

    else if (action.field === PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO) {
        switch (action.type) {
            case 'SET_VALOR_ESTIMADO':
                return naoFornecimentoEpiLaborPerigoso.setValorEstimado(state, action)
        }
    }

    else if (action.field === PEDIDO_DANOS_MORAIS.EXCESSO_HORAS_EXTRAS) {
        switch (action.type) {
            case 'SET_VALOR_ESTIMADO':
                return excessoHorasExtras.setValorEstimado(state, action)
        }
    }

    else if (action.field === FormField.PEDIDO_DANOS_MORAIS) {
        switch (action.type) {
            case 'SET_HIPOTESES':
                return demaisCampos.setHipoteses(state, action)
        }
    }

    else {
        return state
    }
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.PEDIDO_DANOS_MORAIS]: { value: api_data[FormField.PEDIDO_DANOS_MORAIS], changed: false }
    }

    return data
}

export { formReducer, getFormStateFromApi }