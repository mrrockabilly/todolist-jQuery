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
    for (var i = 0; i < tasks.length; i++) {
        let newElem = $(`<li class="collection-item">
        <div class="row nonono">
            <div class="col s6 myleft nonono">
                 ${tasks[i].task_name} 
            </div>
            <div class="col s6 myright nonono">
                ${tasks[i].task_due}
             </div>
        </div>

        </li>`);

        if (checkLate(tasks[i].task_due)) {
            newElem.addClass("late");
        }
        if (tasks[i].task_is_done) {
            newElem.addClass("done");
            newElem.removeClass("late")
            $("#todo-list").append(newElem);
        } else {
            $("#todo-list").prepend(newElem);
        }
    }
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