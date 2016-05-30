var dataNextPre = {};
var userProfile = {};
var uploadres = [];
var dollarPrice = '';
var globalFunction = {};
var abc = "";

angular.module('starter.controllers', ['starter.services', 'ui.select'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, MyServices, $ionicLoading, $ionicPopup, $cordovaInAppBrowser) {

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

    MyServices.getDollarPrice(function(data) {
        if (data.value != false) {
            dollarPrice = data[0].price;
            console.log("Dollar = " + data[0].price);
        }
    })

    MyServices.getuserprofile(function(data) {
        if (data.id) {
            $scope.isLoggedIn = true;
            userProfile = data;
            MyServices.getMyFavourites(data.id, function(favorite) {
                userProfile.wishlist = favorite;
            })
        } else {
            $scope.isLoggedIn = false;
        }
    })

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
            template: '<h5 class="text-center">' + msg + '</h5>'
        });

        $timeout(function() {
            xyz.close();
        }, 5000);
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

    $scope.nowAddToFav = function(obj) {
        console.log(obj);
        ngDialog.closeAll();
        globalFunction.showLoading();
        MyServices.addToFav(obj, function(data) {
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
                        $scope.favObj = {};
                        $scope.favObj.artwork = art.artwork._id;
                        ngDialog.open({
                            scope: $scope,
                            template: 'views/content/modal-choose.html'
                        });
                        art.heartClass = "ion-ios-heart";
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
            ngDialog.open({
                scope: $scope,
                template: 'views/content/favLogin.html'
            });
        }
    }

    dataNextPre.getCartItems = function() {
        MyServices.getCartItems(function(data) {
            // console.log(data);
            $scope.cartItems = data;
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

})

.controller('AccessCtrl', function($scope, $ionicModal, $timeout) {})

.controller('LoginCtrl', function($scope, $stateParams) {})

.controller('HomeCtrl', function($scope, $stateParams, MyServices, $timeout) {
    abc = $scope;

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

    $scope.setSearch = function(select) {
        console.log(select);
        // $scope.filterby.search = select.selected.name;
    };
    $scope.setMediumSearch = function(select) {
        $scope.filterby.medium = select.selected.name;
    };
    $scope.setColorSearch = function(select) {
        $scope.filterby.color = select.selected.name;
    };
    $scope.setStyleSearch = function(select) {
        $scope.filterby.style = select.selected.name;
    };
    $scope.setElementSearch = function(select) {
        $scope.filterby.element = select.selected.name;
    };
    $scope.allartist = [];
    $scope.allmedium = [];
    $scope.getmedium = function() {
        if ($scope.filterby.type === "") {
            //          console.log("in if");
            $scope.change = "";
            MyServices.getallmedium($scope.change, function(data, status) {
                if (data && data.value !== false) {
                    $scope.allmedium = _.uniq(data, '_id');
                } else {
                    $scope.allmedium = [];
                }
            });
        } else {
            //          console.log("in else");
            $scope.change = {};
            $scope.change.type = $scope.filterby.type;
            MyServices.getallmedium($scope.change, function(data, status) {
                if (data && data.value !== false) {
                    $scope.allmedium = _.uniq(data, '_id');
                } else {
                    $scope.allmedium = [];
                }
            });
        }
    };

    $scope.getClr = function() {
        if ($scope.filterby.type == "") {
            //          console.log("in if");
            $scope.change = "";
            MyServices.tagSearchType($scope.change, "", function(data, status) {
                if (data && data.value != false) {
                    $scope.allColor = _.uniq(data, '_id');
                    $scope.allColor.unshift({
                        "_id": "0",
                        name: ""
                    });
                } else {
                    $scope.allColor = [];
                }
            });
        } else {
            //          console.log("in else");
            $scope.change = {};
            $scope.change.type = $scope.filterby.type;
            MyServices.tagSearchType($scope.change, "", function(data, status) {
                if (data && data.value !== false) {
                    $scope.allColor = _.uniq(data, '_id');
                    $scope.allColor.unshift({
                        "_id": "0",
                        name: ""
                    });
                } else {
                    $scope.allColor = [];
                }
            });
        }
    };
    $scope.getStl = function() {
        if ($scope.filterby.type === "") {
            //          console.log("in if");
            $scope.change = "";
            MyServices.tagSearchType($scope.change, "", function(data, status) {
                if (data && data.value !== false) {
                    $scope.allStyle = _.uniq(data, '_id');
                    $scope.allStyle.unshift({
                        "_id": "0",
                        name: ""
                    });
                } else {
                    $scope.allStyle = [];
                }
            });
        } else {
            //          console.log("in else");
            $scope.change = {};
            $scope.change.type = $scope.filterby.type;
            MyServices.tagSearchType($scope.change, "", function(data, status) {
                if (data && data.value !== false) {
                    $scope.allStyle = _.uniq(data, '_id');
                    $scope.allStyle.unshift({
                        "_id": "0",
                        name: ""
                    });
                } else {
                    $scope.allStyle = [];
                }
            });
        }
    };
    $scope.getElm = function() {
        if ($scope.filterby.type === "") {
            //          console.log("in if");
            $scope.change = "";
            MyServices.tagSearchType($scope.change, "", function(data, status) {
                if (data && data.value !== false) {
                    $scope.allElement = _.uniq(data, '_id');
                    $scope.allElement.unshift({
                        "_id": "0",
                        name: ""
                    });
                } else {
                    $scope.allElement = [];
                }
            });
        } else {
            //          console.log("in else");
            $scope.change = {};
            $scope.change.type = $scope.filterby.type;
            MyServices.tagSearchType($scope.change, "", function(data, status) {
                if (data && data.value !== false) {
                    $scope.allElement = _.uniq(data, '_id');
                    $scope.allElement.unshift({
                        "_id": "0",
                        name: ""
                    });
                } else {
                    $scope.allElement = [];
                }
            });
        }
    };
    var countcall = 0;
    $scope.getallartist = function() {
        if ($scope.filterby.type === "") {
            MyServices.getAllArtistByAccess(++countcall, function(data, status, n) {
                if (n == countcall) {
                    if (data && data.value !== false) {
                        $scope.allartist = _.uniq(data, '_id');
                        $scope.allartist.unshift({
                            "_id": "0",
                            name: ""
                        });
                    } else {
                        $scope.allartist = [];
                    }
                } else {
                    $scope.allartist = [];
                }
            });
        } else {
            MyServices.userbytype($scope.filterby.type, ++countcall, function(data, status, n) {
                if (n == countcall) {
                    if (data && data.value !== false) {
                        $scope.allartist = data;
                        $scope.allartist.unshift({
                            "_id": "0",
                            name: ""
                        });
                    } else {
                        $scope.allartist = [];
                    }
                } else {
                    $scope.allartist = [];
                }

            });
        }
    };
    $scope.getDropdown = function(search) {
        if (search.length >= 1) {
            $scope.change = {};
            $scope.change.type = $scope.filterby.type;
            $scope.change.search = search;
            $timeout(function() {
                MyServices.getAllArtistDrop($scope.change, function(data) {
                    console.log(data);
                    if (data && data.value != false) {
                        $scope.allartist = data;
                        $scope.allartist.unshift({
                            "_id": "0",
                            name: ""
                        });
                    } else {
                        $scope.allartist = [];
                    }
                });
            }, 1000);
        }
    }
    $scope.getDropdownMedium = function(search) {
        if (search.length >= 1) {
            $scope.change = {};
            $scope.change.type = $scope.filterby.type;
            $scope.change.search = search;
            $timeout(function() {
                MyServices.getallmedium($scope.change, function(data) {
                    if (data && data.value != false) {
                        $scope.allmedium = data;
                        $scope.allmedium.unshift({
                            "_id": "0",
                            name: ""
                        });
                    } else {
                        $scope.allmedium = [];
                    }
                });
            }, 1000);
        }
    }

    //search by keyword

    $scope.getColorDropdown = function(search) {
        if (search.length >= 1) {
            $timeout(function() {
                MyServices.tagSearchType($scope.filterby.type, search, function(data) {
                    if (data && data.value != false) {
                        $scope.allColor = data;
                    } else {
                        $scope.allColor = [];
                    }
                });
            }, 1000);
        }
    }
    $scope.getStyleDropdown = function(search) {
        if (search.length >= 1) {
            $timeout(function() {
                MyServices.tagSearchType($scope.filterby.type, search, function(data) {
                    if (data && data.value != false) {
                        $scope.allStyle = data;
                    } else {
                        $scope.allStyle = [];
                    }
                });
            }, 1000);
        }
    }
    $scope.getElementDropdown = function(search) {
        if (search.length >= 1) {
            $timeout(function() {
                MyServices.tagSearchType($scope.filterby.type, search, function(data) {
                    if (data && data.value != false) {
                        $scope.allElement = data;
                    } else {
                        $scope.allElement = [];
                    }
                });
            }, 1000);
        }
    }
})

.controller('SavedViewsCtrl', function($scope, $stateParams) {
    $scope.savedviews = [{
        image: 'img/resizeRoom.jpg',
    }, {
        image: 'img/resizeRoom.jpg',
    }];

    $scope.savedviews = _.chunk($scope.savedviews, 2);
})

.controller('FavouritesCtrl', function($scope, $stateParams, $ionicLoading, $state, MyServices) {
    $scope.artistdetail = [{
        image: 'img/artist/artist1.jpg',
        id: '1527',
        typename: 'Untitled',
        madein: 'Oil on board',
        size: '19.5 x 23',
        year: '1978',
        price: 'Rs 1,00,000/ $ 6,400'
    }, {
        image: 'img/artist/artist2.jpg',
        id: '1530',
        typename: 'Web In a Cage',
        madein: 'Sheesham wood, SS and gold foil',
        size: '9 X 13 X 48',
        year: '2006',
        price: 'Rs 140,000/ $6,800'
    }, {
        image: 'img/artist/artist3.jpg',
        id: '1531',
        typename: 'One Step = 8000 Replies',
        madein: 'SS, aluminum, canvas & sensor',
        size: '6 X 78 X 24',
        year: '2008',
        price: 'Rs 180,000/ $7,400'
    }, {
        image: 'img/artist/artist4.jpg',
        id: '1532',
        typename: 'Needles needle',
        madein: 'Mild steel, copper wire & canvas',
        size: '4 X 65 X 29',
        year: '2008',
        price: 'Price available on request'
    }, {
        image: 'img/artist/artist5.jpg',
        id: '1533',
        typename: 'African drums',
        madein: 'Sheesham woodl on board',
        size: '8 X 56 X 11',
        year: '2005',
        price: 'Rs 180,000/ $7,400'
    }, {
        image: 'img/artist/artist2.jpg',
        id: '1524',
        typename: 'Forget Me Not',
        madein: 'Cushions and Seeds',
        size: '34 X 16 X 5',
        year: '2013',
        price: 'Rs 40,000/ $3,400'
    }, {
        image: 'img/artist/artist5.jpg',
        id: '1535',
        typename: 'Drawing of a Fan',
        madein: 'Stainless Steel and White Paint',
        size: '50 X 15 X 12',
        year: '2013',
        price: 'Rs 1,40,000/ $7,400'
    }, {
        image: 'img/artist/artist4.jpg',
        id: '1536',
        typename: 'Untitled',
        madein: 'Oil on board',
        size: '19.5 x 23',
        year: '1978',
        price: 'Price available on request'
    }];
    $scope.artistdetail = _.chunk($scope.artistdetail, 2);
})

.controller('ArtDetailCtrl', function($scope, $stateParams, $ionicModal, $ionicLoading, $state, MyServices, $filter) {

    $scope.aristImages = [];
    $scope.allartworks = [];

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

    $scope.openReachout = function() {
        globalFunction.reachOut();
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

    $scope.artdetail = [{
        image: 'img/artist/artist1.jpg',
    }, {
        image: 'img/artist/artist2.jpg',
    }, {
        image: 'img/artist/artist3.jpg',
    }]

    $scope.artistsimilar = [{
        image: 'img/artist/artist1.jpg',
    }, {
        image: 'img/artist/artist2.jpg',
    }, {
        image: 'img/artist/artist3.jpg',
    }, {
        image: 'img/artist/artist4.jpg',
    }]

    $scope.artdetailcont = [{
        id: '1',
        name: 'Ajay R Dhandre',
        title: 'Untitled',
        medium: 'Water Colour & Ink on Paper',
        size: '30 X 20 inches',
        year: '2005',
        price: 'Rs 30,000 / $ 60.00'

    }]
    $ionicModal.fromTemplateUrl('templates/modal-image.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
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


.controller('SigninCtrl', function($scope, $stateParams) {})

.controller('ForgotCtrl', function($scope, $stateParams) {})

.controller('ArtworkCtrl', function($scope, $stateParams, $ionicModal, MyServices, $timeout, $ionicLoading, $state) {

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

    $scope.openReachout = function() {
        globalFunction.reachOut();
    }

    //get user details
    $scope.setColorSearch = function(select) {
        $scope.pagedata.color = select.selected.name;
    }
    $scope.setStyleSearch = function(select) {
        $scope.pagedata.style = select.selected.name;
    }
    $scope.setElementSearch = function(select) {
        $scope.pagedata.element = select.selected.name;
    }

    $scope.getClr = function() {
        if ($scope.pagedata.type == "") {
            $scope.change = "";
            MyServices.tagSearchType($scope.change, "", function(data, status) {
                if (data && data.value != false) {
                    $scope.allColor = _.uniq(data, '_id');
                    $scope.allColor.unshift({
                        "_id": "0",
                        name: ""
                    });
                } else {
                    $scope.allColor = [];
                }
            });
        } else {
            //          console.log("in else");
            $scope.change = {};
            $scope.change.type = $scope.pagedata.type;
            MyServices.tagSearchType($scope.change, "", function(data, status) {
                if (data && data.value != false) {
                    $scope.allColor = _.uniq(data, '_id');
                    $scope.allColor.unshift({
                        "_id": "0",
                        name: ""
                    });
                } else {
                    $scope.allColor = [];
                }
            });
        }
    }
    $scope.getStl = function() {
        if ($scope.pagedata.type == "") {
            //          console.log("in if");
            $scope.change = "";
            MyServices.tagSearchType($scope.change, "", function(data, status) {
                if (data && data.value != false) {
                    $scope.allStyle = _.uniq(data, '_id');
                    $scope.allStyle.unshift({
                        "_id": "0",
                        name: ""
                    });
                } else {
                    $scope.allStyle = [];
                }
            });
        } else {
            //          console.log("in else");
            $scope.change = {};
            $scope.change.type = $scope.pagedata.type;
            MyServices.tagSearchType($scope.change, "", function(data, status) {
                if (data && data.value != false) {
                    $scope.allStyle = _.uniq(data, '_id');
                    $scope.allStyle.unshift({
                        "_id": "0",
                        name: ""
                    });
                } else {
                    $scope.allStyle = [];
                }
            });
        }
    }
    $scope.getElm = function() {
        if ($scope.pagedata.type == "") {
            //          console.log("in if");
            $scope.change = "";
            MyServices.tagSearchType($scope.change, "", function(data, status) {
                if (data && data.value != false) {
                    $scope.allElement = _.uniq(data, '_id');
                    $scope.allElement.unshift({
                        "_id": "0",
                        name: ""
                    });
                } else {
                    $scope.allElement = [];
                }
            });
        } else {
            //          console.log("in else");
            $scope.change = {};
            $scope.change.type = $scope.pagedata.type;
            MyServices.tagSearchType($scope.change, "", function(data, status) {
                if (data && data.value != false) {
                    $scope.allElement = _.uniq(data, '_id');
                    $scope.allElement.unshift({
                        "_id": "0",
                        name: ""
                    });
                } else {
                    $scope.allElement = [];
                }
            });
        }
    }
    // $scope.getClr();
    // $scope.getElm();
    // $scope.getStl();

    $scope.getColorDropdown = function(search) {
        if (search.length >= 1) {
            $timeout(function() {
                MyServices.tagSearchType($scope.pagedata.type, search, function(data) {
                    if (data && data.value != false) {
                        $scope.allColor = data;
                    } else {
                        $scope.allColor = [];
                    }
                });
            }, 1000);
        }
        // else {
        //     $scope.getClr();
        // }
    }
    $scope.getStyleDropdown = function(search) {
        if (search.length >= 1) {
            $timeout(function() {
                MyServices.tagSearchType($scope.pagedata.type, search, function(data) {
                    if (data && data.value != false) {
                        $scope.allStyle = data;
                    } else {
                        $scope.allStyle = [];
                    }
                });
            }, 1000);
        }
        // else {
        //     $scope.getStl();
        // }
    }
    $scope.getElementDropdown = function(search) {
        if (search.length >= 1) {
            $timeout(function() {
                MyServices.tagSearchType($scope.pagedata.type, search, function(data) {
                    if (data && data.value != false) {
                        $scope.allElement = data;
                    } else {
                        $scope.allElement = [];
                    }
                });
            }, 1000);
        }
        // else {
        //     $scope.getElm();
        // }
    }
    var countcall = 0;
    $scope.getallartist = function() {
        if ($scope.pagedata.type == "") {
            MyServices.getAllArtistByAccess(++countcall, function(data, status, n) {
                if (n == countcall) {
                    if (data && data.value != false) {
                        $scope.allartist = _.uniq(data, '_id');
                        $scope.allartist.unshift({
                            "_id": "0",
                            name: ""
                        });
                    } else {
                        $scope.allartist = [];
                    }
                } else {
                    $scope.allartist = [];
                }
            });
        } else {
            MyServices.userbytype($scope.pagedata.type, ++countcall, function(data, status, n) {
                if (n == countcall) {
                    if (data && data.value != false) {
                        $scope.allartist = data;
                        $scope.allartist.unshift({
                            "_id": "0",
                            name: ""
                        });
                    } else {
                        $scope.allartist = [];
                    }
                } else {
                    $scope.allartist = [];
                }
            });
        }
    }

    $scope.getmedium = function() {
        if ($scope.pagedata.type == "") {
            //          console.log("in if");
            $scope.change = "";
            MyServices.getallmedium($scope.change, function(data, status) {
                if (data && data.value != false) {
                    $scope.allmedium = _.uniq(data, '_id');
                } else {
                    $scope.allmedium = [];
                }
            });
        } else {
            //          console.log("in else");
            $scope.change = {};
            $scope.change.type = $scope.pagedata.type;
            MyServices.getallmedium($scope.change, function(data, status) {
                if (data && data.value != false) {
                    $scope.allmedium = _.uniq(data, '_id');
                } else {
                    $scope.allmedium = [];
                }
            });
        }
    }
    // $scope.getallartist();
    $scope.getDropdown = function(search) {
        if (search.length >= 1) {
            $scope.change = {};
            $scope.change.type = $scope.pagedata.type;
            $scope.change.search = search;
            $timeout(function() {
                MyServices.getAllArtistDrop($scope.change, function(data) {
                    if (data && data.value != false) {
                        $scope.allartist = data;
                        $scope.allartist.unshift({
                            "_id": "0",
                            name: ""
                        });
                    } else {
                        $scope.allartist = [];
                    }
                });
            }, 1000);
        }
        // else {
        //     $scope.getallartist();
        // }
    }

    $scope.getDropdownMedium = function(search) {
        if (search.length >= 1) {
            $scope.change = {};
            $scope.change.type = $scope.pagedata.type;
            $scope.change.search = search;
            $timeout(function() {
                MyServices.getallmedium($scope.change, function(data) {
                    if (data && data.value != false) {
                        $scope.allmedium = data;
                        $scope.allmedium.unshift({
                            "_id": "0",
                            name: ""
                        });
                    } else {
                        $scope.allmedium = [];
                    }
                });
            }, 1000);
        }
        // else {
        //     $scope.getmedium();
        // }
    }

    $scope.setSearch = function(select) {
        $scope.pagedata.search = select.selected.name;
    }
    $scope.setMediumSearch = function(select) {
        $scope.pagedata.medium = select.selected.name;
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
            // console.log(data.data);
            lastpage = parseInt(data.totalpages);
            // $scope.totalartcont = _.union($scope.totalartcont, data.data);
            _.each(data.data, function(n) {
                n.artwork.pageno = data.page;
                $scope.totalartcont.push(n);
            });
            $scope.totalartcont = _.uniq($scope.totalartcont, 'artwork._id');
            $scope.totalArtworks = _.chunk($scope.totalartcont, 2);
            $scope.callinfinite = false;
            if ($.jStorage.get("artworkScroll")) {
                if (data.page == $.jStorage.get("artworkScroll").pageno) {
                    window.scrollTo(0, $.jStorage.get("artworkScroll").scroll);
                }
                // else {
                //     var variablepage = data.page;
                //     $scope.pagedata.pagenumber = ++variablepage;
                //     if ($scope.pagedata.pagenumber <= $.jStorage.get("artworkScroll").pageno) {
                //         $scope.reload();
                //     }
                // }
            }
            $ionicLoading.hide();
            $scope.$broadcast('scroll.infiniteScrollComplete');
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
        $scope.checkForEmpty();
        $scope.reload();
    }

    //    $scope.loadMore = function () {
    //        $scope.pagedata.pagenumber++;
    //        if ($scope.pagedata.pagenumber <= $scope.totalpagecount) {
    //            $scope.reload();
    //        }
    //    };

    $scope.filterresults = function(search) {
        globalFunction.showLoading();
        //      console.log(search);
        $scope.pagedata.search = _.capitalize(search);
        $scope.totalartcont = [];
        $scope.pagedata.pagenumber = 1;
        $scope.pagedata.filter = "srno";
        $scope.pagedata.sort = 1;
        $scope.checkForEmpty();
        $scope.reload();
    }

    // $(window).scroll(function() {
    //     if ($(window).scrollTop() + $(window).height() == $(document).height()) {
    //         console.log("at bottom");
    //         $scope.pagedata.pagenumber++;
    //         $scope.reload();
    //     }
    // });

    $scope.addMoreItems = function() {
        if (lastpage > $scope.pagedata.pagenumber) {
            $scope.pagedata.pagenumber++;
            $scope.reload();
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

        $scope.makeactive('All');
    }

    $scope.goToDetailPage = function(artwork) {
        if (artwork.type == "Sculptures") {
            $state.go('sculpture', {
                artid: artwork._id
            });
        } else {
            $state.go('app.art-details', {
                artid: artwork._id
            });
        }
    }

    $scope.artistdetail = [{
        image: 'img/artist/artist1.jpg',
        id: '1528',
        name: 'Ajay R Dhandre',
        size: '19.5 x 23',
        price: 'Rs 30,000 / $ 60.00'
    }, {
        image: 'img/artist/artist2.jpg',
        id: '1527',
        name: 'Amarnath Sharma',
        size: '30 x 20',
        price: 'Rs 30,000 / $ 60.00'
    }, {
        image: 'img/artist/artist3.jpg',
        name: 'Ajay Sharma',
        id: '1530',
        size: '21.5 x 26',
        price: 'Rs 30,000 / $ 60.00'
    }, {
        image: 'img/artist/artist4.jpg',
        id: '1530',
        name: 'Bhushen Koul',
        madein: 'Oil on board',
        size: '20.5 x 23 x N/A',
        price: 'Rs 30,000 / $ 60.00'
    }];
    $scope.artistdetail = _.chunk($scope.artistdetail, 2);

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
        $scope.modal.hide();
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

.controller('ArtistCtrl', function($scope, $stateParams, $ionicModal, MyServices, $state, $ionicLoading) {
    $scope.tab = 'grid';
    // $scope.aristname = [{
    //     name: 'S Yousuf Ali',
    //     image: 'img/artist/artist1.jpg'
    //
    // }, {
    //     name: 'Ajay De',
    //     image: 'img/artist/artist2.jpg',
    //
    // }, {
    //     name: 'Asit Poddar',
    //     image: 'img/artist/artist3.jpg',
    //
    // }, {
    //     name: 'BR Bodade',
    //     image: 'img/artist/artist4.jpg',
    //
    // }, {
    //     name: 'Aradhna Tandon',
    //     image: 'img/artist/artist3.jpg',
    //
    // }, {
    //     name: 'Devki Modi',
    //     image: 'img/artist/artist4.jpg',
    //
    // }];
    //
    // $scope.aristname = _.chunk($scope.aristname, 2);

    $scope.showCategory = function() {
        $scope.modal.show();
    };
    $ionicModal.fromTemplateUrl('templates/category.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeCategory = function(type) {
        $scope.modal.hide();
        if (type) {
            $scope.pagedata.type = type;
            $scope.pagedata.searchname = '';
            $scope.artistimage = [];
            $scope.reload();
        }
    };

    $scope.pagedata = {};
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
        console.log("getHeight");
        var xy = getScrollXY();
        console.log(xy);
        $.jStorage.set("artistScroll", xy[1]);
        $state.go('app.artist-detail', {
            "artistid": artist._id
        });
    }

    $scope.reload = function() {
        globalFunction.showLoading();
        console.log("reload");

        if ($scope.pagedata.type == "All") {
            $scope.pagedata.type = "";
        }
        MyServices.getallartist($scope.pagedata, function(data, status) {
            $ionicLoading.hide();
            $scope.artistimage = _.chunk(data.data, 2);
            if ($.jStorage.get("artistScroll")) {
                console.log("in if");
                window.scrollTo(0, $.jStorage.get("artistScroll"));
                // window.pageYOffset = $.jStorage.get("artistScroll");
            }
        });
    }

    $scope.getartistbysearch = function() {
        $scope.pagedata.pagenumber = 1;
        $scope.artistimage = [];
        $scope.listview = [];
        $scope.reload();
    }

    $scope.makeactive = function(type) {
        _.each($scope.typejson, function(n) {
            var index = n.name.indexOf(type);
            if (index != -1) {
                n.class = "actives";
            } else {
                n.class = "";
            }
        })
        $scope.pagedata.type = type;
        $scope.pagedata.searchname = '';
        $scope.artistimage = [];
        $scope.reload();
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

.controller('ArtistDetailCtrl', function($scope, $stateParams, $ionicModal, MyServices, $ionicLoading, $state) {

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
            //          $location.url("/sculpture/" + artwork._id);
            $state.go('sculpture', {
                artid: artwork._id
            });
        } else {
            //          $location.url("/artwork/detail/" + artwork._id);
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

.controller('ContactCtrl', function($scope, $stateParams) {})

.controller('AboutCtrl', function($scope, $stateParams) {
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
})

.controller('PressCtrl', function($scope, $stateParams, $ionicModal) {
    $scope.media2015 = [{
        name: 'Interiors & Decor',
        date: ' Sep 30, 2014 ',
        img: 'img/mediacove/m1.jpg'
    }, {
        name: 'Design Matrix',
        date: 'Oct 30, 2014 ',
        img: 'img/mediacove/m2.jpg'
    }, {
        name: 'IFJ',
        date: 'Aug 31, 2014',
        img: 'img/mediacove/m3.jpg'
    }, {
        name: 'The Design Source',
        date: 'Sep 30, 2014',
        img: 'img/mediacove/m4.jpg'
    }, {
        name: 'Sourcing Hardware',
        date: 'Sep 30, 2014',
        img: 'img/mediacove/m5.jpg'
    }, {
        name: 'Society Interiors',
        date: 'Sep 30, 2014',
        img: 'img/mediacove/m6.jpg'
    }, {
        name: 'Architecture + Design',
        date: 'Aug 31, 2014',
        img: 'img/mediacove/m7.jpg'
    }, {
        name: 'Times of India - Full page - Page 13',
        date: 'Sep 30, 2014',
        img: 'img/mediacove/m7.jpg'
    }];

    $scope.media2014 = [{
        name: 'Interiors & Decor',
        date: ' Sep 30, 2014 ',
        img: 'img/mediacove/m1.jpg'
    }, {
        name: 'Design Matrix',
        date: 'Oct 30, 2014 ',
        img: 'img/mediacove/m2.jpg'
    }, {
        name: 'IFJ',
        date: 'Aug 31, 2014',
        img: 'img/mediacove/m3.jpg'
    }, {
        name: 'The Design Source',
        date: 'Sep 30, 2014',
        img: 'img/mediacove/m4.jpg'
    }, {
        name: 'Sourcing Hardware',
        date: 'Sep 30, 2014',
        img: 'img/mediacove/m5.jpg'
    }, {
        name: 'Society Interiors',
        date: 'Sep 30, 2014',
        img: 'img/mediacove/m6.jpg'
    }, {
        name: 'Architecture + Design',
        date: 'Aug 31, 2014',
        img: 'img/mediacove/m7.jpg'
    }, {
        name: 'Times of India - Full page - Page 13',
        date: 'Sep 30, 2014',
        img: 'img/mediacove/m7.jpg'
    }];
    $scope.media2014 = _.chunk($scope.media2014, 2);
    $scope.media2015 = _.chunk($scope.media2015, 2);

    $scope.showpressimage = function() {
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

.controller('EventCtrl', function($scope, $stateParams) {

    $scope.event2016 = [{
        name: 'AURA ART CONNECTS THE TWO WORLDS OF ART AND FASHION',
        detail: ' ITC Grand-Maratha, Sahar Road, Mumbai',
        img: 'img/event/event1.jpg'
    }, {
        name: 'Art and Culture exchange between India & China',
        detail: 'Mar 31, 2015 - Mar 31, 2015 ITC Grand-Maratha, Sahar Road, Mumbai',
        img: 'img/event/event2.jpg'
    }];

    $scope.event2015 = [{
        name: 'The Art Enclave at UBM Index Fairs 2014',
        detail: ' Oct 09, 2014 - Oct 12, 2014 MMRDA Exhibition Centre, BKC, Mumbai',
        img: 'img/event/event3.jpg'
    }, {
        name: 'Art Partner for The Edutainment Show 2014',
        detail: 'Apr 26, 2014 - Apr 27, 2014 JW Marriott Hotel Mumbai',
        img: 'img/event/event2.jpg'
    }, {
        name: 'Art Partner for Yes Bank International Polo Cup',
        detail: 'Mar 22, 2014 - Mar 22, 2014 Mahalaxmi Race Course, Mumbai',
        img: 'img/event/event5.jpg'
    }];

    $scope.event2014 = [{
        name: 'Art Infrastructure – nobody’s business',
        detail: 'Dec 14, 2013 - Dec 14, 2013 Taj Lands End',
        img: 'img/event/event4.JPG'
    }, {
        name: 'Aura Art Show 2013 - Oct 15-21, 2013, Jehangir Art Gallery, Mumbai',
        detail: 'Oct 15, 2013 - Oct 21, 2013 Jehangir Art Gallery, Auditorium Hall',
        img: 'img/event/event5.jpg'
    }, {
        name: 'The Indian Luxury Expo - April 26-28, 2013, Grand Hyatt, Mumbai',
        detail: 'Apr 26, 2013 - Apr 28, 2013 Grand Hyatt',
        img: 'img/event/event6.jpg'
    }, {
        name: 'Wassup! Andheri, 2013 - A grand Art & Entertainment Festival',
        detail: 'Feb 28, 2013 - Mar 03, 2013 Chitrakoot Ground, Andheri',
        img: 'img/event/event1.jpg'
    }, {
        name: 'Aura Art organised live painting demo at AGP Multi Million Race Day',
        detail: 'Feb 17, 2013 - Feb 17, 2013 Mahalaxmi Race Course',
        img: 'img/event/event3.jpg'
    }, {
        name: 'Group Show at The Capital  -  Fundraiser for Cuddles Foundation',
        detail: 'Jan 15, 2013 - Jan 21, 2013 The Capital, BKC, Mumbai',
        img: 'img/event/event7.jpg'
    }];
    $scope.event2014 = _.chunk($scope.event2014, 2);
    $scope.event2015 = _.chunk($scope.event2015, 2);
    $scope.event2016 = _.chunk($scope.event2016, 2);
})

.controller('EventdetailCtrl', function($scope, $stateParams, $ionicModal) {
    $scope.event = [{
        name: 'Aura Art connects the two worlds of art and fashion',
        venue: 'Pooja House, Opp JW Mariott, Juhu, Mumbai',
        Period: 'Saturday, 09 May 2015 - Saturday, 09 May 2015',
        time: '11:00 am to 7:00 pm',
        detail: '<p>In line with its vision of connecting a wider spectrum of society to fine art, Aura Art eConnect Pvt Ltd ("AAeCPL") is proud to be the Exclusive Art Partner for Amy Billimoria House of Design ("ABHD"). ABHD is a luxury destination for fashion, jewelry and art, founded by leading fashion designer Amy Billimoria, in association with Pankti Shah and is located in the prestigious and strategic neighborhood of Juhu.</p>  <p>We are delighted to invite you to ABHD on May 9, 2015 from 11am to 7pm, at Pooja House, next to Starbucks Café, opp JW Mariott, Juhu, to view a large array of fashion and design products, besides relishing paintings by renowned artists like S Yousuf Ali, Manjit Bawa, Umesh Varma, Sidharth, Vrundavan Solanki, Charan Sharma, Ajay De, Veguri Ravindra Babu, Tejinder Kanda and sculptures by Ratilal Kansodaria, Bhawan Rampure, Sachin Dadhich.</p><p>The design house was launched on May 7, 2015 amidst much fanfare, in the august presence of leading celebrities and dignitaries like Rani Mukerji, Esha Deol, Ayushmann Khurrana, Lucky Morani, Talat Aziz, Mahesh Chhabria, Anjali Chhabria,Nilesh Ganjwala,Yogesh Lakhani, Bhagyashree, Suchitra Krishnamoorthi, Anup Jalota, Tanishaa Mukerji, Deepti Gujral amongst others.</p><p>This is a novel initiative where a unique ambience has been created for an exciting display of both top of the line fashion products and the best of fine art under one roof.  In a venue like this, Aura Art eConnect looks forward to a convergence of sensitivities - of colour, form and texture - that compliment each other and enhance the viewing pleasure.You are welcome to partake in this heady concoction of art, fashion and design, which will be available at the design house 7 days a week from 10:00 am to 8:00 pm.</p>'
    }];

    $scope.gallery = [{

        image: 'img/eventgallery/g1.jpg'
    }, {

        image: 'img/eventgallery/g2.jpg'
    }, {

        image: 'img/eventgallery/g3.jpg'
    }, {

        image: 'img/eventgallery/g4.jpg'
    }, {

        image: 'img/eventgallery/g5.jpg'
    }, {

        image: 'img/eventgallery/g6.jpg'
    }, {

        image: 'img/eventgallery/g7.jpg'
    }];
    $scope.gallery = _.chunk($scope.gallery, 3);
    $scope.showeventimage = function() {
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
    };
})

.controller('InfraServicesCtrl', function($scope, $stateParams) {})

.controller('CartCtrl', function($scope, $stateParams) {
    $scope.cart_item = [{
        id: '1527',
        name: 'Ajay R Dhandre',
        typename: 'Web In a Cage',
        price: 'Rs 140,000',
        img: 'img/artist/artist2.jpg'
    }, {
        id: '1530',
        name: 'Bhushen Koul',
        typename: 'One Step 8000 Replies',
        price: 'Rs 180,000',
        img: 'img/artist/artist1.jpg'
    }];
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

.controller('PersonalAccntCtrl', function($scope, $stateParams) {})

.controller('TraceOrderCtrl', function($scope, $stateParams) {})

.controller('MyOrderCtrl', function($scope, $stateParams) {})

.controller('SearchCtrl', function($scope, $stateParams) {

    $scope.artistdetail = [{
        image: 'img/artist/artist1.jpg',
        id: '1528',
        name: 'Ajay R Dhandre',
        typename: 'Untitled',
        size: '19.5 x 23',
    }, {
        image: 'img/artist/artist2.jpg',
        id: '1527',
        name: 'Amarnath Sharma',
        typename: 'Untitled',
        size: '19.5 x 23',
    }, {
        image: 'img/artist/artist3.jpg',
        name: 'Ajay R Dhandre',
        id: '1530',
        typename: 'Untitled',
        size: '19.5 x 23',
    }, {
        image: 'img/artist/artist4.jpg',
        id: '1530',
        name: 'Bhushen Koul',
        madein: 'Oil on board',
        size: '19.5 x 23'
    }];
    $scope.artistdetail = _.chunk($scope.artistdetail, 2);
})

.controller('AddressCtrl', function($scope, $stateParams, $ionicModal) {
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

.controller('CheckoutCtrl', function($scope, $stateParams, $location) {
    $scope.checkout = [];
    $scope.checkout.isshipping = true;
    $scope.formstatus = false;
    $scope.changeTab = function(tab) {
        if (tab == 1) {
            $scope.formstatus = true;
            //                $scope.formstatussec = false;
        } else {
            //                $scope.formstatus = false;
            $scope.formstatussec = true;
        }

    }
    $scope.closeTab = function(tab) {
        if (tab == 1) {
            $scope.formstatus = false;
            //                $scope.formstatussec = false;
        } else {
            //                $scope.formstatus = false;
            $scope.formstatussec = false;
        }

    }

    $scope.openbilling = false;

    $scope.continue = function(ch) {
        if (ch === 'login') {
            $scope.openbilling = false;
            $location.path('access/login');
        } else {
            $scope.openbilling = true;
        }
    };
});
