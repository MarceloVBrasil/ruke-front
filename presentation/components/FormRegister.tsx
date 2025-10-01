import { FormEvent, Fragment, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { getAddressByCep } from '@/app/api/client/outros';
import { formatCpf, formatPhoneNumber, onlyNumber } from '@/app/utils/Formater';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const FormRegister = () => {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [oabNumber, setOABNumber] = useState('');
  const [estadoOab, setEstadoOab] = useState('');

  const [activeStep, setActiveStep] = useState(0);






  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    alert('dsad')
  }

  return (
    <Fragment>
      <Box>
        <Image
          src={'/assets/logo_ruke.png'}
          width={300}
          height={50}
          style={{ cursor: 'pointer', marginBottom: 'px', marginTop: '50px' }}
          alt=''
        />
      </Box>
      <Typography style={{ fontWeight: 'bolder', fontSize: '30px', textAlign: 'center', marginTop: '20px' }}>
        {activeStep === 0 ? 'Criar Conta' : 'Dados Financeiro'}
      </Typography>
      <Grid style={{ width: '100%', height: '500px', borderRadius: '10px', padding: '20px', margin: '30px' }} component='form' onSubmit={handleRegisterSubmit} container spacing={3}>
        {activeStep === 0 && (
          <Fragment>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="nome"
                name="nome"
                label="Nome completo"
                fullWidth
                autoComplete="given-name"
                variant="filled"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="CPF"
                name="CPF"
                label="CPF"
                variant="filled"
                fullWidth
                value={cpf}
                onChange={(e) => {
                  const value = onlyNumber(e.target.value);
                  setCpf(formatCpf(value));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="oab"
                name="oab"
                fullWidth
                label="Número da OAB"
                variant="filled"
                value={oabNumber}
                onChange={(e) => setOABNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="filled">
                <Select
                  id="oab"
                  value={estadoOab}
                  onChange={(e) => setEstadoOab(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Estado da OAB
                  </MenuItem>
                  <MenuItem value="AC">AC</MenuItem>
                  <MenuItem value="AL">AL</MenuItem>
                  <MenuItem value="AP">AP</MenuItem>
                  <MenuItem value="AM">AM</MenuItem>
                  <MenuItem value="BA">BA</MenuItem>
                  <MenuItem value="CE">CE</MenuItem>
                  <MenuItem value="DF">DF</MenuItem>
                  <MenuItem value="ES">ES</MenuItem>
                  <MenuItem value="GO">GO</MenuItem>
                  <MenuItem value="MA">MA</MenuItem>
                  <MenuItem value="MT">MT</MenuItem>
                  <MenuItem value="MS">MS</MenuItem>
                  <MenuItem value="MG">MG</MenuItem>
                  <MenuItem value="PA">PA</MenuItem>
                  <MenuItem value="PB">PB</MenuItem>
                  <MenuItem value="PR">PR</MenuItem>
                  <MenuItem value="PE">PE</MenuItem>
                  <MenuItem value="PI">PI</MenuItem>
                  <MenuItem value="RJ">RJ</MenuItem>
                  <MenuItem value="RN">RN</MenuItem>
                  <MenuItem value="RS">RS</MenuItem>
                  <MenuItem value="RO">RO</MenuItem>
                  <MenuItem value="RR">RR</MenuItem>
                  <MenuItem value="SC">SC</MenuItem>
                  <MenuItem value="SP">SP</MenuItem>
                  <MenuItem value="SE">SE</MenuItem>
                  <MenuItem value="TO">TO</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="email"
                variant="filled"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="telefone"
                name="telefone"
                label="telefone"
                variant="filled"
                value={telefone}
                fullWidth
                onChange={(e) => {
                  const value = onlyNumber(e.target.value);
                  setTelefone(formatPhoneNumber(value));
                }}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleNextStep}>
                Próximo
              </Button>
            </Grid> */}
          </Fragment>
        )}
        {/* {activeStep === 1 && (
          <Fragment>
            <Grid item xs={12}>
              <TextField
                id="cep"
                name="cep"
                label="CEP"
                variant="filled"
                value={cep}
                fullWidth
                onChange={(e) => setCep(formatCepInput(e.target.value))}
                autoComplete="shipping address-line1"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Endereço"
                fullWidth
                onChange={(e) => setLogradouro(e.target.value)}
                value={formDataCep.localidade}
                autoComplete="shipping address-line1"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="bairro"
                name="bairro"
                label="Bairro"
                fullWidth
                onChange={(e) => setBairro(e.target.value)}
                value={formDataCep.bairro}
                autoComplete="shipping address-line1"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="complemento"
                name="complemento"
                label="Complemento"
                fullWidth
                onChange={(e) => setComplemento(e.target.value)}
                value={complemento}
                autoComplete="shipping address-line1"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="numerocasa"
                name="numerocasa"
                label="Nº da casa"
                fullWidth
                onChange={(e) => setNumeroDoEndereco(e.target.value)}
                value={numeroDoEndereço}
                autoComplete="shipping address-line1"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="Cidade"
                fullWidth
                value={formDataCep.localidade}
                autoComplete="shipping address-level2"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="Estado"
                fullWidth
                value={formDataCep.uf}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handlePreviousStep}>
                Voltar
              </Button>
            </Grid>
          </Fragment>
        )} */}
        <Button style={{ width: '550px', margin: 'auto', fontWeight: '800', padding: '15px', backgroundColor: '#006BED' }} variant="contained" color="primary" onClick={() => { }}>
          Cadastrar
        </Button>
      </Grid>


    </Fragment>
  )
}