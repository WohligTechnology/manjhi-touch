var dataNextPre = {};
var userProfile = {};
var uploadres = [];
var dollarPrice = '';
var globalFunction = {};
var abc = "";

angular.module('starter.controllers', ['starter.services', 'ui.select', 'ion-gallery'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, MyServices, $ionicLoading, $ionicPopup, $cordovaInAppBrowser, $timeout, $state, $rootScope) {
    $scope.adminurl = adminurl;

    var scrolled = 0;
    $scope.logintab = '1';
    $scope.login = {};
    $scope.register = {};
    $scope.register.accesslevel = "customer";
    $scope.forgot = {};
    $scope.showInvalidLogin = false;
    $scope.showAlreadyRegistered = false;
    $scope.passwordNotMatch = false;
    $scope.showWishlist = false;
    $scope.user = {};
    $scope.user.name = '';
    $scope.art = {};
    $scope.art.search = '';
    $scope.art.pagenumber = 1;
    $scope.art.pagesize = 5;
    $scope.showDropDown = true;
    $scope.filterby = {};
    $scope.artworkInterested = [];
    $scope.reachOutForm = {};
    $scope.reachOutForm.srno = "";
    $scope.reachOutForm.to = "harmeet@auraart.in; rishiraj@auraart.in";
    $scope.reachOutForm.action = "1";
    $scope.searchData = [];
    $scope.userProfile = {};
    $scope.cartItems = [];
    $scope.totalCartPrice = 0;
    $scope.isLoggedIn == false;
    $scope.joinus = {};
    $scope.searchbar = false;
    $scope.toggleSearchbar = function() {
        $scope.searchbar = $scope.searchbar === false ? true : false;
    };

    $scope.callNow = function() {
        window.plugins.CallNumber.callNumber(function(success) {
            console.log(success);
        }, function(err) {
            console.log(err);
        }, "+919328877000", true);
    };

    MyServices.getDollarPrice(function(data) {
        if (data.value != false) {
            dollarPrice = data[0].price;
            console.log("Dollar = " + data[0].price);
        }
    })

    MyServices.getuserprofile(function(data) {
        if (data.id) {
            console.log(data);
            $scope.isLoggedIn = true;
            userProfile = data;
            $scope.userProfile = data;
            MyServices.getMyFavourites(data.id, function(favorite) {
                userProfile.wishlist = favorite;
            })
        } else {
            $scope.isLoggedIn = false;
        }
    })

    $scope.logout = function() {
        globalFunction.showLoading();
        MyServices.logout(function(data) {
            $ionicLoading.hide();
            $scope.inCart = {};
            $scope.inCart.total = 0;
            $scope.isLoggedIn = false;
            userProfile = data;
            $state.go('app.home');
        });
    }

    globalFunction.showLoading = function() {
        $ionicLoading.show({
            template: 'Please Wait...',
            duration: 10000
        })
    };

    globalFunction.reachOut = function() {
        var reachOutArtist = window.location.hash.split('l/');
        if (reachOutArtist[0] == "#/artist/detai" || reachOutArtist[0] == "#/artwork/detai" || reachOutArtist[0].indexOf("sculpture") != -1) {
            $scope.reachOutArtistId = reachOutArtist[1];
            $scope.artworkInterested = dataNextPre.reachout.artwork;
            if (reachOutArtist[0] != "#/artist/detai")
                $scope.reachOutForm.srno = $scope.artworkInterested[0].srno;
            if (dataNextPre.reachout) {
                $scope.reachOutForm.artist = dataNextPre.reachout.name;
                if (reachOutArtist[0] != "#/artist/detai")
                    $scope.reachOutInner(dataNextPre.reachout._id)
            }
            ngDialog.open({
                scope: $scope,
                template: 'views/content/reach-out.html'
            });
        } else {
            ngDialog.open({
                scope: $scope,
                template: 'views/content/reach-out.html'
            });
        }
    }

    dataNextPre.messageBox = function(msg) {
        var xyz = $ionicPopup.show({
            cssClass: 'custom-class',
            template: '<h5 class="text-center">' + msg + '</h5>'
        });

        $timeout(function() {
            xyz.close();
        }, 3000);
    }

    dataNextPre.messageBoxNoTime = function(msg) {
        var xyz = ngDialog.open({
            template: '<div class="pop-up"><h5 class="popup-wishlist">' + msg + '</h5><span class="closepop" ng-click="closeThisDialog(value);">X</span></div>',
            plain: true
        });
    }

    dataNextPre.messageBoxSignUp = function() {
        var xyz = ngDialog.open({
            template: '<div class="pop-up"><h5 class="popup-wishlist"><div class="text-center"><h3>Welcome to Aura Art </h3><p>You may update your Profile by clicking <a href="http://www.auraart.in/#/account" ng-click="closeThisDialog(value)">here</a> or continue surfing by closing this box</p></div></h5><span class="closepop" ng-click="closeThisDialog(value);">X</span></div>',
            plain: true
        });
    }

    dataNextPre.messageBoxWithBtn = function(msg, btnText, funcName) {
        ngDialog.closeAll();
        var xyz = ngDialog.open({
            scope: $scope,
            template: '<div class="pop-up"><h5 class="popup-wishlist">Please login to add to favourites</h5><p>Click <a ng-click="showLogin();">here</a> to Login</p><span class="closepop" ng-click="closeThisDialog(value);">X</span></div>',
            plain: true
        });
    }

    $scope.myPopup = "";
    $scope.nowAddToFav = function(obj) {
        console.log(obj);
        $scope.myPopup.close();
        globalFunction.showLoading();
        MyServices.addToFav({
            "artwork": obj.artwork._id
        }, function(data) {
            obj.heartClass = "ion-ios-heart";
            $ionicLoading.hide();
            if (!data.value) {
                dataNextPre.messageBox("Added to favourites");
                getMyProfile();
            } else if (data.value == true && data.comment == "Data already updated") {
                dataNextPre.messageBox("Already added to favourites");
                getMyProfile();
            }
        })
    }

    function getMyProfile() {
        MyServices.getuserprofile(function(data) {
            if (data.id) {
                userProfile = data;
                MyServices.getMyFavourites(data.id, function(favorite) {
                    userProfile.wishlist = favorite;
                })
            }
        })
    }

    dataNextPre.favorite = function(art) {
        // art.heartClass = "fa fa-heart font-color3";
        if ($scope.userProfile.id) {
            // globalFunction.showLoading();
            console.log(art.heartClass);
            switch (art.heartClass) {
                case "ion-ios-heart-outline":
                    {
                        MyServices.getMyFolders(function(data) {
                            if (data.value != false) {
                                $scope.myFolders = data;
                            } else {
                                $scope.myFolders = [];
                            }
                        })
                        $scope.favObj = art;
                        // $scope.favObj.artwork = art.artwork._id;
                        $scope.myPopup = $ionicPopup.show({
                            cssClass: 'custom-class',
                            templateUrl: 'templates/modal-choose.html',
                            scope: $scope,
                        });
                    }
                    break;
                case "ion-ios-heart":
                    {
                        console.log('in second if');
                        $ionicLoading.hide();
                        MyServices.deleteFromFav($scope.userProfile.id, art.artwork._id, function(data) {
                            if (!data.value) {
                                art.heartClass = "ion-ios-heart-outline";
                                dataNextPre.messageBox("Removed from favourites");
                            }
                        })
                    }
                    break;
                default:
            }
            MyServices.getuserprofile(function(data) {
                if (data.id) {
                    userProfile = data;
                    MyServices.getMyFavourites(data.id, function(favorite) {
                        userProfile.wishlist = favorite;
                    })
                }
            })
        } else {
            $scope.openLogin();
        }
    }

    $scope.openLogin = function() {
        $scope.modal1.show();
    };
    $ionicModal.fromTemplateUrl('templates/modal-login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal1 = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal1.hide();
    };

    $scope.userlogin = function() {
        MyServices.userlogin($scope.login, function(data, status) {
            if (data.value != false) {
                $scope.showInvalidLogin = false;
                MyServices.getuserprofile(function(data) {
                    console.log("login successfully");
                    window.location.reload();
                })
            } else {
                $scope.showInvalidLogin = true;
            }
        })
    };

    var soptions = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'no'
    };

    var profileInterval = "";
    $scope.socialLogin = function(val) {
        $cordovaInAppBrowser.open(adminurl + "user/" + val, '_blank', soptions).then(function(event) {
            // success
        }).catch(function(event) {
            // error
        });
        profileInterval = setInterval(function() {
            MyServices.getuserprofile(function(data) {
                if (data.id) {
                    clearInterval(profileInterval);
                    if ($cordovaInAppBrowser)
                        $cordovaInAppBrowser.close();
                    $scope.showInvalidLogin = false;
                    window.location.reload();
                }
            });
        }, 1000);
    }

    $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event) {
        console.log(e);
        console.log(event);
        clearInterval(profileInterval);
    });


    $scope.inCart = {};
    $scope.inCart.total = 0;
    dataNextPre.getCartItems = function() {
        MyServices.getCartItems(function(data) {
            console.log(data);
            $scope.inCart.total = data.length;
            $scope.cartItems = data;
            $timeout(function() {
                $scope.$apply();
            }, 10);
            $scope.totalCartPrice = 0;
            _.each($scope.cartItems, function(n) {
                if (n.artwork.gprice != 'N/A')
                    $scope.totalCartPrice += n.artwork.gprice;
            });
        });
    }

    dataNextPre.getCartItems();

    dataNextPre.addToCart = function(art) {
        globalFunction.showLoading();
        console.log(art);
        MyServices.addToCart(art.artwork._id, function(data) {
            console.log(data);
            $ionicLoading.hide();
            if (data.value == true) {
                dataNextPre.messageBox("Added to cart");
                dataNextPre.getCartItems();
            } else if (data.value == false) {
                dataNextPre.messageBox("Already in cart");
            }
        })
    }

    dataNextPre.removeFromCart = function(artid) {
        console.log(artid);
        MyServices.removeFromCart(artid, function(data) {
            console.log(data);
            if (data.value == true) {
                dataNextPre.messageBox("Removed from cart");
                dataNextPre.getCartItems();
            }
        })
    }

    var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'no'
    };

    $scope.openFb = function() {
        $cordovaInAppBrowser.open('https://www.facebook.com/auraarteconnect/', '_blank', options).then(function(event) {
            // success
        }).catch(function(event) {
            // error
        });
    }
    $scope.openInsta = function() {
        $cordovaInAppBrowser.open('https://www.instagram.com/auraarteconnect/', '_blank', options).then(function(event) {
            // success
        }).catch(function(event) {
            // error
        });
    }

    $scope.openTwit = function() {
        $cordovaInAppBrowser.open('https://twitter.com/auraarteconnect', '_blank', options).then(function(event) {
            // success
        }).catch(function(event) {
            // error
        });
    }

    $scope.openYt = function() {
        $cordovaInAppBrowser.open('https://www.youtube.com/user/auraartdpl/', '_blank', options).then(function(event) {
            // success
        }).catch(function(event) {
            // error
        });
    }

    $scope.openFb = function() {
        $cordovaInAppBrowser.open('https://www.facebook.com/auraarteconnect/', '_blank', options).then(function(event) {
            // success
        }).catch(function(event) {
            // error
        });
    }

    $scope.openBlog = function() {
        $cordovaInAppBrowser.open('http://blog.auraart.in/', '_blank', options).then(function(event) {
            // success
        }).catch(function(event) {
            // error
        });
    }

})

