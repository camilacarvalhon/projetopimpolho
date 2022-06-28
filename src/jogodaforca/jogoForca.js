var palavra = carrega_palavra_secreta();
var desenha_letras = desenha_letras_palavras(palavra)
var letra_digitada 
var letraMaiuscula 
var linha
var valor
var enforcou = false
var acertou = false
var erros = 0

var acertos = false;
async function iniciar(){
    await limparTela();
    palavra = carrega_palavra_secreta();
    desenha_letras= desenha_letras_palavras(palavra);
}

function desenha_letras_palavras(palavra){
    let v= 0
    for(l of palavra){
       linha = document.createElement("input")
       linha.classList.add("letra");
       linha.id='letra' + v
       linha.setAttribute("disabled", "disabled");
       linha.style.display= 'inline-block';
       let divPalavra= document.getElementById("palavraSorteada");
       divPalavra.appendChild(linha)
        v++
    }


}

function carrega_palavra_secreta(){
    let palavras = ["chaveiro", "chave", "boneca", "chuveiro","maca", "banana", "melancia", "dado","vaca"];
    let tam=palavras.length
    let qtd=palavras.length-1;
    let pos=Math.round(Math.random()*qtd);
    let palavra_secreta= palavras[pos].toUpperCase();

    return palavra_secreta;
}

function verificar(){
    letra_digitada = document.getElementById('letraDigitada').value;
    letraMaiuscula = letra_digitada.toUpperCase()
    letra_digitada = document.getElementById('letraDigitada').value = ""
   

    if(letraMaiuscula == ""){
        alert("Por favor, digite uma letra!")
    }

    marca_chute_correto(letraMaiuscula, palavra)
    
    if(!acertos){
        erros++
        // chamar função desenha forca

    }else if(acertos){
        // alert('PARABÉNS!');
        acertos = false;
    } 

    if(erros==7){
        // mostrar desenho final da forca
    }
}

function marca_chute_correto(letra_digitada, palavra_secreta){
    for(pos in palavra_secreta  ){
        if(letra_digitada == palavra_secreta[pos]){
                let acessaLetra= document.getElementById('letra' + pos)  
                acessaLetra.value = letra_digitada;
                acertos= true;
        }
    }
    
}
    


function limparTela(){
    let linha = document.getElementById("palavraSorteada")
    linha.innerHTML = "";
}

let dica =()=>{
    alert("Essa palavra já vimos em sala de aula");
    jog.focus();

}

// window.addEventListener('load', iniciar);