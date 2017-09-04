var StatusConsts = {
    ACTIVE : "active",
    COMPLETE : "completed",
    DELETED : "deleted"
}
var seed = {
    1 : {title : "Understand Git",status : StatusConsts.ACTIVE},
    2 : {title : "Install Webstorm",status : StatusConsts.ACTIVE},
    3 : {title : "Learn CSS",status : StatusConsts.ACTIVE},
    4 : {title : "Async JS",status : StatusConsts.ACTIVE},
    5 : {title : "Install WebStorm",status : StatusConsts.ACTIVE},
    6 : {title : "Understand Callbacks",status : StatusConsts.ACTIVE},
    7 : {title : "Some Todo 1",status : StatusConsts.ACTIVE},
    8 : {title : "Some Todo 2",status : StatusConsts.ACTIVE}
}
var next_todo_id = 9;

module.exports = {
    StatusConsts: StatusConsts,
    todos: seed,
    next_todo_id: next_todo_id
}