"use client"


import HorizontalLinearStepper from "@/presentation/components/HorizontalStepper"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { PASSOS } from "./helper/passos"
import { BLOCOS_PEDIDOS_EXISTENTES } from './step5/helper/blocos_pedidos_existentes'
import { FormField as DOS_PEDIDOS_DO_PROCESSO_FORM_FIELD } from "./step5/helper/FormTypesAndFields"
import { FormField as STEP4_FORM_FIELD, DADOS_CONTRATO, VERBAS_RESCISORIAS, ICrossRegrasNegocioDadosContrato } from './step4/helper/FormTypesAndFields';

import Step1 from "./step1/Step1"
import Step2 from "./step2/Step2"
import Step3 from "./step3/Step3"
import Step4 from "./step4/Step4"
import Step5 from "./step5/Step5"
import Step6 from "./step6/Step6"
import Step7 from "./step7/Step7"
import Step8 from "./step8/Step8"
import Step9 from "./step9/Step9"
import Step10 from "./step10/Step10"
import Step11 from "./step11/Step11"
import Step12 from "./step12/Step12"
import Step13 from "./step13/Step13"
import Step14 from "./step14/Step14"
import Step15 from "./step15/Step15"
import Step16 from "./step16/Step16"
import Step17 from "./step17/Step17"
import Step18 from "./step18/Step18"
import Step19 from "./step19/Step19"
import Step20 from "./step20/Step20"
import Step21 from "./step21/Step21"
import Step22 from "./step22/Step22"

import { isStep1FormInvalid, isStep1MarkedAsError } from "./step1/helper/StepValidator"
import { isStep2FormInvalid, isStep2MarkedAsError } from "./step2/helper/StepValidator"
import { isStep3FormInvalid, isStep3MarkedAsError } from "./step3/helper/StepValidator"
import { isStep4FormInvalid, isStep4MarkedAsError } from "./step4/helper/StepValidator"
import { isStep5FormInvalid, isStep5MarkedAsError } from "./step5/helper/StepValidator"
import { isStep6FormInvalid, isStep6MarkedAsError } from "./step6/helper/StepValidator"
import { isStep7FormInvalid, isStep7MarkedAsError } from "./step7/helper/StepValidator"
import { isStep8FormInvalid, isStep8MarkedAsError } from "./step8/helper/StepValidator"
import { isStep9FormInvalid, isStep9MarkedAsError } from "./step9/helper/StepValidator"
import { isStep10FormInvalid, isStep10MarkedAsError } from "./step10/helper/StepValidator"
import { isStep11FormInvalid, isStep11MarkedAsError } from "./step11/helper/StepValidator"
import { isStep12FormInvalid, isStep12MarkedAsError } from "./step12/helper/StepValidator"
import { isStep13FormInvalid, isStep13MarkedAsError } from "./step13/helper/StepValidator"
import { isStep14FormInvalid, isStep14MarkedAsError } from "./step14/helper/Stepvalidator"
import { isStep15FormInvalid, isStep15MarkedAsError } from "./step15/helper/StepValidator"
import { isStep16FormInvalid, isStep16MarkedAsError } from "./step16/helper/StepValidator"
import { isStep17FormInvalid, isStep17MarkedAsError } from "./step17/helper/StepValidator"
import { isStep18FormInvalid, isStep18MarkedAsError } from "./step18/helper/StepValidator"
import { isStep19FormInvalid, isStep19MarkedAsError } from "./step19/helper/StepValidator"
import { isStep20FormInvalid, isStep20MarkedAsError } from "./step20/helper/StepValidator"
import { isStep21FormInvalid, isStep21MarkedAsError } from "./step21/helper/StepValidator"
import { isStep22FormInvalid, isStep22MarkedAsError } from "./step22/helper/StepValidator"




export interface IStepError {
    error: boolean
    show: boolean
}

export interface IStepsError {
    step1: IStepError
    step2: IStepError
    step3: IStepError
    step4: IStepError
    step5: IStepError
    step6: IStepError
    step7: IStepError
    step8: IStepError
    step9: IStepError
    step10: IStepError
    step11: IStepError
    step12: IStepError
    step13: IStepError
    step14: IStepError
    step15: IStepError
    step16: IStepError
    step17: IStepError
    step18: IStepError
    step19: IStepError
    step20: IStepError
    step21: IStepError
    step22: IStepError
}

export interface IStep {
    api_data: any
    stepsError: IStepsError
    setStepsError: Dispatch<SetStateAction<IStepsError>>
}

export interface IPedidos {
    pedidos: string[]
}

export interface IPedidosController {
    setPedidos: Dispatch<SetStateAction<string[]>>
}

export type CrossRegrasNegocioController = Dispatch<SetStateAction<CrossRegrasNegocio>>

export interface ICrossRegrasNegocioController {
    setCrossRegrasNegocio: CrossRegrasNegocioController
}

export type CrossRegrasNegocio = {
    regras_dados_contrato: ICrossRegrasNegocioDadosContrato
}


