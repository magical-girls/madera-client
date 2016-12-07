'use strict';

var todos = [
    { 'id' : 0, text: 'learn angular', done: true },
    { 'id' : 1, text: 'build an angular app', done: false }
];

app.service('todosProvider', function () {
    
    this.getTodos = function(){
        return todos;
    }

    this.addTodo = function (id, text, done) {
        todos.push({ id: id, text: text, done: done });
    };

    this.removeTodo = function(id){
        var count = 0;
        angular.forEach(todos, function (todo) {
            if (todo.id == id){
                todos.splice(count, 1);
            }
            count++;
        });            
    };

})