var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
var albuns = 0;
var acesso = "";

angular.module('fotosFamiliaJpModule', ['ngRoute', 'ui.bootstrap', 'ui.navbar'])

.factory('meuInterceptor', function($location, $q){
	var interceptor = {
		responseError: function(resposta){
			if(acesso == '')
				$location.path('/login');
		
			return $q.reject(resposta);
		}
	}
	
	return interceptor;
})

.controller('LoginController', function($scope, $http, $location){
	
	document.getElementsByTagName("body")[0].className += ' navbar-escondida';
	
	$scope.login = function(){
		$scope.dataLoading = true;
		
		url = 'http://localhost:8080/fotosfamiliajp/rs/login/' 
			+ Base64.encode($scope.inLogin) + '/' 
			+ Base64.encode($scope.inSenha);
		
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
			console.log(erro);
		})
		
	}
	
})


.controller('AlbunsController', function($scope, $http){
	
	url = 'http://localhost:8080/fotosfamiliajp/rs/albuns/' + acesso;
	
	$scope.retornar = function(){
		$http.get(url).success(function(lista){
			if(lista.erro)
				alert(lista.erro);
			$scope.albuns = lista;
			albuns = lista;
			console.log('Lista de albuns preenchida');
		}).error(function(erro){
			console.log(erro);
		})
	}
	
	if(albuns == 0){
		$scope.retornar();
	}else{
		$scope.albuns = albuns;
	}
		
})

.controller('FotosController', function($scope, $http, $routeParams){
	
	url = 'http://localhost:8080/fotosfamiliajp/rs/fotos/' + $routeParams.albumId + '/' + acesso;
	
	
	for(var i = 0; i < albuns.length; i++){
		if(albuns[i].id == $routeParams.albumId)
			$scope.nomeAlbum = albuns[i].nome;
	}
	
	$scope.retornar = function(){
		$http.get(url).success(function(lista){
			if(lista.erro)
				alert(lista.erro);
			$scope.fotos = lista;
		}).error(function(erro){
			console.log(erro);
		})
	}
	
	$scope.retornar();
	
})

.config(function($routeProvider, $httpProvider){
	
	$httpProvider.interceptors.push('meuInterceptor');
	
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
	
	$routeProvider.otherwise({redirectTo: '/login'});
		
});