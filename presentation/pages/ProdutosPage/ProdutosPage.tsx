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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: '30px', fontWeight: '600', width: '200px', paddingBottom: '10px', marginBottom: '30px', color: '#00479D', borderBottom: '3px solid #006BED' }}>
          Produtos
        </Typography>
        {regraDominio?.permissoes?.includes('create') && (
          <Button sx={{
            backgroundColor: '#006BED',
            color: 'white',
            height: '40px',
            width: '200px',
            '&:hover': { backgroundColor: '#00479d' }
          }}
            onClick={() => { setProdutoChoose(null); handleOpen(); reset() }}>
            Cadastrar
          </Button>
        )}
      </Box>
      {(regraDominio?.permissoes?.includes('create') || regraDominio?.permissoes?.includes('update')) && (
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
              <StyledTableCell style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold', padding: '25px' }}>Nome</StyledTableCell>
              <StyledTableCell style={{ width: '280px', backgroundColor: 'white', color: 'black', fontWeight: 'bold', padding: '25px' }} >Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto) => (
              <StyledTableRow key={produto.id}>
                <StyledTableCell>
                  {produto.nome}
                </StyledTableCell >
                <StyledTableCell sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', padding: '20px', gap: '10px' }}>
                  {(
                    regraDominio?.permissoes?.includes('getById') ||
                    regraDominio?.permissoes?.includes('getAll') ||
                    regraDominio?.permissoes?.includes('getByIdProduto')) && (
                      <Link href={`/planos/${produto.id}`}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<LayersOutlined />}

                        >
                          Planos
                        </Button>
                      </Link>
                    )}

                  {regraDominio?.permissoes?.includes('getAll') && (
                    <Link href={`/parceiros/${produto.id}`}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Group />}
                      >
                        Parceiros
                      </Button>
                    </Link>
                  )}

                  {regraDominio?.permissoes?.includes('update') && (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setProdutoChoose(produto);
                        setMetodoPagamento(produto.metodo_pagamento);
                        setOpen(true);
                        reset()
                      }}
                    >
                      Editar
                    </Button>
                  )}

                  {regraDominio?.permissoes?.includes('delete') && (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(produto.id, produtos, setProdutos, setLoading)}
                    >
                      Excluir
                    </Button>
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
