'use client'

import { useState, useRef } from 'react';
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
import { Produto } from '@/app/types/produto';
import Link from 'next/link';
import { Group, LayersOutlined, } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { StyledTableCell, StyledTableRow } from '../../styles/TablesStyles';
import { useLoading } from '../../hook/useLoading';
import { produtoFormSchema } from './helpers/Zod';
import { handleDelete, handleFormSubmit } from './helpers/Swal';
import ModalAtualizarCadastrarProduto from './components/ModalAtualizarCadastrarProduto';
import { Btn } from '@/presentation/components/Button';

type ProdutosPageProps = {
  produtosList: Produto[];
  regraDominio: any
}

export default function ProdutosPage({ produtosList, regraDominio }: ProdutosPageProps) {
  const [metodoPagamento, setMetodoPagamento] = useState('');
  const { setLoading } = useLoading();
  const [produtos, setProdutos] = useState<Produto[] | []>(produtosList);
  const [produtoChoose, setProdutoChoose] = useState<Produto | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formRef = useRef<HTMLFormElement>();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(produtoFormSchema)
  });

  return (
    <Box sx={{ maxWidth: '100vw', padding: '5px', margin: '10px', borderRadius: '10px', }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
        <Typography sx={{ fontSize: '30px', width: { xs: '100%', sm: '200px' }, paddingBottom: '10px', marginBottom: '30px', color: '#00479D', borderBottom: '3px solid #006BED' }}>
          Produtos
        </Typography>
        {regraDominio?.permissoes?.includes('add') && (
          <Btn
            sxWidth={{ xs: '100%', sm: '200px' }}
            text='Cadastrar'
            onClick={() => { setProdutoChoose(null); handleOpen(); reset() }} />

        )}
      </Box>
      {(regraDominio?.permissoes?.includes('add') || regraDominio?.permissoes?.includes('update')) && (
        <ModalAtualizarCadastrarProduto
          formRef={formRef}
          produtoChoose={produtoChoose}
          produtos={produtos}
          errors={errors}
          metodoPagamento={metodoPagamento}
          open={open}
          setProdutos={setProdutos}
          setLoading={setLoading}
          setOpen={setOpen}
          handleClose={handleClose}
          handleOpen={handleOpen}
          handleSubmit={handleSubmit}
          register={register}
          reset={reset}
          setMetodoPagamento={setMetodoPagamento}
        />
      )}
      <TableContainer style={{ boxShadow: '0px -8px 10px -5px rgba(0, 0, 0, 0.2), 0px 8px 10px -5px rgba(0, 0, 0, 0.2)' }} component={Paper}>
        <Table sx={{ minWidth: 1000, }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ backgroundColor: 'white', color: 'black', padding: '25px' }}><Typography>Nome</Typography></StyledTableCell>
              <StyledTableCell style={{ width: '280px', backgroundColor: 'white', color: 'black', padding: '25px' }} ><Typography>Ações</Typography></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto) => (
              <StyledTableRow key={produto.id}>
                <StyledTableCell style={{ textTransform: 'uppercase' }}>
                  {produto.nome}
                </StyledTableCell >
                <StyledTableCell sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', padding: '20px', gap: '10px' }}>
                  {(
                    regraDominio?.permissoes?.includes('getById') ||
                    regraDominio?.permissoes?.includes('getAll') ||
                    regraDominio?.permissoes?.includes('getByIdProduto')) && (
                      <Link href={`/planos/${produto.id}`}>
                        <Btn
                          width={'120px'}
                          variant="contained"
                          color="primary"
                          text='Planos'
                        />
                      </Link>
                    )}

                  {regraDominio?.permissoes?.includes('getAll') && (
                    <Link href={`/parceiros/${produto.id}`}>
                      <Btn
                        width={'120px'}
                        variant="contained"
                        color="primary"
                        text='Parceiros'
                      />
                    </Link>
                  )}

                  {regraDominio?.permissoes?.includes('update') && (
                    <Btn
                      width={'120px'}
                      variant="contained"
                      color="primary"
                      text='Editar'
                    />
                  )}

                  {regraDominio?.permissoes?.includes('delete') && (
                    <Btn
                      width={'120px'}
                      variant="contained"
                      color="primary"
                      text='Excluir'
                    />
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

  );
}
