

/*
 * JOGO DA MEMÓRIA
 */


//Adicionando valores aos arrays

let images = [
    'imgs/abacaxi.jpg',
    'imgs/coracao.jpg',
    'imgs/dado.jpg',
    'imgs/elefante.jpg',
    'imgs/fada.jpg',
    'imgs/lapis.jpg',
    'imgs/maca.jpg',
    'imgs/janela.jpg'
]
let palavras = [
    'ABACAXI',
    'CORAÇÃO',
    'DADO',
    'ELEFANTE',
    'FADA',
    'LÁPIS',
    'MAÇÃ',
    'JANELA'
]

let back = '../assets/logoMini.svg';

//Organizando os pares dos indices 
let armaIndice = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]

let travarClique = false;
let cartaVirada = false;
let posCartaVirada = -1;
let valorCartaVirada = 0;
let contarPontos = 0;
let pontos = 0
let pontuacao 

//Carregando a página
onload = () => {
    let pegandoImg = document.querySelectorAll('#jogo img')
    pegandoImg.forEach((img, i) => {
        img.src = back
        img.setAttribute('data-valor', i);
    });
    comercarJogo();
}

//Iniciar o jogo
function comercarJogo() {

    //Ao comercar o jogo embaralhar as imagens
    embaralharImages(armaIndice);

    //Associando as imagens
    let pegandoImg = document.querySelectorAll('#jogo img')
    pegandoImg.forEach((img, i) => {
        img.onclick = clicandoNaImagem;
        img.src = back
    });

    //Reniciar jogo


    travarClique = false;
    cartaVirada = false;
    posCartaVirada = -1;
    contarPontos = 0;
    $('#palavra p').remove();
}

//Embaralhando as imagens
function embaralharImages(arr) {
    
    for (let i = arr.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
        // Reposicionando elemento
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;

}

//Clicando na Imagem
function clicandoNaImagem(i) {
    if (travarClique) return;

    const p = i.target.getAttribute('data-valor')
    const valor = armaIndice[p];
    i.target.src = images[valor - 1]
    i.target.onclick = null;

    if (!cartaVirada) {
        cartaVirada = true;
        posCartaVirada = p;
        valorCartaVirada = valor;
    } else {
        if (valor == valorCartaVirada) {
            switch(valor){
                case 1:
                    $('#palavra').append(`<p>${palavras[0]}</p>`);
                    break;
                case 2:
                    $('#palavra').append(`<p>${palavras[1]}</p>`);
                    break;
                case 3:
                    $('#palavra').append(`<p>${palavras[2]}</p>`);
                    break;
                case 4:
                    $('#palavra').append(`<p>${palavras[3]}</p>`);
                    break;
                case 5:
                    $('#palavra').append(`<p>${palavras[4]}</p>`);
                    break;
                case 6:
                    $('#palavra').append(`<p>${palavras[5]}</p>`);
                    break;
                case 7:
                    $('#palavra').append(`<p>${palavras[6]}</p>`);
                    break;
                case 8:
                    $('#palavra').append(`<p>${palavras[7]}</p>`);
                    break;
                default:
                    alert('Erro!');
            }
            contarPontos++;
            pontuacao = somarPontos();
            console.log(pontuacao);
        }
        else {
            const pos = posCartaVirada;
            //Se abri no máximo duas, bloquear as outras 
            travarClique = true;
            setTimeout(() => {
                i.target.src = back
                i.target.onclick = clicandoNaImagem;
                //Ler os indices quando clicados, aparecer a outra imagem
                let img = document.querySelector('#jogo #i' + pos)
                img.src = back;
                img.onclick = clicandoNaImagem;
                travarClique = false;
            }, 1500);
        }
        cartaVirada = false;
        posCartaVirada = -1;
        valorCartaVirada = 0;
    }

    if (contarPontos == 8) {
        alert('Parabéns!')
        $('#btReinicio').on('click', function () {
            onload();
        });
    }
};

function somarPontos(){
    return pontos+= 10;
}