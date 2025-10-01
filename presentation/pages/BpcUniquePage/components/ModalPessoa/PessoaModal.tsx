import { onlyNumber, formatCpf } from '@/app/utils/Formater';
import { formatarDataParaFormatoAmericano } from '@/domain/services/Date';
import GridTextField from '@/presentation/components/GridTextField';
import ModalComponent from '@/presentation/components/Modal';
import { Grid, Typography, TextField, FormControl, Select, MenuItem, FormHelperText, Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

interface IPessoaModal {
    pessoaId: string
    pessoaModal: boolean
    pessoaNome: string
    cpfPessoa: string
    errorsPessoa: any
    estadoCivilPessoa: string
    rendaPessoa: string
    parentesco: string
    fonteDeRendaPessoa: string
    dataNascimentoPessoa: string
    pessoaSelecionada: string | undefined
    cpfClient: string
    rgPessoa: string
    profissaoPessoa: string
    setPessoaModal: (value: boolean) => void
    setPessoaNome: (value: string) => void
    handleSubmitPessoa: (value: any) => any
    handleAddPessoaSubmit: () => Promise<void>
    registerPessoa: (value: string) => any
    setCpfPessoa: (value: string) => void
    setEstadoCivilPessoa: (value: any) => void
    resetPessoa: (value: any) => void
    setRendaPessoa: (value: string) => void
    ContractValueMemo: (value: any) => JSX.Element
    setParentesco: (value: string) => void
    setFonteDeRendaPessoa: (value: string) => void
    setDataNascimentoPessoa: (value: string) => void
    calculateIdade: (value: string) => void
    setRgPessoa: (value: string) => void
    setProfissaoPessoa: (value: string) => void
}

export default function PessoaModal(props: IPessoaModal) {
    const {
        pessoaId,
        pessoaModal,
        pessoaNome,
        errorsPessoa,
        cpfPessoa,
        estadoCivilPessoa,
        rendaPessoa,
        parentesco,
        fonteDeRendaPessoa,
        dataNascimentoPessoa,
        pessoaSelecionada,
        cpfClient,
        rgPessoa,
        profissaoPessoa,
        handleSubmitPessoa,
        setPessoaNome,
        setPessoaModal,
        handleAddPessoaSubmit,
        registerPessoa,
        setCpfPessoa,
        setEstadoCivilPessoa,
        resetPessoa,
        setRendaPessoa,
        ContractValueMemo,
        setParentesco,
        setFonteDeRendaPessoa,
        setDataNascimentoPessoa,
        calculateIdade,
        setRgPessoa,
        setProfissaoPessoa
    } = props

    return (
        <ModalComponent
            nomeModal={pessoaId ? "Editar Pessoa" : "Cadastrar Pessoa"}
            width="1000px"
            handleClose={() => setPessoaModal(false)}
            handleOpen={() => setPessoaModal(true)}
            open={pessoaModal}
        >
            <Box
                style={{ marginTop: "30px" }}
                component="form"
                noValidate
                onSubmit={handleSubmitPessoa(handleAddPessoaSubmit)}
            >
                <Grid container>
                    <Grid
                        style={{ borderRadius: "30px", padding: "5px" }}
                        item
                        xs={12} sm={6}
                    >
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Nome
                        </Typography>
                        <TextField
                            type="text"
                            error={errorsPessoa.pessoaNome ? true : false}
                            helperText={errorsPessoa.pessoaNome?.message?.toString()}
                            {...registerPessoa("pessoaNome")}
                            placeholder="Digite o nome"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                            defaultValue={pessoaNome}
                            onBlur={(e) => setPessoaNome(e.target.value)}
                        />
                    </Grid>

                    <Grid
                        item
                        style={{ borderRadius: "30px", padding: "5px" }}
                        xs={12} sm={6}
                    >
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            CPF
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            fullWidth
                            value={cpfPessoa}
                            error={errorsPessoa.cpfPessoa ? true : false}
                            helperText={errorsPessoa.cpfPessoa?.message?.toString()}
                            {...registerPessoa("cpfPessoa")}
                            onChange={(e) => {
                                const defaultValue = onlyNumber(e.target.value);
                                setCpfPessoa(formatCpf(defaultValue));
                                resetPessoa({
                                    cpfPessoa: formatCpf(defaultValue),
                                });
                            }}
                            placeholder={cpfPessoa ? '' : 'CPF'}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            name='cpf'
                        />
                    </Grid>

                    <Grid
                        item
                        style={{ borderRadius: "30px", padding: "5px" }}
                        xs={12} sm={6}
                    >
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Estado Civil
                        </Typography>
                        <FormControl
                            fullWidth
                            variant="filled"
                            error={errorsPessoa.estadoCivilPessoa ? true : false}
                        >
                            <Select
                                id="estadoCivil"
                                variant="outlined"
                                displayEmpty
                                fullWidth
                                value={estadoCivilPessoa}
                                style={{
                                    borderRadius: "10px",
                                }}
                                {...registerPessoa("estadoCivilPessoa")}
                                onChange={(e) => {
                                    setEstadoCivilPessoa(e.target.value);
                                    resetPessoa({
                                        estadoCivilPessoa: e.target.value,
                                    });
                                }}
                            >
                                <MenuItem selected defaultValue="" disabled>
                                    Selecione o estado civil
                                </MenuItem>
                                <MenuItem value={"Solteiro(a)"}>Solteiro(a)</MenuItem>
                                <MenuItem value={"Casado(a)"}>Casado(a)</MenuItem>
                                <MenuItem value={"Divorciado(a)"}>Divorciado(a)</MenuItem>
                                <MenuItem value={"Viuvo(a)"}>Viúvo(a)</MenuItem>
                                <MenuItem value={"Separado(a) Judicialmente"}>
                                    Separado(a) Judicialmente
                                </MenuItem>
                                <MenuItem defaultValue={"em União Estável"}>
                                    em União Estável
                                </MenuItem>
                            </Select>
                            {errorsPessoa.estadoCivilPessoa ? (
                                <FormHelperText>
                                    {errorsPessoa.estadoCivilPessoa?.message?.toString()}
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                    </Grid>

                    <Grid
                        item
                        style={{ borderRadius: "30px", padding: "5px" }}
                        xs={12} sm={6}
                    >
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Renda
                        </Typography>
                        <TextField
                            type="text"
                            error={errorsPessoa.rendaPessoa ? true : false}
                            helperText={errorsPessoa.rendaPessoa?.message?.toString()}
                            {...registerPessoa("rendaPessoa")}
                            placeholder="Digite a Renda"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                            defaultValue={rendaPessoa}
                            onBlur={(e) => {
                                setRendaPessoa(e.target.value);
                                resetPessoa({
                                    rendaPessoa: e.target.value,
                                });
                            }}
                            variant="outlined"
                            InputProps={{
                                inputComponent: ContractValueMemo,
                            }}
                        />
                    </Grid>

                    <Grid
                        item
                        style={{ borderRadius: "30px", padding: "5px" }}
                        xs={12} sm={6}
                    >
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Grau de parentesco
                        </Typography>
                        <TextField
                            type="text"
                            error={errorsPessoa.parentesco ? true : false}
                            helperText={errorsPessoa.parentesco?.message?.toString()}
                            {...registerPessoa("parentesco")}
                            placeholder="Digite o grau de parentesco"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                            value={parentesco}
                            onChange={(e) => {
                                setParentesco(e.target.value);
                                resetPessoa({
                                    parentesco: e.target.value,
                                });
                            }}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid
                        item
                        style={{ borderRadius: "30px", padding: "5px" }}
                        xs={12} sm={6}
                    >
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Fonte de Renda
                        </Typography>
                        <TextField
                            error={errorsPessoa.fonteDeRendaPessoa ? true : false}
                            helperText={errorsPessoa.fonteDeRendaPessoa?.message?.toString()}
                            {...registerPessoa("fonteDeRendaPessoa")}
                            placeholder="Digite a Fonte de Renda"
                            fullWidth
                            value={fonteDeRendaPessoa}
                            onChange={(e) => {
                                setFonteDeRendaPessoa(e.target.value);
                                resetPessoa({
                                    fonteDeRendaPessoa: e.target.value,
                                });
                            }}
                        />
                    </Grid>

                    <Grid
                        item
                        style={{ borderRadius: "30px", padding: "5px" }}
                        xs={12} sm={6}
                    >
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Data de Nascimento
                        </Typography>
                        <TextField
                            type="date"
                            error={errorsPessoa.dataNascimentoPessoa ? true : false}
                            helperText={errorsPessoa.dataNascimentoPessoa?.message?.toString()}
                            {...registerPessoa("dataNascimentoPessoa")}
                            placeholder="Digite a Renda"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                            defaultValue={formatarDataParaFormatoAmericano(dataNascimentoPessoa)}
                            onBlur={(e) => {
                                setDataNascimentoPessoa(e.target.value);
                                resetPessoa({
                                    dataNascimentoPessoa: e.target.value,
                                });
                                if (pessoaSelecionada === cpfClient) {
                                    calculateIdade(e.target.value);
                                }
                            }}
                        />
                    </Grid>

                    <Grid
                        item
                        style={{ borderRadius: "30px", padding: "5px" }}
                        xs={12} sm={6}
                    >
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            RG
                        </Typography>
                        <TextField
                            type="text"
                            error={errorsPessoa.rgPessoa ? true : false}
                            helperText={errorsPessoa.rgPessoa?.message?.toString()}
                            {...registerPessoa("rgPessoa")}
                            placeholder="Digite o RG"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                            defaultValue={rgPessoa}
                            onBlur={(e) => {
                                setRgPessoa(e.target.value);
                                resetPessoa({
                                    rgPessoa: e.target.value,
                                });
                            }}
                        />
                    </Grid>

                    <Grid style={{ borderRadius: "30px" }} item xs={12} sm={6} >
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Profissão
                        </Typography>
                        <TextField
                            type="text"
                            error={errorsPessoa.profissaoPessoa ? true : false}
                            helperText={errorsPessoa.profissaoPessoa?.message?.toString()}
                            {...registerPessoa("profissaoPessoa")}
                            placeholder="Digite a Profissão"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                            defaultValue={profissaoPessoa}
                            onBlur={(e) => {
                                setProfissaoPessoa(e.target.value);
                                resetPessoa({
                                    profissaoPessoa: e.target.value,
                                });
                            }}
                        />
                    </Grid>

                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, padding: "10px" }}
                >
                    {pessoaId ? "Atualizar" : "Adicionar"}
                </Button>
            </Box>
        </ModalComponent>
    )
}