.controller('AccessCtrl', function($scope, $ionicModal, $timeout) {})

.controller('LoginCtrl', function($scope, $stateParams, MyServices, $ionicLoading, $state, $cordovaInAppBrowser, $rootScope, $ionicPopup) {

    $scope.loginData = {};
    $scope.doLogin = function() {
        $ionicLoading.show({
            template: 'Please Wait...',
            duration: 10000
        });
        MyServices.userlogin($scope.loginData, function(data, status) {
            console.log(data);
            if (data.value != false) {
                MyServices.getuserprofile(function(profile) {
                    if (profile.id) {
                        var alertPopup = $ionicPopup.alert({
                            title: "Welcome " + profile.name,
                            template: 'You are now logged in'
                        });

                        alertPopup.then(function(res) {
                            $state.go('app.home');
                            window.location.reload();
                        });
                    }
                });
                $scope.showInvalidLogin = false;
            } else {
                $scope.showInvalidLogin = true;
            }
            $ionicLoading.hide();
        })
    }

    var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'no'
    };

    var profileInterval = "";
    $scope.socialLogin = function(val) {
        $cordovaInAppBrowser.open(adminurl + "user/" + val, '_blank', options).then(function(event) {
            // success
        }).catch(function(event) {
            // error
        });
        profileInterval = setInterval(function() {
            MyServices.getuserprofile(function(data) {
                if (data.id) {
                    clearInterval(profileInterval);
                    if ($cordovaInAppBrowser)
                        $cordovaInAppBrowser.close();
                    $scope.showInvalidLogin = false;
                    $state.go('app.home');
                    window.location.reload();
                }
            });
        }, 1000);
    }

    $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event) {
        console.log(e);
        console.log(event);
        clearInterval(profileInterval);
    });

})

.controller('HomeCtrl', function($scope, $stateParams, MyServices, $timeout, $ionicSlideBoxDelegate, $state, $cordovaInAppBrowser, $ionicModal) {
    abc = $scope;
    $.jStorage.set("artistScroll", null);
    $.jStorage.set("artworkScroll", null);
    $scope.filterby = {};
    $scope.filterby.search = "";
    $scope.filterby.type = "";
    $scope.filterby.pagenumber = 1;
    $scope.filterby.pagesize = 20;
    $scope.filterby.filter = "srno";
    $scope.filterby.sort = 1;
    $scope.filterby.minprice = 0;
    $scope.filterby.maxprice = 10000000;
    $scope.filterby.minwidth = '';
    $scope.filterby.maxwidth = '';
    $scope.filterby.minheight = '';
    $scope.filterby.maxheight = '';
    $scope.filterby.minbreadth = '';
    $scope.filterby.maxbreadth = '';
    $scope.showInvalidLogin = false;

    dataNextPre.getCartItems();

    $scope.openBlog = function() {
        $cordovaInAppBrowser.open('http://blog.auraart.in/', '_blank', {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
        }).then(function(event) {
            // success
        }).catch(function(event) {
            // error
        });
    }

    MyServices.getSlider(function(data) {
        $scope.slides = data;
        $ionicSlideBoxDelegate.update();
    });

    $scope.goToArtwork = function(image) {
        console.log(image);
        if (image.link) {
            if (image.link.indexOf('artwork/detail') || image.link.indexOf('sculpture/')) {
                var splited = image.link.split('/');
                $state.go('app.art-details', {
                    artid: splited[splited.length - 1]
                });
            }
        }
    }

    $scope.registeruser = function() {
        if ($scope.register.password === $scope.register.confirmpassword) {
            $scope.passwordNotMatch = false;
            $scope.register.accesslevel = "customer";
            MyServices.registeruser($scope.register, function(data, status) {
                console.log(data);
                if (data.value != false) {
                    $scope.showAlreadyRegistered = false;
                    $scope.showWishlist = true;
                    //$.jStorage.set("user", data);
                    ngDialog.closeAll();
                    $state.go("termcondition");
                } else if (data.value == false && data.comment == "User already exists") {
                    $scope.showAlreadyRegistered = true;
                }
            })
        } else {
            $scope.passwordNotMatch = true;
        }
    };

    $scope.userlogin = function() {
        MyServices.userlogin($scope.login, function(data, status) {
            if (data.value != false) {
                $scope.showInvalidLogin = false;
                MyServices.getuserprofile(function(data) {
                    ngDialog.closeAll();
                    if (data.id && data.accesslevel == "reseller") {
                        $state.go("create-artwork");
                    } else {
                        $state.go("termcondition");
                    }
                })
            } else {
                $scope.showInvalidLogin = true;
            }
        })
    };

    $scope.showLogin = true;
    $scope.changeTab = function(tab) {
        console.log(tab);
        if (tab == 1) {
            $scope.showLogin = false;
        } else {
            $scope.showLogin = true;
        }
    }

    MyServices.getuserprofile(function(data) {
        if (data.id) {
            $scope.isLoggedIn = true;
            userProfile = data;
            MyServices.getMyFavourites(data.id, function(favorite) {
                userProfile.wishlist = favorite;
            });
        } else {
            $scope.isLoggedIn = false;
        }
    });

    $scope.lauchedSoon = function() {
        dataNextPre.messageBox("To be launched soon...");
    };

    $scope.onfock = "";
    $scope.oon = function() {
        if ($scope.onfock === "") {
            $scope.onfock = "sdfs";
        } else {
            $scope.onfock = "";
        }
    };
    dataNextPre.setData = function(data) {
        //      console.log(data);
    };
    $scope.changeUI = 0;
    // set available range
    $scope.minPrice = 0;
    $scope.maxPrice = 10000000;

    // default the user's values to the available range
    $scope.userMinPrice = $scope.minPrice;
    $scope.userMaxPrice = $scope.maxPrice;

    //    MyServices.getsliderimages(function (data, status) {
    //        _.each(data, function (n) {
    //            $scope.slides.push(n._id);
    //        })
    //    });

    $scope.applyfilter = function() {
        //      console.log($scope.filterby);
        console.log($scope.filterby);
        $.jStorage.set("filterby", $scope.filterby);
        //      $location.url("/artwork/-1");
        $state.go('app.artwork', {
            type: -1
        });
    };

    $scope.goToArtworks = function(type) {
        //      $location.url("/artwork/" + type);
        $state.go('app.artwork', {
            type: type
        });
    };

    $scope.onclick = function(value) {
        $scope.filterby.checked
    };
    var lastChecked = null;
    $scope.onclick = function(event) {
        if (event.target.value === lastChecked) {
            $scope.filterby.type = "";
            $scope.getallartist();
            lastChecked = null;
        } else {
            lastChecked = event.target.value;
        }
    };
    $scope.changetype = function(chang) {
        if (chang == 1) {
            $scope.filterby.type = "Paintings";
            // $scope.getallartist();
            // $scope.getmedium();
            // $scope.getClr();
            // $scope.getElm();
            // $scope.getStl();
        } else if (chang == 2) {
            $scope.filterby.type = "Sculptures";
            // $scope.getallartist();
            // $scope.getmedium();
            // $scope.getClr();
            // $scope.getElm();
            // $scope.getStl();
        } else if (chang == 3) {
            $scope.filterby.type = "Photographs";
            // $scope.getallartist();
            // $scope.getmedium();
            // $scope.getClr();
            // $scope.getElm();
            // $scope.getStl();
        } else if (chang == 4) {
            $scope.filterby.type = "Prints";
            // $scope.getallartist();
            // $scope.getmedium();
            // $scope.getClr();
            // $scope.getElm();
            // $scope.getStl();
        }
    };

    $ionicModal.fromTemplateUrl('templates/modal-artistSearch.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.searchmodal1 = modal;
    });

    $scope.openSearch1 = function() {
        $scope.searchmodal1.show();
    };

    // Triggered in the login modal to close it
    $scope.closeSearch1 = function() {
        $scope.searchmodal1.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modal-mediumSearch.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.searchmodal2 = modal;
    });

    $scope.openSearch2 = function() {
        $scope.searchmodal2.show();
    };

    // Triggered in the login modal to close it
    $scope.closeSearch2 = function() {
        $scope.searchmodal2.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modal-colorSearch.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.searchmodal3 = modal;
    });

    $scope.openSearch3 = function() {
        $scope.searchmodal3.show();
    };

    // Triggered in the login modal to close it
    $scope.closeSearch3 = function() {
        $scope.searchmodal3.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modal-styleSearch.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.searchmodal4 = modal;
    });

    $scope.openSearch4 = function() {
        $scope.searchmodal4.show();
    };

    // Triggered in the login modal to close it
    $scope.closeSearch4 = function() {
        $scope.searchmodal4.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modal-elementSearch.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.searchmodal5 = modal;
    });

    $scope.openSearch5 = function() {
        $scope.searchmodal5.show();
    };

    // Triggered in the login modal to close it
    $scope.closeSearch5 = function() {
        $scope.searchmodal5.hide();
    };


    $scope.setSearch = function(select) {
        $scope.filterby.search = select.selected.name;
        $scope.closeSearch1();
    };
    $scope.setMediumSearch = function(select) {
        $scope.filterby.medium = select.selected.name;
        $scope.closeSearch2();
    };
    $scope.setColorSearch = function(select) {
        $scope.filterby.color = select.selected.name;
        $scope.closeSearch3();
    };
    $scope.setStyleSearch = function(select) {
        $scope.filterby.style = select.selected.name;
        $scope.closeSearch4();
    };
    $scope.setElementSearch = function(select) {
        $scope.filterby.element = select.selected.name;
        $scope.closeSearch5();
    };

    $scope.allartist = [];
    $scope.allmedium = [];

    var artistCall = 0;
    $scope.getDropdown = function(search) {
        if (search.length >= 2) {
            $scope.change = {};
            $scope.change.type = $scope.filterby.type;
            $scope.change.search = search;
            MyServices.getAllArtistDrop($scope.change, ++artistCall, function(data, n) {
                if (n == artistCall) {
                    console.log(data);
                    if (data && data.value != false) {
                        $scope.allartist = data;
                    }
                } else {
                    $scope.allartist = [];
                }
            });
        } else {
            $scope.allartist = [];
        }
    }

    var mediumCall = 0;
    $scope.getDropdownMedium = function(search) {
        if (search.length >= 2) {
            $scope.change = {};
            $scope.change.type = $scope.filterby.type;
            $scope.change.search = search;
            MyServices.getallmedium($scope.change, ++mediumCall, function(data, n) {
                if (n == mediumCall) {
                    if (data && data.value != false) {
                        $scope.allmedium = data;
                    } else {
                        $scope.allmedium = [];
                    }
                } else {
                    $scope.allmedium = [];
                }
                console.log(n, $scope.allmedium);
            });
        }
    }

    //search by keyword
    var colorCall = 0;
    $scope.getColorDropdown = function(search) {
        if (search.length >= 2) {
            MyServices.tagSearchType($scope.filterby.type, search, ++colorCall, function(data, n) {
                if (n == colorCall) {
                    if (data && data.value != false) {
                        $scope.allColor = data;
                    } else {
                        $scope.allColor = [];
                    }
                } else {
                    $scope.allColor = [];
                }
            });
        }
    }

    var styleCall = 0;
    $scope.getStyleDropdown = function(search) {
        if (search.length >= 2) {
            MyServices.tagSearchType($scope.filterby.type, search, ++styleCall, function(data, n) {
                if (n == styleCall) {
                    if (data && data.value != false) {
                        $scope.allStyle = data;
                    } else {
                        $scope.allStyle = [];
                    }
                } else {
                    $scope.allStyle = [];
                }
            });
        }
    }

    var elementCall = 0;
    $scope.getElementDropdown = function(search) {
        if (search.length >= 2) {
            MyServices.tagSearchType($scope.filterby.type, search, ++elementCall, function(data, n) {
                if (n == elementCall) {
                    if (data && data.value != false) {
                        $scope.allElement = data;
                    } else {
                        $scope.allElement = [];
                    }
                } else {
                    $scope.allElement = [];
                }
            });
        }
    }
    $scope.reach = {};
    $scope.submitQuery = function() {
        console.log($scope.reach);
        if ($scope.reach && $scope.reach.from) {
            MyServices.reachOutArtist($scope.reach, function(data) {
                $scope.closeContact();
                dataNextPre.messageBox("Your query has been submitted");
                $scope.reach.from = "";
                $scope.reach.number = "";
                $scope.reach.person = "";
                $scope.reach.remarks = "";
            });
        }
    }

    $ionicModal.fromTemplateUrl('templates/modal-contact.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal1 = modal;
    });
    $scope.openContact = function() {
        $scope.modal1.show();
    };
    $scope.closeContact = function() {
        $scope.modal1.hide();
    };
    $scope.a = {};
    $scope.clearfilters = function() {
        $scope.filterby = {};
        $scope.a = {};
        $scope.a.abcd = false;
        $scope.filterby.search = "";
        $scope.filterby.type = "";
        $scope.filterby.pagenumber = 1;
        $scope.filterby.pagesize = 20;
        $scope.filterby.filter = "srno";
        $scope.filterby.sort = 1;
        $scope.filterby.minprice = 0;
        $scope.filterby.maxprice = 10000000;
        $scope.filterby.minwidth = '';
        $scope.filterby.maxwidth = '';
        $scope.filterby.minheight = '';
        $scope.filterby.maxheight = '';
        $scope.filterby.minbreadth = '';
        $scope.filterby.maxbreadth = '';
    }

})

