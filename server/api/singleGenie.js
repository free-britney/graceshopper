//will add this to Anj's genies api 8/4 once that file is in place - just set aside for the sake of getting coding done

//DO NOT ADD to this file - add to other genie api file. this will be deleted 8/4

const router = require('express').Router();
const { models: { Genie }} = require('../db');

router.get('/:genieId', async (req, res, next) => {
  try {
    const singleGenie = await Genie.findbyPk(req.params.id)
    if(!singleGenie) res.sendStatus(404);
    else res.json(singleGenie);
  } catch(err) {
    next(err);
  }
})


module.exports = router;
