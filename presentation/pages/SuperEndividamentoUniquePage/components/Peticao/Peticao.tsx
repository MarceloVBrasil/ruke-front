// "use client"

import { Accordion, AccordionSummary, Typography, Chip } from '@mui/material'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import { Box, width } from '@mui/system'
import Link from 'next/link'
import React from 'react'
import SuperEndividamentoStepRouter from './StepRouter/StepRouter'
import { SuperEndividamentoProps } from '@/presentation/pages/SuperEndividamentoUniquePage/SuperEndividamentoUniquePage';

export default function Peticao({ ticketUnique: api_data, regraDominio }: SuperEndividamentoProps) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingBottom: 5,
                        width: '100%'
                    }}
                >
                    <Typography
                        style={{
                            marginRight: 10,
                            width: "100%",
                            color: "#00479d",
                        }}
                    >
                        PETIÇÃO{" "}
                    </Typography>
                    {api_data && api_data.peticao_pdf && (
                        <Link
                            href={api_data.peticao_pdf}
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                        >
                            <Chip
                                icon={<PictureAsPdfIcon sx={{ position: 'relative', top: 2, left: { xs: 3, lg: 0 } }} />}
                                label={`Download do PDF da Petição`}
                                color="default"
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                                size="small"
                            />
                            <Chip
                                icon={<PictureAsPdfIcon sx={{ position: 'relative', top: 2, left: { xs: 3, lg: 0 } }} />}
                                color="default"
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    {api_data && api_data.peticao_word && (
                        <Link
                            href={api_data.peticao_word}
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none', }}
                        >
                            <Chip
                                icon={<ArticleIcon sx={{ position: 'relative', top: 2, left: { xs: 3, lg: 0 } }} />}
                                label={`Download do WORD da Petição`}
                                color="default"
                                style={{ marginInline: 10 }}
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                                size="small"
                            />
                            <Chip
                                icon={<ArticleIcon sx={{ position: 'relative', top: 2, left: { xs: 3, lg: 0 } }} />}
                                color="default"
                                style={{ marginInline: 10 }}
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    <Chip
                        label={
                            api_data && api_data.peticao_pdf ? "Gerada!" : "Não gerada!"
                        }
                        color={
                            api_data && api_data.peticao_pdf ? "success" : "warning"
                        }
                        size="small"
                    />
                </Box>
            </AccordionSummary>
            <Accordion expanded>
                <SuperEndividamentoStepRouter api_data={api_data} />
            </Accordion>
        </Accordion>
    )
}
