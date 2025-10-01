import { Drawer, Typography, Divider, Button } from '@mui/material'
import { Box } from '@mui/system'
import React, { Dispatch } from 'react'

interface IContratarRukeLeads {
    drawerContratarRukeLeads: boolean
    setDrawerContratarRukeLeads: Dispatch<boolean>
    contratarRukeLeads: () => Promise<void>
}

export default function DrawerContratarRukeLeads(props: IContratarRukeLeads) {
    const {
        drawerContratarRukeLeads,
        setDrawerContratarRukeLeads,
        contratarRukeLeads
    } = props

    return (
        <Drawer
            anchor="right"
            open={drawerContratarRukeLeads}
            onClose={() => setDrawerContratarRukeLeads(false)}
        >
            <div style={{
                width: 600,
                padding: 20,
                backgroundColor: 'white',
                color: '#000',
                height: '100%',
                position: 'relative'
            }}>
                <br /><br /><br />
                <Typography style={{ fontWeight: "bold" }}>CONTRATAR RUKE LEADS</Typography>

                <br />

                <Divider />

                <Typography variant="h6" component="p" sx={{ marginTop: 2 }}>
                    <b>Valor total por mês:</b> 59,90
                </Typography>
                <br />

                <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Button style={{ width: '100%', fontWeight: '800', padding: '15px', backgroundColor: '#006BED' }} variant="contained"
                        onClick={() => contratarRukeLeads()} color="primary">
                        CONTRATAR
                    </Button>
                </Box>
            </div>
        </Drawer>
    )
}
