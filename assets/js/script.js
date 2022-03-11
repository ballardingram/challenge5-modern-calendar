tasks = [];

// This code will load the tasks.
var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"))
    if(!tasks) {
        tasks = {};
    };
    printTasks(tasks)
}

var printTasks = function() {
    $.each(tasks, function(list, arr){
        var taskP = $("<p>").addClass("description task-item" + list).text(arr)
        //console.log(list)
        //console.log(taskP)
        $("#task-item" + list).replaceWith(taskP);
    })
}

// This code sets the standard based on the current day.
var Today = (moment().format("MMMM D, YYYY"))
$("#currentDay").text(Today);

//This code sets colors from CSS based on if in the past, present, or future.
var hourAudit = function() {
    var currentHour = moment().hour()
    for(var i=7; i<19; i++) {
        var taskArea = $("#task-" +i)
    if(currentHour>i) {
        $(taskArea).addClass("past");
    } else if (currentHour === i) {
        $(taskArea).addClass("present");
    } else {
        $(taskArea).addClass("future")
        }
    }
}

// This code allows users to update tasks by clicking their mouse.
$(".taskBin").on("click", "p", function(){
    console.log("<p> selected");
    var text =$(this)
    .text()
    .trim();
    var textInput =$("<textarea>")
    .addClass("form-control")
    .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

//This code focuses on the task that needs to be updated.
$(".taskBin").on("blur", "textarea", function() {
    var text = $(this)
    .val()
    .trim();
    console.log(text)

    var taskP = $("<p>")
    .addClass("taskItem")
    .text(text);
    $(this).replaceWith(taskP);
});

// This code saves the tasks.
$(".saveBtn").on("click", function () {
    console.log("Saved!");
    var index = $(".saveBtn").index(this);
    tasks[index] = $(this).parent().find(".taskItem").text();
    localStorage.setItem("tasks", JSON.stringify(tasks));
});

setInterval(function(){
    hourAudit();
},1000*60*60);

loadTasks();
hourAudit();