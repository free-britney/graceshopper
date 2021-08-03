const router = require('express').Router();
const {Genie} = require('../db');


router.post('/', async(req, res, next) => {
    try {
        const newProject = await Project.create(req.body);
        res.json(newProject);
    } catch (err){
        next(err)
    }
})

module.exports = router;
