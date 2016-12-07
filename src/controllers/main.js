'use strict';

app
    .controller('TodoListController', function ($scope, todosProvider) {
        // ----- Call provider -----
        $scope.addTodo = function () {
            todosProvider.addTodo($scope.getMaxTodoId() + 1, $scope.todoText, false);
            $scope.todoText = '';
        }
        $scope.removeTodo = function (id) {
            todosProvider.removeTodo(id);
            $scope.todos = todosProvider.getTodos();
        };

        // ----- -----
        $scope.todos = todosProvider.getTodos();        

        $scope.getMaxTodoId = function () {
            var result = 0;
            angular.forEach($scope.todos, function (todo) {
                if (todo.id > result) {
                    result = todo.id;
                }
            });
            return result;
        };

        $scope.remaining = function () {
            var count = 0;
            angular.forEach($scope.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };
    })
    .controller('todoCreate', function ($scope, categoryProvider) {
        $scope.categories = categoryProvider.getCategories();
    })
    ;