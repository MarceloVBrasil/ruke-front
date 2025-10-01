import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { width } from "@mui/system";

type ModalProps = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  children: React.ReactNode;
  width?: string;
  nomeModal: string;
};

export default function ModalComponent({
  children,
  handleOpen,
  handleClose,
  open,
  width,
  nomeModal,
}: ModalProps) {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      sx={{ overflow: "auto", display: "flex", justifyContent: "center", margin: 2, position: 'absolute' }}
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 5,
          borderRadius: "20px",
          width: 'auto',
          padding: 5,
        }}
      >
        <CssBaseline />
        <Box sx={{ position: 'relative' }}>
          <Typography
            sx={{
              fontSize: "25px",
              marginBottom: "50px",
              color: "#00479d",
              fontWeight: "bold",
              borderBottom: "2px solid #006bed",
            }}
          >
            {nomeModal}
          </Typography>
          <IconButton
            sx={{
              zIndex: 40000,
              cursor: "pointer",
              position: "absolute",
              top: "0px",
              right: "0px",
            }}
            onClick={handleClose}
          >
            <CloseIcon color="primary" />
          </IconButton>
          {children}
        </Box>
      </Box>
    </Modal>
  );
}
