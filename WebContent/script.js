var albuns = 0;
var autenticado = false;

angular.module('fotosFamiliaJpModule', ['ngRoute', 'ui.bootstrap', 'ui.navbar'])

.controller('LoginController', function($scope, $http, $location){
	
	document.getElementsByTagName("body")[0].className += ' navbar-escondida';
	
	$scope.login = function(){
		$scope.dataLoading = true;
		
		if( ($scope.inLogin == 'a') && ($scope.inSenha == 'a')){
			autenticado = true;
			document.getElementsByTagName("body")[0].className = 'ng-scope';
			$location.path('/album');
		}
		
	}
	
	
})


.controller('AlbunsController', function($scope, $http){
	
	urlTeste = 'http://localhost:8080/fotosfamiliajp/rs/albuns';
	
	$scope.retornar = function(){
		$http.get(urlTeste).success(function(lista){
			$scope.albuns = lista;
			albuns = lista;
			console.log('Lista de albuns preenchida');
		}).error(function(erro){
			alert(erro);
		})
	}
	
	if(albuns == 0){
		$scope.retornar();
	}else{
		$scope.albuns = albuns;
	}
		
})

.controller('FotosController', function($scope, $http, $routeParams){
	
	urlTeste = 'http://localhost:8080/fotosfamiliajp/rs/fotos/' + $routeParams.albumId;
	
	
	for(var i = 0; i < albuns.length; i++){
		
		if(albuns[i].id == $routeParams.albumId)
			$scope.nomeAlbum = albuns[i].nome;
		
	}
		
	
	$scope.retornar = function(){
		$http.get(urlTeste).success(function(lista){
			$scope.fotos = lista
		}).error(function(erro){
			alert(erro);
		})
	}
	
	$scope.retornar();
	
})

.config(function($routeProvider){
	$routeProvider
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'LoginController'
		})
		.when('/album', {
			templateUrl: 'album.html',
			controller: 'AlbunsController'
		})
		.when('/album/:albumId', {
			templateUrl: 'foto.html',
			controller: 'FotosController'
		});
	
	$routeProvider.otherwise({redirectTo: '/album'});
		
});