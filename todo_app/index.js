var express = require("express");
var bodyParser = require("body-parser");
var data = require("./data.js")

var app = express();
app.use("/",express.static(__dirname+"/public/"));

app.use("/",bodyParser.urlencoded({extended:false}));

app.get("/api/todos", function(req, res){
    res.json(data.todos);
});

app.post("/api/todos", function(req, res){
    if (!req.body.todoTitle){
        res.status(400).json({err: "Todo Title Missing"});
    }
    else {
        todoTitle = req.body.todoTitle;
        var new_todo_object = {
            title : todoTitle,
            status : data.StatusConsts.ACTIVE
        }
        data.todos[data.next_todo_id++] = new_todo_object;
        res.json(data.todos);
    }
});

app.put("/api/todos/:id", function(req, res){
    var todo_object = data.todos[req.params.id];
    if (!todo_object){
        res.status(400).json({err: "Invalid Todo ID"});
    }
    else{
        if (req.body.todoTitle){
            todo_object.title = req.body.todoTitle;
        }
        if (req.body.todo_status && (req.body.todo_status == "ACTIVE" || req.body.todo_status == "COMPLETE")){
            todo_object.status = data.StatusConsts[req.body.todo_status];
        }
        res.json(data.todos);
    }
});

app.delete("/api/todos/:id", function(req, res){
    var todo_object = data.todos[req.params.id];
    if (!todo_object){
        res.status(400).json({err: "Invalid Todo ID"});
    }
    else{
        todo_object.status = data.StatusConsts.DELETED;
        res.json(data.todos);
    }
});

app.listen(4000,function () {
   console.log("Server Running");
});