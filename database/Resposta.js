const Sequelize = require('sequelize')
const connection = require("./database")

const Resposta = connection.define("resposta",{
    corpo:{
        type:Sequelize.TEXT,
        allowNull:false
    },

    idPergunta:{
        type:Sequelize.INTEGER,
        allowNull:false
        
    }


});

Resposta.sync({force:false}).then(()=>{
    console.log("tabela criada");
})

module.exports = Resposta
