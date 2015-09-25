angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
	$scope.searchbar = false;
	$scope.toggleSearchbar = function () {
		$scope.searchbar = $scope.searchbar === false ? true : false;
	};

})

.controller('AccessCtrl', function ($scope, $ionicModal, $timeout) {})
	.controller('LoginCtrl', function ($scope, $stateParams) {})

.controller('HomeCtrl', function ($scope, $stateParams) {})

.controller('ArtDetailCtrl', function ($scope, $stateParams) {
	$scope.artdetail = [{
		image: 'img/artist/artist1.jpg'
    }]
})


.controller('SigninCtrl', function ($scope, $stateParams) {})

.controller('ForgotCtrl', function ($scope, $stateParams) {})

.controller('ArtworkCtrl', function ($scope, $stateParams) {

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
		id: '1527',
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

.controller('ArtistCtrl', function ($scope, $stateParams) {
	$scope.tab = 'grid';
	$scope.aristname = [{
		name: 'S Yousuf Ali',
		image: 'img/artist/artist1.jpg'

        }, {
		name: 'S Yousuf Ali',
		image: 'img/artist/artist2.jpg',

        }, {
		name: 'S Yousuf Ali',
		image: 'img/artist/artist3.jpg',

        }, {
		name: 'S Yousuf Ali',
		image: 'img/artist/artist4.jpg',

        }, {
		name: 'S Yousuf Ali',
		image: 'img/artist/artist3.jpg',

        }, {
		name: 'S Yousuf Ali',
		image: 'img/artist/artist4.jpg',

        }];

	$scope.aristname = _.chunk($scope.aristname, 2);

})

.controller('ArtistDetailCtrl', function ($scope, $stateParams) {
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
		id: '1527',
		typename: 'Untitled',
		madein: 'Oil on board',
		size: '19.5 x 23',
		year: '1978',
		price: 'Rs.1,00,000/ $6,400'
        }, {
		image: 'img/artist/artist3.jpg',
		id: '1527',
		typename: 'Untitled',
		madein: 'Oil on board',
		size: '19.5 x 23',
		year: '1978',
		price: 'Rs1,00,000/ $6,400'
        }, {
		image: 'img/artist/artist4.jpg',
		id: '1527',
		typename: 'Untitled',
		madein: 'Oil on board',
		size: '19.5 x 23',
		year: '1978',
		price: 'Price available on request'
        }, {
		image: 'img/artist/artist5.jpg',
		id: '1527',
		typename: 'Untitled',
		madein: 'Oil on board',
		size: '19.5 x 23',
		year: '1978',
		price: 'Rs.1,00,000/ $6,400'
        }, {
		image: 'img/artist/artist2.jpg',
		id: '1527',
		typename: 'Untitled',
		madein: 'Oil on board',
		size: '19.5 x 23',
		year: '1978',
		price: 'Rs.1,00,000/ $6,400'
        }, {
		image: 'img/artist/artist5.jpg',
		id: '1527',
		typename: 'Untitled',
		madein: 'Oil on board',
		size: '19.5 x 23',
		year: '1978',
		price: 'Rs.1,00,000/ $6,400'
        }, {
		image: 'img/artist/artist4.jpg',
		id: '1527',
		typename: 'Untitled',
		madein: 'Oil on board',
		size: '19.5 x 23',
		year: '1978',
		price: 'Price available on request'
        }];
	$scope.artistdetail = _.chunk($scope.artistdetail, 2);
})

.controller('ContactCtrl', function ($scope, $stateParams) {})

.controller('AboutCtrl', function ($scope, $stateParams) {
$scope.showteam="true";
//$scope.showactivity="true";
	$scope.tab = true;
	$scope.changetab=function(tab){
		if(tab == 1){
			$scope.tab = true;
		}else{
			$scope.tab = false;
		}
	}
})

.controller('PressCtrl', function ($scope, $stateParams) {
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

})

.controller('EventCtrl', function ($scope, $stateParams) {

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
		img: 'img/event/event4.jpg'
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
		name: 'Aura Art is delighted to be Exclusive Art Partner for AICOG 2013',
		detail: 'Jan 16, 2013 - Jan 20, 2013 BKC, Mumbai',
		img: 'img/event/event4.jpg'
        }, {
		name: 'Group Show at The Capital  -  Fundraiser for Cuddles Foundation',
		detail: 'Jan 15, 2013 - Jan 21, 2013 The Capital, BKC, Mumbai',
		img: 'img/event/event7.jpg'
        }];
	$scope.event2014 = _.chunk($scope.event2014, 2);
	$scope.event2015 = _.chunk($scope.event2015, 2);
	$scope.event2016 = _.chunk($scope.event2016, 2);
})

.controller('EventdetailCtrl', function ($scope, $stateParams) {
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
})

.controller('InfraServicesCtrl', function ($scope, $stateParams) {})

.controller('CartCtrl', function ($scope, $stateParams) {})

.controller('CheckoutCtrl', function ($scope, $stateParams) {
	$scope.checkout = [];
	$scope.checkout.isshipping = true;
	$scope.formstatus = false;
	$scope.changeTab = function (tab) {
		if (tab == 1) {
			$scope.formstatus = true;
			//                $scope.formstatussec = false;
		} else {
			//                $scope.formstatus = false;
			$scope.formstatussec = true;
		}

	}
	$scope.closeTab = function (tab) {
		if (tab == 1) {
			$scope.formstatus = false;
			//                $scope.formstatussec = false;
		} else {
			//                $scope.formstatus = false;
			$scope.formstatussec = false;
		}

	}
})
;