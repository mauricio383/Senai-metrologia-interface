import React from "react";
import estilos from "./CadastroEmail.module.css";
import FormCadastro from "../FormCadastro/FormCadastro.js";
import TabelaEmails from "../TabelaEmails/TabelaEmails";
import Loading from "../Feedback/Loading/Loading.js";
import Erro from "../Feedback/Erro/Erro.js";
import { GET_EMAILS, POST_EMAILS, PUT_EMAILS, DELETE_EMAILS } from "../../api.js";
import useFetch from "../../Hooks/useFetch.js";

const initialState = {
    user: {
        nome: "",
        email: ""
    }
};

const CadastroEmail = () => {
    const { dados, loading, erro, request } = useFetch();
    const [user, setUser] = React.useState(initialState.user);
    const [enviando, setEnviando] = React.useState(null);
    const [erroform, setErro] = React.useState(null);

    const limpar = () => {
        setUser(initialState.user);
        setErro(null);
    };

    const atualizarCampos = ({ target }) => setUser((user) => ({
        ...user,
        [target.name]: target.value
    }));

    const carregar = (user) => setUser(user);

    const buscarDados = async () => {
        const { url, options } = GET_EMAILS();
        await request(url, options);
    }

    const salvar = async () => {
        setEnviando(true);
        let config;
    
        if (user?.id) {
            config = PUT_EMAILS(user.id, user);
        } else {
            config = POST_EMAILS(user);
        }

        const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const emailExiste = dados.map(({ email }) => email).includes(user["email"]);
        const emailValido = regexEmail.test(user["email"]);

        if (!user["nome"] && !user["email"]) {
            setErro("Por favor, preencha todos os campos!");
        } else if (!emailValido) {
            setErro("E-mail inválido! Tente novamente");
        } else if (emailExiste && !user?.id) {
            setErro("E-mail já existente, cadastre um novo!");
        } else {
            setErro(null);
            await fetch(config.url, config.options);

            limpar();
            buscarDados();
        }

        setEnviando(false);
    };

    const remover = async (user) => {
        const confirmacao = window.confirm("Tem certeza que deseja remover o e-mail?");

        if (confirmacao) {
            const { url, options } = DELETE_EMAILS(user.id);
            await fetch(url, options);
            await buscarDados();
        }
    };

    React.useEffect(() => {
        async function iniciarDados() {
            const { url, options } = GET_EMAILS();
            await request(url, options);
        }

        iniciarDados();
    }, [request]);

    return (
        <section className={`${estilos.sessao} animarEntrada`}>
            <div className={estilos.card}>
                <FormCadastro
                    value={user}
                    setValue={atualizarCampos}
                    loading={enviando}
                    limpar={limpar}
                    submit={salvar}
                    erro={erroform}
                />

                { loading && <Loading /> }
                { erro && <Erro erro={"Erro ao buscar os e-mails."} /> }
                { dados && <TabelaEmails lista={dados} carregar={carregar} remover={remover} /> }
            </div>
        </section>
    )
};

export default CadastroEmail;
