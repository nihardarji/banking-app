const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const BankUser = require('../models/BankUser')
const Transactions = require('../models/Transactions')

const isInvalidField = (receivedFields, validFieldsToUpdate) => {
    return validFieldsToUpdate.some(
      (field) => receivedFields.indexOf(field) === -1
    ) || receivedFields.some(
      (field) => validFieldsToUpdate.indexOf(field) === -1
    )
}

const generateAuthToken = async (user) => {
    const { _id, email } = user
    const secret = process.env.secret
    const token = await jwt.sign({ _id, email }, secret)
    return token
}

const validateUser = async (email, password) => {
    const user = await BankUser.findOne({email})
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)

      if (isMatch) {
        delete user.password
        return user
      } else {
        throw new Error()
      }
    } else {
      throw new Error()
    }
}

const getTransactions = async (account_id, startDate, endDate) => {
    try {
        if(startDate && endDate){
            const start = new Date(startDate).setHours(00,00,00)
            const end = new Date(endDate).setHours(23,59,59)
            console.log('123456', new Date().getTimezoneOffset(), end,start, Date.parse(endDate))
            if(new Date(end).getTime() > new Date(endDate).getTime()){
              console.log('true')
            } else {
              console.log('false')
            }
            const result = await Transactions.find({ 
                account_id, 
                transaction_date: {
                    $gt : new Date(start).getTime(),
                    $lt: new Date(end).getTime()
            }}).sort({ transaction_date: 'desc' })

            return result
        } else {
            const result = await Transactions.find({ account_id }).sort({ transaction_date: 'desc' })

            return result
        }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    isInvalidField,
    validateUser,
    generateAuthToken,
    getTransactions
}