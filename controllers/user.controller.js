const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

exports.index = function (req, res) {
    userModel.find(function (err, users) {
        if (err) {
            res.json({
                status: "Erro",
                message: err,
            });
        }
        res.json({
            status: "Sucesso",
            message: "Usuários encontrados com sucesso",
            data: users
        });
    });
}

exports.login = function (req,res) {
    userModel.findOne({email: req.body.email}).exec(function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Autenticação do Usuário falhou. Usuário não encontrado!' });
        } else {
            console.log(user.password)
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Autenticação do Usuário falhou. Senha incorreta!' });
            } else {
                const token = jwt.sign({username: user.username}, 'mySecret')
                res.json({
                    success: true,
                    message: "Sucesso",
                    user: user,
                    token: token
                });
            }
        }
    });
}