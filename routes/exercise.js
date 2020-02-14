const router = require("express").Router();

const Exercise = require("../models/exercise.js");
var path = require('path');
const ObjectId = require('mongodb').ObjectId;



router.post("/addExercise", ( req , res) => {
    let cur = req.body.currentExerciseArr;
  
    for (exercises in cur){

        if (cur[exercises].id != ""){
            Exercise.updateOne({_id:ObjectId(cur[exercises].id)}, {$set:{name:cur[exercises].name, qty:cur[exercises].qty}})
        .then(response => {
            return res.json(response);
        }).catch(err => {
            return res.status(400).json(err);
        });
            
        }else{
            Exercise.create({name:cur[exercises].name, qty:cur[exercises].qty, workoutID:cur[exercises].workoutId })
            .then(response => {
                return res.json(response);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
        }
    }
   
});


// ------------------------------------------- //


// For IndexedDB, this pushes all data to the database

router.post("/getExercises", ( req , res) => {
    
    
    Exercise.find({workoutID:ObjectId(req.body.workoutID)})
        .then(response => {
           
            res.json(response);
        })
        .catch(err => {
            res.status(400).json(err);
           
        });
});





module.exports = router;
