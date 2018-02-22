$(function () {

    let tasks = getLocalStorage();

    setUpDatePicker();
    writeList();
    doneButtons();
    addNewItem();

    function setLocalStorage(state) {
        localStorage.setItem("state", JSON.stringify(state))
    }

    function getLocalStorage() {
        if (localStorage.getItem("state") === null) {
            return []
        }
        return JSON.parse(localStorage.getItem("state"))
    }

    //Check if an item is Late.
    function checkLate(date) {
        let today = new Date();
        let month = ['January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December']

        date = date.replace(",", "");
        date = date.split(" ");
        date[1] = month.indexOf(date[1]) //Change into number format

        let jsDate = new Date(date[2], date[1], date[0])

        if (today > jsDate) {
            return true;
        }
        return false;
    }


    // Writes the tasks to the DOM
    function writeList() {
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
        finished.forEach(function (elm) {
            $("#todo-list").append(elm);
        })


    }



    function setUpDatePicker() {
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: false // Close upon selecting a date,
        });
    }




    function doneButtons() {
        $(".btn-done").click(function () {
            $(this).html("<i class='material-icons'>delete_forever</i> Remove")
            let thisElm = $(this).parent().parent().parent();
            let leftText = $( ".myleft" );
            let text = thisElm.find(leftText)[0].innerText
            console.log(text)
            // let itemToRemove = thisElm.text().trim().split(" ")[0];
            let itemsLoc = tasks.findIndex(function (item) {
                if (item.task_name === text) {
                    return true
                }
                return false
            })
            tasks[itemsLoc].task_is_done = true;
            setLocalStorage(tasks);
            $(this).parent().parent().parent().remove();
            thisElm.addClass("done");
            $("#todo-list").append(thisElm);
            $(".done .btn").click(function () { 
                let thisElm = $(this).parent().parent().parent();
                let leftText = $( ".myleft" );
                let text = thisElm.find(leftText)[0].innerText
                let itemsLoc = tasks.findIndex(function (item) {
                    if (item.task_name === text) {
                        return true
                    }
                    return false
                })
                tasks.splice(itemsLoc, 1);
                setLocalStorage(tasks);
                $(this).parent().parent().parent().remove();
            })
        })
    }


    function addNewItem() {
        $(".adder").click(function (event) {
            let name = $("#todoname").val();
            let date = $("#tododate").val();
            $("form")[0].reset();
            let newElm = $(`<li class="collection-item">
                                        <div class="row nonono">
                                            <div class="col s4 myleft nonono">
                                                ${name} 
                                            </div>
                                            <div class="col s4 mycenter nonono">
                                                ${date}
                                            </div>
                                            <div class="col s4 myright nonono">
                                            <a class="waves-effect waves-light btn btn-done"><i class="material-icons left">delete</i>Done</a>
                                            </div>
                                        </div>
                                    </li>`);
            if (checkLate(date)) {
                newElm.addClass("late");
            }
            $("#todo-list").append(newElm)
            tasks.push({
                task_name: name,
                task_is_done: false,
                task_due: date,
            })
            doneButtons();
            setLocalStorage(tasks);
        });
    }
})