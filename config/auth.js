const localStrategy = require("passport-local").Strategy
const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs');

//Model User

require("../models/user")
const User = require('../models/user')

module.exports = function(passport){
  passport.use('local', new localStrategy({usernameField: 'email', passwordField: "senha"}, (email, senha, done) => {
    const userExist = User.findOne({
          where: {
              email: email
          }
      })
        userExist.then((user) => {
      if(!user){
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

    passport.deserializeUser(function (id, done) {

        User.findByPk(id).then(function (user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });

}
