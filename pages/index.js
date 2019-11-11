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
    const [ seconds, setSeconds ] = React.useState(0.1);
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
            <div className="logo">
                <span>dov'èserg<span className="irossa">i</span>o<span className="ext">.it?</span></span>
            </div>

            <div className="mittente">
                <Nuvola contenuto={domanda} fondo={"#666666"} direzione="right" stato={statoAttuale.mittente} />
            </div>
            <div className="destinatario">
                <Nuvola contenuto={risposta} stato={statoAttuale.destinatario} />
            </div>

            <style jsx>{`
                    @import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');

                    .irossa {
                        color: #C12400;
                    }

                    .ext {
                        font-size: 1.5rem;
                    }

                    .logo {
                        font-family: "Josefin Sans", -apple-system, BlinkMacSystemFont, “Roboto”, “Droid Sans”, “Helvetica Neue”, Helvetica, Arial, sans-serif;
                        text-align: center;
                        font-size: 2rem;
                        color: white;
                        grid-area: 2 / 3 / 3 / 5;
                    }

                    .chat {
                        width: 100vw;
                        height: 100vh;
                        display: grid;
                        background-color: #2B6482;

                        grid-template-columns: 10vw 1fr 1fr 1fr 1fr 10vw;
                        grid-template-rows: 10vw 1fr 1fr 1fr 1fr 1fr 3rem 10vw;
                    }

                    .mittente {
                        grid-area: 3 / 4 / 5 / 6;
                    }

                    .destinatario {
                        grid-area: 5 / 2 / 7 / 4;
                    }
                `}</style>
        </div>
    );
};

export default Home;
