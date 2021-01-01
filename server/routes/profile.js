const express = require('express')
const authMiddleware = require('../middleware/auth')
const BankUser = require('../models/BankUser')
const { isInvalidField } = require('../utils/common')
const Router = express.Router()

Router.get('/profile', authMiddleware , async (req, res) => {
    try {
        res.send(req.user)
    } catch (error) {
        res.status(400).send({
            profile_error: 'Error while getting profile data.'
        })
    }
})

Router.post('/profile', authMiddleware, async (req,res) => {
    try {
        const { name, email } = req.body;
        const validFieldsToUpdate = ['name', 'email']
        const receivedFields = Object.keys(req.body)

        const isInvalidFieldProvided = isInvalidField(
            receivedFields,
            validFieldsToUpdate
        )
       
        if (isInvalidFieldProvided || !name || !email ) {
            return res.status(400).send({
              update_error: 'Invalid field.'
            });
        }
        const result = await BankUser.findByIdAndUpdate(req.user._id, { name, email }, { new : true }).select('-password')

        res.send(result)
    } catch (error) {
        console.log('error',error)
        res.status(400).send({
            profile_error: 'Error while updating profile.'
        })
    }
})
module.exports = Router