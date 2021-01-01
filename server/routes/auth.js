const express = require('express')
const bcrypt = require('bcryptjs')
const {
    validateUser,
    isInvalidField,
    generateAuthToken
  } = require('../utils/common')
const authMiddleware = require('../middleware/auth')
const BankUser = require('../models/BankUser')
const Tokens = require('../models/Tokens')

const Router = express.Router()

Router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const validFieldsToUpdate = [
            'name',
            'email',
            'password'
        ]
        const receivedFields = Object.keys(req.body)
    
        const isInvalidFieldProvided = isInvalidField(
            receivedFields,
            validFieldsToUpdate
        )
        console.log('isInvalidFieldProvided', isInvalidFieldProvided) 
          
        if (isInvalidFieldProvided) {
            return res.status(400).send({
            signup_error: 'Invalid field.'
            })
        }

        const count = await BankUser.count({email})
        if (count > 0) {
            return res.status(400).send({
                signup_error: 'User with this email address already exists.'
            })
        }
    
        const hashedPassword = await bcrypt.hash(password, 8)
        const user = new BankUser({
            name,
            email,
            password: hashedPassword
        })
        await user.save()
        // const token = await generateAuthToken(user);
        // const tokenObj = new Tokens({
        //     access_token: token,
        //     userId: user._id
        // })
        // await tokenObj.save()
        // const resp = { email, token, _id: user._id}
        // res.status(201).send(resp)
        res.status(201).send()
    } catch (error) {
        res.status(400).send({
            signup_error: 'Error while signing up..Try again later.'
        })
    }
})

Router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await validateUser(email, password);
    if (user === null) {
      res.status(400).send({
        sigin_error: 'Email/password does not match.'
      });
    }
    const token = await generateAuthToken(user);
    const tokenObj = new Tokens({
        access_token: token,
        userId: user._id
    })
    await tokenObj.save()
    const resp = { email, token, _id: user._id}
    res.send(resp);
  } catch (error) {
    res.status(400).send({
      signin_error: 'Email/password does not match.'
    });
  }
});

Router.post('/logout', authMiddleware, async (req, res) => {
  try {
    const { _id } = req.user
    
    await Tokens.findOneAndRemove({userId: _id, access_token: req.token})
    res.send()
  } catch (error) {
    res.status(400).send({
      logout_error: 'Error while logging out..Try again later.'
    })
  }
})

module.exports = Router