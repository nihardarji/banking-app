const express = require('express')
const authMiddleware = require('../middleware/auth')
const Account = require('../models/Account')
const Transactions = require('../models/Transactions')
const Router = express.Router()
const { startSession } = require('mongoose')

Router.post('/deposit/:id', authMiddleware, async (req, res) => {
    const session = await startSession()

    try {
        session.startTransaction()
        const { deposit_amount } = req.body
        const account_id = req.params.id

        const account = await Account.findById(account_id)
        const { total_balance } = account

        const balance = total_balance + deposit_amount

        const transactionObj = new Transactions({
            deposit_amount,
            balance,
            account_id 
        })
        await transactionObj.save()

        await Account.findByIdAndUpdate(account_id, { total_balance: balance })

        await session.commitTransaction()
        session.endSession()

        res.send({
            msg: 'Deposit successfully'
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        res.status(400).send({
            add_error: 'Error while depositing amount.'
        })
    }
})

Router.post('/withdraw/:id', authMiddleware, async (req, res) => {
    const session = await startSession()
    try {
        session.startTransaction()
        const { withdraw_amount } = req.body
        const account_id = req.params.id

        const account = await Account.findById(account_id)
        const { total_balance } = account

        const balance = total_balance - withdraw_amount

        if(withdraw_amount <= total_balance){
            const transactionObj = new Transactions({
                withdraw_amount,
                balance,
                account_id 
            })
            await transactionObj.save()

            await Account.findByIdAndUpdate(account_id, { total_balance: balance })

        } else {
            return res.status(400).send({
                withdraw_error: "You don't have enough balance in your account"
            })
        }
        await session.commitTransaction()
        session.endSession()

        res.send({
            msg: 'Withdraw successfully'
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()

        res.status(400).send({
            add_error: 'Error while depositing amount.'
        })
    }
})
module.exports = Router