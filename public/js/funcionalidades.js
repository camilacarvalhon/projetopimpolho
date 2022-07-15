

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
/** 
 * Função que verifica se o campo está vazio
 * @param {*} valor 
 * @returns boolean 
 */
function isEmpty(valor) {
    if (valor && valor != '' && valor != null && valor != undefined) {
        return false;
    }
    return true;
}
//Função Cadastrar Estudante 
function enviarEstudante() {
    let nome = $('#nome').val();
    let email = $('#email').val();
    let senha = $('#senha').val();
    let anoturma = $('#anoturma').val();
    validarCampos(email, nome, senha, anoturma, true);
}


/**
 * Função que envia os dados para ser salvos no banco
 * @param {string} nome 
 * @param {string} email 
 * @param {string} senha 
 * @param {string} anoturma 
 */
function postEstudante(nome, email, senha, anoturma) {
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
                window.location.href = "pag_login_estudante.html";
            }
        }
    );
}
/**
 * Função que valida os dados do cadastro do uusuário
 * @param {string} email 
 * @param {string} nome 
 * @param {string} senha 
 * @param {string} anoturma 
 * @param {boolean} ehEstudante 
 */
function validarCampos(email, nome, senha, anoturma, ehEstudante) {
    let msgErro =  document.querySelector('#msgAlertaErroCad')
    const emailReg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    const passwordRegx = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
    // Verificando os campos
    if (isEmpty(nome)) {
        msgErro.innerHTML= "Erro: Necessário preencher o campo nome!";
    } else if (isEmpty(email)) {
        msgErro.innerHTML= "Erro: Necessário preencher o campo email!";
    } else if (isEmpty(senha)) {
        msgErro.innerHTML= "Erro: Necessário preencher o campo senha!";
    } else if (isEmpty(anoturma)) {
        msgErro.innerHTML= "Erro: Necessário preencher o campo turma!";
    } else {
        // Verificando se o email é válido
        if (!emailReg.test(email)) {
            msgErro.innerHTML= "Erro: Formato inválido de email! Insira um @ email";
        } else if (!passwordRegx.test(senha)) {
            msgErro.innerHTML= "Erro: A senha deve conter entre 8 a 15 caracteres,<br> deve conter pelo menos uma letra maiúscula<br> um número ";
        } else {
            // Verifica se é estudante ou professor, para saber onde tera que salvar os dados
            if (ehEstudante == true) {
                postEstudante(nome, email, senha, anoturma);
            } else {
                postProfessor(nome, email, senha, anoturma);
            }

        }

    }
}

/*------------------------------------------------------------------------------------------------------- */

//Função Cadastrar Professor

function enviarProfessor() {
    let nome = $('#nome').val();
    let email = $('#email').val();
    let senha = $('#senha').val();
    let anoturma = $('#anoturma').val();
    validarCampos(email, nome, senha, anoturma, false);

}

/**
 * Função que envia os dados para ser salvos no banco
 * @param {string} nome 
 * @param {string} email 
 * @param {string} senha 
 * @param {string} anoturma 
 */
function postProfessor(nome, email, senha, anoturma) {
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
    let email = $('#emailestudante').val();
    let senha = $('#senhaestudante').val();

    // validação 
    if (!isEmpty(email) && !isEmpty(senha)) {
        $.ajax(
            {
                type: 'GET',
                url: `${window.location.origin}/aluno/${email}/${senha}`,
                success: function (resposta) {
                    // localStorage.removeItem('nome_estudante');
                    localStorage.setItem('nome_estudante', resposta.nome);
                    localStorage.setItem('nome_jogo', JSON.stringify(resposta.nomejogo));
                    localStorage.setItem('pontos_jogo', resposta.pontosjogo);
                    window.location.href = "pag_acessar_estudante.html";

                },
                error: function (resposta) {
                    alert(`Usuário não está cadastrado!`);
                }
            }
        );
    } else {
        alert('Email ou senha inválida! ');
    }
}
/*------------------------------------------------------------------------------------------------------- */

//Função Acessar - realizar consulta Professor

function acessarProfessor() {
    let email = $('#emailprof').val();
    let senha = $('#senhaprof').val();

    // validação 
    if (!isEmpty(email) && !isEmpty(senha)) {
        $.ajax(
            {
                type: 'GET',
                url: `${window.location.origin}/professor/${email}/${senha}`,
                success: function (resposta) {

                    alert(`Usuário ${resposta.nomeprof} está cadastrado!`);
                    window.location.href = "pag_acessar_professor.html";
                },
                error: function (resposta) {
                    alert(`Usuário não está cadastrado!`);
                }
            }
        );
    } else {
        alert('Email ou senha inválida! ');
    }

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
                window.location.href = "pag_login_estudante.html";
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
                window.location.href = "pag_login_professor.html";
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
    windows.onload();
}