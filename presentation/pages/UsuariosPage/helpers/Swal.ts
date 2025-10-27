import Swal from "sweetalert2";
import { Usuarios } from "../UsuariosPage";
import { deleteUser, insertUser, updateUser } from "@/app/api/client/users";

export const handleDelete = async (props: {
    id: string,
    setUsuarios: (value: Usuarios[]) => void,
    usuarios: Usuarios[]
}) => {
    const {
        id,
        setUsuarios,
        usuarios
    } = props

    await Swal.fire({
        title: 'Tem certeza que deseja excluir este item?',
        text: "Esta ação não pode ser revertida!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await deleteUser(id);
                Swal.fire(
                    'Excluído!',
                    'O item foi excluído com sucesso.',
                    'success'
                );
                setUsuarios(usuarios.filter((item) => item.id !== id));
            } catch (error) {
                Swal.fire(
                    'Erro!',
                    'Ocorreu um erro ao excluir o item.',
                    'error'
                );
            }
        }
    });
}

export const vincularUsuarioAgenda = async (props: {
    id: string,
    setUsuarios: (value: Usuarios[]) => void,
    updateUserAgenda: (is: string, acesso_agenda: string) => any,
    usuarios: Usuarios[],
    acesso_agenda: boolean
}) => {
    const {
        id,
        acesso_agenda,
        setUsuarios,
        updateUserAgenda
    } = props

    try {
        const updatedUser = await updateUserAgenda(id, acesso_agenda ? "true" : "false");
        setUsuarios(updatedUser);
    } catch (err: any) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: err.response.data.error
        });
    }
}

export const handleUserFormSubmit = async (props: {
    formRef: any,
    userChoose: any,
    usuarios: Usuarios[]
    setLoading: (value: boolean) => void
    setUsuarios: (value: Usuarios[]) => void
    setUserChoose: (value: Usuarios[] | null) => void
    setOpen: (value: boolean) => void
}) => {
    const {
        formRef,
        userChoose,
        usuarios,
        setLoading,
        setUsuarios,
        setUserChoose,
        setOpen
    } = props
    console.log('user form submit')
    try {
        if (formRef.current) {
            setLoading(true);
            const formData = new FormData(formRef.current);
            const nome = formData.get('nome') as string;
            const email = formData.get('email') as string;
            const telefone = formData.get('telefone') as string;
            const nivel = formData.get('nivel') as string;
            const cpf = formData.get('cpf') as string;
            const oab = formData.get('oab') as string;
            const oab_estado = formData.get('oab_estado') as string;


            if (userChoose) {
                const updatedUser = await updateUser(
                    userChoose.id,
                    {
                        nome,
                        email,
                        telefone,
                        nivel,
                        cpf,
                        oab,
                        oab_estado,
                    }
                );
                setUsuarios(usuarios.map((user) => (user.id === userChoose.id ? updatedUser : user)));
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Usuário atualizado com sucesso.'
                });
            } else {
                const newUser = await insertUser({
                    nome,
                    email,
                    telefone,
                    nivel,
                    cpf,
                    oab,
                    oab_estado,
                });
                setUsuarios([...usuarios, newUser]);
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Usuário cadastrado com sucesso.'
                });
            }
            setOpen(false);
            setUserChoose(null);
            setLoading(false);
        }
    } catch (error: any) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.response.data.error
        });
        setLoading(false);
    }
}