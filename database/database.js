const Sequelize = require('sequelize');

const connection = new Sequelize('perguntas','root','233223',{
    host:'localhost',
    dialect:'mysql'

})

module.exports = connection;