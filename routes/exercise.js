const router = require("express").Router();

const Exercise = require("../models/exercise.js");
var path = require('path');



router.post("/addExercise", ({ body }, res) => {
    Exercise.create(body)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


// ------------------------------------------- //


// For IndexedDB, this pushes all data to the database

router.get("/getAllExercises", ({ body }, res) => {
    Exercise.find({})
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;
