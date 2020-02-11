const router = require("express").Router();
const Workout = require("../models/workout.js");
const Exercise = require("../models/exercise.js");
var path = require('path');

router.post("/api/addExercise", ({ body }, res) => {
    Exercise.create(body)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/api/addWorkout", ({ body }, res) => {
    Workout.create(body)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


// For IndexedDB, this pushes all data to the database
router.post("/api/workout/bulk", ({ body }, res) => {
    Workout.insertMany(body)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
router.post("/api/exercise/bulk", ({ body }, res) => {
    Exercise.insertMany(body)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
// ------------------------------------------- //


router.get("/api/getAllWorkouts", ({ body }, res) => {
    Workout.find({})
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
router.post("/api/getAllExcercises", ({ body }, res) => {
    Exercise.insertMany(body)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});



router.get("/login", (req, res) => {
    res.render("login")
});
router.get("/", (req, res) => {
    res.render("home")
});
router.get("/signup", (req, res) => {
    res.render("signup")
});
/*
router.get("/api/transaction", (req, res) => {
  Transaction.find({})
    .sort({ date: -1 })
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
*/
module.exports = router;