.controller('SavedViewsCtrl', function($scope, $stateParams, MyServices) {

    MyServices.getuserprofile(function(data) {
        if (data.id) {
            if (data.room && data.room.length > 0) {
                $scope.views = _.chunk(data.room, 2);
            } else {
                $scope.views = [];
            }
        }
    })

    $scope.downloadView = function(image) {
        window.open(adminurl + "slider/downloadImage?file=" + image);
    }
})

.controller('FavouritesCtrl', function($scope, $stateParams, $ionicLoading, $state, MyServices) {

    $scope.artistdetail = [];
    $scope.allfavourites = [];
    $scope.noFavs = false;
    $scope.totalfav = 0;

    function getMyFavouritesId() {
        globalFunction.showLoading();
        MyServices.getuserprofile(function(data) {
            if (data.id) {
                userProfile = data;
                $scope.userProfile = data;
                MyServices.getMyFavourites(data.id, function(favorite) {
                    console.log(favorite);
                    if (favorite.value != false) {
                        $scope.noFavs = false;
                        userProfile.wishlist = favorite;
                        _.each(favorite, function(n) {
                            if (n.wishlistfolder) {
                                $scope.allfavourites.push({
                                    "_id": n.artwork,
                                    "wishlistfolder": n.wishlistfolder
                                });
                            } else {
                                $scope.totalfav++;
                                $scope.allfavourites.push({
                                    "_id": n.artwork
                                });
                            }
                        });
                        getFavorite($scope.allfavourites)
                    } else {
                        $ionicLoading.hide();
                        $scope.myFavourites = [];
                        $scope.noFavs = true;
                    }
                })
            }
        })
    }
    getMyFavouritesId();

    $scope.activeTab = "myfav";

    function getFavorite(allfavourites) {
        $scope.myArtists = [];
        MyServices.getAllFavouritesData(allfavourites, function(datas, status) {
            console.log("favorite data");
            $scope.myFavourites = _.chunk(datas, 2);
            console.log($scope.myFavourites);
            // var favs = _.groupBy(datas, function(n) {
            //     return n.name;
            // });
            // _.each(favs, function(key, value) {
            //     _.each(key, function(n) {
            //         if (!n.wishlistfolder) {
            //             $scope.myArtists.push(value);
            //         }
            //     })
            // })
            // $scope.myArtists = _.uniq($scope.myArtists);
            // if (!$stateParams.artist) {
            //     $scope.artistName = '';
            //     $scope.artistdetail = datas;
            // } else {
            //     $scope.activeTab = "myartist";
            //     $scope.artistName = $stateParams.artist;
            //     $scope.artistdetail = [];
            //     _.each(datas, function(n) {
            //         if (n.name === $stateParams.artist)
            //             $scope.artistdetail.push(n);
            //     });
            //     if ($scope.artistdetail.length == 0) {
            //         $scope.activeTab = "myfolder";
            //         $scope.artistName = $scope.myFolders[_.findIndex($scope.myFolders, {
            //             "_id": $stateParams.artist
            //         })].name;
            //         _.each(datas, function(n) {
            //             if (n.wishlistfolder == $stateParams.artist) {
            //                 delete n.wishlistfolder;
            //                 $scope.artistdetail.push(n);
            //             }
            //         });
            //     }
            // }
            // if ($scope.artistdetail.length == 0) {
            //     $scope.noFavsFolder = true;
            // } else {
            //     $scope.noFavsFolder = false;
            // }
            $ionicLoading.hide();
        })
    }

    $scope.goToDetail = function(artwork) {
        console.log(artwork);
        if (artwork.type == "Sculptures") {
            $state.go('app.art-details', {
                artid: artwork._id
            });
        } else {
            $state.go('app.art-details', {
                artid: artwork._id
            });
        }
    }

    $scope.removeFromFav = function(artid) {
        MyServices.deleteFromFav(1, artid, function(data) {
            if (!data.value) {
                $scope.allfavourites = [];
                getMyFavouritesId();
                dataNextPre.messageBox("Removed from favourites");
            }
        })
    }

    $.jStorage.set("artistScroll", null);
    $.jStorage.set("artworkScroll", null);




})

