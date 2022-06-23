const express = require('express')
const MemberController = require('../http/controllers/MemberController')
const MemberRequest = require('../http/requests/MemberRequest')
const router = express.Router()

router.get('/', MemberController.get)

router.get('/:id', MemberController.show)

router.post('/', MemberRequest.check, MemberController.create)

router.put('/:id', MemberRequest.check, MemberController.update)

router.delete('/:id', MemberController.delete)

module.exports = router