"use client"

import HorizontalLinearStepper from "@/presentation/components/HorizontalStepper"
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
import { PASSOS } from "./helper/passos"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
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
}

export interface IStep {
    api_data: any
    stepsError: IStepsError
    setStepsError: Dispatch<SetStateAction<IStepsError>>
}

export interface ISugestaoPlanoPagamentoController {
    setIncluirSugestaoPlanoPagamento: Dispatch<boolean>
}

export default function SuperEndividamentoStepRouter({ api_data }: { api_data: any }) {
    const [stepsError, setStepsError] = useState<IStepsError>(getStepsErrorInitialValue())
    const [incluirSugestaoPlanoPagamento, setIncluirSugestaoPlanoPagamento] = useState(api_data['sugestao_plano_pagamento'])
    return (
        <HorizontalLinearStepper
            steps={
                [
                    { children: <Step1 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} />, title: PASSOS.step1.titulo, markAsError: stepsError.step1.error && stepsError.step1.show, completed: !stepsError.step1.error },
                    { children: <Step2 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} />, title: PASSOS.step2.titulo, markAsError: stepsError.step2.error && stepsError.step2.show, completed: !stepsError.step2.error },
                    { children: <Step3 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} />, title: PASSOS.step3.titulo, markAsError: stepsError.step3.error && stepsError.step3.show, completed: !stepsError.step3.error },
                    { children: <Step4 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} />, title: PASSOS.step4.titulo, markAsError: stepsError.step4.error && stepsError.step4.show, completed: !stepsError.step4.error },
                    { children: <Step5 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} />, title: PASSOS.step5.titulo, markAsError: stepsError.step5.error && stepsError.step5.show, completed: !stepsError.step5.error },
                    { children: <Step6 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} setIncluirSugestaoPlanoPagamento={setIncluirSugestaoPlanoPagamento} />, title: PASSOS.step6.titulo, markAsError: stepsError.step6.error && stepsError.step6.show, completed: !stepsError.step6.error },
                    { children: <Step7 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} />, title: PASSOS.step7.titulo, markAsError: stepsError.step7.error && stepsError.step7.show, completed: !stepsError.step7.error },
                    { children: <Step8 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} />, title: PASSOS.step8.titulo, markAsError: stepsError.step8.error && stepsError.step8.show, bypass: !incluirSugestaoPlanoPagamento, completed: !stepsError.step8.error },
                    { children: <Step9 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} />, title: PASSOS.step9.titulo, markAsError: stepsError.step9.error && stepsError.step9.show, completed: !stepsError.step9.error && false, optional: true },
                    { children: <Step10 api_data={api_data} stepsError={stepsError} setStepsError={setStepsError} />, title: PASSOS.step10.titulo, markAsError: stepsError.step10.error && stepsError.step10.show, completed: !stepsError.step10.error },
                ]
            } />
    )

    function getStepsErrorInitialValue(): IStepsError {
        return {
            step1: { error: isStep1FormInvalid(api_data), show: isStep1MarkedAsError(api_data) },
            step2: { error: isStep2FormInvalid(api_data), show: isStep2MarkedAsError(api_data) },
            step3: { error: isStep3FormInvalid(api_data), show: isStep3MarkedAsError(api_data) },
            step4: { error: isStep4FormInvalid(api_data), show: isStep4MarkedAsError(api_data) },
            step5: { error: isStep5FormInvalid(api_data), show: isStep5MarkedAsError(api_data) },
            step6: { error: isStep6FormInvalid(api_data), show: isStep6MarkedAsError(api_data) },
            step7: { error: isStep7FormInvalid(api_data), show: isStep7MarkedAsError(api_data) },
            step8: { error: isStep8FormInvalid(api_data), show: isStep8MarkedAsError(api_data) },
            step9: { error: isStep9FormInvalid(api_data), show: isStep9MarkedAsError(api_data) },
            step10: { error: isStep10FormInvalid(api_data), show: isStep10MarkedAsError(api_data) },
        }
    }
}
