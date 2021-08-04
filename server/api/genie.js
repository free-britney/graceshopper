const router = require('express').Router();
const {Genie} = require('../db');


router.post('/', async(req, res, next) => {
    try {
        const newGenie = await Genie.create(req.body);
        res.json(newGenie);
    } catch (err){
        next(err)
    }
})

module.exports = router;
