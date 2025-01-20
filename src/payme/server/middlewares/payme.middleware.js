const base64 = require('base-64')
const TransactionError = require('../errors/transaction.error')
const PaymeError = require('../enum/transaction.enum')

module.exports = function (req, res, next) {
  try{
    const {id} = req.body
    const auth = req.headers.authorization
    const token =  auth && auth.split(' ')[1]
    if (!token) throw new TransactionError(PaymeError.InvalidAuthorization, id) 
        const decode = base64.decode(token)
    if(!data.inculdes(process.env.PAYME_SECRET_KEY)) {
      throw new TransactionError(PaymeError.InvalidAuthorization, id)
    }
    next()
  }
  catch (error) {
    next(error)
  } 
}