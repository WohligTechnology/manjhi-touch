angular.module('starter', ['ionic', 'starter.controllers', 'ion-gallery', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $ionicConfigProvider.views.maxCache(3);
    $httpProvider.defaults.withCredentials = true;

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
                cache: false,
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
        url: '/artist/:type',
        views: {
            'menuContent': {
                templateUrl: 'templates/artist.html',
                controller: 'ArtistCtrl'

            }
        }
    })

    .state('app.artist-detail', {
        url: '/artist/detail/:artistid',
        views: {
            'menuContent': {
                templateUrl: 'templates/artist-detail.html',
                controller: 'ArtistDetailCtrl'

            }
        }
    })

    .state('app.artwork', {
            url: '/artwork/:type',
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
        url: '/art-detail/:artid',
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

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html',
                controller: 'SearchCtrl'

            }
        }
    })

    .state('app.eventdetail', {
        url: '/eventdetail/:id',
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
                controller: 'InfraServicesCtrl'

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
        .state('app.favourites', {
            url: '/favourites',
            views: {
                'menuContent': {
                    templateUrl: 'templates/favourites.html',
                    controller: 'FavouritesCtrl'
                }
            }
        })
        .state('app.savedviews', {
            url: '/savedviews',
            views: {
                'menuContent': {
                    templateUrl: 'templates/savedviews.html',
                    controller: 'SavedViewsCtrl'
                }
            }
        })

    .state('app.my-order', {
        url: '/my-order',
        views: {
            'menuContent': {
                templateUrl: 'templates/my-order.html',
                controller: 'MyOrderCtrl'
            }
        }
    })

    ;

    $urlRouterProvider.otherwise('/app/home');
})

.filter('rawHtml', ['$sce',
    function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    }
])

.filter('uploadthumbnail', function() {
    return function(input) {
        if (input && input !== "") {
            return adminurl + "user/resize?height=190&file=" + input;
            // return adminurl + "user/resize?file=" + input;
        } else {
            return "img/noimg.jpg";
        }
    };
})

.filter('uploadpath', function() {
    return function(input) {
        if (input && input !== "") {
            if (input.indexOf('.jpg') != -1)
                return adminurl + "user/resize?width=750&file=" + input;
            else {
                return adminurl + "user/resize?file=" + input;
            }
        } else {
            // return "img/noimg.jpg";
        }
    };
})

.filter('uploadpath1200', function() {
    return function(input) {
        if (input && input !== "") {
            if (input.indexOf('.jpg') != -1)
                return adminurl + "user/resize?width=1200&file=" + input;
            else {
                return adminurl + "user/resize?file=" + input;
            }
        } else {
            // return "img/noimg.jpg";
        }
    };
})

.filter('uploadsmallimage', function() {
    return function(input) {
        if (input && input !== "") {
            // return adminurl + "user/resize?file=" + input;
            return adminurl + "user/resize?width=750&file=" + input;
        } else {
            return "img/noimg.jpg";
        }
    };
})

.filter('roompath', function() {
    return function(input) {
        if (input && input !== "") {
            if (input.indexOf('.jpg') != -1)
                return adminurl + "slider/resizeRoom?file=" + input;
            else {
                return adminurl + "slider/resizeRoom?file=" + input;
            }
        } else {
            return "img/noimg.jpg";
        }
    };
})

.filter('makesizestr', function() {
    return function(artobj) {
        var size = "";
        if (artobj && artobj !== undefined) {
            if (artobj.height && artobj.height !== "") {
                size += artobj.height;
            }
            if (artobj.width && artobj.width !== "") {
                size += " " + artobj.width;
            }
            if (artobj.breadth && artobj.breadth !== "" && artobj.breadth != "N/A") {
                size += " " + artobj.breadth;
            }
            size = size.trim();
            size = size.split(" ").join(" x ");
            size += " inches";
            if (artobj.dim) {
                size += " (" + artobj.dim + ")";
            }
            return size;
        } else {
            return "";
        }
    };
})

