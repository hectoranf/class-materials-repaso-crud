const express = require('express')
const router = express.Router()

const Coaster = require('../models/coaster.model')
const Park = require('../models/park.model')

router.get('/new', (req, res, next) => {
    Park.find()
        .then(allParks => res.render('coasters/new-coaster', { parks: allParks }))
        .catch(error => next(error))

})

router.post('/new', (req, res, next) => {
    const { name, description, inversions, length, park } = req.body
    Coaster.create({ name, description, inversions, length, park, active: true })
        .then(res.redirect('/'))
        .catch(error => next(error))
})

router.get('/', (req, res, next) => {
    Coaster.find()
        .populate('park')
        .then(allCoasters => res.render('coasters/coasters-index', { coasters: allCoasters }))
        .catch(error => next(error))
})

router.get('/edit', (req, res, next) => {
    Coaster.findById(req.query.id)
        .populate('park')
        .then(foundCoaster => {
            Park.find()
                .then(allParks => res.render('coasters/edit-coaster', { coaster: foundCoaster, parks: allParks }))
                .catch(error => next(error))
        })
        .catch(error => next(error))
})

router.post('/edit', (req, res, next) => {
    const { name, description, inversions, length, park } = req.body

    Coaster.findByIdAndUpdate(req.query.id, { name, description, inversions, length, park }, { new: true })
        .then(updatedCoaster => res.redirect(`/coasters/${updatedCoaster._id}`))
        .catch(error => next(error))
})

router.get('/:id', (req, res, next) => {
    Coaster.findById(req.params.id)
        .populate('park')
        .then(foundCoaster => res.render('coasters/coaster-details', foundCoaster))
        .catch(error => next(error))
})

router.post('/delete', (req, res, next) => {
    Coaster.findByIdAndRemove(req.query.id)
        .then(res.redirect('/coasters/'))
        .catch(error => next(error))
})



module.exports = router