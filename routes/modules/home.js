const express = require('express')
const urlExist = require('url-exist')
const router = express.Router()
const urldata = require('../../models/urlSchema')
const generateGarbled = require('../../public/javascripts/random')

//home page
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
  if (!checkUrl) return res.send(`
        <h3>Please input a valid URL！</h3>
        <button type="button" onclick="history.back()">Back</button>
        `);
  urldata.findOne({ urlFull: urloriginal }).lean()
    .then((url) => {
      //1.先確認輸入的網址是否有效，有效則進行下一步，無效則跳出提醒
      //2.再確認資料庫是否有值，有的話則提醒已經有短網址可用，無的話則進行下一步判斷
      //3.最後判斷是否產生的5碼亂數是否有重複，有的話則進入迴圈，無的話則產生短網址
      if (url) {
        const existMessage = 'The URL you entered has been shorten previously,'
        return res.render('new', { url, existMessage })
      }
      if (url === null) {
        let random = `https://secret-thicket-82895.herokuapp.com/${generateGarbled(5)}`
        urldata.find()
          .then(checkShort => {
            const checkExist = checkShort.map(x => x.urlShort)
            while (checkExist.includes(random)) {
              random = `https://secret-thicket-82895.herokuapp.com/${generateGarbled(5)}`
            }
            return random
          })
          .then(() => {
            const newUrl = new urldata({ urlFull: urloriginal })
            newUrl.urlShort = random
            return newUrl.save()
              .then(() => {
                urldata.findOne({ urlFull: urloriginal })
                  .lean()
                  .then((url) => {
                    res.render('new', { url })
                  })
              })
          })
      }
    })
    .catch(error => console.log(error))
})

// Delete Function
router.delete('/url/:id', (req, res) => {
  const id = req.params.id
  return urldata.findById(id)
    .then(url => url.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//讓短網址重新導向
router.get('/:shortUrl', (req, res) => {
  const shortUrl = `https://secret-thicket-82895.herokuapp.com/${req.params.shortUrl}`
  urldata.findOne({ urlShort: shortUrl })
    .then((url) => {
      if (url == null) {
        res.sendStatus(404)
      }
      if (url !== null) {
        url.click++
        url.save()
        res.redirect(url.urlFull)
      }
    })
    .catch(error => console.log(error))
})

module.exports = router