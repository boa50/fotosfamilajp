var albuns = 0;
var acesso = "";

angular.module('fotosFamiliaJpModule', ['ngRoute', 'ui.bootstrap', 'ui.navbar'])

.controller('LoginController', function($scope, $http, $location){
	
	document.getElementsByTagName("body")[0].className += ' navbar-escondida';
	
	$scope.login = function(){
		$scope.dataLoading = true;
		
		url = 'http://localhost:8080/fotosfamiliajp/rs/login/' + $scope.inLogin + '/' + $scope.inSenha;
		
		$http.get(url).success(function(retorno){
			this.acesso = retorno.acesso;
			
			if(this.acesso != ''){
				console.log('Login efetuado');
				document.getElementsByTagName("body")[0].className = 'ng-scope';
				$location.path('/album');
			}else{
				alert('Login e/ou senha inv\u00e1lido(s)!');
				$scope.dataLoading = false;
				$scope.inSenha = '';
				console.log('Login e/ou senha inv\u00e1lido(s)!');
			}
				
		}).error(function(erro){
			alert(erro);
		})
		
	}
	
})


.controller('AlbunsController', function($scope, $http){
	
	url = 'http://localhost:8080/fotosfamiliajp/rs/albuns';
	
	$scope.retornar = function(){
		$http.get(url).success(function(lista){
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
	
	url = 'http://localhost:8080/fotosfamiliajp/rs/fotos/' + $routeParams.albumId;
	
	
	for(var i = 0; i < albuns.length; i++){
		if(albuns[i].id == $routeParams.albumId)
			$scope.nomeAlbum = albuns[i].nome;
	}
	
	$scope.retornar = function(){
		$http.get(url).success(function(lista){
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