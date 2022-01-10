const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res) {
    /*
    res.status(200).json({
        mes: 'Hello login'
    })
    */
    const userdb = await User.findOne({email: req.body.email})
    if (userdb)
    {
        const isRulePassw = bcrypt.compareSync(req.body.password, userdb.password)
        if (isRulePassw)
        {

            const token = jwt.sign({
                email: userdb.email,
                userId: userdb._id
            }, keys.jwt, {expiresIn: 60*60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }
        else{
            res.status(401).json({
                mes: 'Пароль неверный'
            })
        }
    }
    else
    {
        res.status(404).json({
            mes: 'Пользователь не регистрирован!'
        })
    }
}

module.exports.register = async function(req, res) {
    /*
    res.status(200).json({
        //mes: 'Hello register'
        login : {
            email: req.body.email,
            password: req.body.password
        }
    })*/

    const userdb = await User.findOne({email: req.body.email})

    if (userdb)
    {
        res.status(409).json({
            message: 'Такой e-mail уже существует!!!'
        })
    }
    else
    {
        const salt = bcrypt.genSaltSync(10)
        const passw = bcrypt.hashSync(req.body.password, salt)

        const user = new User({
            email: req.body.email,
            password: passw
        })
        try{
        await user.save()
        res.status(201).json(user)
        }
        catch(e)
        {
            /*
            res.status(500).json({
                message: e.message ? e.message : 'error....'
            })
            */
            errorHandler(res, e)
        }
    }
    
}