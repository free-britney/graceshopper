"use strict";

const {
  db,
  models: { User },
} = require("../server/db");
const Genie = require("../server/db/models/Genie");

/**
 *  - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed () {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123", adminStatus: true }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  const genie1 = await Genie.create({
    name: "Estelle",
    price: 5000,
    description: "PlaceHolder Text",
    imageURL:
      "https://i.pinimg.com/originals/49/24/8f/49248fb7831b2421910a638e85726719.jpg",
    wishQty: 3,
    inventory: 2,
    genieAbility: "PlaceHolder Text",
  });

  const genie2 = await Genie.create({
    name: "Katya",
    price: 5000,
    description: "PlaceHolder Text",
    imageURL:
      "https://i.pinimg.com/originals/49/24/8f/49248fb7831b2421910a638e85726719.jpg",
    wishQty: 3,
    inventory: 2,
    genieAbility: "PlaceHolder Text",
  });

  const genie3 = await Genie.create({
    name: "Dominque",
    price: 5000,
    description: "PlaceHolder Text",
    imageURL:
      "https://i.pinimg.com/originals/49/24/8f/49248fb7831b2421910a638e85726719.jpg",
    wishQty: 3,
    inventory: 2,
    genieAbility: "PlaceHolder Text",
  });

  const genie4 = await Genie.create({
    name: "The Genie",
    price: 5000,
    description: "PlaceHolder Text",
    imageURL:
      "https://i.pinimg.com/originals/49/24/8f/49248fb7831b2421910a638e85726719.jpg",
    wishQty: 3,
    inventory: 2,
    genieAbility: "PlaceHolder Text",
  });

  console.log(`ed ${users.length} users`);
  console.log(`ed successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `` function from the `run` function.
 This way we can isolate the error handling and exit trapping.
 The `` function is concerned only with modifying the database.
*/
async function run() {
  console.log("ing...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `` function, IF we ran this module directly (`node `).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of ``.
*/
if (module === require.main) {
  run();
}

// we export the  function for testing purposes (see `./.spec.js`)
module.exports = seed;
