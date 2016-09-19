angular.module('fotosFamiliaJpModule', ['ngRoute', 'ui.bootstrap'])

.controller('FotosController', function($scope, $http, $routeParams){
	
	if($routeParams.albumId)
		urlTeste = 'http://localhost:8080/fotosfamiliajp/rs/fotos/' + $routeParams.albumId;
	else
		urlTeste = 'http://localhost:8080/fotosfamiliajp/rs/albuns';
		
	$scope.retornar = function(){
		$http.get(urlTeste).success(function(lista){
			$scope.lista = lista;
		}).error(function(erro){
			alert(erro);
		})
	}
	
	$scope.retornar();
	
})

.config(function($routeProvider){
	$routeProvider
		.when('/album', {
			templateUrl: 'album.html',
			controller: 'FotosController'
		})
		.when('/album/:albumId', {
			templateUrl: 'foto.html',
			controller: 'FotosController'
		});
	
	$routeProvider.otherwise({redirectTo: '/album'});
		
});