.controller('ArtDetailCtrl', function($scope, $stateParams, $ionicModal, $ionicLoading, $state, MyServices, $filter, $cordovaSocialSharing, $cordovaInAppBrowser) {

    $scope.aristImages = [];
    $scope.allartworks = [];
    $scope.reach = {};

    MyServices.getuserprofile(function(data) {
        if (data.id) {
            userProfile = data;
            MyServices.getMyFavourites(data.id, function(favorite) {
                userProfile.wishlist = favorite;
                $scope.loadArtWork($stateParams.artid);
            })
        } else {
            $scope.loadArtWork($stateParams.artid);
        }
    })

    $scope.openBrowser = function(link) {
        var soptions = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
        };
        $cordovaInAppBrowser.open(link, '_blank', soptions).then(function(event) {
            // success
        }).catch(function(event) {
            // error
        });
    }

    $scope.loadArtWork = function(id) {
        globalFunction.showLoading();
        $scope.artistDetailImg = {};
        MyServices.getartworkdetail(id, function(data, status) {
            console.log(data);
            $scope.aristImages = [];
            $scope.artid = data[0]._id;
            MyServices.getArtistDetail(data[0]._id, function(artistdata, status) {
                console.log(artistdata);
                $.jStorage.set("reachout", artistdata);
                dataNextPre.reachout = artistdata;
                $scope.artistdetail = artistdata;
                $scope.allartworks = artistdata;
                _.each(artistdata.artwork, function(n) {
                    if (n._id != data[0].artwork._id) {
                        $scope.aristImages.push(n);
                    }
                })
                $scope.aristImages = _.chunk($scope.aristImages, 4);
                $scope.aristImages = $scope.aristImages[0];
                //              console.log($scope.aristImages);
                $ionicLoading.hide();
            })
            $scope.artistDetailImg = data[0];
            $scope.artistDetailImg.heartClass = $filter('showheart')($scope.artistDetailImg.artwork._id);
            console.log($scope.artistDetailImg);
            $scope.reach.artist = $scope.artistDetailImg.name;
            $scope.reach.srno = $scope.artistDetailImg.artwork.srno;
            if ($scope.artistDetailImg.artwork.srno == 1) {
                $scope.prevButton = false;
            }
            // MyServices.lastSr(function(data) {
            //     if (data.srno == $scope.artistDetailImg.artwork.srno) {
            //         $scope.nextButton = false;
            //     }
            // });
        })
    }

    $scope.showitabove = function(artwork) {
        $state.go('app.art-details', {
                artid: artwork._id
            })
            // $scope.loadArtWork(artwork._id);
    }

    $scope.addToCart = function(art) {
        dataNextPre.addToCart(art);
    }

    $scope.addToFav = function(art) {
        console.log(art);
        dataNextPre.favorite(art);
    }

    $scope.submitQuery = function() {
        MyServices.reachOutArtist($scope.reach, function(data) {
            $scope.closeContact();
            dataNextPre.messageBox("Your query has been submitted");
            $scope.reach.from = "";
            $scope.reach.number = "";
            $scope.reach.person = "";
            $scope.reach.remarks = "";
        })
    }

    $scope.shareImage = function() {
        console.log($scope.artistDetailImg);
        var link = "";
        if ($scope.artistDetailImg.artwork.type != "Sculptures")
            link = "http://www.auraart.in/#/artwork/detail/" + $scope.artistDetailImg.artwork._id;
        else
            link = "http://www.auraart.in/#/sculpture/" + $scope.artistDetailImg.artwork._id;

        $cordovaSocialSharing.share($scope.artistDetailImg.artwork.name + " by " + $scope.artistDetailImg.name, "Aura Art: " + $scope.artistDetailImg.artwork.name + " by " + $scope.artistDetailImg.name, "http://www.auraart.in/user/resize.jpg?height=750&file=" + $scope.artistDetailImg.artwork.image[0], link) // Share via native share sheet
            .then(function(result) {
                // Success!
            }, function(err) {
                // An error occured. Show a message to the user
            });
    }

    $ionicModal.fromTemplateUrl('templates/modal-image.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function(image) {
        $scope.bigImage = image;
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    $ionicModal.fromTemplateUrl('templates/modal-contact.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal1 = modal;
    });
    $scope.openContact = function() {
        $scope.modal1.show();
    };
    $scope.closeContact = function() {
        $scope.modal1.hide();
    };

    $scope.details = [{
        image: 'img/artist/artist1.jpg',
    }];
})


.controller('SigninCtrl', function($scope, $stateParams, MyServices, $ionicLoading, $state) {

    $scope.register = {};

    $scope.doSignup = function() {
        if ($scope.register.password === $scope.register.confirmpassword) {
            $ionicLoading.show({
                template: 'Please Wait...',
                duration: 10000
            });
            $scope.passwordNotMatch = false;
            $scope.register.accesslevel = "customer";
            MyServices.registeruser($scope.register, function(data, status) {
                $ionicLoading.hide();
                if (data.value != false) {
                    $scope.showAlreadyRegistered = false;
                    $scope.showWishlist = true;
                    $state.go("app.home");
                } else if (data.value == false && data.comment == "User already exists") {
                    $scope.showAlreadyRegistered = true;
                    $scope.passwordNotMatch = false;
                }
            })
        } else {
            $scope.passwordNotMatch = true;
            $scope.showAlreadyRegistered = false;
        }
    };

})

.controller('ForgotCtrl', function($scope, $stateParams, MyServices, $ionicLoading, $ionicPopup, $timeout) {

    $scope.forgot = {};
    $scope.forgotpassword = function() {
        $ionicLoading.show({
            template: 'Please Wait...',
            duration: 10000
        });
        MyServices.forgotpassword($scope.forgot, function(data, status) {
            $ionicLoading.hide();
            if (data.value == true) {
                var xyz = $ionicPopup.show({
                    cssClass: 'custom-class',
                    template: '<h5 class="text-center">New password e mailed to you.</h5>'
                });

                $timeout(function() {
                    xyz.close();
                }, 3000);
            }
        })
    }

})

