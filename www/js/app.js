angular.module('starter', ['ionic', 'starter.controllers'])

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})

.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'templates/menu.html',
			controller: 'AppCtrl'
		})

	.state('access', {
		url: '/access',
		abstract: true,
		templateUrl: 'templates/access.html',
		controller: 'AccessCtrl'
	})

	.state('access.login', {
			url: '/login',
			views: {
				'content': {
					templateUrl: 'templates/login.html',
					controller: "LoginCtrl"
				}
			}
		})
		.state('access.signin', {
			url: '/signin',
			views: {
				'content': {
					templateUrl: 'templates/sign-in.html',
					controller: "SigninCtrl"
				}
			}
		})

	.state('access.forgot', {
		url: '/forgot',
		views: {
			'content': {
				templateUrl: 'templates/forgot.html',
				controller: 'ForgotCtrl'
			}
		}
	})

	.state('app.home', {
		url: '/home',
		views: {
			'menuContent': {
				templateUrl: 'templates/home.html',
				controller: 'HomeCtrl'

			}
		}
	})



	//    .state('app.artists', {
	//        url: '/artists',
	//        views: {
	//            'menuContent': {
	//                templateUrl: 'templates/artists.html',
	//                controller: 'AppCtrl'
	//
	//            }
	//        }
	//    })
	//	.state('app.paintings', {
	//			url: '/paintings',
	//			views: {
	//				'menuContent': {
	//					templateUrl: 'templates/paintings.html',
	//					controller: 'AppCtrl'
	//
	//				}
	//			}
	//		})

	.state('app.artist', {
		url: '/artist',
		views: {
			'menuContent': {
				templateUrl: 'templates/artist.html',
				controller: 'ArtistCtrl'

			}
		}
	})

	.state('app.artist-detail', {
		url: '/artist/detail',
		views: {
			'menuContent': {
				templateUrl: 'templates/artist-detail.html',
				controller: 'ArtistDetailCtrl'

			}
		}
	})

	.state('app.artwork', {
			url: '/artwork/all',
			views: {
				'menuContent': {
					templateUrl: 'templates/artwork.html',
					controller: 'ArtworkCtrl'

				}
			}
		})
		.state('app.about', {
			url: '/about',
			views: {
				'menuContent': {
					templateUrl: 'templates/about.html',
					controller: 'AboutCtrl'

				}
			}
		})

	.state('app.cart', {
		url: '/cart',
		views: {
			'menuContent': {
				templateUrl: 'templates/cart.html',
				controller: 'CartCtrl'

			}
		}
	})

	.state('app.checkout', {
		url: '/checkout',
		views: {
			'menuContent': {
				templateUrl: 'templates/checkout.html',
				controller: 'CheckoutCtrl'

			}
		}
	})

	.state('app.wishlist', {
		url: '/wishlist',
		views: {
			'menuContent': {
				templateUrl: 'templates/wishlist.html',
				controller: 'WishlistCtrl'

			}
		}
	})

	//	.state('app.profile', {
	//		url: '/profile',
	//		views: {
	//			'menuContent': {
	//				templateUrl: 'templates/profile.html',
	//				controller: 'AppCtrl'
	//
	//			}
	//		}
	//	})

	.state('app.account', {
		url: '/account',
		views: {
			'menuContent': {
				templateUrl: 'templates/account.html',
				controller: 'AccountCtrl'

			}
		}
	})

	.state('app.personal-accnt', {
		url: '/personal-accnt',
		views: {
			'menuContent': {
				templateUrl: 'templates/personal-accnt.html',
				controller: 'PersonalAccntCtrl'

			}
		}
	})

	.state('app.chngpassword', {
		url: '/chngpassword',
		views: {
			'menuContent': {
				templateUrl: 'templates/chngpassword.html',
				controller: 'ChngPasswordCtrl'
			}
		}
	})

	.state('app.address', {
		url: '/address',
		views: {
			'menuContent': {
				templateUrl: 'templates/address.html',
				controller: 'AddressCtrl'
			}
		}
	})

	.state('app.art-detail', {
		url: '/artist/detail/art-detail',
		views: {
			'menuContent': {
				templateUrl: 'templates/art-detail.html',
				controller: 'ArtDetailCtrl'

			}
		}
	})

	.state('app.contact', {
		url: '/contact',
		views: {
			'menuContent': {
				templateUrl: 'templates/contact.html',
				controller: 'ContactCtrl'

			}
		}
	})

	.state('app.art-details', {
		url: '/art-detail',
		views: {
			'menuContent': {
				templateUrl: 'templates/art-detail.html',
				controller: 'ArtDetailCtrl'

			}
		}
	})

	.state('app.press', {
		url: '/press',
		views: {
			'menuContent': {
				templateUrl: 'templates/press.html',
				controller: 'PressCtrl'

			}
		}
	})

	.state('app.event', {
		url: '/event',
		views: {
			'menuContent': {
				templateUrl: 'templates/event.html',
				controller: 'EventCtrl'

			}
		}
	})

	.state('app.eventdetail', {
		url: '/eventdetail',
		views: {
			'menuContent': {
				templateUrl: 'templates/eventdetail.html',
				controller: 'EventdetailCtrl'

			}
		}
	})

	.state('app.infra-services', {
		url: '/infra-services',
		views: {
			'menuContent': {
				templateUrl: 'templates/infra-services.html',
				controller: 'EventdetailCtrl'

			}
		}
	})

	.state('app.trace-order', {
		url: '/trace-order',
		views: {
			'menuContent': {
				templateUrl: 'templates/trace-order.html',
				controller: 'TraceOrderCtrl'
			}
		}
	})

	;

	$urlRouterProvider.otherwise('/app/home');
})

.filter('rawHtml', ['$sce',
  function ($sce) {
		return function (val) {
			return $sce.trustAsHtml(val);
		};
  }
])

.directive('readmores', function ($window) {
	return function (scope, element, attrs) {
		var $element = $(element);
		$element.children(".read-morecont").height(0);
		$element.children(".readmore").click(function () {
			var lastheight = $element.children(".read-morecont").height();
			if (lastheight == 0) {
				var newheight = $element.children(".read-morecont").children(".read-inner").height();
				$element.children(".read-morecont").height(newheight);
				$element.children(".read-morecont").css("margin-top", "5px");
				$element.children(".read-morecont").css("margin-bottom", "5px");
			} else {
				$element.children(".read-morecont").height(0);
				$element.children(".read-morecont").css("margin", "0px");
				//				$element.children(".read-morecont").css("overflow", "hidden");
			}
		});
	};
});