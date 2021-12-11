import React, { useState, useEffect, useRef} from "react";
import './rodada.css'
import {Rodadas} from './gameFuncs'
import InputForm from './input_jogador'

//Inicialização do jogo na rodada 1, através do instanciamento do objeto Rodadas
//Instanciando fora do escopo do componente, faz com que esse objeto fique salvo durante toda a execução do projeto
let jogada = new Rodadas(1);

const Game = props =>{
    //Estado com um array que controla a visbilidade das telas
    const [visibilidade, setVisibility] = useState(['grid', 'none', 'none', 'none']);
    //Array para armazenar o input do jogador
    const [arrayInput, setArrayInput] = useState([]);
    //Estado que guarda uma referencia sobre a renderização do componente rodada
    //Foi implementado para corrigir um bug referente ao setTimeOut na página
    const isInitialRender = useRef(true);
    //Estado auxiliar para a correção do bug
    const [fixTela, setfixTela] = useState(false);
    //Estado que controla o estatus do botão result
    const [statusBotao, setStatusBotao] = useState(true);
    //Função auxiliar para setar o array de input do jogador
    function handleSetaArray(prop) {
        setArrayInput(prop)
    }

    //Timer para a primeira renderização do componente
    //Responsável por trocar da tela de palavras para a tela de input
    useEffect(() =>{
        const timer = setTimeout(() => setVisibility(['none', 'block', 'none', 'none']), Math.ceil(1/Math.sqrt(props.rodaAtual)*10000));
        return () => clearTimeout(timer);
    },[]);
    
    //Timer para as próximas renderizações do componente
    useEffect(() => {
        if (!isInitialRender.current) {
           isInitialRender.current = true;
        } else {
            if (fixTela ===true) {
                const timer = setTimeout(() => setVisibility(['none', 'block', 'none', 'none']), Math.ceil(1/Math.sqrt(props.rodaAtual)*10000));
                return () => clearTimeout(timer);
            }
        }
      });
    
    //Retorna o componente rodada
    return (
        /* Parte superior do game, mostra a rodada e comporta o botão de voltar ao menu principal */
        <div className='game-container'>
            <div className='top-game'>
                <div className='rodada'>
                    <h1>Rodada: {props.rodaAtual}</h1>
                </div>
                <div className='fechar-tela'>
                    <button onClick={() => { //O botão de retorno ao menu reseta todo o jogo
                        props.escolha(1);
                        jogada.reset(1);
                        jogada.acertosTotais = 0;
                    }}>Voltar ao menu</button>
                </div>
            </div>

            {/* Tela com grid de palavras */}
            <div style={{display: visibilidade[0]}}>
                <div className='instrucoes-jogada'>
                    <h4>Memorize as palavras!!</h4>
                </div>
                <div className='conteiner-palavras'>
                    <div className='grid-game'> {/* exibe as palavras sorteadas no objeto jogada */}
                        <div><p>{jogada.lista[0]}</p></div>
                        <div><p>{jogada.lista[1]}</p></div>
                        <div><p>{jogada.lista[2]}</p></div>
                        <div><p>{jogada.lista[3]}</p></div>
                        <div><p>{jogada.lista[4]}</p></div>
                        <div><p>{jogada.lista[5]}</p></div>
                    </div>
                </div>
            </div>

            {/* Tela de input do jogador */}
            <div style={{display: visibilidade[1]}}>
                <div className='instrucoes-jogada'>
                    <h4>Digite as palavras que você memorizou!!</h4>
                </div>
                <div>
                    {/* Componente de input com 2 parâmetros, são eles:
                        inputJogador = está passando a função handleSetArray, para receber o array do input e inserir no arrayInput
                        statusButton = está passando a função setStatusBotao para alterar o status do botão result
                    */}
                    <InputForm inputJogador={handleSetaArray} statusButton={setStatusBotao}></InputForm>
                </div>
                <div className='botaoResult'>
                    {/* Botão result dá trigger no cálculo de acertos e verifica qual tela será exibida: a de game over ou resultado da rodada*/}
                    <button type='button' disabled={statusBotao} onClick={() => {
                        //Calcula os acertos da rodada, recebendo o array de input
                        jogada.calcAcertos(arrayInput);
                        //Calcula os acertos totais do jogador
                        jogada.calcAcertosTotais();
                        //Corrige um bug relacionado ao setTimeOut
                        setfixTela(false);
                        //Se o a quantidade de acertos da rodada for maior que 3 exibe a tela de resultado com a possibilidade de avançar a rodada
                        if (jogada.acertos > 3) setVisibility(['none', 'none', 'flex', 'none']);
                        //Caso contrário, exibe a tela de gameover
                        else setVisibility(['none', 'none', 'none', 'flex']);
                    }}>Resultado</button>
                </div>
            </div>

            {/* Tela de resultado*/}
            <div className='result' style={{display: visibilidade[2]}}>
                <div className='grid-result'> 
                    <div id='tela-result' className='lista-res'>
                        <h1>Suas respostas:</h1>
                        {/* Exibe as palavras digitadas pelo jogador */}
                        <ul type='none'>
                            <li>{arrayInput[0]}</li>
                            <li>{arrayInput[1]}</li>
                            <li>{arrayInput[2]}</li>
                            <li>{arrayInput[3]}</li>
                            <li>{arrayInput[4]}</li>
                            <li>{arrayInput[5]}</li>
                        </ul>
                    </div>
                    <div className='lista-res'>
                        <h1>Palavras exibidas:</h1>
                        {/* Exibe as palavras sorteadas para a rodada */}
                        <ul type='none'>
                            <li>{jogada.lista[0]}</li>
                            <li>{jogada.lista[1]}</li>
                            <li>{jogada.lista[2]}</li>
                            <li>{jogada.lista[3]}</li>
                            <li>{jogada.lista[4]}</li>
                            <li>{jogada.lista[5]}</li>
                        </ul>
                    </div>
                </div>
                <div className='show-acertos'>
                    {/* Mostra os acertos da rodada */}
                    <h3> Você acertou <span>{jogada.acertos}</span> palavras !</h3>
                </div>
                <div className='botaoProxRod'>
                    {/* Botão para avançar para a próxima rodada */}
                    <button type='button' onClick={() => {
                        //mostra o grid de palavras novamente
                        setVisibility(['grid', 'none', 'none', 'none']);
                        //Troca a rodada para a seguinte
                        props.trocaRodada(props.rodaAtual + 1);
                        //Faz o reset parcial do objeto, gerando uma nova lista de palavras sortidas de acordo com
                        // a próxima rodada e reseta os pontos da rodada (mantém os pontos totais)
                        jogada.reset(props.rodaAtual + 1)
                        //Reseta o array de input
                        handleSetaArray([]);
                        //Corrige o bug do setTimeOut
                        setfixTela(true);
                    }}>Próxima rodada</button>
                </div>
            </div>
            
            {/* Tela de GameOver */}
            <div className='game-over' style={{display: visibilidade[3]}}>
                {/* Apenas mostra os acertos da rodada e acertos totais, logo, obriga o jogador a voltar para o menu. */}
                <div className='instrucoes-jogada'>
                    <h1>Game Over!!</h1>
                    <h4>Acertos da rodada: {jogada.acertos}</h4>
                    <h4>Total de acertos: {jogada.acertosTotais}</h4>
                </div>
            </div>
        </div>
    ) 
}

export default Game