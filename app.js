const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
// const mongoose = requires('mongoose')
const session = require('express-session');
const app = express();
const admin = require("./routes/admin");
const path = require("path");
const Usuario = require('./models/usuario')
const User = require('./models/user')
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('connect-flash');
require('./config/auth')(passport)
const { eAdmin } = require('./helpers/eAdmin');

// Config
  // Sessão
    app.use(session({
      secret: 'cursodenode',
      resave: true,
      saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

  //Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
  // Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars');
  // Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;

        next();
    });

  // Public
    app.use(express.static(path.join(__dirname,"public")))

// Rotas
  app.use('/admin', admin)

  //Homepage
    app.use('/home', function(req, res){
      res.render('homepage');
    });

  //Login

    app.get('/login', function(req, res){
      res.render('usuarios/login');
    });

    app.post('/login', (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: 'admin/cadastros',
            failureRedirect: '/usuarios/login',
            failureFlash: true
        })(req, res, next);
    });

    app.get('/logout', (req, res) => {
      req.logout();
      req.flash('success_msg', 'Deslogado com sucesso');
      res.redirect('/');
    });

    // Registro

    app.get('/registro', function(req, res){
      res.render('usuarios/registro');
    });

    app.post('/registro', (req, res) => {
    var erros = [];

    if(!req.body.nome) {
        erros.push({ texto: 'Nome inválido' });
    }

    if(!req.body.nome) {
        erros.push({ texto: 'Email inválido' });
    }

    if(!req.body.nome) {
        erros.push({ texto: 'Senha inválido' });
    }

    if(req.body.senha.length < 4) {
        erros.push({ texto: 'Senha muito curta' });
    }

    if(req.body.senha !== req.body.senha2) {
        erros.push({ texto: 'As senhas são diferentes, tente novamento' });
    }

    if(erros.length > 0) {
        res.render('usuarios/registro', { erros });
    }
    else {
      const alreadyUser = User.findOne({
          where: {
              email: req.body.email
          }
      })
        alreadyUser.then(user => {
            if(user) {
                req.flash('error_msg', 'Já existe uma conta com esse email no nosso sistema');
                res.redirect('/registro');
            }
            else {
                  const novoUser = new User({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                });

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUser.senha, salt, (erro, hash) => {
                        if(erro) {
                            req.flash('error_msg', 'Houve um erro durante o salvamento do usuário');
                            res.redirect('/');
                        }

                        novoUser.senha = hash;

                        novoUser.save().then(() => {
                            req.flash('success_msg', 'Usuário criado com sucesso');
                            res.redirect('/cadastro');
                        }).catch(err => {
                            req.flash('error_msg', 'Houve um erro ao criar o usuário, tente novamente');
                            res.redirect('/usuarios/registro');
                        });
                    })
                })
            }
        }).catch(err => {
            req.flash('error_msg', 'Houve um erro interno');
            res.redirect('/');
        });
    }
});


  // Form de cadastro

    app.get("/cadastro", function(req, res){
      res.render('formulario');
    });

    app.post('/post', function(req, res){
      Usuario.create({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        email: req.body.email,
        telefone: req.body.telefone,
        celular: req.body.celular,
        nascimento: req.body.nascimento,
        CEP: req.body.cep,
        estado: req.body.estado,
        cidade: req.body.cidade,
        CPFouCNPJ: req.body.CPFouCNPJ,
        valor: req.body.valor,
        motivo: req.body.motivo,
        comoSoube: req.body.comoSoube
      }).then(function(){
        res.render('usuarios/cadastro_efetuado')
      }).catch(function(erro){
        res.send("Erro ao se cadastrar: " + erro)
      })
    })

    // Lista de cadastros

  app.get('/cadastros', (req, res) => {
    Usuario.findAll().then(function(usuarios){
      res.render("admin/cadastros", {usuarios: usuarios})
    })
  })

  // Edição de cadastros
    app.get("/usuarios/edit/:id", eAdmin, (req, res) => {
      res.render("admin/editcadastros")
    })


//Outros
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
  console.log("Servidor rodando na porta 8081")
})

module.exports = Usuario

