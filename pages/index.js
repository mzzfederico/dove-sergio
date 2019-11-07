import React from "react";
import Head from "next/head";
import Nuvola from "../components/nuvola";
import { domande, risposte } from "../components/frasi";

function generaFraseRandom (array) {
    return array[Math.floor(Math.random() * array.length)];
}

const Home = () => {
    return (<div>
        <Head>
            <title>C'è Sergio?</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Chat domanda={generaFraseRandom(domande)} risposta={generaFraseRandom(risposte)} />
    </div>);
};

const Chat = ({domanda = "Dove?", risposta = "Boh."}) => {
    /* Secondi... */
    const [ seconds, setSeconds ] = React.useState(0);
    React.useEffect(() => { const id = setInterval(() => { setSeconds(seconds + 1); }, 1000); return () => clearInterval(id); });

    const stati = {
        0: { mittente: "scrivendo", destinatario: "nascosto", riprova: false },
        1: { mittente: "arrivato", destinatario: "nascosto", riprova: false },
        2: { mittente: "arrivato", destinatario: "scrivendo", riprova: false },
        3: { mittente: "arrivato", destinatario: "arrivato", riprova: true },
    };

    const keyframes = Object.keys(stati);
    const statiPossibili = keyframes.filter(
        keyframe => keyframe < seconds
    );

    const keyframeCorrente = statiPossibili.length > 0 ? Math.max(...statiPossibili) : keyframes[keyframes.length - 1];
    const statoAttuale = stati[keyframeCorrente];

    return (
        <div className="chat">
            <div className="mittente">
                <Nuvola contenuto={domanda} fondo={"#666666"} direzione="right" stato={statoAttuale.mittente} />
            </div>
            <div className="destinatario">
                <Nuvola contenuto={risposta} stato={statoAttuale.destinatario} />
            </div>

            <style jsx>{`
                    .chat {
                        width: 100vw;
                        height: 100vh;
                        display: grid;
                        background-color: #2B6482;

                        grid-template-columns: 10vw 1fr 1fr 1fr 1fr 10vw;
                        grid-template-rows: 10vw 1fr 1fr 1fr 1fr 3rem 10vw;
                    }

                    .mittente {
                        grid-area: 2 / 4 / 4 / 6;
                    }

                    .destinatario {
                        grid-area: 4 / 2 / 6 / 4;
                    }
                `}</style>
        </div>
    );
};

export default Home;