.filter('showheart', function() {
    return function(input) {
        if (input) {
            if (userProfile.wishlist) {
                var ispresent = _.findIndex(userProfile.wishlist, {
                    'artwork': input
                });
                if (ispresent != -1) {
                    return "ion-ios-heart";
                } else {
                    return "ion-ios-heart-outline";
                }
            } else {
                return "ion-ios-heart-outline";
            }
        }
    };
})

.filter('indollars', function($filter) {
    return function(input) {
        if (input && dollarPrice) {
            if (input != "0") {
                var price = parseFloat(input) / parseFloat(dollarPrice);
                return $filter('number')(Math.round(price));
            } else
                return 0.00;
        } else {
            return 0.00;
        }
    };
})

.filter('inlakhs', function($filter) {
    return function(input) {
        if (input) {
            if (input != "0") {
                var x = input;
                x = x.toString();
                var afterPoint = '';
                if (x.indexOf('.') > 0)
                    afterPoint = x.substring(x.indexOf('.'), x.length);
                x = Math.floor(x);
                x = x.toString();
                var lastThree = x.substring(x.length - 3);
                var otherNumbers = x.substring(0, x.length - 3);
                if (otherNumbers != '')
                    lastThree = ',' + lastThree;
                var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
                return res;
            } else
                return 0;
        } else {
            return 0;
        }
    };
})

.directive('onlyDigits', function() {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, element, attr, ctrl) {
            function inputValue(val) {
                var digits;
                if (val) {
                    if (attr.type == "tel") {
                        digits = val.replace(/[^0-9\+\\]/g, '');
                    } else {
                        digits = val.replace(/[^0-9\-\\]/g, '');
                    }


                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
})

.filter('addhighlight', function() {
    return function(str, searchkey) {
        if (!str) {
            return str;
        }
        if (!searchkey) {
            return str;
        }
        var newstr = str.toLowerCase();
        var smallSearchkey = searchkey.toLowerCase();
        var num = 0;
        var check = false;
        var string2 = "";
        if (smallSearchkey && smallSearchkey !== "") {
            var split = newstr.split(" ");
            _.each(split, function(n) {
                var subst = n.substr(0, searchkey.length);
                var subst2 = n.substr(searchkey.length);
                var abc = "";
                if (smallSearchkey == subst) {
                    check = true;
                    abc = "<span class='ui-select-highlight'>" + searchkey + "</span>" + subst2;
                } else {
                    abc = n + " ";
                }
                string2 += abc + " ";
            });
        }
        if (check) {
            return string2;
        } else {
            return str;
        }
    };
})

.directive('readmores', function($window) {
    return function(scope, element, attrs) {
        var $element = $(element);
        $element.children(".read-morecont").height(0);
        $element.children(".readmore").click(function() {
            var lastheight = $element.children(".read-morecont").height();
            if (lastheight == 0) {
                var newheight = $element.children(".read-morecont").children(".read-inner").height();
                $element.children(".read-morecont").css("height", "100%");
                // $element.children(".read-morecont").css("margin-top", "5px");
                // $element.children(".read-morecont").css("margin-bottom", "5px");
            } else {
                $element.children(".read-morecont").height(0);
                $element.children(".read-morecont").css("margin", "0px");
                //				$element.children(".read-morecont").css("overflow", "hidden");
            }
        });
    };
})

var formvalidation = function(allvalidation) {
    console.log(allvalidation);
    var isvalid2 = true;
    var error = '';
    for (var i = 0; i < allvalidation.length; i++) {
        if (allvalidation[i].field === "" || !allvalidation[i].field) {
            allvalidation[i].validation = "ng-dirty";
            if (error === '') {
                error += allvalidation[i].name;
            } else {
                error += " , " + allvalidation[i].name;
            }
            isvalid2 = false;
        }
    }
    return isvalid2;
};
