const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta");
const { DESCRIBE } = require('sequelize/types/lib/query-types');

//database
connection.authenticate().then(()=>{
    console.log("sucesso ao se conectar")
}).catch((err)=>{
    console.log("erro ao se conectar"+err)

})



app.set("view engine" ,"ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//rotas
app.get("/",(req,res)=>{
    Pergunta.findAll({raw:true,order:[
        ['id','DESC']
    ]}).then((perguntas)=>{
        
        res.render('index',{perguntas:perguntas})

    })
app.get("pergunta")
    

})
app.get("/perguntar",(req,res)=>{
    res.render("perguntar")

})
app.get("/pergunta/:id",(req,res)=>{
    let id = req.params.id;
    Pergunta.findOne({where:{id:id}})
    .then((pergunta)=>{
        if(pergunta != undefined ){

            Resposta.findAll({where:{idPergunta:pergunta.id},
            order:[['id','DESC']
        ]}).then((resposta)=>{
                res.render("pergunta",
            {pergunta:pergunta,
            respostas:resposta
            })

                })
            
            
            
                        
        }else{
            res.redirect('/')
            
        }

    })
})
app.post("/responder",(req,res)=>{
    let corpo = req.body.corpo
    let idPergunta = req.body.idPergunta
    Resposta.create(
        {
            corpo:corpo,
            idPergunta:idPergunta
        }
    ).then(()=>{
        res.redirect('/pergunta/'+idPergunta)

    })
    

})

app.post("/salvarpergunta",(req,res)=>{

    let titulo = req.body.titulo
    let texto = req.body.texto
    Pergunta.create({
        titulo:titulo,
        texto:texto
    }).then(()=>{
        res.redirect("/")
    })

})




app.listen(8080,console.log("app rodando con sucesso"))