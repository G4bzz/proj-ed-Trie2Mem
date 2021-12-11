import React, {useState} from 'react';
import Rodada from './rodada'

//Componente que comporta as rodadas renderizadas, possibilitando a contagem delas
// por meio de um estado.
const ContaRodadas = props =>{
    const [repets, setRepets] = useState(1); 

    function handleChangeRepets(props){
        setRepets(props)
    }

    return (
            <Rodada trocaRodada={handleChangeRepets} rodaAtual={repets} escolha={props.escolha}></Rodada>
        )

}

export default ContaRodadas;