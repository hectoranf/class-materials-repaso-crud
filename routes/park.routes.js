const express = require('express')
const router = express.Router()

const Park = require('../models/park.model')

router.get('/new', (req, res, next) => res.render('parks/new-park'))

router.post('/new', (req, res, next) => {
	const { name, description } = req.body
	Park.create({ name, description, active: true })
		.then(res.redirect('/'))
		.catch(error => next(error))
})

module.exports = router