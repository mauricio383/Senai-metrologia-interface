import React from "react";
// Importando contexto de dados.
import { DadosContext } from "../DadosContext";
// Importando componente de Erro.
import Erro from "./Feedback/Erro/Erro";
// Importando componente de Loading.
import Loading from "./Feedback/Loading/Loading";
// import do componente TemperaturaAtual.
import TemperaturaAtual from "./TemperaturaAtual/TemperaturaAtual.js";
// Import do componente SLide.
import Slide from "./Slide/Slide/Slide";

const Home = () => {
    const { dados, erro, loading } = React.useContext(DadosContext);

    if (loading) {
        return (
            <section className="container">
                <Loading />
            </section>
        );
    }

    if (erro) {
        return (
            <section className="container animarEntrada">
                <Erro erro="Erro ao buscar os dados." />
            </section>
        );
    }

    if (dados) {
        return (
            <main>
                <TemperaturaAtual dados={dados} />
    
                <Slide dados={dados} />
            </main>
        );
    }

    return null;
};

export default Home;
