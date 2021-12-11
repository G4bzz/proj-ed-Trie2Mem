import React from "react";
import Manual from "./manual";
import './instrucoes.css';

const instrucoes = props =>{
    
    //renderiza a tela de manual, chamando o componente que faz a leitura do .md
    return (
        <>
        <div className='fechar-tela'>
            <button onClick={() => props.escolha(1)}>Voltar ao menu</button>
        </div>
        <div className='container-manual'>
            <div className='manual'>
                <Manual></Manual>
            </div>
        </div>
        </>
    ) 
}

export default instrucoes