'use client'

import * as React from 'react';
import { useState, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography } from '@mui/material';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { StyledTableCell, StyledTableRow } from '../../styles/TablesStyles';
import { useLoading } from '../../hook/useLoading';
import MaskedInput from 'react-text-mask';
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { traducaoTipoCobranca } from '@/domain/data/traducaoTipoCobranca';
import { Plano } from './helpers/interfaces';
import { handleDelete, handleFormSubmit } from './helpers/Swal';
import { planosInFormSchema } from './helpers/Zod';
import ModalAtualizarCadastrarPlano from './components/ModalAtualizarCadastrarPlano';

interface PlanoProps {
  listPlanos: Plano[];
  produtoId: string
}

export default function PlanosPage({ listPlanos, produtoId }: PlanoProps) {
  const [tipoCobranca, setTipoCobranca] = useState('');
  const CurrencyInput = (props: any) => {
    const currencyMask = createNumberMask({
      prefix: "R$ ",
      includeThousandsSeparator: true,
      thousandsSeparatorSymbol: ".",
      allowDecimal: true,
      decimalSymbol: ",",
      requireDecimal: false, // NÃ£o exigir casas decimais
      decimalLimit: 2, // Quantparams.idade de casas decimais
      allowNegative: false,
    });

    return <MaskedInput mask={currencyMask} {...props} />;
  };

  const ContractValueMemo = useMemo(() => CurrencyInput, []);
  const { setLoading } = useLoading();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(planosInFormSchema)
  });
  const [planos, setPlanos] = useState<Plano[] | []>(listPlanos);
  const [planoChoose, setPlanoChoose] = useState<Plano | null>(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formRef = React.useRef<HTMLFormElement>();

  const formatarValorParaMoedaBrasileira = (valor: string) => {
    const valorFormatado = Number(valor).toFixed(2);
    return `R$ ${valorFormatado.replace(".", ",")}`;
  };


  return (
    <Box sx={{ maxWidth: '100vw', padding: '5px', margin: '10px', borderRadius: '10px', }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: '30px', fontWeight: '600', width: '200px', marginBottom: '30px', color: '#00479D', borderBottom: '3px solid #006BED' }}>
          Planos
        </Typography>
        <Button sx={{
          backgroundColor: '#006BED',
          color: 'white',
          height: '40px',
          width: '200px'
        }}
          onClick={() => {
            setPlanoChoose(null);
            handleOpen();
            setTipoCobranca("");
            reset()
          }}>
          Cadastrar
        </Button>
      </Box>

      <ModalAtualizarCadastrarPlano
        planoChoose={planoChoose}
        formRef={formRef}
        produtoId={produtoId}
        planos={planos}
        open={open}
        errors={errors}
        tipoCobranca={tipoCobranca}
        handleClose={handleClose}
        handleOpen={handleOpen}
        handleSubmit={handleSubmit}
        setOpen={setOpen}
        setPlanos={setPlanos}
        setPlanoChoose={setPlanoChoose}
        setLoading={setLoading}
        register={register}
        reset={reset}
        ContractValueMemo={ContractValueMemo}
        setTipoCobranca={setTipoCobranca}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold', padding: '25px' }}>Nome</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold', padding: '25px' }}>Descrição</StyledTableCell>
              <StyledTableCell style={{ minWidth: '150px', backgroundColor: 'white', color: 'black', fontWeight: 'bold', padding: '25px' }}>Limite Petições</StyledTableCell>
              <StyledTableCell style={{ minWidth: '210px', backgroundColor: 'white', color: 'black', fontWeight: 'bold', padding: '25px' }}>Limite Hipossuficiência</StyledTableCell>
              <StyledTableCell style={{ minWidth: '160px', backgroundColor: 'white', color: 'black', fontWeight: 'bold', padding: '25px' }}>Limite Contratos</StyledTableCell>
              <StyledTableCell style={{ minWidth: '175px', backgroundColor: 'white', color: 'black', fontWeight: 'bold', padding: '25px' }}>Limite Procurações</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold', padding: '25px' }}>Preço</StyledTableCell>
              <StyledTableCell style={{ minWidth: '170px', backgroundColor: 'white', color: 'black', fontWeight: 'bold', padding: '25px' }}>Tipo de Cobrança</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold', padding: '25px' }} align="center">Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {planos.map((plano) => (
              <StyledTableRow key={plano.id}>
                <StyledTableCell style={{ backgroundColor: 'white', fontWeight: '600', padding: '20px' }} component="th" scope="row">
                  {plano.nome}
                </StyledTableCell>
                <StyledTableCell style={{ backgroundColor: 'white', padding: '20px', maxHeight: '30px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} align="left">{plano.descricao}</StyledTableCell>
                <StyledTableCell style={{ backgroundColor: 'white', padding: '20px' }} align="left">{plano.limite_peticoes}</StyledTableCell>
                <StyledTableCell style={{ backgroundColor: 'white', padding: '20px' }} align="left">{plano.limite_hipossuficiencia}</StyledTableCell>
                <StyledTableCell style={{ backgroundColor: 'white', padding: '20px' }} align="left">{plano.limite_contratos}</StyledTableCell>
                <StyledTableCell style={{ backgroundColor: 'white', padding: '20px' }} align="left">{plano.limite_procuracoes}</StyledTableCell>
                <StyledTableCell style={{ backgroundColor: 'white', padding: '20px' }} align="left">{formatarValorParaMoedaBrasileira(plano.preco)}</StyledTableCell>
                <StyledTableCell style={{ backgroundColor: 'white', padding: '20px' }} align="left">{traducaoTipoCobranca[plano.tipo_cobranca].value}</StyledTableCell>
                <StyledTableCell style={{ backgroundColor: 'white', padding: '20px', display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => {
                      setPlanoChoose(plano);
                      setTipoCobranca(plano.tipo_cobranca);
                      setOpen(true);
                      reset();
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(plano.id, planos, setPlanos, setLoading)}
                  >
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
