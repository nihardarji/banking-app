const jwt = require('jsonwebtoken')
const BankUser = require('../models/BankUser')
const Tokens = require('../models/Tokens')


const authMiddleware = async function (req, res, next) {
    try {
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.secret);
        const tokensUserId = await Tokens.findOne({access_token: token, userId: decoded._id})
        
        if(tokensUserId){
            const user = await BankUser.findById(tokensUserId.userId).select('-password')
            req.user = user;
            req.token = token;
            next();
        } else {
            throw new Error('Error while authentication');
        }
    } catch (error) {
        res.status(400).send({
            auth_error: 'Authentication failed.'
        });
    }
  };
  
module.exports = authMiddleware;