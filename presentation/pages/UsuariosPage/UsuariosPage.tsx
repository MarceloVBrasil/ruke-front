'use client'

import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Save } from '@mui/icons-material';
import { Box, useMediaQuery } from '@mui/material';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { isCPF } from 'validation-br';
import { useLoading } from '../../hook/useLoading';
import SmallScreen from './components/SmallScreen';
import BigScreen from './components/BigScreen';
import CadastroEdicaoModal from './components/CadastroEdicaoModal';
import { getUser } from '@/app/api/client/users';
import { updateUserAgenda } from '@/app/api/client/agenda';

export interface Usuarios {
  id: string,
  nome: string;
  email: string;
  telefone: string;
  nivel: string;
  cpf: string;
  oab: string;
  oab_estado: string;
  agenda: boolean;
}

export type UsuariosProps = {
  usuariosList: Usuarios[]
  regraDominio: any
}

const userFormSchema = z.object({
  nome: z.string().min(1, { message: "O nome tem que ser informado." }),
  email: z.string().min(1, { message: "O email deve ser informado" }).email({ message: "O email deve ser válido" }),
  telefone: z.string().min(1, { message: "O telefone deve ser informado" }),
  nivel: z.string().min(1, { message: "O nível dever ser informado" }),
  cpf: z.string().min(1, { message: "O CPF deve ser informado" })
    .refine((value) => isCPF(value), { message: "O cpf deve ser válido" }),
  oab: z.string().min(1, { message: "O número da OAB  deve ser informado." }),
  oab_estado: z.string().min(1, { message: "O estado da OAB  deve ser informado." })
});

export default function UsuariosPage({ usuariosList, regraDominio }: UsuariosProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(userFormSchema)
  });
  const { setLoading } = useLoading();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [usuarios, setUsuarios] = useState<Usuarios[] | []>(usuariosList);
  const [userChoose, setUserChoose] = useState<Usuarios | null>(null);
  const [nivelUsuario, setNivelUsuario] = useState('');
  const [estadoOab, setEstadoOab] = useState('');
  const [acessoAgenda, setAcessoAgenda] = useState(false);

  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  const formRef = useRef<HTMLFormElement>();

  const handleResetForm = async () => {
    setUserChoose(null);
    handleOpen();
    reset();
    setTelefone('');
    setCpf('');
    setNivelUsuario('');
    setEstadoOab('');
    setAcessoAgenda(false);
  }

  const handleGetUser = async (id: string) => {
    setLoading(true);
    const user = await getUser(id);
    setUserChoose(user);
    setOpen(true);
    setCpf(user.cpf);
    setTelefone(user.telefone);
    setNivelUsuario(user.nivel);
    setEstadoOab(user.oab_estado);
    setAcessoAgenda(user.acesso_agenda);
    reset();
    setLoading(false);
  }

  return (
    <Box sx={{ borderRadius: '10px', padding: '5px', margin: '10px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, mb: { xs: 2, sm: 0 } }}>
        <Typography sx={{ fontSize: '30px', fontWeight: '600', width: { xs: 'full', sm: '200px' }, paddingBottom: '10px', marginBottom: '30px', color: '#00479D', borderBottom: '3px solid #006BED' }}>
          Usuários
        </Typography>

        {regraDominio?.permissoes?.includes('create') && (
          <Button sx={{
            backgroundColor: '#006BED',
            color: 'white',
            height: '40px',
            width: { xs: 'full', sm: '200px' },
            '&:hover': { backgroundColor: '#00479d' }
          }}
            onClick={handleResetForm}>
            <Save sx={{ mr: '2px' }} />
            Cadastrar
          </Button>
        )}
      </Box>

      {(regraDominio?.permissoes?.includes('create') || regraDominio?.permissoes?.includes('update')) && (
        <CadastroEdicaoModal
          formRef={formRef}
          userChoose={userChoose}
          open={open}
          errors={errors}
          telefone={telefone}
          nivelUsuario={nivelUsuario}
          cpf={cpf}
          estadoOab={estadoOab}
          usuarios={usuarios}
          setLoading={setLoading}
          setOpen={setOpen}
          setUserChoose={setUserChoose}
          setUsuarios={setUsuarios}
          register={register}
          reset={reset}
          setTelefone={setTelefone}
          setNivelUsuario={setNivelUsuario}
          setEstadoOab={setEstadoOab}
          setCpf={setCpf}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          handleOpen={handleOpen}
        />
      )}
      {
        isSmallScreen ? usuarios.map(usuario => <SmallScreen key={usuario.id}
          regraDominio={regraDominio}
          usuario={usuario}
          handleGetUser={handleGetUser}
          updateUserAgenda={updateUserAgenda}
          setUsuarios={setUsuarios}
          usuarios={usuarios}
        />)
          : <BigScreen
            regraDominio={regraDominio}
            usuarios={usuarios}
            handleGetUser={handleGetUser}
            updateUserAgenda={updateUserAgenda}
            setUsuarios={setUsuarios}

          />
      }
    </Box>
  );
}
