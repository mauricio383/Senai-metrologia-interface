import React from "react";
// Importando componente de Erro.
import Erro from "./Feedback/Erro/Erro";
// Importando componente de Loading.
import Loading from "./Feedback/Loading/Loading";
// import do componente TemperaturaRecente.
import TemperaturaRecente from "./TemperaturaRecente/TemperaturaRecente.js";
// Import do componente SLide.
import Slide from "./Slide/Slide/Slide";
import Head from "./Head";
import { useSelector } from "react-redux";

const Home = () => {
    const { dados, loading, erro } = useSelector((state) => state.dashboard);

    React.useEffect(() => {
        const intervalo = setInterval(() => {
            const minutos = new Date().getMinutes();

            if (minutos === 1 || minutos === 16 || minutos === 31 || minutos === 46) {
                document.location.reload(true);
            }
        }, 60 * 1000);

        return () => {
            clearInterval(intervalo);
        };
    }, []);

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
                <Head
                    title="Home"
                    description="Aplicação desenvolvida para turma de metrologia do SENAI Suiço-Brasileira"
                />

                <TemperaturaRecente />
    
                <Slide />
            </main>
        );
    }

    return null;
};

export default Home;
