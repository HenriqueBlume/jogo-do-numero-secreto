let numerosSorteados=[]
let numeroLimite=3
let numeroAleatório= numeroSecreto()
console.log(numeroAleatório)
let tentativas=1

function exibirTextoNaTela(tag, texto){
let campo= document.querySelector(tag)
campo.innerHTML=texto
if ('speechSynthesis' in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; 
    utterance.rate = 1.2; 
    window.speechSynthesis.speak(utterance); 
} else {
    console.log("Web Speech API não suportada neste navegador.");
}
}
function exibirMensagemInicial(){
exibirTextoNaTela('h1', 'jogo do número secreto')
exibirTextoNaTela('p', 'escolha um número entre 1 e 10')
}
exibirMensagemInicial()
function verificarChute(){
    let chute=document.querySelector('input').value
    console.log(chute == numeroAleatório)
    if (chute == numeroAleatório){
        exibirTextoNaTela('h1','ACERTOU!!');
        let palavraTentativa= tentativas>1? 'TENTATIVAS' : 'TENTATIVA'
        let mensagemTentativas=`VOCÊ ACERTOU O NÚMERO SECRETO! (${numeroAleatório}) COM ${tentativas} ${palavraTentativa}`
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else if (chute>numeroAleatório){
        exibirTextoNaTela('p','O NÚMERO SECRETO É MENOR');
    }else{
        exibirTextoNaTela('p','O NÚMERO SECRETO É MAIOR')
    }
    tentativas++
    limparCampo()
}

function numeroSecreto(){
let numeroEscolhido=parseInt(Math.random()*numeroLimite+1)  
let quantidadeElementos=numerosSorteados.length
if (quantidadeElementos == numeroLimite){
    numerosSorteados=[]
}
if (numerosSorteados.includes(numeroEscolhido)){
    return numeroSecreto()
}else{
    numerosSorteados.push(numeroEscolhido)
    console.log(numerosSorteados)
    return numeroEscolhido
}

}
function limparCampo(){
    chute=document.querySelector('input');
    chute.value='';
}
function reiniciarJogo() {
    numeroAleatório=numeroSecreto()
    limparCampo()
    tentativas=1
    exibirMensagemInicial()
    document.getElementById('reiniciar').setAttribute('disebled',true)
    console.log(numeroAleatório)
}