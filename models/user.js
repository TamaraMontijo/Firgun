const db = require('./db')

const User = db.sequelize.define('users', {
  nome: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "campo obrigatório"
       }
    }
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "campo obrigatório"
      }
    }
  },
  eAdmin: {
    allowNull: false,
    type: db.Sequelize.INTEGER,
    defaultValue: 0
  },
  senha: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "campo obrigatório"
      }
    }
  },
});

module.exports = User

User.sync({force: true})
