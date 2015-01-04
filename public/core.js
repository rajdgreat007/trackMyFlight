var letsDoIt = angular.module('letsDoIt',[]);
letsDoIt.directive('showTodos',function(){
    return {
        scope : {
            todos:'='
        },
        restrict : 'E',
        template : '<div><h2>Hi there, You have following pending items to be done[{{todos.length}}]</h2><p ng-repeat="todo in todos">{{todo.txt}} <span ng-click="deleteToDo()">x</span></p></div>'
    }
});
letsDoIt.directive('createTodo',function(){
    return {
        scope : {
            create : '&',
            txt : '='
        },
        restrict : 'E',
        template : '<form> <input type="text" ng-model="txt"/> <input type="submit" ng-click="create()"/> </form>'
    }
});
letsDoIt.controller('manageCtrl',function($scope,$http){
    $http.get('/api/todos')
        .success(function(data){
            $scope.todos = data;
        })
        .error(function(err){
            console.log(err);
        });

    $scope.createToDo = function(){
        $http.post('/api/todos',{txt:$scope.txt})
            .success(function(data){
                $scope.todos=data;
                $scope.txt = '';
            })
            .error(function(err){console.log(err)})
    };

    $scope.deleteToDo = function(todo){
        $http.delete('/api/todos/'+todo.id)
            .success(function(x){console.log('deleted')})
            .error(function(err){console.log(err)})

    }
});