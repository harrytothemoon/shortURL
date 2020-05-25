function sample(array) {
  let radomIndex = Math.floor(Math.random() * array.length)
  return array[radomIndex]
}

function generateGarbled(options) {
  // define things user might want
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  // create a collection to store things user picked up
  let collection = [...upperCaseLetters, ...lowerCaseLetters, ...numbers]

  let random = ''

  for (let i = 0; i < options; i++) {
    random += sample(collection)
  }

  return random
}

module.exports = generateGarbled

