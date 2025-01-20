const paymeController = require('../controllers/payme.controller')
const paymeMiddleware = require('../middlewares/payme.middleware')
const userMiddleware = require('../middlewares/user.middleware')
const router = require('express').Router()

router.post('/pay', paymeMiddleware, paymeController.pay)
router.post('/checkout', userMiddleware, paymeController.checkout)

module.exports = router
