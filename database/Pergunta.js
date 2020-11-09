const Sequelize = require('sequelize')
const connection = require("./database");


const Pergunta = connection.define("pergunta",{
    titulo:{
        type:Sequelize.STRING,
        allowNull:false
    },
    texto:{
        type:Sequelize.TEXT,
        allowNull:false
    }


});

Pergunta.sync({force:false}).then(()=>{
    console.log("tabela criada");
})

module.exports = Pergunta
