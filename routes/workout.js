const router = require("express").Router();
const Workout = require("../models/workout");

var path = require('path');


router.get("/getAllWorkouts", (req, res) => {
    Workout.find({})
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/addWorkout", ( req , res) => {
    
    Workout.create(req.body)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.status(400).json(err);
           
        });
});

module.exports = router;
