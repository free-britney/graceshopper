'use strict'

const {db, models: {User} } = require('../server/db')
const Genie = require('../server/db/models/Genie')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  const genie1 = await Genie.create({
    name: 'Estelle',
    price: 5000,
    description: 'PlaceHolder Text',
    imageURL: 'https://i.pinimg.com/originals/49/24/8f/49248fb7831b2421910a638e85726719.jpg',
    wishQty: 3,
    inventory: 2,
    genieAbility: 'PlaceHolder Text'
  })

  const genie2 = await Genie.create({
    name: 'Katya',
    price: 5000,
    description: 'PlaceHolder Text',
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTczavcZXXHpPts8jpNy2CBgf5NT-RVmXqdMA&usqp=CAU',
    wishQty: 3,
    inventory: 2,
    genieAbility: 'PlaceHolder Text'
  })

  const genie3 = await Genie.create({
    name: 'Dominque',
    price: 5000,
    description: 'PlaceHolder Text',
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFisgvSMCcPPqixHi7wVyXKuSQFlCjsPT96A&usqp=CAU',
    wishQty: 3,
    inventory: 2,
    genieAbility: 'PlaceHolder Text'
  })

  const genie4 = await Genie.create({
    name: 'The Genie',
    price: 5000,
    description: 'PlaceHolder Text',
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_5awgmZyPS9_zBbSC2RioPX5l67lhTlGWm-jMfC--GnvUzxDIXSAxMDuuXwXX3y0Ihu0&usqp=CAU',
    wishQty: 3,
    inventory: 2,
    genieAbility: 'PlaceHolder Text'
  })

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}


/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
