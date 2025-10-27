'use client'

import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Typography, CssBaseline, FormControl, OutlinedInput, InputAdornment, IconButton, Container, FormHelperText } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from '@/presentation/hook/useLoading';
import Image from 'next/image';
import { completarAssinaturaAgenda } from '@/app/api/client/auth';

type RegisterProps = {
  params: {
    tenantId: string;
  }
}

const registerFormSchema = z.object({
  quantidade: z.number().min(1, { message: "A quantidade deve ser informada" }),
});

const Register = ({ params }: RegisterProps) => {
  const router = useRouter();
  const { setLoading } = useLoading();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(registerFormSchema)
  });

  const searchParams = useSearchParams();

  const precoPorUsuario = Number(searchParams.get('price'));
  const id_plano = searchParams.get("plan")

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: '#006BED',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  const [quantidade, setQuantidade] = useState<number>(1);

  const getValorTotal = () => {
    if (quantidade <= 5) {
      return 59.90;
    } else if (quantidade > 5) {
      return ((quantidade - 5) * 39.90) + 59.90;
    }

    return 0;
  }

  const valorTotal = quantidade * precoPorUsuario;

  const handleIncrement = () => {
    setQuantidade(prev => {
      const newValue = prev + 1;
      setValue('quantidade', newValue);
      return newValue;
    });
  };

  const handleDecrement = () => {
    setQuantidade(prev => {
      const newValue = prev > 1 ? prev - 1 : 1;
      setValue('quantidade', newValue);
      return newValue;
    });
  };

  const handleRegisterSubmit = async (data: any) => {
    const tenant_id = params.tenantId;
    setLoading(true);

    const responseData = await completarAssinaturaAgenda(tenant_id, data.quantidade, id_plano as string);
    if (responseData.status === 'success') {
      router.push(responseData.invoiceUrl);
    }

    if (responseData.error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: `${responseData.error}`
      });
    }
    setLoading(false);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          backgroundImage: 'url(https://ruke.nyc3.cdn.digitaloceanspaces.com/fundo%20agenda.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(10px)',
            zIndex: 1,
          }}
        />
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              padding: '40px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              width: '100%',
            }}>
            <Box mb={3}>
              <Image
                src={'https://ruke.nyc3.cdn.digitaloceanspaces.com/logo_ruke%20(1).png'}
                width={300}
                height={55}
                style={{ cursor: 'pointer' }}
                alt=''
              />
            </Box>
            <Typography variant="h5" component="h1" gutterBottom style={{ textAlign: 'center' }}>
              FINALIZAR CADASTRO
            </Typography>
            <Box style={{ width: '100%' }} component='form' onSubmit={handleSubmit(handleRegisterSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <center><Typography variant="body1" component="label" gutterBottom style={{ display: 'block', marginBottom: '8px' }}>
                    Escolha a quantidade de usuários que usarão a agenda jurídica da Ruke
                  </Typography></center>

                  <FormControl variant="outlined" fullWidth error={!!errors.quantidade}>
                    <OutlinedInput
                      id="quantidade"
                      type="number"
                      value={quantidade}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="decrement quantity"
                            onClick={handleDecrement}
                            edge="end"
                            sx={{ padding: '10px' }}
                          >
                            <Remove />
                          </IconButton>
                          <IconButton
                            aria-label="increment quantity"
                            onClick={handleIncrement}
                            edge="end"
                            sx={{ padding: '10px' }}
                          >
                            <Add />
                          </IconButton>
                        </InputAdornment>
                      }
                      {...register('quantidade')}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setQuantidade(value);
                        setValue('quantidade', value);
                      }}
                      sx={{ paddingRight: '96px' }}
                    />
                    {errors.quantidade && <FormHelperText>{errors?.root?.quantidade.message?.toString()}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
              <Typography variant="h6" component="p" sx={{ marginTop: 2, textAlign: 'center' }}>
                <b>Valor total por mês:</b> {getValorTotal().toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </Typography>
              <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Button style={{ width: '100%', marginTop: '20px', fontWeight: '800', padding: '15px', backgroundColor: '#006BED' }} type='submit' variant="contained" color="primary">
                  IR PARA PAGAMENTO
                </Button>

              </Box>
              <center><p style={{ fontSize: 12 }}>* Você cadastrará todos os {quantidade} usuários depois do pagamento</p></center>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default Register;
