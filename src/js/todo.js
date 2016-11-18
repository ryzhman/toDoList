/**
 * Created by Олександр on 15.11.2016.
 */


var listOfTodos = [
    {
        "title": "Wash the car",
        "priority": 3,
        "description": "Wash and wax it",
        "status": "active"
    },
    {
        "title": "Clean un appartment",
        "priority": 2,
        "description": "Mop the floor and hunt all dust bunnies",
        "status": "active"
    },
    {
        "title": "Prepare for exam",
        "priority": 1,
        "description": "Read OCA book and pass all mock exams",
        "status": "active"
    }
];
show();

function addNewElement() {
    var newTodoTitle = document.getElementById("title").value;
    var newTodoDescription = document.getElementById("description").value;
    var priority = document.getElementById("priority").value;

    var maxNumber = Math.max.apply(Math, listOfTodos.map(function (o) {
        return o.priority;
    }));
    if (priority.length == 0) {
        priority = ++maxNumber;
    }
    var newTodo = {
        "title": newTodoTitle,
        "priority": priority,
        "description": newTodoDescription,
        "status": "active"
    };
    var list = getListOfTodos();
    list.push(newTodo);

    show();
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("priority").value = "";
    window.open(location, '_self', '');
    window.close();
    return false;
}

function show() {
    var list = getListOfTodos();
    list.sort(function (a, b) {
        return parseFloat(a.priority) - parseFloat(b.priority);
    });

    var listOfTodos = "<table id='table'>" +
        "<tr>" +
        "<th>Priority</th>" +
        "<th>Task</th>" +
        "<th>Description</th>" +
        "<th>Remove</th>" +
        "<th>Done</th>" +
        "</tr>";
    if (list.length == 0) {
        listOfTodos += "<tr><th></th>" + "<th>You still don't have any tasks to do? 0.0 - Use add button to add new</th>" + '<th></th>' +
            '<th></th></tr>';
    } else {
        for (var i in list) {
            listOfTodos += "<tr id='raw" + i + "'>" +
                "<td>" + '<div class="leftDiv" id="' + i + '">↑</div>' + list[i].priority + '<div class="rightDiv" id="' + i + '">↓</div></td>' +
                "<td class='cellWithName'>" + list[i].title + '</td>' +
                "<td class='cellWithDescription'>" + list[i].description + '</td>' +
                '<td><button class="removeElement" id="' + i + '">✗</button></td>' +
                '<td><button class="done" id="' + i + '">&#10003;</button></td>' +
                '</tr>';
        }
    }
    listOfTodos += '</table>';
    document.getElementById('list').innerHTML = listOfTodos;
    document.getElementById('table').className = 'table';
    document.getElementsByClassName('tr').className = 'tableHeaders';

    var up = document.getElementsByClassName("leftDiv");
    for (var i = 0; i < up.length; i++) {
        up[i].addEventListener('click', priorityDown);
    }
    var down = document.getElementsByClassName("rightDiv");
    for (var i = 0; i < down.length; i++) {
        down[i].addEventListener('click', priorityUp);
    }

    var buttons = document.getElementsByClassName('removeElement');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    }

    var buttonsDone = document.getElementsByClassName('done');
    for (var i = 0; i < buttons.length; i++) {
        buttonsDone[i].addEventListener('click', done);
    }
}


function priorityUp() {
    var id = this.getAttribute('id');
    var list = getListOfTodos();
    if (list[id].status == "active") {
        list[id].priority++;
        show();
    }
    return false;

}

function priorityDown() {
    var id = this.getAttribute('id');
    var list = getListOfTodos();
    if (list[id].status == "active") {
        if (list[id].priority != 1) {
            list[id].priority--;
        }
        show();
    }
    return false;
}

function remove() {
    var id = this.getAttribute('id');
    var list = getListOfTodos();
    list.splice(id, 1);

    for (var i = 0; i < list.length; i++)
        if (list[i].priority > id) {
            list[i].priority--;
        }
    show();
    return false;
}

function done() {
    var id = this.getAttribute('id');
    var list = getListOfTodos();
    if (document.getElementById("raw" + id).className == 'checked') {
        document.getElementById("raw" + id).className = "";
        list[id].status = "active";
    } else {
        document.getElementById("raw" + id).className = 'checked';
        list[id].status = "done";
    }
}

function getListOfTodos() {
    return listOfTodos;
}

var modal_init = function () {

    var modalWrapper = document.getElementById("modal_wrapper");
    var modalWindow = document.getElementById("modal_window");

    var openModal = function (e) {
        modalWrapper.className = "overlay";
        var overflow = modalWindow.offsetHeight - document.documentElement.clientHeight;
        if (overflow > 0) {
            modalWindow.style.maxHeight = (parseInt(window.getComputedStyle(modalWindow).height) - overflow) + "px";
        }
        modalWindow.style.marginTop = (-modalWindow.offsetHeight) / 2 + "px";
        modalWindow.style.marginLeft = (-modalWindow.offsetWidth) / 2 + "px";
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    };

    var closeModal = function (e) {
        modalWrapper.className = "";
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    };

    var clickHandler = function (e) {
        if (!e.target) e.target = e.srcElement;
        if (e.target.tagName == "DIV") {
            if (e.target.id != "modal_window") closeModal(e);
        }
    };

    var keyHandler = function (e) {
        if (e.keyCode == 27) closeModal(e);
    };

    if (document.addEventListener) {
        document.getElementById("modal_open").addEventListener("click", openModal, false);
        document.getElementById("modal_open1").addEventListener("click", openModal, false);
        document.getElementById("modal_close").addEventListener("click", closeModal, false);
        document.addEventListener("click", clickHandler, false);
        document.addEventListener("keydown", keyHandler, false);
    } else {
        document.getElementById("modal_open").attachEvent("onclick", openModal);
        document.getElementById("modal_open1").attachEvent("onclick", openModal);
        document.getElementById("modal_close").attachEvent("onclick", closeModal);
        document.attachEvent("onclick", clickHandler);
        document.attachEvent("onkeydown", keyHandler);
    }

};

if (document.addEventListener) {
    document.getElementById("add_task").addEventListener("submit", addNewElement, false);
    document.addEventListener("DOMContentLoaded", modal_init, false);
} else {
    window.attachEvent("onload", modal_init);
}



