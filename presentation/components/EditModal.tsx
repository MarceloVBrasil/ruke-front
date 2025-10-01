import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NewTextField } from './NewTextField';
import { CssBaseline, Grid, InputAdornment, TextField } from '@mui/material';
import { Container } from 'postcss';



  type ModalEditProps = {
    // open:boolean,
    // handleOpen:()=>void;
    // handleClose:()=>void;
    children:React.ReactNode
  
  } 

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 10,
    borderRadius:'20px'
};

export default function ModalEdit({children}:ModalEditProps) {
  
  return (
    <ModalEdit
        // keepMounted
        // open={open}
        // onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
          }}
        >
           <Typography sx={{fontSize:'40px', fontFamily:'Neue Kaine',position:'fixed',top:'50px',left:'20'}}>
                    Editar
            </Typography>
          {children}
        </Box>
      </Box>
      </ModalEdit>
  );
}