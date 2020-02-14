const router = require("express").Router();

const Exercise = require("../models/exercise.js");
var path = require('path');
const ObjectId = require('mongodb').ObjectId;



router.post("/addExercise", ( req , res) => {
    let cur = req.body.currentExerciseArr;
    console.log(cur);
    for (exercises in cur){

        if (cur[exercises].id != ""){
            Exercise.updateOne({_id:new ObjectId(cur[exercises].id)}, {$set:{name:cur[exercises].name, qty:cur[exercises].qty}})
        .then(response => {
            res.json(response);
        }).catch(err => {
            res.status(400).json(err);
        });
            
        }else{
            Exercise.create({name:cur[exercises].name, qty:cur[exercises].qty, workoutID:cur[exercises].workoutId })
            .then(response => {
                res.json(response);
            })
            .catch(err => {
                res.status(400).json(err);
            });
        }
    }
   
});


// ------------------------------------------- //


// For IndexedDB, this pushes all data to the database

router.get("/getExercises", ( req , res) => {
    let o_id = new ObjectId(req.body.workoutID);
    
    Exercise.find({workoutID:o_id})
        .then(response => {
            
            res.json(response);
        })
        .catch(err => {
            res.status(400).json(err);
           
        });
});





module.exports = router;
