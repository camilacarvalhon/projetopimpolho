var palavra 
var desenha_letras 
var letra_digitada
var letraMaiuscula
var linha
var valor
var enforcou = false
var acertou = false
var erros = 0
var right = 0
var acertos = false;
var pontos = 0;
var tam
var pontuacao
var ja_digitada = []

async function iniciar() {
    await limparTela();
    palavra = carrega_palavra_secreta();
    desenha_letras = desenha_letras_palavras(palavra);
    enforcou = false
    acertou = false
    erros = 0
    acertos = false;
    right = 0
    ja_digitada = []
    $('#imgForco').attr('src','assets/forcaCompleta.png')
}

function desenha_letras_palavras(palavra) {
    let v = 0
    for (l of palavra) {
        linha = document.createElement("input")
        linha.classList.add("letra");
        linha.id = 'letra' + v
        linha.setAttribute("disabled", "disabled");
        linha.style.display = 'inline-block';
        let divPalavra = document.getElementById("palavraSorteada");
        divPalavra.appendChild(linha)
        v++
    }
}

function carrega_palavra_secreta() {
    let palavras = ["chaveiro", "chave", "boneca", "chuveiro", "maca", "banana", "melancia", "dado", "vaca"];
    tam = palavras.length
    let qtd = palavras.length - 1;
    let pos = Math.round(Math.random() * qtd);
    let palavra_secreta = palavras[pos].toUpperCase();

    return palavra_secreta;
}

function jogar() {
    letra_digitada = document.getElementById('letraDigitada').value;
    letraMaiuscula = letra_digitada.toUpperCase()
    letra_digitada = document.getElementById('letraDigitada').value = ""

    for(let l of ja_digitada){
        if(l == letraMaiuscula){
            alert('Essa letra ja foi digitada')
        }else{
            
        }
    }


    if (letraMaiuscula == "") {
        alert("Por favor, digite uma letra!")
    }else{  
        marca_chute_correto(letraMaiuscula, palavra)

        if (!acertos) {
            erros++
            desenhaForca(erros);
        } else if (acertos) {
            console.log(right);
            acertos = false;
        }

        if(erros == 7) {
            // mostrar desenho final da forca
            alert("Não foi dessa vez! A palavra sorteada era " + palavra)
            // desabilitar o input para digitar e habilitar ao sortear uma palavra ou reiniciar;
        }else if(right == palavra.length){
            alert("PARABÉNS!")
            console.log(pontuacao);
            setTimeout(() => {iniciar()}, 3000)
        }

    }

    

}

function marca_chute_correto(letra_digitada, palavra_secreta) {
    
    for (pos in palavra_secreta) {
        if (letra_digitada == palavra_secreta[pos]) {
            ja_digitada.push(letra_digitada)
            let acessaLetra = document.getElementById('letra' + pos)
            acessaLetra.value = letra_digitada;
            acertos = true;
            right++
            pontuacao = somaPontos()
        }
    }

}

function desenhaForca(erros) {
    
    switch (erros) {
        case 1:
            $('#imgForco').attr('src','assets/erro1.png')
            break;
        case 2:
            $('#imgForco').attr('src','assets/erro2.png')
            break;
        case 3:
            $('#imgForco').attr('src','assets/erro3.png')
            break;
        case 4:
            $('#imgForco').attr('src','assets/erro4.png')
            break;
        case 5:
            $('#imgForco').attr('src','assets/erro5.png') 
            break;
        case 6:
            $('#imgForco').attr('src','assets/erro6.png')
            break;
        case 7:
            $('#imgForco').attr('src','assets/erro7.png')
            
            setTimeout(() => {iniciar()}, 4000)
            break;
        default:
            console.log("Erro!");
    }
}
function somaPontos(){
    return pontos+=10;
}
function limparTela() {
    let linha = document.getElementById("palavraSorteada")
    linha.innerHTML = "";
}

let dica = () => {
    alert("Essa palavra já vimos em sala de aula");
    jog.focus();

}


window.addEventListener('load', iniciar);

