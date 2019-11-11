import React from "react";
import { motion } from "framer-motion";

const Nuvola = ({ fondo = "#C12400", testo = "#fafafa", contenuto = "", direzione = "left", stato = false }) => ({
    scrivendo: <Spinner />,
    arrivato: <motion.div className="animatore" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}>

        <div className="nuvola" style={{ fontSize: contenuto.length > 16 ? "1.5rem" : "2rem"}}>{contenuto}</div>

        <style jsx>{`
             @import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');

            .nuvola {
                font-family: "Josefin Sans", -apple-system, BlinkMacSystemFont, “Roboto”, “Droid Sans”, “Helvetica Neue”, Helvetica, Arial, sans-serif;
                color: ${testo};

                margin: 2rem 4rem;
                padding: 2rem;
                position: relative;
                background: ${fondo};
                border-radius: .4em;
            }

            .nuvola:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 0;
                height: 0;
                border: 20px solid transparent;
                border-top-color: ${fondo};
                border-bottom: 0;
                ${direzione === "left" ? "border-left: 0;" : "border-right: 0;"}
                margin-left: -10px;
                margin-bottom: -20px;
            }
        `}</style>
    </motion.div>,
    nascosto: null
})[stato];

const Spinner = () => (
    <div className="spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
        
        <style jsx>{`
            .spinner {
                margin: 100px auto 0;
                width: 140px;
                text-align: center;
            }

            .spinner > div {
                width: 32px;
                height: 32px;
                margin-right: 5px;
                background-color: #fafafa;

                border-radius: 100%;
                display: inline-block;
                -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
                animation: sk-bouncedelay 1.4s infinite ease-in-out both;
            }

            .spinner .bounce1 {
                -webkit-animation-delay: -0.32s;
                animation-delay: -0.32s;
            }

            .spinner .bounce2 {
                -webkit-animation-delay: -0.16s;
                animation-delay: -0.16s;
            }

            @-webkit-keyframes sk-bouncedelay {
                0%, 80%, 100% { -webkit-transform: scale(0) }
                40% { -webkit-transform: scale(1.0) }
            }

            @keyframes sk-bouncedelay {
                0%, 80%, 100% { 
                    -webkit-transform: scale(0);
                    transform: scale(0);
                } 40% { 
                    -webkit-transform: scale(1.0);
                    transform: scale(1.0);
                }
            }
        `}</style>
    </div>
);

export default Nuvola;