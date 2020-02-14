
let lastId = "";
let numOfExercise = 0;
let currentExerciseArr = [{}];
$(".addWorkoutBox").on("click", function () {
    $("#addWorkout").modal();
})



$("#submitNewWorkout").on("click", function () {
    $("#workouts").prepend(`
    <div class="workoutBox">
    <div class="row workoutImage">
        <div class="col-md-12 image">

            <img
                src="https://lh3.googleusercontent.com/proxy/tWaC8TgslNoa3y-eaLJrmVp1YPREPJq2ybEYycjf-QIwgjudrRa-O5Djx1HSXFYv7zYlrFqBEECy7flHsVe5YX28">
        </div>
    </div>

    <div class="row WOImageText">
        <div class="col-md-12">
            <h2> Abs/Core</h2>
        </div>
    </div>

</div>
    `)
})



function addWorkout() {
    let img = $("#workoutImg").val();
    let name = $("#workoutTitle").val();



    $.ajax({
        method: "POST",
        url: "/workout/addWorkout",
        data: { name: name, image: img }

    }).done(function (result) {

        location.reload();

    })
}



function generateWorkouts() {


    $.ajax({
        method: "GET",
        url: "/workout/getAllWorkouts",


    }).then(function (result) {
       
        console.log(result)
        for (workoutObj in result) {

            $("#workouts").prepend(`
                
                
            <div class="workoutBox" workoutID = "${result[workoutObj]._id}" workoutName = "${result[workoutObj].name}">
                <div class="row workoutImage">
                    <div class="col-md-12 image">

                    <img src="${result[workoutObj].image}">
                 </div>
                </div>

                <div class="row WOImageText">
                 <div class="col-md-12">
                        <h2> ${result[workoutObj].name}</h2>
                    </div>
                </div>
               
            </div>
                `)
               
        }





    }).done(function () {
        $(".workoutBox").on("click", function (event) {
            if ($(event.target).attr("workoutID") != null) {
                setUpModal(event);
                $("#editWorkoutModal").modal();
            }
        })
    })





}

window.onload = function () { generateWorkouts() }




function setUpModal(event) {
    let currentObjectId = $(event.target).attr("workoutid");
    lastId = currentObjectId
    let currentObjectName = $(event.target).attr("workoutName");
    console.log($(event.target).attr("workoutid"))
    $("#editWorkoutLabel").html(`${currentObjectName}`)
    $.ajax({
        method: "POST",
        url: "/exercise/getExercises",
        data: { workoutID: currentObjectId }


    }).then(function (result) {
        console.log(result);
        numOfExercise =0;
        
        console.log("got here")
        $("#exerciseInputRow").html(``);
        for (items in result) {
            $("#exerciseInputRow").append(`
            
            <div class = "col-md-6">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text"><i class="fas fa-dumbbell"></i></div>
                            </div>
                            <input type="text" value = "${result[items].name}" class="form-control" exId = "${result[items]._id}" id="workout${numOfExercise}" placeholder="e.g. pushups">
                        </div>
                        </div>

                        <div class = "col-md-6">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">#</div>
                            </div>
                            <input type="text" value = "${result[items].qty}" class="form-control" id="qty${numOfExercise}" placeholder="e.g.10">
                        </div>
                        </div>
            
            `)
            for (let i =  0; i< numOfExercise;i++){

                let curWorkoutId = $(`#workout${i}`);
                let curWorkoutqty = $(`#qty${i}`);
                let  exerciseID = $(`#workout${i}`).attr("exId");
                currentExerciseArr[i] = {}
                currentExerciseArr[i] = {"workoutId":lastId, "name":curWorkoutId.val(), "qty":curWorkoutqty.val(), "id":exerciseID};
            }
            console.log(currentExerciseArr);
            numOfExercise++;
        }


    })

}


function addExerciseToModal() {
    $("#exerciseInputRow").append(`
            
    
    <div class = "col-md-6">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text"><i class="fas fa-dumbbell"></i></div>
                    </div>
                    <input type="text" class="form-control" exId = "" id="workout${numOfExercise}" placeholder="e.g. pushups">
                </div>
                </div>

                <div class = "col-md-6">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">#</div>
                    </div>
                    <input type="text" class="form-control" id="qty${numOfExercise}" placeholder="e.g.10">
                </div>
                </div>
    
    `)
    for (let i =  0; i< numOfExercise;i++){

        let curWorkoutId = $(`#workout${i}`);
        let curWorkoutqty = $(`#qty${i}`);
        let  exerciseID = $(`#workout${i}`).attr("exId");
        currentExerciseArr[i] = {}
        currentExerciseArr[i] = {"workoutId":lastId, "name":curWorkoutId.val(), "qty":curWorkoutqty.val(), "id":exerciseID};
    }
    console.log(currentExerciseArr);
    numOfExercise++;
}



function updateExerciseDB(){
    for (let i =  0; i< numOfExercise;i++){

        let curWorkoutId = $(`#workout${i}`);
        let curWorkoutqty = $(`#qty${i}`);
        let  exerciseID = $(`#workout${i}`).attr("exId");
        currentExerciseArr[i] = {}
        currentExerciseArr[i] = {workoutId:lastId, name:curWorkoutId.val(), qty:curWorkoutqty.val(), id:exerciseID};
        console.log(currentExerciseArr);
    }
    $.ajax({
        method: "POST",
        url: "/exercise/addExercise",
    data: {currentExerciseArr}, 
        

    }).then(function (result) {
console.log(result)
$("#editWorkoutModal").modal("hide");
    })

}

