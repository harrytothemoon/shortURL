const express = require('express')
const urlExist = require("url-exist")
const router = express.Router()
const url = require('../../models/urlSchema')

router.get('/', (req, res) => {
  url.find()
    .lean()
    .then(url => res.render('index', { url }))
    .catch(error => console.log(error))
})

// Search function
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  url.find({ name: { $regex: keyword, $options: "i" } })
    .lean()
    .then(url => res.render('index', { url, keyword }))
    .catch(error => console.log(error))
})

// Create function
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/new', (req, res) => {
  const { name, category, rating, image, location, google_map, phone, description } = req.body
  url.create({ name, category, rating, image, location, google_map, phone, description })
    .lean()
    .then((url) => res.render('/new', url))
    .catch(error => console.log(error))
})

module.exports = router