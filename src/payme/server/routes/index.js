const router = require('express').Router()

router.use('/user', require('./user'))
router.use('/payme', require('./payme'))

module.exports = router
