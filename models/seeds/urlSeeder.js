const url = require('../urlSchema')

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')

  url.create({
    urlFull: "https://www.google.com.tw/",
    urlShort: `http://localhost:3000/12345`

  })

  url.create({
    urlFull: "https://www.yahoo.com.tw/",
    urlShort: `http://localhost:3000/67890`
  })

  console.log('done!')
})