.controller('ArtworkCtrl', function($scope, $stateParams, $ionicModal, MyServices, $timeout, $ionicLoading, $state, $ionicScrollDelegate) {

    $scope.pagedata = {};
    $scope.pagedata.search = "";
    $scope.pagedata.type = "";
    $scope.pagedata.medium = "";
    $scope.pagedata.pagenumber = 1;
    $scope.pagedata.pagesize = 20;
    $scope.pagedata.filter = "";
    $scope.pagedata.sort = 1;
    $scope.pagedata.minprice = '';
    $scope.pagedata.maxprice = '';
    $scope.pagedata.minwidth = '';
    $scope.pagedata.maxwidth = '';
    $scope.pagedata.minheight = '';
    $scope.pagedata.maxheight = '';
    $scope.pagedata.minbreadth = '';
    $scope.pagedata.maxbreadth = '';
    $scope.totalartcont = [];
    $scope.maxpages = 2;
    $scope.callinfinite = true;
    $scope.isRed = false;
    $scope.heartClass = "fa fa-heart";
    var lastpage = 2;
    $.jStorage.set("artistScroll", null);
    MyServices.getuserprofile(function(data) {
        if (data.id) {
            userProfile = data;
            MyServices.getMyFavourites(data.id, function(favorite) {
                userProfile.wishlist = favorite;
            })
        }
    })

    $scope.openReachout = function() {
        globalFunction.reachOut();
    }

    $ionicModal.fromTemplateUrl('templates/modal-artistSearch.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.searchmodal1 = modal;
    });

    $scope.openSearch1 = function() {
        $scope.searchmodal1.show();
    };

    // Triggered in the login modal to close it
    $scope.closeSearch1 = function() {
        $scope.searchmodal1.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modal-mediumSearch.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.searchmodal2 = modal;
    });

    $scope.openSearch2 = function() {
        $scope.searchmodal2.show();
    };

    // Triggered in the login modal to close it
    $scope.closeSearch2 = function() {
        $scope.searchmodal2.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modal-colorSearch.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.searchmodal3 = modal;
    });

    $scope.openSearch3 = function() {
        $scope.searchmodal3.show();
    };

    // Triggered in the login modal to close it
    $scope.closeSearch3 = function() {
        $scope.searchmodal3.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modal-styleSearch.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.searchmodal4 = modal;
    });

    $scope.openSearch4 = function() {
        $scope.searchmodal4.show();
    };

    // Triggered in the login modal to close it
    $scope.closeSearch4 = function() {
        $scope.searchmodal4.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modal-elementSearch.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.searchmodal5 = modal;
    });

    $scope.openSearch5 = function() {
        $scope.searchmodal5.show();
    };

    // Triggered in the login modal to close it
    $scope.closeSearch5 = function() {
        $scope.searchmodal5.hide();
    };

    $scope.filterby = {}
    $scope.setSearch = function(select) {
        $scope.pagedata.search = select.selected.name;
        $scope.filterby.search = select.selected.name;
        $scope.closeSearch1();
    };
    $scope.setMediumSearch = function(select) {
        $scope.pagedata.medium = select.selected.name;
        $scope.filterby.medium = select.selected.name;
        console.log($scope.pagedata.medium);
        $scope.closeSearch2();
    };
    $scope.setColorSearch = function(select) {
        $scope.pagedata.color = select.selected.name;
        $scope.filterby.color = select.selected.name;
        $scope.closeSearch3();
    };
    $scope.setStyleSearch = function(select) {
        $scope.pagedata.style = select.selected.name;
        $scope.filterby.style = select.selected.name;
        $scope.closeSearch4();
    };
    $scope.setElementSearch = function(select) {
        $scope.pagedata.element = select.selected.name;
        $scope.filterby.element = select.selected.name;
        $scope.closeSearch5();
    };

    var artistCall = 0;
    $scope.getDropdown = function(search) {
        if (search.length >= 2) {
            $scope.change = {};
            $scope.change.type = $scope.filterby.type;
            $scope.change.search = search;
            MyServices.getAllArtistDrop($scope.change, ++artistCall, function(data, n) {
                if (n == artistCall) {
                    console.log(data);
                    if (data && data.value != false) {
                        $scope.allartist = data;
                    }
                } else {
                    $scope.allartist = [];
                }
            });
        } else {
            $scope.allartist = [];
        }
    }

    var mediumCall = 0;
    $scope.getDropdownMedium = function(search) {
        if (search.length >= 2) {
            $scope.change = {};
            $scope.change.type = $scope.filterby.type;
            $scope.change.search = search;
            MyServices.getallmedium($scope.change, ++mediumCall, function(data, n) {
                if (n == mediumCall) {
                    if (data && data.value != false) {
                        $scope.allmedium = data;
                    } else {
                        $scope.allmedium = [];
                    }
                } else {
                    $scope.allmedium = [];
                }
            });
        }
    }

    //search by keyword
    var colorCall = 0;
    $scope.getColorDropdown = function(search) {
        if (search.length >= 2) {
            MyServices.tagSearchType($scope.filterby.type, search, ++colorCall, function(data, n) {
                if (n == colorCall) {
                    if (data && data.value != false) {
                        $scope.allColor = data;
                    } else {
                        $scope.allColor = [];
                    }
                } else {
                    $scope.allColor = [];
                }
            });
        }
    }

    var styleCall = 0;
    $scope.getStyleDropdown = function(search) {
        if (search.length >= 2) {
            MyServices.tagSearchType($scope.filterby.type, search, ++styleCall, function(data, n) {
                if (n == styleCall) {
                    if (data && data.value != false) {
                        $scope.allStyle = data;
                    } else {
                        $scope.allStyle = [];
                    }
                } else {
                    $scope.allStyle = [];
                }
            });
        }
    }

    var elementCall = 0;
    $scope.getElementDropdown = function(search) {
        if (search.length >= 2) {
            MyServices.tagSearchType($scope.filterby.type, search, ++elementCall, function(data, n) {
                if (n == elementCall) {
                    if (data && data.value != false) {
                        $scope.allElement = data;
                    } else {
                        $scope.allElement = [];
                    }
                } else {
                    $scope.allElement = [];
                }
            });
        }
    }

    $scope.typejson = [{
        name: "All",
        class: "actives"
    }, {
        name: "Paintings",
        class: ""
    }, {
        name: "Sculptures",
        class: ""
    }, {
        name: "Photographs",
        class: ""
    }, {
        name: "Prints",
        class: ""
    }, {
        name: "Others",
        class: ""
    }]

    $scope.changeHeartColor = function(totalartcont) {
        if ($scope.isRed == true)
            totalartcont.heartClass = "fa fa-heart";
        else
            totalartcont.heartClass = "fa fa-heart font-color3";
        $scope.isRed = !$scope.isRed;
    }

    $scope.makeFav = function(art) {
        dataNextPre.favorite(art);
    }

    $scope.addToCart = function(art) {
        dataNextPre.addToCart(art);
    }

    $scope.checkForEmpty = function() {

    }

    $scope.reload = function() {
        $scope.infiniteLoading = false;
        //      console.log($scope.pagedata);
        var filterdata = $scope.pagedata;
        if (filterdata.minprice == 0) {
            filterdata.minprice = '';
            $scope.pagedata.minprice = '';
        }
        if (filterdata.maxprice == 10000000) {
            filterdata.maxprice = '';
            $scope.pagedata.maxprice = '';
        }

        if (filterdata.sort == 1) {
            $scope.lotactive = '';
            $scope.htlactive = '';
            $scope.lthactive = '';
        }
        MyServices.artworktype(filterdata, function(data, status) {
            if (data.value != false) {
                lastpage = parseInt(data.totalpages);
                _.each(data.data, function(n) {
                    n.artwork.pageno = data.page;
                    $scope.totalartcont.push(n);
                });
                $scope.totalartcont = _.uniq($scope.totalartcont, 'artwork._id');
                $scope.totalArtworks = _.chunk($scope.totalartcont, 2);
                $scope.callinfinite = false;
                if ($.jStorage.get("artworkScroll") && $.jStorage.get("artworkScroll").pageno > 1) {
                    if (data.page == $.jStorage.get("artworkScroll").pageno) {
                        $ionicScrollDelegate.scrollTo(0, $.jStorage.get("artworkScroll").scroll, true);
                        // window.scrollTo(0, $.jStorage.get("artworkScroll").scroll);
                    } else {
                        var variablepage = data.page;
                        $scope.pagedata.pagenumber = ++variablepage;
                        if ($scope.pagedata.pagenumber <= $.jStorage.get("artworkScroll").pageno) {
                            $scope.reload();
                        }
                    }
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.infiniteLoading = true;
            } else {
                $scope.totalArtworks = [];
                $scope.infiniteLoading = false;
            }
            $ionicLoading.hide();
        });
    }

    $scope.getHeight = function(artwork) {
        var xy = getScrollXY();
        var obj = {};
        obj.pageno = artwork.artwork.pageno;
        obj.scroll = xy[1];
        $.jStorage.set("artworkScroll", obj);
    }

    // if ($.jStorage.get("artworkScroll")) {
    //     function abcd(pageno) {
    //         // for (var i = 2; i <= $.jStorage.get("artworkScroll").pageno; i++) {
    //         console.log(i);
    //         $scope.pagedata.pagenumber = pageno;
    //         if(pageno){}
    //         $scope.reload();
    //     }
    //     abcd(2);
    //     // }
    // }

    $scope.showCategory = function() {
        $scope.modal.show();
    };
    $ionicModal.fromTemplateUrl('templates/category.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeCategory = function() {
        if ($scope.modal)
            $scope.modal.hide();
    };

    $scope.makeactive = function(type) {
        globalFunction.showLoading();
        //      console.log(type);
        _.each($scope.typejson, function(n) {
            var index = n.name.indexOf(type);
            if (index != -1) {
                n.class = "actives";
            } else {
                n.class = "";
            }
        })
        if (type == "All")
            type = "";
        $scope.pagedata.type = type;
        $scope.totalartcont = [];
        $scope.pagedata.pagenumber = 1;
        // $scope.pagedata.search = '';
        $scope.pagedata.filter = "srno";
        $scope.pagedata.sort = 1;
        // $scope.pagedata.medium = '';
        $scope.closeCategory();
        $scope.checkForEmpty();
        $scope.reload();
    }

    $scope.clearjStorage = function() {
        $.jStorage.set("artworkScroll", {
            pageno: 1,
            scroll: 0
        });
    }

    //    $scope.loadMore = function () {
    //        $scope.pagedata.pagenumber++;
    //        if ($scope.pagedata.pagenumber <= $scope.totalpagecount) {
    //            $scope.reload();
    //        }
    //    };

    $scope.filterresults = function(search) {
        globalFunction.showLoading();
        $.jStorage.set("artworkScroll", {
            pageno: 1,
            scroll: 0
        });
        $scope.pagedata.search = _.capitalize(search);
        $scope.totalartcont = [];
        $scope.pagedata.pagenumber = 1;
        $scope.pagedata.filter = "srno";
        $scope.pagedata.sort = 1;
        $scope.closeFilter();
        $scope.checkForEmpty();
        $scope.reload();
    }

    $scope.infiniteLoading = true;
    $scope.addMoreItems = function() {
        if (lastpage > $scope.pagedata.pagenumber) {
            $scope.pagedata.pagenumber++;
            $scope.reload();
        } else {
            $scope.infiniteLoading = false;
        }
    }

    // set available range
    $scope.minPrice = 0;
    $scope.maxPrice = 10000000;

    // default the user's values to the available range
    $scope.userMinPrice = $scope.minPrice;
    $scope.userMaxPrice = $scope.maxPrice;

    $scope.imageSrc = 'img/artist/artist1.jpg';

    $scope.artistDetailImg = {};
    $scope.showDetails = function(oneuser) {
        //      console.log(oneuser)
        $scope.artistDetailImg = oneuser;
        ngDialog.open({
            scope: $scope,
            template: 'views/content/quickview-imagedetail.html'
        });
    };

    $scope.lauchedSoon = function() {
        ngDialog.open({
            template: 'views/content/modal-launch.html'
        });
        $timeout(function() {
            ngDialog.closeAll();
        }, 3000);
    };

    $scope.sortBy = function(num, by) {
        globalFunction.showLoading();
        if (num == -1 && by == 'yoc') {
            $scope.lotactive = 'active';
            $scope.htlactive = '';
            $scope.lthactive = '';
        } else if (num == -1 && by == 'gprice') {
            $scope.lotactive = '';
            $scope.htlactive = 'active';
            $scope.lthactive = '';
        } else if (num == 1 && by == 'gprice') {
            $scope.lotactive = '';
            $scope.htlactive = '';
            $scope.lthactive = 'active';
        }
        $scope.pagedata.sort = num;
        $scope.pagedata.filter = by;
        $scope.pagedata.pagenumber = 1;
        $scope.totalartcont = [];
        $scope.closeSort();
        $scope.reload();
    }

    if ($stateParams.type != -1) {
        $scope.makeactive($stateParams.type);
    } else {
        $scope.pagedata = $.jStorage.get("filterby");
        $scope.checkForEmpty();
        $stateParams.type = "All";
        if ($.jStorage.get("filterby") && $.jStorage.get("filterby").type == '')
            $scope.makeactive("All");
        else
            $scope.makeactive($.jStorage.get("filterby").type);
    }

    $scope.clearfilters = function() {
        $scope.pagedata.search = "";
        $scope.pagedata.type = "";
        $scope.pagedata.pagenumber = 1;
        $scope.pagedata.pagesize = 20;
        $scope.pagedata.filter = "";
        $scope.pagedata.medium = '';
        $scope.pagedata.sort = 1;
        $scope.pagedata.minheight = "";
        $scope.pagedata.maxheight = "";
        $scope.pagedata.minwidth = "";
        $scope.pagedata.maxwidth = "";
        $scope.pagedata.minbreadth = "";
        $scope.pagedata.maxbreadth = "";
        $scope.pagedata.minprice = "";
        $scope.pagedata.maxprice = "";
        $scope.pagedata.color = "";
        $scope.pagedata.style = "";
        $scope.pagedata.element = "";
        $scope.closeFilter();
        $scope.makeactive('All');
    }

    function getScrollXY() {
        var x = 0,
            y = 0;
        if (typeof(window.pageYOffset) == 'number') {
            // Netscape
            x = window.pageXOffset;
            y = window.pageYOffset;
        } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            // DOM
            x = document.body.scrollLeft;
            y = document.body.scrollTop;
        } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            // IE6 standards compliant mode
            x = document.documentElement.scrollLeft;
            y = document.documentElement.scrollTop;
        }
        return [x, y];
    }

    $scope.goToDetailPage = function(artwork) {
        var xy = $ionicScrollDelegate.$getByHandle('handler').getScrollPosition();
        // var xy = getScrollXY();
        var obj = {};
        obj.pageno = artwork.pageno;
        obj.scroll = xy.top;
        $.jStorage.set("artworkScroll", obj);
        if (artwork.type == "Sculptures") {
            $state.go('app.art-details', {
                artid: artwork._id
            });
        } else {
            $state.go('app.art-details', {
                artid: artwork._id
            });
        }
    }

    // Open the login modal
    $scope.showFilter = function() {
        $scope.modal1.show();
    };
    $ionicModal.fromTemplateUrl('templates/filter.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal1 = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeFilter = function() {
        $scope.modal1.hide();
    };

    $ionicModal.fromTemplateUrl('templates/sort.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal2 = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeSort = function() {
        $scope.modal2.hide();
    };

    // Open the login modal
    $scope.showSort = function() {
        $scope.modal2.show();
    };
})

