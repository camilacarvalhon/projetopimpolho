

//Função recuperar modal
function recuperar() {
    let minha = $('#minha_caixa');
    let modal = new bootstrap.Modal(minha);
    modal.show();
}


//Função recuperar modal
function recuperarProfessor() {
    let minha = $('#minha_caixa');
    let modal = new bootstrap.Modal(minha);
    modal.show();
}


/*------------------------------------------------------------------------------------------------------- */

//Função Cadastrar Estudante 

function enviarEstudante() {
    let nome = $('#nome').val()
    let email = $('#email').val()
    let senha = $('#senha').val()
    let anoturma = $('#anoturma').val()

    $.ajax(
        {
            type: 'POST',
            url: `${window.location.origin}/aluno`,
            data: JSON.stringify({
                "nome": nome,
                "email": email,
                "senha": senha,
                "idTurma": anoturma
            }),
            contentType: 'application/json',
            success: function (resposta) {
                window.location.href = "pag_login_estudante.html"
            }
        }
    );
}


/*------------------------------------------------------------------------------------------------------- */

//Função Cadastrar Professor

function enviarProfessor() {
    let nome = $('#nome').val()
    let email = $('#email').val()
    let senha = $('#senha').val()
    let anoturma = $('#anoturma').val()
    $.ajax(
        {
            type: 'POST',
            url: `${window.location.origin}/professor`,
            data: JSON.stringify({
                "nomeprof": nome,
                "email": email,
                "senha": senha,
                "idTurma": anoturma
            }),
            contentType: 'application/json',
            success: function (resposta) {
                alert(`Usuário cadastrado!`);
            }
        }
    );
}

/*------------------------------------------------------------------------------------------------------- */

//Função Acessar - realizar consulta Estudante
function acessar() {
    let email = $('#email').val()
    let senha = $('#senha').val()

    // validação 
    if(email){
        $.ajax(
            {
                type: 'GET',
                url: `${window.location.origin}/aluno/${email}/${senha}`,
                success: function (resposta) {
                    localStorage.removeItem('nome_estudante');
                    localStorage.setItem('nome_estudante', resposta.nome);
                    localStorage.setItem('nome_jogo', JSON.stringify(resposta.nomejogo));
                    localStorage.setItem('pontos_jogo', resposta.pontosjogo)
                    window.location.href = "pag_acessar_estudante.html"
                   
                },
                error: function (resposta) {
                    alert(`Usuário não está cadastrado!`);
                }
            }
        );
    }else{
        alert('Email ou senha inválida! ')
    }
}
/*------------------------------------------------------------------------------------------------------- */

//Função Acessar - realizar consulta Professor

function acessarProfessor() {
    let email = $('#emailprof').val()
    let senha = $('#senhaprof').val()

    // validação 
    $.ajax(
        {
            type: 'GET',
            url: `${window.location.origin}/professor/${email}/${senha}`,
            success: function (resposta) {

                alert(`Usuário ${resposta.nomeprof} está cadastrado!`);
                window.location.href = "pag_acessar_professor.html"
            },
            error: function (resposta) {
                alert(`Usuário não está cadastrado!`);
            }
        }
    );
}


/*------------------------------------------------------------------------------------------------------- */
//Atualizando dados Estudante


//Funçãp Atualizar 


function atualizar_senha() {
    let senha = $('#senha_recup').val();
    let email = $('#email_recup').val();
    let codigo = $('#codigo_recup').val();


    $.ajax(
        {
            type: 'POST',
            url: `${window.location.origin}/aluno/atualizar`,
            data: JSON.stringify({

                "senha": senha,
                "email": email,
                "idaluno": codigo
            }),
            contentType: 'application/json',
            success: function (resposta) {
                alert(`Dados atualizados com sucesso!`);
                window.location.href = "pag_login_estudante.html"
            }
        }
    );
}


/*------------------------------------------------------------------------------------------------------- */
//Atualizando dados Professor

//Função Atualizar 


function atualizar_senha_professor() {
    let senha = $('#senha_recup').val();
    let email = $('#email_recup').val();
    let codigo = $('#codigo_recup').val();


    $.ajax(
        {
            type: 'POST',
            url: `${window.location.origin}/professor/atualizar`,
            data: JSON.stringify({

                "senha": senha,
                "email": email,
                "idprofessor": codigo
            }),
            contentType: 'application/json',
            success: function (resposta) {
                alert(`Dados atualizados com sucesso!`);
                window.location.href = "pag_login_professor.html"
            }
        }
    );
}


/*------------------------------------------------------------------------------------------------------- */
//Função selecionar jogo
function consultarJogo() {
    let jogo = $('#nomeJogo').val();

    $.ajax(
        {
            type: 'GET',
            url: `${window.location.origin}/aluno/${jogo}`,
            success: function (resposta) {

                for (let i = 0; i < resposta.resultados.length; i++) {
                    $('#tbnome').append(`${resposta.resultados[i].nomealuno}<br>`);
                    $('#tbid').append(`${resposta.resultados[i].idaluno}<br>`);
                    $('#tbnomejogo').append(` ${resposta.resultados[i].nomejogo}<br>`);
                    $('#tbpontos').append(` ${resposta.resultados[i].pontos}<br>`);
                }
            },
            error: function (resposta) {
                alert(`Não tem esse jogo!`);
            }
        }
    );
}

/*------------------------------------------------------------------------------------------------------- */
// Fazer o post dos pontos dos jogos

function atualizar() {
    windows.onload()
}