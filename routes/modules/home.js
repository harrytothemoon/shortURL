const express = require('express')
const urlExist = require('url-exist')
const router = express.Router()
const urldata = require('../../models/urlSchema')
const generateGarbled = require('../../random')

router.get('/', (req, res) => {
  urldata.find()
    .lean()
    .then(url => res.render('index', { url }))
    .catch(error => console.log(error))
})

//list
router.get('/list', (req, res) => {
  urldata.find()
    .lean()
    .then(url => res.render('urllist', { url }))
    .catch(error => console.log(error))
})

// Create function
router.get('/new', (req, res) => {
  urldata.find()
    .lean()
    .then(url => res.render('new', { url }))
    .catch(error => console.log(error))
})
router.post('/new', async (req, res, next) => {
  const urloriginal = req.body.url
  const checkUrl = await urlExist(urloriginal)
  urldata.findOne({ urlFull: urloriginal })
    .lean()
    .then((url) => {
      //先確認輸入的網址是否有效，有效則進行下一步，無效則跳出提醒
      if (checkUrl) {
        //再確認資料庫是否有值，有的話則提醒已經有短網址可用，無的話則新增一個短網址
        if (url) {
          const existMessage = 'The URL you entered has been shorten previously,'
          console.log('True', url)
          return res.render('new', { url, existMessage })
        } else {
          const newUrl = new urldata({ urlFull: urloriginal })
          const random = generateGarbled(5)
          newUrl.urlShort = random
          return newUrl.save()
            .then(() => {
              urldata.findOne({ urlFull: urloriginal })
                .lean()
                .then((url) => {
                  console.log('false', url)
                  res.render('new', { url })
                })
            })
        }
      } else {
        res.send(`
        <h3>Please input a valid URL！</h3>
        <button type="button" onclick="history.back()">Back</button>
        `)
      }
    })
    .catch(error => console.log(error))
})

router.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  urldata.findOne({ urlShort: shortUrl })
    .then((url) => {
      if (url == null) {
        res.sendStatus(404)
      }
      if (url !== null) {
        url.click++
        url.save()
        console.log(url.click)
        res.redirect(url.urlFull)
      }
    })
    .catch(error => console.log(error))
})

module.exports = router