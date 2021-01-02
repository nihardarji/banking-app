const express = require('express')
const authMiddleware = require('../middleware/auth')
const BankUser = require('../models/BankUser')
const Account = require('../models/Account')

const Router = express.Router()

// Get account details by user email
Router.get('/account',authMiddleware, async (req, res) => {
    try {
        const accountDetails = await Account.findOne({userId: req.user._id})
        if(accountDetails){
            res.send({ account: accountDetails })
        } else {
            res.status(400).send({
                get_error: 'Account details does not exist'
            })
        }
    } catch (error) {
        res.status(400).send({
            get_error: 'Error while getting account details'
        })
    }  
})

// add new account of user
Router.post('/account', authMiddleware, async (req, res) => {
    const { account_no, bank_name, ifsc } = req.body
    try {
        const account = new Account({
            account_no,
            bank_name,
            ifsc,
            userId: req.user._id
        })

        await account.save()
        res.status(201).send({ account })
    } catch (error) {
        res.status(400).send({
            add_error: 'Error while creating account'
        })
    }
})

Router.patch('/account', authMiddleware, async (req, res) => {
    const { ifsc } = req.body
    try {
        const accountDetails = await Account.findOneAndUpdate({userId: req.user._id}, { ifsc }, { new: true })

        res.send({ account : accountDetails})
    } catch (error) {
        res.status(400).send({
            update_error: 'Error while updating account..Try again later.'
        })
    }
})
module.exports = Router