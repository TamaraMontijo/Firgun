const db = require('./db')

const Usuario = db.sequelize.define('usuarios', {
  nome: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "campo obrigatório"
       }
    }
  },
  sobrenome: {
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
  telefone: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "campo obrigatório"
      }
    }
  },
  celular: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "campo obrigatório"
      }
    }
  },
  nascimento: {
    type: db.Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "campo obrigatório"
      }
    }
  },
  CEP: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "campo obrigatório"
      }
    }
  },
  estado: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "campo obrigatório"
      }
    }
  },
  cidade: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "campo obrigatório"
      }
    }
  },
  CPFouCNPJ: {
    type: db.Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
       is: /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/,
      notEmpty: {
        msg: "campo obrigatório"
      }
    }
  },
  valor: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "campo obrigatório"
      }
    }
  },
  motivo: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "campo obrigatório"
      }
    }
  },
  comoSoube: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "campo obrigatório"
      }
    }
  },
})

module.exports = Usuario

// Usuario.sync({force: true})
