angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  $scope.searchbar = false;
  $scope.toggleSearchbar = function() {
    $scope.searchbar = $scope.searchbar === false ? true : false;
  };

})

.controller('AccessCtrl', function($scope, $ionicModal, $timeout) {})

.controller('LoginCtrl', function($scope, $stateParams) {})

.controller('HomeCtrl', function($scope, $stateParams) {})

.controller('SavedViewsCtrl', function($scope, $stateParams) {
    $scope.savedviews = [{
      image: 'img/resizeRoom.jpg',
    }, {
      image: 'img/resizeRoom.jpg',
    }];

    $scope.savedviews = _.chunk($scope.savedviews, 2);
  })
  .controller('FavouritesCtrl', function($scope, $stateParams) {
    $scope.artistdetail = [{
      image: 'img/artist/artist1.jpg',
      id: '1527',
      typename: 'Untitled',
      madein: 'Oil on board',
      size: '19.5 x 23',
      year: '1978',
      price: 'Rs.1,00,000/ $6,400'
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
      price: 'Rs.1,40,000/ $7,400'
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

.controller('ArtDetailCtrl', function($scope, $stateParams, $ionicModal) {
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
    price: 'Rs. 30,000 / $ 60.00'

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

  $scope.details = [{
    image: 'img/artist/artist1.jpg',
  }];
})


.controller('SigninCtrl', function($scope, $stateParams) {})

.controller('ForgotCtrl', function($scope, $stateParams) {})

.controller('ArtworkCtrl', function($scope, $stateParams, $ionicModal) {

  $scope.artistdetail = [{
    image: 'img/artist/artist1.jpg',
    id: '1528',
    name: 'Ajay R Dhandre',
    size: '19.5 x 23',
    price: 'Rs. 30,000 / $ 60.00'
  }, {
    image: 'img/artist/artist2.jpg',
    id: '1527',
    name: 'Amarnath Sharma',
    size: '30 x 20',
    price: 'Rs. 30,000 / $ 60.00'
  }, {
    image: 'img/artist/artist3.jpg',
    name: 'Ajay Sharma',
    id: '1530',
    size: '21.5 x 26',
    price: 'Rs. 30,000 / $ 60.00'
  }, {
    image: 'img/artist/artist4.jpg',
    id: '1530',
    name: 'Bhushen Koul',
    madein: 'Oil on board',
    size: '20.5 x 23 x N/A',
    price: 'Rs. 30,000 / $ 60.00'
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

.controller('ArtistCtrl', function($scope, $stateParams, $ionicModal) {
  $scope.tab = 'grid';
  $scope.aristname = [{
    name: 'S Yousuf Ali',
    image: 'img/artist/artist1.jpg'

  }, {
    name: 'Ajay De',
    image: 'img/artist/artist2.jpg',

  }, {
    name: 'Asit Poddar',
    image: 'img/artist/artist3.jpg',

  }, {
    name: 'BR Bodade',
    image: 'img/artist/artist4.jpg',

  }, {
    name: 'Aradhna Tandon',
    image: 'img/artist/artist3.jpg',

  }, {
    name: 'Devki Modi',
    image: 'img/artist/artist4.jpg',

  }];

  $scope.aristname = _.chunk($scope.aristname, 2);

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
})

.controller('ArtistDetailCtrl', function($scope, $stateParams, $ionicModal) {
  $scope.artistdetail = [{
    image: 'img/artist/artist1.jpg',
    id: '1527',
    typename: 'Untitled',
    madein: 'Oil on board',
    size: '19.5 x 23',
    year: '1978',
    price: 'Rs.1,00,000/ $6,400'
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
    price: 'Rs.1,40,000/ $7,400'
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
