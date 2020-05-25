const url = require('../urlSchema')
const generateGarbled = require('../../random')

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')

  url.create({
    urlFull: "https://www.google.com.tw/",
    urlShort: generateGarbled(5)

  })

  url.create({
    urlFull: "https://www.yahoo.com.tw/",
    urlShort: generateGarbled(5)
  })

  console.log('done!')
})
