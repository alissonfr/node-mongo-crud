'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5')
const authService = require('../services/auth-service')

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres')
    contract.isEmail(req.body.email, 'Email invalido')
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres')

    // se os dados forem invalidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso'
        });
    } catch (err) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.authenticate = async (req, res, next) => {
    //lembrar de fazer validações aqui
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha invalidos'
            });
            return
        }

        const token = await authService.generateToken({
            email: customer.email,
            name: customer.name
        })
        
        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (err) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};