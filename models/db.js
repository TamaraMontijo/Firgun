const Sequelize = require('sequelize')

// Conexão com banco de dados
  const sequelize = new Sequelize('sistemaDeCadastro', 'root', '12/0022630', {
    host: "localhost",
    dialect: 'mysql'
  })

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
