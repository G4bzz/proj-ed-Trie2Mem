import React, {useState} from 'react'
import './app.css'
import Menu from './components/menu_init/menuGame'
import Game from './components/ingame/contaRodadas'
import Manual from './components/instrucoes/instrucoes'

const Func = props =>{
  //controla o estado responsável por gerenciar as escolhas no menu
  const [modo, setModo] = useState(1)

  function handleChangeModo(modo){
    setModo(modo)
  }
  
  return( //componente que monta o menu
    <>
      <div className='container-app'>
        {
          modo === 1?
          ((<Menu escolha={handleChangeModo}></Menu>)) : modo === 2 ?
          (<Game escolha={handleChangeModo} fechar={'block'}></Game>) :
          (<Manual escolha={handleChangeModo} fechar={'block'}></Manual>)
        }
      </div>
    </>
  )
}

export default Func