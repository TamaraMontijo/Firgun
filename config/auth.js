const localStrategy = require("passport-local").Strategy
const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs');

//Model User

require("../models/user")
const User = require('../models/user')

module.exports = function(passport){
  passport.use(new localStrategy({usernameField: 'email', passwordField: "senha"}, (email, senha, done) => {
    User.findOne({email: email}).then((user) => {
      if(user){
        return done(null, false, {message: "Esta conta não existe"})
      }

      bcrypt.compare(senha, user.senha, (erro, batem) => {
        if(batem){
          return done(null, user)
        }else{
          return done(null, false, {message: "Senha incorreta"})
        }
      })
    })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

}
