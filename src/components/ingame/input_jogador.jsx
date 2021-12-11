import React from "react";
import {Stack} from './gameFuncs'

// Arquivo para coletar input do usuário

class NameForm extends React.Component{

    // Construtor definindo os atributos do objeto, seu estado e sua variação durante a atribuição de valores.
    constructor(props) {
        super(props)
        this.state = { value: ''};
        this.stack = new Stack();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // Recebe o valor escrito pelo usuário
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    // Faz a atribuição dos valores e a validação, utilizando a Stack implementada e propriedades do uso de Classe. 
    handleSubmit(event) {
        this.stack.push(this.state.value) 
        event.preventDefault();
        this.props.inputJogador(this.stack.a);
        this.setState({value: ''});
        if (this.stack.n === 6) {
            this.stack = new Stack(); //reseta a stack caso o length dela seja 6
            this.props.statusButton(false); //desbloqueia o botão
        }
        else { //caso não seja, bloqueia o botão result
            this.props.statusButton(true);
        }
        
    }

    // Por fim, a renderização do componente responsável pela coleta do input.
    // Nele temos um <form> responsável pela construção do formulário composto pelo input
    // O input recebe como valor o objeto instanciado após o onChange alterar o elemento utilizando a função handleChange.
    // Após o submit, a função handleSubmit é acionada salvando o input e adicionando no Stack
    render(){
        return (
            <div className='player-input'>
                <form onSubmit={this.handleSubmit} >
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <button type="submit">Confirmar palavra</button>
                </form>
            </div>
        )
    }
}
export default NameForm