.controller('ArtistCtrl', function($scope, $stateParams, $ionicModal, MyServices, $state, $ionicLoading, $ionicScrollDelegate) {
    $scope.tab = 'grid';

    $scope.showCategory = function() {
        $scope.modal.show();
    };
    $ionicModal.fromTemplateUrl('templates/category.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeCategory = function() {
        if ($scope.modal)
            $scope.modal.hide();
    };

    $scope.pagedata = {};
    $scope.pagedata.pagenumber = 1;
    $scope.pagedata.pagesize = 12;
    $scope.pagedata.search = '';
    $scope.pagedata.searchname = '';
    $scope.artistimage = [];
    $scope.listview = [];
    var lastpage = 2;
    $.jStorage.set("artworkScroll", null);
    MyServices.getuserprofile(function(data) {
        if (data.id) {
            userProfile = data;
            MyServices.getMyFavourites(data.id, function(favorite) {
                userProfile.wishlist = favorite;
            })
        }
    })

    function getScrollXY() {
        var x = 0,
            y = 0;
        if (typeof(window.pageYOffset) == 'number') {
            // Netscape
            console.log("Netscape");
            x = window.pageXOffset;
            y = window.pageYOffset;
        } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            // DOM
            console.log("DOM");
            x = document.body.scrollLeft;
            y = document.body.scrollTop;
        } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            // IE6 standards compliant mode
            console.log("IE6");
            x = document.documentElement.scrollLeft;
            y = document.documentElement.scrollTop;
        }
        return [x, y];
    }

    $scope.getHeight = function(artist) {
        console.log(artist);
        var xy = $ionicScrollDelegate.$getByHandle('ahandler').getScrollPosition();
        var obj = {};
        obj.pageno = artist.pageno;
        obj.scroll = xy.top;
        $.jStorage.set("artistScroll", obj);
        $state.go('app.artist-detail', {
            "artistid": artist._id
        });
    }

    $scope.reload = function() {
        // globalFunction.showLoading();
        console.log("reload");

        if ($scope.pagedata.type == "All") {
            $scope.pagedata.type = "";
        }
        $scope.infiniteLoading = false;
        MyServices.getallartist($scope.pagedata, function(data, status) {
            $ionicLoading.hide();
            lastpage = data.totalpages;
            _.each(data.data, function(n) {
                n.pageno = $scope.pagedata.pagenumber;
                $scope.artistimage.push(n);
            })
            $scope.artistimage = _.uniq($scope.artistimage, '_id');
            $scope.artistArr = _.chunk($scope.artistimage, 2);
            if ($.jStorage.get("artistScroll") && $.jStorage.get("artistScroll").pageno > 1) {
                if ($scope.pagedata.pagenumber == $.jStorage.get("artistScroll").pageno) {
                    $ionicScrollDelegate.scrollTo(0, $.jStorage.get("artistScroll").scroll, true);
                    // window.scrollTo(0, $.jStorage.get("artworkScroll").scroll);
                } else {
                    var variablepage = $scope.pagedata.pagenumber;
                    $scope.pagedata.pagenumber = ++variablepage;
                    if ($scope.pagedata.pagenumber <= $.jStorage.get("artistScroll").pageno) {
                        $scope.reload();
                    }
                }
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.infiniteLoading = true;
        });
    }

    $scope.addMoreItems = function() {
        if (lastpage >= $scope.pagedata.pagenumber) {
            $scope.pagedata.pagenumber++;
            $scope.reload();
        } else {
            $scope.infiniteLoading = false;
        }
        console.log($scope.pagedata.pagenumber);
    }

    $scope.getartistbysearch = function() {
        $scope.pagedata.pagenumber = 1;
        $scope.artistimage = [];
        $scope.listview = [];
        $scope.reload();
    }

    $scope.makeactive = function(type) {
        globalFunction.showLoading();
        _.each($scope.typejson, function(n) {
            var index = n.name.indexOf(type);
            if (index != -1) {
                n.class = "actives";
            } else {
                n.class = "";
            }
        })
        $scope.pagedata.pagenumber = 1;
        $scope.pagedata.type = type;
        $scope.pagedata.searchname = '';
        $scope.artistimage = [];
        $scope.closeCategory();
        $scope.reload();
    }

    $scope.clearjStorage = function() {
        $.jStorage.set("artistScroll", {
            pageno: 1,
            scroll: 0
        });
    }

    // $(window).scroll(function() {
    //     if ($(window).scrollTop() + $(window).height() == $(document).height()) {
    //           console.log("at bottom");
    //         $scope.pagedata.pagenumber++;
    //         $scope.reload();
    //     }
    // });

    $scope.typejson = [{
        name: "All",
        class: "actives"
    }, {
        name: "Paintings",
        class: ""
    }, {
        name: "Sculptures",
        class: ""
    }, {
        name: "Photographs",
        class: ""
    }, {
        name: "Prints",
        class: ""
    }, {
        name: "Others",
        class: ""
    }]

    $scope.makeactive($stateParams.type);

    $scope.addToCart = function(art) {
        var test = {}
        test.artwork = art;
        dataNextPre.addToCart(test);
    }

    $scope.addToFav = function(art) {
        var test = {}
        test.artwork = art;
        test.heartClass = art.heartClass;
        dataNextPre.favorite(test)
    }

})

.controller('ArtistDetailCtrl', function($scope, $stateParams, $ionicModal, MyServices, $ionicLoading, $state, $cordovaInAppBrowser) {

    $scope.artistid = $stateParams.artistid;

    // var obj = {
    //     image: 'img/artist/artist1.jpg',
    //     id: '1527',
    //     typename: 'Untitled',
    //     madein: 'Oil on board',
    //     size: '19.5 x 23',
    //     year: '1978',
    //     price: 'Rs 1,00,000/ $6,400'
    // }

    $scope.openBrowser = function(link) {
        var soptions = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
        };
        $cordovaInAppBrowser.open(link, '_blank', soptions).then(function(event) {
            // success
        }).catch(function(event) {
            // error
        });
    }

    globalFunction.showLoading();
    MyServices.getArtistDetail($stateParams.artistid, function(data, status) {
        console.log(data);
        $.jStorage.set("reachout", data);
        $scope.artistdetail = data
        if ($scope.artistdetail.artwork && $scope.artistdetail.artwork.length > 0) {
            $scope.artistdetail.artwork = _.chunk($scope.artistdetail.artwork, 2);
        }
        dataNextPre.reachout = data;
        $ionicLoading.hide();
    })

    MyServices.getuserprofile(function(data) {
        if (data.id) {
            userProfile = data;
            MyServices.getMyFavourites(data.id, function(favorite) {
                userProfile.wishlist = favorite;
            })
        }
    })

    $scope.goToDetail = function(artwork) {
        console.log(artwork);
        if (artwork.type == "Sculptures") {
            $state.go('app.art-details', {
                artid: artwork._id
            });
        } else {
            $state.go('app.art-details', {
                artid: artwork._id
            });
        }
    }

    $scope.addToCart = function(art) {
        var test = {}
        test.artwork = art;
        dataNextPre.addToCart(test);
    }

    $scope.addToFav = function(art) {
        console.log(art);
        var test = {}
        test.artwork = art;
        test.heartClass = art.heartClass;
        console.log(test);
        dataNextPre.favorite(test)
    }

})

.controller('ContactCtrl', function($scope, $stateParams, $ionicLoading, MyServices) {
    $scope.reach = {};

    $scope.submitQuery = function() {
        globalFunction.showLoading();
        MyServices.reachOutArtist($scope.reach, function(data) {
            $ionicLoading.hide();
            dataNextPre.messageBox("Your query has been submitted");
        })
    }

})

.controller('AboutCtrl', function($scope, $stateParams, MyServices) {
    $scope.showteam = "true";
    //$scope.showactivity="true";
    console.log("dfasdf");
    $scope.tab = true;
    $scope.classteam = "active";
    $scope.classavtivity = "";
    $scope.changetab = function(tab) {
        if (tab == 1) {
            $scope.tab = true;
            $scope.classteam = "active";
            $scope.classavtivity = "";

        } else {
            $scope.tab = false;
            $scope.classavtivity = "active";
            $scope.classteam = "";
        }
    }

    MyServices.getTeam(function(data) {
        if (data.value != false) {
            $scope.team = data[0];
        }
    })
})

.controller('PressCtrl', function($scope, $stateParams, $ionicModal, MyServices, $ionicLoading) {

    $.jStorage.set("artistScroll", null);
    $.jStorage.set("artworkScroll", null);
    $scope.press = [];

    globalFunction.showLoading();

    function getPress(data) {
        $ionicLoading.hide();
        if (data.value != false) {
            data2 = _.groupBy(data, function(n) {
                var year = moment(n.date).get("year");
                return year;
            }, true);
            $scope.pressYear = _.keys(data2);

            $scope.press = data2;
            console.log(data2);
        }
    }
    MyServices.pressFind(getPress);

    $scope.showpressimage = function(image) {
        $scope.pressImage = "";
        $scope.pressImage = image;
        $scope.modal.show();
    };
    $ionicModal.fromTemplateUrl('templates/modal-pressimage.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closepressimage = function() {
        $scope.modal.hide();
    };

})

.controller('EventCtrl', function($scope, $stateParams, MyServices, $ionicLoading) {

    globalFunction.showLoading();
    $.jStorage.set("artistScroll", null);
    $.jStorage.set("artworkScroll", null);

    $scope.events = {};
    $scope.events.upcoming = [];
    $scope.events.current = [];
    $scope.events.past = [];

    MyServices.getAllEvents(function(data, status) {
        // console.log(data);
        _.each(data, function(n) {
            if (n.startdate) {
                var eventDate = new Date(n.startdate);
                eventDate.setHours(0, 0, 0, 0);
                var eventEndDate = new Date(n.enddate);
                eventEndDate.setHours(0, 0, 0, 0);
                var currDate = new Date();
                currDate.setHours(0, 0, 0, 0);
                $scope.currentYear = currDate.getFullYear();
                // console.log(n.startdate + " / eventDate = " + eventDate + " / currDate = " + currDate + " / " + (eventDate == currDate));
                if (moment(currDate).isBetween(eventDate, eventEndDate)) {
                    $scope.events.current.push(n);
                } else if (moment(eventDate).isAfter(currDate)) {
                    $scope.events.upcoming.push(n);
                } else if (moment(eventDate).isBefore(currDate)) {
                    $scope.events.past.push(n);
                }
            }
        });
        // console.log($scope.events);

        if ($scope.events.upcoming && $scope.events.upcoming.length > 0) {
            $scope.events.upcoming = _.groupBy($scope.events.upcoming, function(n) {
                return n.year;
            });
            var arr = [];
            _.each($scope.events.upcoming, function(value, key) {
                arr.push(value);
            })
            $scope.events.upcoming = arr;
        }
        if ($scope.events.current && $scope.events.current.length > 0) {
            $scope.events.current = _.groupBy($scope.events.current, function(n) {
                return n.year;
            });
            var arr = [];
            _.each($scope.events.current, function(value, key) {
                arr.push(value);
            })
            $scope.events.current = arr;
        }
        if ($scope.events.past && $scope.events.past.length > 0) {
            $scope.events.past = _.groupBy($scope.events.past, function(n) {
                return n.year;
            });
            var arr = [];
            _.each($scope.events.past, function(value, key) {
                arr.push(value);
            })
            $scope.events.past = arr;
        }

        $scope.events.current = _.sortBy($scope.events.current, function(n) {
            return -1 * n[0].year;
        });

        $scope.events.upcoming = _.sortBy($scope.events.upcoming, function(n) {
            return -1 * n[0].year;
        });

        $scope.events.past = _.sortBy($scope.events.past, function(n) {
            return -1 * n[0].year;
        });

        console.log($scope.events);

        $ionicLoading.hide()
    });
})