export default function TrabalhistaStepRouter({ api_data }: { api_data: any }) {
    const [pedidos, setPedidos] = useState<string[]>(getPedidosFromApi(api_data))
    const [stepsError, setStepsError] = useState<IStepsError>(getStepsErrorInitialValue())

    const [crossRegrasNegocio, setCrossRegrasNegocio] = useState<CrossRegrasNegocio>(getCrossRegrasNegocioInitialValue(api_data))

    return (
        <HorizontalLinearStepper
            steps={
                [
                    { children: <Step1 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} />, title: PASSOS.step1.titulo, markAsError: stepsError.step1.error && stepsError.step1.show, completed: !stepsError.step1.error },
                    { children: <Step2 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} />, title: PASSOS.step2.titulo, markAsError: stepsError.step2.error && stepsError.step2.show, completed: !stepsError.step2.error },
                    { children: <Step3 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} />, title: PASSOS.step3.titulo, markAsError: stepsError.step3.error && stepsError.step3.show, completed: !stepsError.step3.error },
                    { children: <Step4 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} setPedidos={setPedidos} setCrossRegrasNegocio={setCrossRegrasNegocio} />, title: PASSOS.step4.titulo, markAsError: stepsError.step4.error && stepsError.step4.show, completed: !stepsError.step4.error },
                    { children: <Step5 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} setPedidos={setPedidos} cross_regras_negocio={crossRegrasNegocio} setCrossRegrasNegocio={setCrossRegrasNegocio} />, title: PASSOS.step5.titulo, markAsError: stepsError.step5.error && stepsError.step5.show, completed: !stepsError.step5.error },
                    { children: <Step6 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step6.titulo, bypass: !pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.RECONHECIMENTO_VINCULO_EMPREGO), markAsError: stepsError.step6.error && stepsError.step6.show, completed: !stepsError.step6.error },
                    { children: <Step7 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step7.titulo, bypass: !pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.ADICIONAL_INSALUBRIDADE), markAsError: stepsError.step7.error && stepsError.step7.show, completed: !stepsError.step7.error },
                    { children: <Step8 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step8.titulo, bypass: !pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.ADICIONAL_PERICULOSIDADE), markAsError: stepsError.step8.error && stepsError.step8.show, completed: !stepsError.step8.error },
                    { children: <Step9 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step9.titulo, bypass: !pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.REVERSAO_JUSTA_CAUSA), markAsError: stepsError.step9.error && stepsError.step9.show, completed: !stepsError.step9.error },
                    { children: <Step10 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step10.titulo, bypass: !pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.DIFERENCAS_SALARIAIS), markAsError: stepsError.step10.error && stepsError.step10.show, completed: !stepsError.step10.error },
                    { children: <Step11 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step11.titulo, bypass: !pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.GORJETAS), markAsError: stepsError.step11.error && stepsError.step11.show, completed: !stepsError.step11.error },
                    { children: <Step12 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step12.titulo, bypass: !pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.RESCISAO_INDIRETA), markAsError: stepsError.step12.error && stepsError.step12.show, completed: !stepsError.step12.error },
                    { children: <Step13 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step13.titulo, bypass: !pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.FERIAS), markAsError: stepsError.step13.error && stepsError.step13.show, completed: !stepsError.step13.error },
                    { children: <Step14 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step14.titulo, bypass: !pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.MULTA_ART_477), markAsError: stepsError.step14.error && stepsError.step14.show, completed: !stepsError.step14.error },
                    { children: <Step15 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step15.titulo, bypass: !pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.GRATUIDADE_JUSTICA), markAsError: stepsError.step15.error && stepsError.step15.show, completed: !stepsError.step15.error },
                    { children: <Step16 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step16.titulo, bypass: !pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.FALTA_DEPOSITO_FGTS), markAsError: stepsError.step16.error && stepsError.step16.show, completed: !stepsError.step16.error },
                    { children: <Step17 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step17.titulo, bypass: !pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.GARANTIA_PROVISORIA), markAsError: stepsError.step17.error && stepsError.step17.show, completed: !stepsError.step17.error },
                    { children: <Step18 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step18.titulo, bypass: !pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.AVISO_PREVIO), markAsError: stepsError.step18.error && stepsError.step18.show, completed: !stepsError.step18.error },
                    { children: <Step19 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step19.titulo, bypass: !pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.JORNADA_TRABALHO), markAsError: stepsError.step19.error && stepsError.step19.show, completed: !stepsError.step19.error },
                    { children: <Step20 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step20.titulo, bypass: !pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.DANOS_MORAIS), markAsError: stepsError.step20.error && stepsError.step20.show, completed: !stepsError.step20.error },
                    { children: <Step21 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step21.titulo, bypass: !pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.INTEGRACAO_SALARIAL_PARCELAS_PAGAS_DINHEIRO), markAsError: stepsError.step21.error && stepsError.step21.show, completed: !stepsError.step21.error },
                    { children: <Step22 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} pedidos={pedidos} />, title: PASSOS.step21.titulo, completed: !stepsError.step21.error },
                ]
            } />
    )

    function getStepsErrorInitialValue(): IStepsError {

        return {
            step1: { error: isStep1FormInvalid(api_data), show: isStep1MarkedAsError(api_data) },
            step2: { error: isStep2FormInvalid(api_data), show: isStep2MarkedAsError(api_data) },
            step3: { error: isStep3FormInvalid(api_data), show: isStep3MarkedAsError(api_data) },
            step4: { error: isStep4FormInvalid(api_data), show: isStep4MarkedAsError(api_data) },
            step5: { error: isStep5FormInvalid(api_data, pedidos), show: isStep5MarkedAsError(api_data) },
            step6: { error: isStep6FormInvalid(api_data) && pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.RECONHECIMENTO_VINCULO_EMPREGO), show: isStep6MarkedAsError(api_data) },
            step7: { error: isStep7FormInvalid(api_data) && pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.ADICIONAL_INSALUBRIDADE), show: isStep7MarkedAsError(api_data) },
            step8: { error: isStep8FormInvalid(api_data) && pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.ADICIONAL_PERICULOSIDADE), show: isStep8MarkedAsError(api_data) },
            step9: { error: isStep9FormInvalid(api_data) && pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.REVERSAO_JUSTA_CAUSA), show: isStep9MarkedAsError(api_data) },
            step10: { error: isStep10FormInvalid(api_data) && pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.DIFERENCAS_SALARIAIS), show: isStep10MarkedAsError(api_data) },
            step11: { error: isStep11FormInvalid(api_data) && pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.GORJETAS), show: isStep11MarkedAsError(api_data) },
            step12: { error: isStep12FormInvalid(api_data) && pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.RESCISAO_INDIRETA), show: isStep12MarkedAsError(api_data) },
            step13: { error: isStep13FormInvalid(api_data) && pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.FERIAS), show: isStep13MarkedAsError(api_data) },
            step14: { error: isStep14FormInvalid(api_data) && pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.MULTA_ART_477), show: isStep14MarkedAsError(api_data) },
            step15: { error: isStep15FormInvalid(api_data) && pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.GRATUIDADE_JUSTICA), show: isStep15MarkedAsError(api_data) },
            step16: { error: isStep16FormInvalid(api_data) && pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.FALTA_DEPOSITO_FGTS), show: isStep16MarkedAsError(api_data) },
            step17: { error: isStep17FormInvalid(api_data) && pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.GARANTIA_PROVISORIA), show: isStep17MarkedAsError(api_data) },
            step18: { error: isStep18FormInvalid(api_data) && pedidos.includes(BLOCOS_PEDIDOS_EXISTENTES.AVISO_PREVIO), show: isStep18MarkedAsError(api_data) },
            step19: { error: isStep19FormInvalid(api_data) && pedidos?.includes(BLOCOS_PEDIDOS_EXISTENTES.JORNADA_TRABALHO), show: isStep19MarkedAsError(api_data) },
            step20: { error: isStep20FormInvalid(api_data) && pedidos?.includes(BLOCOS_PEDIDOS_EXISTENTES.DANOS_MORAIS), show: isStep20MarkedAsError(api_data) },
            step21: { error: isStep21FormInvalid(api_data) && pedidos?.includes(BLOCOS_PEDIDOS_EXISTENTES.INTEGRACAO_SALARIAL_PARCELAS_PAGAS_DINHEIRO), show: isStep21MarkedAsError(api_data) },
            step22: { error: isStep22FormInvalid(api_data), show: isStep22MarkedAsError(api_data) },
        }
    }

    function getPedidosFromApi(api_data: any): string[] {
        return api_data[DOS_PEDIDOS_DO_PROCESSO_FORM_FIELD.BLOCOS_PEDIDOS_EXISTENTES]
    }

    function checkCarteiraTrabalhoAnotada(api_data: any): boolean {
        return api_data[STEP4_FORM_FIELD.DADOS_CONTRATO]?.[DADOS_CONTRATO.CARTEIRA_DE_TRABALHO_ANOTADA]
    }

    function checkPedirReversaoJustaCausa(api_data: any): boolean {
        return api_data[STEP4_FORM_FIELD.DADOS_CONTRATO]?.[DADOS_CONTRATO.REVERSAO_CAUSA_JUSTA]
    }

    function checkPedirMultaArt477(api_data: any): boolean {
        return api_data[STEP4_FORM_FIELD.DADOS_CONTRATO]?.[DADOS_CONTRATO.VERBAS_RESCISORIAS]?.[VERBAS_RESCISORIAS.PEDIR_MULTA_ART_477]
    }

    function getCrossRegrasNegocioInitialValue(api_data: any): CrossRegrasNegocio {
        const regras_dados_contrato: ICrossRegrasNegocioDadosContrato = {
            carteira_trabalho_anotada: checkCarteiraTrabalhoAnotada(api_data),
            pedir_reversao_justa_causa: checkPedirReversaoJustaCausa(api_data),
            pedir_multa_art_477: checkPedirMultaArt477(api_data)
        }

        return {
            regras_dados_contrato
        }
    }
}
