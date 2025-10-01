
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Substep from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Typography } from '@mui/material';

interface IStep {
    children: React.ReactNode;
    title?: string
    markAsError?: boolean
    bypass?: boolean
    completed?: boolean
    optional?: boolean
}

interface IHorizontalSteps {
    steps: IStep[];
}

export default function HorizontalLinearStepper(props: IHorizontalSteps) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const step_index = getStep() as number

    const activeStep = React.useMemo<IStep>(() => {
        return props.steps[step_index];
    }, [step_index]);

    const [hoveredStep, setHoveredIndex] = React.useState<number | undefined>()

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={step_index} sx={{ height: 180, overflowX: 'scroll', mb: -10, position: 'relative', bottom: 30 }} className='hide-scrollbar'>
                {props.steps.map((step, i) => {
                    return (
                        <Substep key={i} completed={step.completed && step_index != i} style={{ position: 'relative' }}>
                            <Link href={`${pathname}?step=${i + 1}`} onMouseEnter={() => onMouseEnter(i)} onMouseLeave={() => onMouseLeave()} style={{ textDecoration: 'none', position: 'relative', width: '100%', display: step.bypass ? 'none' : '' }} color='primary'>
                                <Box sx={{ display: step.title && hoveredStep == i ? '' : 'none', boxShadow: 2, p: 2, zIndex: 100, borderRadius: 2, position: 'absolute', top: -80, left: 0, minWidth: 200, background: 'white', translate: i == 0 ? 0 : i == props.steps.length - 1 ? -165 : -100 }}>
                                    <Typography style={{ textTransform: 'uppercase', textAlign: 'center', fontWeight: 500, fontSize: 13 }} color={'primary'}>{`${i + 1} | ${step.title}`}</Typography>
                                </Box>
                                <StepLabel optional={step.optional ? 'opcional' : ''} error={step.markAsError} style={{ cursor: 'pointer' }} />
                            </Link>
                            <span style={{ display: step.bypass ? 'block' : 'none', width: 24, height: 24, borderRadius: 999, background: 'hsl(0, 0%, 65.21568627450981%)', position: 'relative', right: 5, margin: 4 }}></span>
                        </Substep>
                    );
                })}
            </Stepper>

            {
                activeStep.children
            }
        </Box>
    );

    function getStep() {
        const step = searchParams.get('step')
        if (step == null) return router.back()
        else if (isNaN(parseInt(step))) return router.back()
        else if (parseInt(step) > props.steps.length) return router.back()
        return parseInt(step) - 1
    }

    function onMouseEnter(stepIndex: number) {
        setHoveredIndex(stepIndex)
    }

    function onMouseLeave() {
        setHoveredIndex(undefined)
    }
}