.controller('EventdetailCtrl', function($scope, $stateParams, $ionicModal, MyServices, $ionicLoading, $filter) {

    globalFunction.showLoading();

    MyServices.getOneEvents($stateParams.id, function(data) {
        console.log(data);
        $scope.eventDetail = data;
        if ($scope.eventDetail.videos) {
            $scope.eventDetail.videos = $scope.eventDetail.videos.split(',');
            $scope.eventDetail.videos = _.chunk($scope.eventDetail.videos, 3);
        }
        if ($scope.eventDetail.photos) {
            var photoArr = [];
            _.each($scope.eventDetail.photos, function(n) {
                var obj = {};
                obj.src = $filter('uploadpath')(n);
                photoArr.push(obj);
            })
            $scope.eventDetail.photos = photoArr;
            // $scope.eventDetail.photos = _.chunk($scope.eventDetail.photos, 3);
        }
        if ($scope.eventDetail.pressphoto) {
            var pressArr = [];
            _.each($scope.eventDetail.pressphoto, function(n) {
                var obj = {};
                obj.src = $filter('uploadpath')(n.photos);
                pressArr.push(obj);
            })
            $scope.eventDetail.pressphoto = pressArr;
            // $scope.eventDetail.photos = _.chunk($scope.eventDetail.photos, 3);
        }
        $ionicLoading.hide();
    })

    $.jStorage.set("artistScroll", null);
    $.jStorage.set("artworkScroll", null);

    $scope.showeventvideo = function(video) {
        $scope.modalVideo = video;
        $scope.modal.show();
    };
    $ionicModal.fromTemplateUrl('templates/modal-eventimage.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeeventimage = function() {
        $scope.modal.hide();
        $scope.modal.remove();
    };
})

.controller('InfraServicesCtrl', function($scope, $stateParams) {})

.controller('CartCtrl', function($scope, $stateParams, MyServices, $ionicLoading, $state) {

    $scope.totalCartPrice = 0;
    $scope.noCartItems = false;
    globalFunction.showLoading();
    $scope.checkCheckout = true;
    $.jStorage.set("artistScroll", null);
    $.jStorage.set("artworkScroll", null);
    $scope.getCartItems = function() {
        MyServices.getCartItems(function(data) {
            console.log(data);
            if (data.length == 0) {
                $scope.noCartItems = true;
                $scope.cartItems = [];
            } else {
                $scope.noCartItems = false;
                $scope.cartItems = data;
                $scope.totalCartPrice = 0;
                _.each($scope.cartItems, function(n) {
                    if (n.artwork.status == "sold") {
                        $scope.checkCheckout = false;
                    }
                    if (n.artwork.gprice != 'N/A')
                        $scope.totalCartPrice += n.artwork.gprice;
                });
                $scope.vat = ($scope.totalCartPrice / 100) * 12.5;
            }
            $ionicLoading.hide();
        });
    }

    $scope.getCartItems();

    $scope.toCheckout = function() {
        $scope.checkCheckout = true;
        _.each($scope.cartItems, function(n) {
            if (n.artwork.status == "sold") {
                $scope.checkCheckout = false;
            }
        });
        if ($scope.checkCheckout == false) {
            dataNextPre.messageBox("Item in cart already sold, Recheck cart");
        } else {
            $state.go("app.checkout");
        }
    }

    $scope.removeFromCart = function(artid) {
        MyServices.removeFromCart(artid, function(data) {
            console.log(data);
            if (data.value == true) {
                dataNextPre.messageBox("Removed from cart");
                dataNextPre.getCartItems();
                $scope.getCartItems();
            }
        })
    }
})

.controller('WishlistCtrl', function($scope, $stateParams) {
    $scope.wishlist_item = [{
        id: '1527',
        name: 'Ajay R Dhandre',
        typename: 'Web In a Cage',
        price: 'Rs 140,000',
        img: 'img/artist/artist3.jpg'
    }, {
        id: '1530',
        name: 'Bhushen Koul',
        typename: 'One Step 8000 Replies',
        price: 'Rs 180,000',
        img: 'img/artist/artist1.jpg'
    }];

})

.controller('AccountCtrl', function($scope, $stateParams) {})

.controller('ChngPasswordCtrl', function($scope, $stateParams) {})

.controller('PersonalAccntCtrl', function($scope, $stateParams, MyServices) {

    MyServices.getuserprofile(function(data) {
        if (data.id) {
            $scope.user = data;
        }
    })

    $scope.edituser = function() {
        $scope.user._id = $scope.user.id;
        MyServices.registeruser($scope.user, function(data) {
            console.log(data);
            if (data.value != false) {
                dataNextPre.messageBox("Updated successfully");
            }
        });
    }

})

.controller('TraceOrderCtrl', function($scope, $stateParams) {})

.controller('MyOrderCtrl', function($scope, $stateParams, MyServices, $ionicLoading) {

    globalFunction.showLoading();
    MyServices.getMyOrders(function(data) {
        $ionicLoading.hide();
        console.log(data);
        $scope.myorderedproducts = data;
    });

})

.controller('SearchCtrl', function($scope, $stateParams, $timeout, MyServices, $ionicLoading, $state) {

    $scope.art = {};
    $scope.showDropDown = false;
    var countcall = 0;
    $scope.searchForSomething = true;

    $scope.onSearchChange = function(search) {
        if (search != undefined && search != '') {
            $timeout(function() {
                MyServices.getSearchDrop(search, ++countcall, function(data, n) {
                    if (n == countcall) {
                        if (data.value == false) {
                            $scope.showDropDown = false;
                        } else {
                            $scope.showDropDown = true;
                            $scope.searchData = data;
                        }
                    } else {
                        $scope.showDropDown = false;
                    }
                })
            }, 1000);
        } else {
            $scope.searchData = '';
        }
    }

    $scope.selectSearch = function(name) {
        console.log(name);
        $scope.showDropDown = false;
        $scope.art.search = name.name;
        $scope.art.type = name.type;
        $scope.art.pagenumber = 1;
        $scope.art.pagesize = 5;
        $scope.searchedArtwork = [];
        $scope.getSearchedArt();
    }

    $scope.searchedArtwork = [];
    $scope.getSearchedArt = function() {
        $scope.showDropDown = false;
        console.log($scope.art);
        if ($scope.art.search != '') {
            $scope.searchForSomething = false;
            globalFunction.showLoading();
            MyServices.getArtworkbySearch($scope.art, function(data) {
                if (data.data && data.data.length > 0) {
                    $scope.searchResults = _.chunk(data.data, 2);
                    console.log($scope.searchResults);
                } else {

                }
                $ionicLoading.hide();
            })
        }
    }

    $scope.clearSearch = function() {
        $scope.art = {};
        $scope.showDropDown = false;
        $scope.searchResults = [];
        $scope.searchForSomething = true;
    }

    $scope.goToDetail = function(artwork) {
        console.log(artwork);
        if (artwork.type == "Sculptures") {
            $state.go('app.art-details', {
                artid: artwork._id
            });
        } else {
            $state.go('app.art-details', {
                artid: artwork._id
            });
        }
    }

})

.controller('AddressCtrl', function($scope, $stateParams, $ionicModal, MyServices) {

    MyServices.getuserprofile(function(data) {
        if (data.id) {
            $scope.user = data;
        }
    });

    $scope.edituser = function() {
        $scope.user._id = $scope.user.id;
        MyServices.registeruser($scope.user, function(data) {
            console.log(data);
            if (data.value != false) {
                $scope.closeBilling();
                $scope.closeShipping();
                dataNextPre.messageBox("Updated successfully");
            }
        });
    }

    MyServices.getCountryJson(function(data) {
        $scope.allcountries = data;
    });

    $scope.showBilling = function() {
        $scope.modal.show();
    };
    $ionicModal.fromTemplateUrl('templates/edit-billing.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeBilling = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.showShipping = function() {
        $scope.modal1.show();
    };
    $ionicModal.fromTemplateUrl('templates/edit-shipping.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal1 = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeShipping = function() {
        $scope.modal1.hide();
    };

})

