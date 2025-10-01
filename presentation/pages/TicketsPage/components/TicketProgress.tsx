import { ProgressBarWithLabel } from "./ProgressBarWithLabel";

export function TicketProgress({ currentStep, totalSteps, texto }: any) {
    const progressValue = (currentStep / totalSteps) * 100;
    const labelText = `Fase ${currentStep} de ${totalSteps}. ${texto}`;
    return <ProgressBarWithLabel value={progressValue} label={labelText} />;
}