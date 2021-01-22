const express = require('express')
const authMiddleware = require('../middleware/auth')
const Account = require('../models/Account')
const Transactions = require('../models/Transactions')
const Router = express.Router()
const { startSession } = require('mongoose')
const { getTransactions } = require('../utils/common')

Router.post('/deposit/:id', authMiddleware, async (req, res) => {
    const session = await startSession()
    session.startTransaction()

    try {
        const { deposit_amount } = req.body
        const account_id = req.params.id

        const account = await Account.findById(account_id)
        const { total_balance } = account

        const balance = total_balance + deposit_amount

        const transactionDetails = new Transactions({
            deposit_amount,
            balance,
            account_id 
        })
        await transactionDetails.save({session})

        const accountDetails = await Account.findByIdAndUpdate(account_id, { total_balance: balance }, { new: true, session })

        await session.commitTransaction()

        res.send({
            msg: 'Deposit successfully',
            accountDetails,
            transactionDetails
        })
    } catch (error) {
        await session.abortTransaction()
        
        res.status(400).send({
            add_error: 'Error while depositing amount.'
        })
    } finally {
        session.endSession()
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
            const transactionDetails = new Transactions({
                withdraw_amount,
                balance,
                account_id 
            })
            await transactionDetails.save({ session })

            const accountDetails = await Account.findByIdAndUpdate(account_id, { total_balance: balance }, { new: true, session })

            await session.commitTransaction()

            return res.send({
                msg: 'Withdraw successfully',
                accountDetails,
                transactionDetails
            })
        } else {
            return res.status(400).send({
                withdraw_error: "You don't have enough balance in your account"
            })
        }
        
    } catch (error) {
        await session.abortTransaction()

        res.status(400).send({
            withdraw_error: 'Error while depositing amount.'
        })
    } finally {
        session.endSession()
    }
})

Router.get('/transaction/:id', authMiddleware, async (req, res) => {
    const { startDate, endDate } = req.query
    try {
        const transactions = await getTransactions(req.params.id, startDate, endDate)
        
        res.send(transactions)
    } catch (error) {
        console.log('error',error)
        res.status(400).send({
            transactions_error: 'Error while getting transactions list.'
        })
    }
})
module.exports = Router