'use client'

import React, { useState, useEffect, useRef } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'; // Make sure you have installed SweetAlert2
import { formatCepInput, formatCnpj, formatCpf, formatPhoneNumber, onlyNumber } from '@/app/utils/Formater';
import { Box, FormControlLabel, Switch } from '@mui/material';
import ModalComponent from '@/presentation/components/Modal';
import { addParceiro, updateParceiro, deleteParceiro, updatePorcentagem } from '@/app/api/client/parceiro';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { StyledTableCell, StyledTableRow } from '../../styles/TablesStyles';
import { isCNPJ, isCPF } from 'validation-br';
import { useLoading } from '../../hook/useLoading';
import { getAddressByCep } from '@/app/api/client/outros';
import { handleDelete, handleFormSubmit, handleSubmitPorcentagem } from './helpers/Swal';
import { Parceiro, ParceiroProps, PorcentagemParceiros } from './helpers/interfaces';
import ModalPorcentagem from './components/ModalPorcentagem';
import ModalCadastroEdicaoParceiro from './components/ModalCadastroEdicaoParceiro';
import { parceirosInFormSchema } from './helpers/Zod';




export default function ParceirosPage({ listParceiros, produtoId }: ParceiroProps) {


  const [partners, setPartners] = useState<Parceiro[] | []>(listParceiros);
  const [partnerChoose, setPartnersChoose] = useState<Parceiro | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(parceirosInFormSchema)
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const openModalPorcent = () => setModalPorcent(true);
  const closeModalPorcent = () => setModalPorcent(false);
  const [cep, setCep] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [celular, setCelular] = useState('');
  const [open, setOpen] = React.useState(false);
  const [modalPorcent, setModalPorcent] = useState(false);
  const [personChoose, setPersonChoose] = useState<'juridica' | 'fisica'>('juridica');
  const [porcentagemChoose, setPorcentagemChoose] = useState<PorcentagemParceiros | null>(null);
  const { setLoading } = useLoading();

  const handleChange = () => {
    setPersonChoose((prevChoice) => (prevChoice === 'juridica' ? 'fisica' : 'juridica'));
  };

  const [formDataCep, setFormDataCep] = useState({
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
  });

  const handleChangeCep = async () => {
    if (cep.replace('-', '').length === 8) {
      try {
        const data = await getAddressByCep(cep.replace('-', ''));
        setFormDataCep({
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
        });
        reset({
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
        });
      } catch (error) {
        console.error('Error fetching data:');
      }
    }
  };
  useEffect(() => {
    handleChangeCep();
  }, [cep])

  const formRef = useRef<HTMLFormElement>();
  const formRefPorcent = useRef<HTMLFormElement>();


  return (
    <Box sx={{ padding: '5px', margin: '10px', borderRadius: '10px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: '30px', fontWeight: '600', width: '200px', paddingBottom: '10px', marginBottom: '30px', color: '#00479D', borderBottom: '3px solid #006BED' }}>
          Parceiros
        </Typography>
        <Button
          sx={{
            backgroundColor: '#006BED',
            color: 'white',
            height: '40px',
            width: '150px',
            display: 'flex',
            justifyContent: 'space-evenly',
            '&:hover': { backgroundColor: '#00479d' }
          }}
          onClick={() => {
            setPartnersChoose(null);
            setCnpj('');
            setFormDataCep({
              logradouro: '',
              bairro: '',
              localidade: '',
              uf: '',
            });
            setCep('');
            setCelular('');
            handleOpen();
            reset()
          }}>
          <SaveIcon sx={{ mr: '2px' }} />
          Cadastrar
        </Button>
      </Box>

      <ModalPorcentagem
        modalPorcent={modalPorcent}
        formRefPorcent={formRefPorcent}
        porcentagemChoose={porcentagemChoose}
        openModalPorcent={openModalPorcent}
        closeModalPorcent={closeModalPorcent}
        setPorcentagemChoose={setPorcentagemChoose}
        setModalPorcent={setModalPorcent}
      />

      <ModalCadastroEdicaoParceiro
        produtoId={produtoId}
        partners={partners}
        partnerChoose={partnerChoose}
        open={open}
        formRef={formRef}
        personChoose={personChoose}
        errors={errors}
        cnpj={cnpj}
        cpf={cpf}
        celular={celular}
        cep={cep}
        formDataCep={formDataCep}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        setLoading={setLoading}
        setPartners={setPartners}
        setOpen={setOpen}
        handleChange={handleChange}
        register={register}
        reset={reset}
        setCnpj={setCnpj}
        setCpf={setCpf}
        setCelular={setCelular}
        setCep={setCep}
        setFormDataCep={setFormDataCep}
      />

      <TableContainer sx={{ width: '100%', maxWidth: 2000, minHeight: '100vh', gap: 10, border: '1px solid #eee', borderRadius: '10px', }} component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow style={{ whiteSpace: 'nowrap' }}>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>CNPJ/CPF</StyledTableCell>
              <StyledTableCell>Data de Aniversário</StyledTableCell>
              <StyledTableCell>Tipo de Empresa</StyledTableCell>
              <StyledTableCell style={{ minWidth: '150px' }}>Celular</StyledTableCell>
              <StyledTableCell>Endereço</StyledTableCell>
              <StyledTableCell>Número</StyledTableCell>
              <StyledTableCell>Complemento</StyledTableCell>
              <StyledTableCell>Bairro</StyledTableCell>
              <StyledTableCell>CEP</StyledTableCell>
              <StyledTableCell>Porcentagem</StyledTableCell>
              <StyledTableCell>Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partners.map((partner) => (
              <StyledTableRow key={partner.id}>
                <StyledTableCell>{partner.nome}</StyledTableCell>
                <StyledTableCell>{partner.email}</StyledTableCell>
                <StyledTableCell>{partner.cpfCnpj}</StyledTableCell>
                <StyledTableCell>{partner.data_aniversario}</StyledTableCell>
                <StyledTableCell>{partner.tipo_empresa}</StyledTableCell>
                <StyledTableCell>{partner.celular}</StyledTableCell>
                <StyledTableCell>{partner.endereco}</StyledTableCell>
                <StyledTableCell>{partner.numero}</StyledTableCell>
                <StyledTableCell>{partner.complemento}</StyledTableCell>
                <StyledTableCell>{partner.bairro}</StyledTableCell>
                <StyledTableCell>{partner.cep}</StyledTableCell>
                <StyledTableCell>{partner.porcentagemParceiros.porcentagem}</StyledTableCell>
                <StyledTableCell sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', padding: '20px', gap: '10px' }} >
                  <Button variant="contained" color="primary" startIcon={<EditIcon />}
                    onClick={() => {

                      setModalPorcent(true)
                      const porcentagemParceiro = partner.porcentagemParceiros
                      if (porcentagemParceiro) {
                        setPorcentagemChoose({
                          id: partner.porcentagemParceiros.id,
                          porcentagem: Number(partner?.porcentagemParceiros.porcentagem)
                        });
                      }
                    }}>
                    Porcentagem
                  </Button>
                  <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={() => {
                    setPartnersChoose(partner);
                    setOpen(true);
                    setCpf(partner.cpfCnpj);
                    setCnpj(partner.cpfCnpj);
                    setCep(partner.cep);
                    setCelular(partner.celular);
                    setFormDataCep({
                      ...formDataCep,
                      bairro: partner.bairro,
                      logradouro: partner.endereco,
                    })
                    reset()
                  }}>
                    Editar
                  </Button>
                  <Button variant="contained" color="primary" startIcon={<DeleteIcon />} onClick={() => handleDelete(partner.id, partners, setPartners, setLoading)}>
                    Excluir
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

  );
}
