let tasks = [
    {
        task_name: 'Clean Dishes',
        task_is_done: false,
        task_due: '2018-12-03',
    },
    {
        task_name: 'Buy a cat!',
        task_is_done: false,
        task_due: '2018-06-03',
    },
    {
        task_name: 'Propose to Katy Perry',
        task_is_done: true,
        task_due: '2018-05-05',
    },
    {
        task_name: 'Start eating two apples a day.',
        task_is_done: false,
        task_due: '2018-11-20',
    },
    {
        task_name: 'Clean kitty litter.',
        task_is_done: false,
        task_due: '2016-05-13',
    },
];


$(function () {

    $('.input').keypress(function (e) {
        if (e.which == 13) {
            $('form#login').submit();
        }
    });

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
    });

    writeList();
    doneButtons();

})


function checkLate(date) {
    var today = new Date();
    var date_array = date.split("-");
    date_array = date_array.map(function (x) {
        return parseInt(x);
    })
    var js_date = new Date(date_array[0], date_array[1] - 1, date_array[2] + 1);
    console.log(date_array[2] + 1);
    if (today > js_date) {
        return true;
    }
    return false;
}

function writeList(){
    let finished = [];
    for (var i = 0; i < tasks.length; i++) {
        let newElem = $(`<li class="collection-item">
        <div class="row nonono">
            <div class="col s4 myleft nonono">
                 ${tasks[i].task_name} 
            </div>
            <div class="col s4 mycenter nonono">
                ${tasks[i].task_due}
            </div>
            <div class="col s4 myright nonono">
              <a class="waves-effect waves-light btn btn-done"><i class="material-icons left">delete</i>Done</a>
             </div>
        </div>

        </li>`);

        if (checkLate(tasks[i].task_due)) {
            newElem.addClass("late");
        }
        if (tasks[i].task_is_done) {
            newElem.addClass("done");
            newElem.removeClass("late")
            finished.push(newElem);
        } else {
            $("#todo-list").append(newElem);
        }
    }
    finished.forEach(function(elm){
        $("#todo-list").append(elm);
    })


}

function doneButtons(){
    $(".btn-done").click(function(){
        $(this).html("<i class='material-icons left'>delete_forever</i> Remove")
        let thisElm = $(this).parent().parent().parent()
        $(this).parent().parent().parent().remove();
        thisElm.addClass("done");
        $("#todo-list").append(thisElm);
        $(".done .btn").click(function(){
            $(this).parent().parent().parent().remove();
        })
    }) 
}
