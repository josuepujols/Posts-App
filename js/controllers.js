angular.module("FinalApp")
.controller("MainController", function($scope, $resource, PostResource) {
    const User = $resource('https://jsonplaceholder.typicode.com/users/:id', {id: "@id"});
    $scope.posts = PostResource.query();
    $scope.users = User.query();

    $scope.removePost = function(post) {
        PostResource.delete({id: post.id}, (data) => {
            console.log(data);
        });

        $scope.posts = $scope.posts.filter((element) => {
            return element.id !== post.id;
        });
    }

})
.controller("PostController", function($scope, $resource, $routeParams, PostResource, $location) {
    $scope.title = "Actualizar Post";
    $scope.post = PostResource.get({id: $routeParams.id});

    //Metodo para actualizar un post 
    $scope.savePost = function() {
        PostResource.update({id: $scope.post.id}, {data: $scope.post}, function(data) {
            console.log(data);
            $location.path("/");
        });
    }

})

.controller("NewPostController", function($scope, $resource, PostResource, $location) {
    $scope.post = {};
    $scope.title = "Crear Post";

    //Metodo para gregar el post 
    $scope.savePost = function() {
        PostResource.save({data: $scope.post}, function(data) {
            console.log(data);
            $location.path("/");
        });
    }

});
