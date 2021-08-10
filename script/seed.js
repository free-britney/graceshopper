"use strict";

const {
  db,
  models: { User },
  Genie,
  Order,
} = require("../server/db");

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

  const partialOrder = await Order.create();
  users[1].addOrder(partialOrder);

  const genie1 = await Genie.create({
    name: "Anna",
    price: 100000,
    description: "Founder of the Annamaniacs and the Purveyor of Guidance.",
    imageURL: "https://i.imgur.com/QAZNVIy.png",
    wishQty: 10,
    inventory: 1,
    genieAbility:
      "Boiling down complex concepts.  Helps you work through answers on your own while clarifying your understanding at the same time!",
  });

  const genie2 = await Genie.create({
    name: "Katya",
    price: 5000,
    description: "PlaceHolder Text",
    imageURL: "https://i.imgur.com/Xb93PTF.png",
    wishQty: 3,
    inventory: 2,
    genieAbility: "PlaceHolder Text",
  });

  const genie3 = await Genie.create({
    name: "Dominque",
    price: 5000,
    description: "PlaceHolder Text",
    imageURL: "https://i.imgur.com/yN7bmup.png",
    wishQty: 3,
    inventory: 2,
    genieAbility: "PlaceHolder Text",
  });

  const genie4 = await Genie.create({
    name: "The Genie",
    price: 5000,
    description: "PlaceHolder Text",
    imageURL: "https://i.imgur.com/olffwwk.png",
    wishQty: 3,
    inventory: 2,
    genieAbility: "PlaceHolder Text",
  });

  const genie5 = await Genie.create({
    name: "Placeholder Genie 5",
    price: 5000,
    description: "PlaceHolder Text",
    imageURL: "https://i.imgur.com/yuKDPE8.png",
    wishQty: 3,
    inventory: 2,
    genieAbility: "PlaceHolder Text",
  });

  const genie6 = await Genie.create({
    name: "Placeholder Genie 6",
    price: 5000,
    description: "PlaceHolder Text",
    imageURL: "https://i.imgur.com/9OOSHLm.png",
    wishQty: 3,
    inventory: 2,
    genieAbility: "PlaceHolder Text",
  });

  const genie7 = await Genie.create({
    name: "Placeholder Genie 7",
    price: 5000,
    description: "PlaceHolder Text",
    imageURL: "https://i.imgur.com/R1jz5h7.png",
    wishQty: 3,
    inventory: 2,
    genieAbility: "PlaceHolder Text",
  });

  const genie8 = await Genie.create({
    name: "Placeholder Genie 8",
    price: 5000,
    description: "PlaceHolder Text",
    imageURL: "https://i.imgur.com/YOKE3AC.png",
    wishQty: 3,
    inventory: 2,
    genieAbility: "PlaceHolder Text",
  });

  const genie9 = await Genie.create({
    name: "Placeholder Genie 9",
    price: 5000,
    description: "PlaceHolder Text",
    imageURL: "https://i.imgur.com/MEGFwos.png",
    wishQty: 3,
    inventory: 2,
    genieAbility: "PlaceHolder Text",
  });

  const genie10 = await Genie.create({
    name: "Placeholder Genie 10",
    price: 5000,
    description: "PlaceHolder Text",
    imageURL: "https://i.imgur.com/qa5J4rQ.png",
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
