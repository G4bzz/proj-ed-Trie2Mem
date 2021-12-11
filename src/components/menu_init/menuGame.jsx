import React from "react";
import './menuGame.css';


const Menu = props =>{
    //componente Menu, renderiza os botões, nome do jogo e altera
    // o estado da escolha de acordo com o botão clicado.
    return(
    <div className='menu-container' style={{display: props.visivel}}>
        <div className='game-logo'>
            <h1>Trie2Mem</h1>
            <h3>v1.0</h3>
        </div>
        <div className='botoes-container'>
            <button onClick={() => props.escolha(2)}>Iniciar jogo</button>
            <button onClick={() => props.escolha(3)}>Instruções</button>
        </div>
    </div>
)
}

export default Menu