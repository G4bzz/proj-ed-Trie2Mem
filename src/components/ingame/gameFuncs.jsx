import {BancoPalavras} from './DadosPalavras.jsx'

////////////////////////////////////////////////////
//Trie.
class TrieNode{
  constructor(){
  this.children = Array(26);
  this.isEndOfWord = false;
  }
}


export class Trie {
    constructor(){
        this.root = new TrieNode();
    } 

    _charToIndex(ch) {
        return (ch.charCodeAt(0) - 'a'.charCodeAt(0));
    }

    insert(key) {
        var pCrawl = this.root;
        var len = key.length;
        var index;
        
        for (var i = 0; i<len; i++) {
        index = this._charToIndex(key[i]);
        
        if (!pCrawl.children[index]) {
            pCrawl.children[index] = new TrieNode();
        }
        
        pCrawl = pCrawl.children[index];
        }
        
        pCrawl.isEndOfWord = true;
    }
   
    search(key) {
        var pCrawl = this.root;
        var len = key.length;
        var index;
     
        for (var i = 0; i<len; i++) {
            index = this._charToIndex(key[i]);
            if (!pCrawl.children[index]) return false;
            pCrawl = pCrawl.children[index];
        }

        return pCrawl.isEndOfWord;
    }
   
}

////////////////////////////////////////////////////
//Pilha.
export class Stack {
    constructor(){
    this.a = [];
    this.n = 0;
    }
  
    push(x){
        this.a[this.n] = x;
        this.n = (this.n) + 1;
    }
  
    pop(){
        if (this.n !== 0) {
            this.n = (this.n) - 1;
            return this.a[this.n];
        }
        else {
            return false;
        }
    }

}

////////////////////////////////////////////////////
//classe rodadas.
export class Rodadas {
    //Instancia o objeto de acordo com o número da rodada atual.
    constructor(rodada){
        const t = new Trie();
        let listaN = [];
        let listaR = [];
        //Cria uma lista contendo apenas as palavras de um tamaho determinado pelo número da rodada atual.
        BancoPalavras.map(pal => {
            if (rodada < 20){
                if (pal.length === (3+rodada)){
                    listaR.push(pal)
                };
            }
            //A partir da rodada 20, o tamanho das palavras passa a variar até no máximo 22 letras.
            else{
                if (pal.length <= (3+19)){
                    listaR.push(pal)
                };
            }
        })
        //Cria uma lista e uma trie contendo 6 palavras referentes a rodada atual.
        for (let i = 0; i < 6; i++) {
            let numero = Math.floor(Math.random() * listaR.length);
            t.insert(listaR[numero]);
            listaN.push(listaR[numero]);
        }

        this.lista = listaN;
        this.trie = t;
        this.acertosTotais = 0;
        this.acertos = 0;
    }
    //Recebe uma lista com o input do jogador e armazena numa pilha.
    addInput(lista) {
        const p = new Stack();
        for (let i = 0; i < lista.length;i++){
            p.push(lista[i]);
        }
        return p;
    }
    //Calcula os acertos do jogador comparando seu input com as palvras presentes na trie.
    calcAcertos(lista) {
        let p = this.addInput(lista);
        let palavra;
        let acertos = 0;
        let inputs = [];
        for (let i = 0; i < lista.length; i++){
            palavra = p.pop();
            if ((this.trie.search(palavra) === true) && (inputs.includes(palavra) === false)) {
                acertos = acertos + 1;
            }
            inputs.push(palavra);
        }
        //Atualiza o atributo referente aos acertos da rodada atual.
        this.acertos = acertos;
        return acertos; 
    }
    //Atualiza o atributo referente aos acertos totais do jogador, acumulando entre as rodadas.
    calcAcertosTotais() {
        let x = this.acertos;
        this.acertosTotais = this.acertosTotais + x;
    } 
    //Inicia uma nova rodada.
    reset(rodada) {
        const t = new Trie();
        let listaN = [];
      
        let listaR = [];
        BancoPalavras.map(pal => {
            if (rodada < 20){
                if (pal.length === (3+rodada)){
                    listaR.push(pal)
                };
            }
            //A partir da rodada 20, o tamanho das palavras passa a variar até no máximo 22 letras.
            else{
                if (pal.length <= (3+19)){
                    listaR.push(pal)
                };
            }
      })
      
        for (let i = 0; i < 6; i++) {
            let numero = Math.floor(Math.random() * listaR.length);
            t.insert(listaR[numero]);
            listaN.push(listaR[numero]);
        }
        //O número de acertos referente a rodada anterior é zerado, porém os acertos totais permanecem.
        this.lista = listaN;
        this.trie = t;
        this.acertos = 0;       
    }
}