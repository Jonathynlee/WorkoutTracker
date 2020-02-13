


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
                
                
            <div class="workoutBox" workoutID = "${result[workoutObj]._id}">
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
        

        


    }).done(function(){
        $(".workoutBox").on("click", function () {
            $("#editWorkoutModal").modal();
        })
    })




       
}

window.onload = function(){generateWorkouts()}