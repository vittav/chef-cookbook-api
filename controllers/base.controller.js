//TODO: Criar a rota middleware para poder verificar e autenticar o token
exports.middleware = function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, 'mySecret', function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Falha ao tentar autenticar o token!' });
            } else {
                //se tudo correr bem, salver a requisição para o uso em outras rotas
                req.decoded = decoded;
                next();
            }
        });

    } else {
        // se não tiver o token, retornar o erro 403
        return res.status(403).send({
            success: false,
            message: 'Não há token.'
        });
    }
}

