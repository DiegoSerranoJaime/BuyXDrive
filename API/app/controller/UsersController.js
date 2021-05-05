const Users = require('../model/UsersModel');
const jwt = require('jsonwebtoken')

exports.login = function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.sendStatus(400).send({error: true,  message: 'No data send'});
    } else {
        Users.login(req.body, (err, user) => {    
            if(err) {
                res.send(err);
            }

            if(user.length > 0) {
    
                const trueUser = {
                    id: user[0].id,
                    name: user[0].name,
                    surname: user[0].surname,
                    email: user[0].email,
                    address: user[0].address,
                    phoneNumber: user[0].phoneNumber,
                    user_type: user[0].user_type,
                };
    
                jwt.sign({user: trueUser}, 'secretkey', { expiresIn: '1h' }, (err, token) => {
                    res.json({
                        token
                    });
                });
            } else {
                res.sendStatus(404);
            }
        });
    }

};

exports.register = function(req, res) {
    let user = new Users(req.body);

    if (!user.email || !user.password || !user.name || !user.surname || !user.address || !user.phoneNumber) {
        res.sendStatus(400).send({error: true,  message: 'No data send'});
    } else if(user.password.length < 8 || user.password > 16) {
        res.sendStatus(400).send({error: true,  message: 'Password length doesn\'t in the limit'});
    } else if(req.body.password != req.body.passwordConfirmation) {
        res.send({ok: false,  message: 'Las contraseñas no coinciden'});
    } else if(!validateEmail(user.email)) {
        res.sendStatus(400).send({error: true,  message: 'Email format is incorrect'});
    } else {
        Users.register(user, (err, user) => {
            console.log('controller');
    
            if(err) {
                res.send(err);
            }

            if (user.duplicate) {
                res.send({
                    ok: false,
                    msg: user.msg
                });
            } else {
                res.send({
                    ok: true,
                    msg: 'Usaurio registrado'
                });
            }
        });
    }
};

function validateEmail(email) {
    let reg = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
    return reg.test(email);
}
