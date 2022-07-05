//Acessa ao banco de dados

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const pg = require('pg');
require('dotenv').config()

// Criptografia
const bcrypt = require('bcrypt');
let hashpassword 

// Pontuação dos jogos
// import {pontosJogoForca} from '/src/jogodaforca/jogoForca';


const app = express();
app.use(cors());
app.use(bodyParser.json());//receber parâmetros no formato json
// app.set('view engine', 'ejs');
// Static
// app.static('/static', express.use('public'))

const staticPath = path.join(__dirname, "../public")

app.use(express.static(staticPath))


//classe client definida dentro do pg
// const client = new pg.Client(
//     {
//         user: process.env.DATABASE_USERNAME,
//         host: process.env.HOST,
//         database: process.env.DATABASE,
//         password: process.env.PASSWORD,
//         port: process.env.DATABASE_PORT
//     }
// );

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

//conectar ao bd 
client.connect();


// Acessando a rota pagina principal

app.get('/', (req,res)=>{
    res.send('hello');
})

// Inserindo dados
app.post('/aluno', async (req, res) =>{
   
    // hashpassword= await bcrypt.hashSync(req.body.senha, 10)
    client.query(
        {
            text: "INSERT INTO tbAluno(nome, email, senha, idTurma ) VALUES($1, $2, $3, $4)",
            values: [req.body.nome, req.body.email,req.body.senha , req.body.idTurma] //hashpassword
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
//Consultando dados
app.get(
    '/aluno/:email/:senha',
    async (req, res) => { 
        
        client.query(
            {
                text: ' select al.senha, al.email, al.nome, al.idAluno, jo.nomejogo, aj.pontos	from tbAluno al inner join tbAlunoJogo aj on al.idAluno = aj.idAluno inner join tbJogo jo on aj.idJogo = jo.idJogo WHERE al.email= $1 and al.senha= $2 ',
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
                        nome: tbAluno.nome,
                        nomejogo: tbAluno.nomejogo,
                        pontosjogo: tbAluno.pontos
                    }
                );
                console.log(ret);
                
            }
            
        );

    }
);



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



/*------------------------------------------------------------------------------------------------------- */

//Conectar o sevidor web
app.listen(
    process.env.PORT || 3000,
    function () {
        console.log('Servidor web funcionando');
    }
);