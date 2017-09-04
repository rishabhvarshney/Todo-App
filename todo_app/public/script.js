var REQUEST_DONE = 4;
var STATUS_OK = 200;
var TODOS_DIV = "activeTodos";

window.onload = getTodoAJAX();

function getTodoAJAX(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/todos",true);
    xhr.send(data=null);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == REQUEST_DONE){
            if(xhr.status == STATUS_OK){
                addTodoElement(JSON.parse(xhr.responseText));
            }
        }
    }
}

function addTodoElement(todos) {
    var p1 = document.getElementById("activeTodos");
    var p2 = document.getElementById("completedTodos");
    var p3 = document.getElementById("deletedTodos");
    p1.innerText = "";
    p2.innerText = "";
    p3.innerText = "";

    Object.keys(todos).forEach(function (key) {
        var par = document.getElementById(todos[key].status + "Todos");
        par.appendChild(createElement(key, todos[key]));
    });
}

function createCheckboxactive(id){
    var ch = document.createElement("input");
    ch.setAttribute("type","checkbox");
    ch.setAttribute("id",id);
    ch.setAttribute("float","left");
    ch.setAttribute("onchange","checkboxchange_complete(id)");

    return ch;
}

function createCheckbox(id){
    var ch = document.createElement("input");
    ch.setAttribute("type","checkbox");
    ch.setAttribute("id",id);
    ch.setAttribute("float","left");
    ch.setAttribute("onchange","checkboxchange_active(id)");
    ch.setAttribute("checked","TRUE");

    return ch;
}

function createCrossButton(id){
    var cross = document.createElement("button");
    cross.setAttribute("onclick","crossclicked(id)");
    cross.setAttribute("class","crossbutton");
    cross.setAttribute("id",id);
    cross.innerText = "X";

    return cross;
}

function createTitle(id,title){
    var txt = document.createElement("span");
    txt.innerText = title;
    txt.setAttribute("data-id",id);
    txt.setAttribute("class","todoTitle_text");

    return txt;
}

function createElement(id,todo){
    var elementTodo = document.createElement("div");
    elementTodo.setAttribute("data-id",id);
    elementTodo.setAttribute("class","Todo");

    if(todo.status == "deleted"){
        elementTodo.appendChild(createTitle(id,todo.title));
        }
    if(todo.status == "active"){
        elementTodo.appendChild(createCheckboxactive(id));
        elementTodo.appendChild(createTitle(id,todo.title));
        elementTodo.appendChild(createCrossButton(id));
    }
    if(todo.status == "completed"){
        elementTodo.appendChild(createCheckbox(id));
        elementTodo.appendChild(createTitle(id,todo.title));
        elementTodo.appendChild(createCrossButton(id));
    }

    return elementTodo;
}

function checkboxchange_complete(id){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function(){
        if (xhr.readyState == REQUEST_DONE) {
            if (xhr.status == STATUS_OK){
                getTodoAJAX();}
        }
    }
    xhr.send("todo_status=COMPLETE");
}

function checkboxchange_active(id){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function(){
        if (xhr.readyState == REQUEST_DONE) {
            if (xhr.status == STATUS_OK){
                getTodoAJAX();}
        }
    }
    xhr.send("todo_status=ACTIVE");
}


function crossclicked(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/"+id, true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState == REQUEST_DONE) {
            if (xhr.status == STATUS_OK){getTodoAJAX();}
            else {console.log(xhr.responseText);}
        }
    }
    xhr.send(data=null);
}


function newTodo() {
    var new_todo_title = document.getElementById("new_todo_title").value;
    var params = "todoTitle="+encodeURI(new_todo_title);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function(){
        if (xhr.readyState == REQUEST_DONE) {
            if (xhr.status == STATUS_OK){getTodoAJAX();}
        }
    }
    xhr.send(data=params);
}

function hide_completed_items(){
    var d = document.getElementById("completedTodos");
    while (d.firstChild) {
        d.removeChild(d.firstChild);
    }
    var p = document.getElementById("hidebutton");
    p.innerText = "Show Completed Todos";
    p.setAttribute("onclick","show_completed_items()");
}

function show_completed_items(){
    getTodoAJAX();
    var p = document.getElementById("hidebutton");
    p.innerText = "Hide Completed Todos";
    p.setAttribute("onclick","hide_completed_items()");
}

function hide_deleted_items(){
    var d = document.getElementById("deletedTodos");
    while (d.firstChild) {
        d.removeChild(d.firstChild);
    }
    var p = document.getElementById("hidedelbutton");
    p.innerText = "Show Deleted Todos";
    p.setAttribute("onclick","show_deleted_items()");
}

function show_deleted_items(){
    getTodoAJAX();
    var p = document.getElementById("hidedelbutton");
    p.innerText = "Hide Deleted Todos";
    p.setAttribute("onclick","hide_deleted_items()");
}