.controller('CheckoutCtrl', function($scope, $stateParams, $location, $ionicLoading, MyServices, $timeout, $ionicModal, $cordovaInAppBrowser, $rootScope, $state, $filter) {

    $scope.checkout = [];
    $scope.checkout.isshipping = true;
    $scope.payment = {};
    $scope.payment.billing = {};
    $scope.payment.shipping = {};
    $scope.showMobErr = false;
    $scope.showPinErr = false;
    $scope.checkoutRadio = 'guest';
    $scope.showInvalidLogin = false;
    $scope.passwordNotMatch = false;
    $scope.showAlreadyRegistered = false;
    $scope.login = {};
    $scope.register = {};
    $scope.user = {};
    $scope.user.shipping = {};
    $scope.user.shipping.name = "";
    $scope.user.shipping.country = "";
    $scope.user.billing = {};
    $scope.user.billing.country = "";
    $scope.checked = false;
    $scope.showShipping = false;
    $scope.showShippingContinue = false;
    $scope.showCartEnable = false;
    $scope.showLoginDiv = true;
    $.jStorage.set("artistScroll", null);
    $.jStorage.set("artworkScroll", null);
    MyServices.getCountryJson(function(data) {
        $scope.countries = data;
        // $scope.countries.unshift({
        //     "name": "Select Country",
        //     "code": ""
        // });
    });

    // Open the login modal
    $scope.openLogin = function() {
        $scope.modal1.show();
    };
    $ionicModal.fromTemplateUrl('templates/modal-login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal1 = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal1.hide();
    };
    // Open the login modal

    // Open the register modal
    $scope.openRegister = function() {
        $scope.modal2.show();
    };
    $ionicModal.fromTemplateUrl('templates/modal-register.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal2 = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeRegister = function() {
        $scope.modal2.hide();
    };
    // Open the register modal

    $scope.showCart = function() {
        $scope.showCartEnable = true;
    }

    MyServices.getuserprofile(function(data) {
        console.log(data);

        if (data.id) {
            $scope.user = data;
            if (!$scope.user.billing) {
                $scope.user.billing = {};
                $scope.user.billing.country = "";
            }
            if (!$scope.user.shipping) {
                $scope.user.shipping = {};
                $scope.user.shipping.country = "";
            }
            if (data.billing) {
                $scope.user.billing.name = data.name;
                $scope.user.billing.email = data.email;
                $scope.user.billing.regadd = data.billing.locality;
                $scope.user.billing.mobileno = data.mob;
                $scope.user.billing.countrycode = data.cc;
            }
            if (data.shipping) {
                $scope.user.shipping.name = data.name;
                $scope.user.shipping.email = data.email;
                $scope.user.shipping.regadd = data.shipping.locality;
                $scope.user.shipping.mobileno = data.mob;
                $scope.user.shipping.countrycode = data.cc;
            }
            $scope.showShipping = true;
            $scope.showShippingContinue = true;
            $scope.showLoginDiv = false;
            $scope.payment.billing = data;
        }
    })

    $scope.continueGuest = function() {
        if ($scope.checkoutRadio == 'guest') {
            $scope.showShipping = true;
            $scope.showShippingContinue = true;
        } else {
            $scope.showShipping = false;
            $scope.showShippingContinue = false;
        }
    }
    $scope.loginRegClick = function(val) {
        if (val == 1)
            $scope.openLogin();
        else if (val == 2)
            $scope.openRegister();
        $scope.showShipping = false;
        $scope.showShippingContinue = false;
    }

    $scope.registeruser = function() {
        if ($scope.register.password === $scope.register.confirmpassword) {
            $scope.passwordNotMatch = false;
            $scope.register.accesslevel = "customer";
            MyServices.registeruser($scope.register, function(data, status) {
                console.log(data);
                if (data.value != false) {
                    window.location.reload();
                } else if (data.value == false && data.comment == "User already exists") {
                    $scope.showAlreadyRegistered = true;
                }
            })
        } else {
            $scope.passwordNotMatch = true;
        }
    };

    $scope.userlogin = function() {
        MyServices.userlogin($scope.login, function(data, status) {
            if (data.value != false) {
                $scope.showInvalidLogin = false;
                MyServices.getuserprofile(function(data) {
                    console.log("login successfully");
                    window.location.reload();
                })
            } else {
                $scope.showInvalidLogin = true;
            }
        })
    };

    $scope.totalCartPrice = 0;
    $scope.sameAsBilling = false;

    $scope.changeAddress = function(check) {
        if (check == true) {
            $scope.user.shipping = _.cloneDeep($scope.user.billing);
            $scope.sameAsBilling = true;
        } else {
            $scope.user.shipping = {};
            $scope.sameAsBilling = false;
        }

    }

    globalFunction.showLoading();

    $scope.getCartItems = function() {
        MyServices.getCartItems(function(data) {
            console.log(data);
            $scope.cartItems = data;
            $scope.totalCartPrice = 0;
            _.each($scope.cartItems, function(n) {
                n.artwork.formname = n.artwork.srno;
                if (n.artwork.gprice != 'N/A')
                    $scope.totalCartPrice += n.artwork.gprice;
            });
            $scope.vat = ($scope.totalCartPrice / 100) * 12.5;
            $ionicLoading.hide();
        });
    }

    $scope.getCartItems();

    $scope.removeFromCart = function(artid) {
        MyServices.removeFromCart(artid, function(data) {
            console.log(data);
            if (data.value == true) {
                dataNextPre.messageBox("Removed from cart");
                dataNextPre.getCartItems();
                $scope.getCartItems();
            }
        })
    }
    $scope.shippingCost = 0;
    $scope.calculateShipping = function(artwork) {
        var city = $scope.user.shipping.city;
        console.log(city.trim());
        if (artwork.form == "framed" && $filter('lowercase')($scope.user.shipping.city) != "mumbai") {
            var height = (artwork.height + 6) * 2.54;
            var width = (artwork.width + 6) * 2.54;
            if (artwork.breadth != "N/A") {
                var breadth = (artwork.breadth + 6) * 2.54;
            } else {
                var breadth = (0 + 6) * 2.54;
            }
            var formula = (height * width * breadth) / 2700;
            formula = formula * 40;
            artwork.shippingCost = Math.round(formula);
        }
        console.log($scope.cartItems);
        $scope.shippingCost = 0;
        _.each($scope.cartItems, function(n) {
            if (n.artwork.shippingCost) {
                $scope.shippingCost = $scope.shippingCost + n.artwork.shippingCost;
            }
        });
        $scope.shippingCost = Math.round($scope.shippingCost);
    }

    var boptions = {
        location: 'no',
        clearcache: 'no',
        toolbar: 'no'
    };

    $scope.paymentFunc = function() {
        var num = 0;
        var count = 0;
        _.each($scope.cartItems, function(n) {
            if (n.artwork.type != "Sculptures") {
                count++;
                if (n.artwork.form) {
                    num++;
                }
            }
        });
        if (num == count) {
            $scope.user.cart = [];
            $scope.user.cart = $scope.cartItems;
            $scope.user.subTotal = $scope.totalCartPrice;
            $scope.user.vat = $scope.vat;
            $scope.user.grantTotal = $scope.totalCartPrice + $scope.vat + $scope.shippingCost;
            $scope.user.discount = 0;
            delete $scope.user.id;
            MyServices.checkout($scope.user, function(data) {
                // console.log("incheck");
                if (data.value != false) {
                    $scope.user.orderid1 = data.id;
                    $scope.user.orderid2 = data.orderid;
                    $cordovaInAppBrowser.open("http://aura--art.appspot.com/paymentGet.php?key=3gqoHz&txnid=" + $scope.user.orderid1 + "&amount=" + $scope.user.grantTotal + "&firstname=" + $scope.user.billing.name + "&email=" + $scope.user.billing.email + "&phone=" + $scope.user.billing.mobileno + "&productinfo=Purchase of artwork&surl=http://www.auraart.in/order/payU&furl=http://www.auraart.in/order/payU&udf1=" + $scope.user.orderid2 + "&service_provider=", '_blank', boptions).then(function(event) {}).catch(function(event) {});

                    // http://www.auraart.in/#/sorry/
                }
            });
        } else {
            // alert("Fill all manditory * Fields");
            dataNextPre.messageBox("Please select in what Form (Rolled or Framed) you want to receive the artwork");
        }
    }

    $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event) {
        console.log(event);
        console.log(event.url);
        if (event.url.indexOf("http://www.auraart.in/#/sorry/") != -1) {
            $cordovaInAppBrowser.close();
            dataNextPre.messageBox("Sorry! Your order is not placed");
            $timeout(function() {
                $state.go('app.home');
            }, 5000);
        } else if (event.url.indexOf("http://www.auraart.in/#/thankyou/") != -1) {
            $cordovaInAppBrowser.close();
            dataNextPre.messageBox("Thank you! Your order is placed");
            $timeout(function() {
                $state.go('app.home');
            }, 5000);
        }
    });

    $scope.toPayment = function(checked) {
        if (checked == true) {
            $scope.user.shipping = _.cloneDeep($scope.user.billing);
            $scope.paymentFunc();
        } else {
            $scope.paymentFunc();
        }
    }

    //after implementing paymentgateway topayment and viewcart will replace
    $scope.onFieldChange = function(checked) {
        $scope.showShippingContinue = true;
        $scope.showCartEnable = false;
        _.each($scope.cartItems, function(n) {
            n.artwork.form = "";
        });
        $scope.shippingCost = 0;
    }
    $scope.viewCart = function(checked) {

        if (checked == true) {
            $scope.user.shipping = _.cloneDeep($scope.user.billing);
        }
        try {
            $scope.allvalidation = [{
                field: $scope.user.billing.name,
                validation: ""
            }, {
                field: $scope.user.billing.email,
                validation: ""
            }, {
                field: $scope.user.billing.mobileno,
                validation: ""
            }, {
                field: $scope.user.billing.flatno,
                validation: ""
            }, {
                field: $scope.user.billing.bldgname,
                validation: ""
            }, {
                field: $scope.user.billing.regadd,
                validation: ""
            }, {
                field: $scope.user.billing.city,
                validation: ""
            }, {
                field: $scope.user.billing.pincode,
                validation: ""
            }, {
                field: $scope.user.billing.state,
                validation: ""
            }, {
                field: $scope.user.billing.country,
                validation: ""
            }, {
                field: $scope.user.shipping.name,
                validation: ""
            }, {
                field: $scope.user.shipping.email,
                validation: ""
            }, {
                field: $scope.user.shipping.mobileno,
                validation: ""
            }, {
                field: $scope.user.shipping.flatno,
                validation: ""
            }, {
                field: $scope.user.shipping.bldgname,
                validation: ""
            }, {
                field: $scope.user.shipping.regadd,
                validation: ""
            }, {
                field: $scope.user.shipping.city,
                validation: ""
            }, {
                field: $scope.user.shipping.pincode,
                validation: ""
            }, {
                field: $scope.user.shipping.state,
                validation: ""
            }, {
                field: $scope.user.shipping.country,
                validation: ""
            }];
            var check = formvalidation($scope.allvalidation);
            if (check) {
                $scope.showCart();
                $scope.showShippingContinue = false;
                $(window).scrollTop($(window).height());
            } else {
                dataNextPre.messageBox("Fill all manditory * Fields");
            }
        } catch (e) {
            dataNextPre.messageBox("Fill all manditory * Fields");
        }
    }

    $scope.checkout = function() {
        $scope.user.cart = $scope.cartItems;
        MyServices.checkout($scope.user, function(data) {
            console.log(data);
        });
    }

    var soptions = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'no'
    };

    var profileInterval = "";
    $scope.socialLogin = function(val) {
        $cordovaInAppBrowser.open(adminurl + "user/" + val, '_blank', soptions).then(function(event) {
            // success
        }).catch(function(event) {
            // error
        });
        profileInterval = setInterval(function() {
            MyServices.getuserprofile(function(data) {
                if (data.id) {
                    clearInterval(profileInterval);
                    if ($cordovaInAppBrowser)
                        $cordovaInAppBrowser.close();
                    $scope.showInvalidLogin = false;
                    window.location.reload();
                }
            });
        }, 1000);
    }

    $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event) {
        console.log(e);
        console.log(event);
        clearInterval(profileInterval);
    });

});
