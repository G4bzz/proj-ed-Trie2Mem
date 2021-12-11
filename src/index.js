import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './app.css'
import Musica from './components/menu_init/playMusic';

import App from './app'

//Renderiza o jogo e o player de música na página

ReactDOM.render(
    <>
        <Musica></Musica>
        <App></App>
    </>,
    document.getElementById('root')
)