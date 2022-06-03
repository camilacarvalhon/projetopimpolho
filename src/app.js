//Acessa ao banco de dados

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pg = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());//receber parâmetros no formato json





//classe client definida dentro do pg
const client = new pg.Client(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'projetoPPI',
        password: '92861922',
        port: 5432
    }
);


//conectar ao bd 
client.connect();

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
            url: `http://localhost:3000/aluno`,
            data: JSON.stringify({
                "nome": nome,
                "email": email,
                "senha": senha,
                "idTurma": anoturma
            }),
            contentType: 'application/json',
            success: function (resposta) {
                alert(`Usuário cadastrado!`);
                window.location.href = "pag_login_estudante.html"
            }
        }
    );
}
// Inserindo dados
app.post('/aluno', function (req, res) {
    client.query(
        {
            text: "INSERT INTO tbAluno(nome, email, senha, idTurma ) VALUES($1, $2, $3, $4)",
            values: [req.body.nome, req.body.email, req.body.senha, req.body.idTurma]
        }
    ).then(
        function (ret) {
            res.json(
                {
                    status: 'OK',
                    dadosEnviados: req.body
                }
            )
        }
    );

});
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
            url: `http://localhost:3000/professor`,
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
// Inserindo dados
app.post('/professor', function (req, res) {
    client.query(
        {
            text: "INSERT INTO tbProfessor(nomeprof, email, senha, idTurma ) VALUES($1, $2, $3, $4)",
            values: [req.body.nomeprof, req.body.email, req.body.senha, req.body.idTurma]
        }
    ).then(
        function (ret) {
            res.json(
                {
                    status: 'OK',
                    dadosEnviados: req.body
                }
            )
        }
    );

});

/*------------------------------------------------------------------------------------------------------- */

//Função Acessar - realizar consulta Estudante
function acessar() {
    let email = $('#email').val()
    let senha = $('#senha').val()

    $.ajax(
        {
            type: 'GET',
            url: `http://localhost:3000/aluno/${email}/${senha}`,
            success: function (resposta) {

                alert(`Usuário ${resposta.nome} está cadastrado!`);
                
                window.location.href = "pag_acessar_estudante.html"

            },
            error: function (resposta) {
                alert(`Usuário não está cadastrado!`);
            }
        }
    );
}

//Consultando dados
app.get(
    '/aluno/:email/:senha',
    function (req, res) {
        client.query(
            {
                text: ' SELECT email,senha, nome FROM tbaluno WHERE email= $1 and senha= $2',
                values: [req.params.email, req.params.senha]
            }

        ).then(
            function (ret) {
                let tbAluno = ret.rows[0]
                res.json(
                    {
                        status: 'OK',
                        email: tbAluno.email,
                        senha: tbAluno.senha,
                        nome: tbAluno.nome
                    }
                );
            }
        );

    }
);

/*------------------------------------------------------------------------------------------------------- */

//Função Acessar - realizar consulta Professor
function acessarProfessor() {
    let email = $('#emailprof').val()
    let senha = $('#senhaprof').val()

    $.ajax(
        {
            type: 'GET',
            url: `http://localhost:3000/professor/${email}/${senha}`,
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

//Consultando dados
app.get(
    '/professor/:email/:senha',
    function (req, res) {
        client.query(
            {
                text: ' SELECT email,senha, nomeprof FROM tbProfessor WHERE email= $1 and senha= $2',
                values: [req.params.email, req.params.senha]
            }

        ).then(
            function (ret) {
                let tbAluno = ret.rows[0]
                res.json(
                    {
                        status: 'OK',
                        email: tbAluno.email,
                        senha: tbAluno.senha,
                        nomeprof: tbAluno.nomeprof
                    }
                );
            }
        );

    }
);


/*------------------------------------------------------------------------------------------------------- */
//Atualizando dados Estudante


//Função recuperar modal
function recuperar() {
    let minha = $('#minha_caixa');
    let modal = new bootstrap.Modal(minha);
    modal.show();
}


//Funçãp Atualizar 


function atualizar_senha() {
    let senha = $('#senha_recup').val();
    let email = $('#email_recup').val();
    let codigo = $('#codigo_recup').val();


    $.ajax(
        {
            type: 'POST',
            url: `http://localhost:3000/aluno/atualizar`,
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

app.post('/aluno/atualizar', function (req, res) {
    client.query(
        {
            text: "UPDATE tbAluno SET senha = $1 WHERE idaluno= $2 and email= $3",
            values: [req.body.senha, req.body.idaluno, req.body.email]
        }
    ).then(
        function (ret) {
            res.json(
                {
                    status: 'OK',
                    dadosEnviados: req.body
                }
            )
        }
    );

});


/*------------------------------------------------------------------------------------------------------- */
//Atualizando dados Professor


//Função recuperar modal
function recuperarProfessor() {
    let minha = $('#minha_caixa');
    let modal = new bootstrap.Modal(minha);
    modal.show();
}


//Funçãp Atualizar 


function atualizar_senha_professor() {
    let senha = $('#senha_recup').val();
    let email = $('#email_recup').val();
    let codigo = $('#codigo_recup').val();


    $.ajax(
        {
            type: 'POST',
            url: `http://localhost:3000/professor/atualizar`,
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

app.post('/professor/atualizar', function (req, res) {
    client.query(
        {
            text: "UPDATE tbProfessor SET senha = $1 WHERE idprofessor= $2 and email= $3",
            values: [req.body.senha, req.body.idprofessor, req.body.email]
        }
    ).then(
        function (ret) {
            res.json(
                {
                    status: 'OK',
                    dadosEnviados: req.body
                }
            )
        }
    );

});

/*------------------------------------------------------------------------------------------------------- */
//Função selecionar jogo
function consultarJogo() {
    let jogo = $('#nomeJogo').val();

    $.ajax(
        {
            type: 'GET',
            url: `http://localhost:3000/aluno/${jogo}`,
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
//Consultando por jogo
app.get(
    '/aluno/:jogo',
    function (req, res) {
        client.query(
            {

                text: 'select * from tbAluno al inner join tbAlunoJogo aj on al.idAluno = aj.idAluno inner join tbJogo jo on aj.idJogo = jo.idJogo where jo.nomeJogo = $1',
                values: [req.params.jogo]
            }

        ).then(
            function (ret) {
                let dado = []
                for (dados of ret.rows) {
                    dado.push({
                        nomealuno: dados.nome,
                        idaluno: dados.idaluno,
                        nomejogo: dados.nomejogo,
                        pontos: dados.pontos
                    })
                }
                res.json(
                    {
                        status: 'OK',
                        resultados: dado
                    }
                );
            }
        );

    }
);

function atualizar() {
    windows.onload()
}

/*------------------------------------------------------------------------------------------------------- */

//Conectar o sevidor web
app.listen(
    3000,
    function () {
        console.log('Servidor web funcionando');
    }
);