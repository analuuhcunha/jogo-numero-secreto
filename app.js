// cria variável título, seleciona o cabeçalho (h1) no HTML e escreve o texto
//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

// cria variável parágrafo, seleciona o parágrafo (p) no HTML e escreve o texto
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10:';
let listaSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let numeroDeTentativas = 1;

//visando otimizar o código, é possível criar uma função, que vai apenas passar o parâmetro da tag a ser preenchida
//e o texto que será inserido na tag
function exibirTextoNaTela(tag, texto){//função sem retorno e com parâmetros tag e texto
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial (){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10:');
}

exibirMensagemInicial();

function verificarChute(){//função sem retorno e sem parâmetro. Mas realiza um retorno na tela.
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = numeroDeTentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${numeroDeTentativas} ${palavraTentativa}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute < numeroSecreto){
            exibirTextoNaTela('h1', 'Errou!');
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
            numeroDeTentativas++;
            limparCampo();
        } else {
            exibirTextoNaTela('h1', 'Errou!');
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
            numeroDeTentativas++;
            limparCampo();
        }
    }
}

function gerarNumeroAleatorio (){//função com retorno e sem parâmetro
    let numeroEscolhido = parseInt(Math.random() * 10 + 1);
    let quantidadeElementosLista = listaSorteados.length;
    if (quantidadeElementosLista == 10){
        listaSorteados = [];
    }
    if (listaSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaSorteados.push(numeroEscolhido);//push é usado para incluir um elemento ao final da lista e pop pode ser usado para remover  último elemento
        console.log(listaSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    numeroDeTentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}