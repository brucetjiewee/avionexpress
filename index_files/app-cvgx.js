// VARIABLES
var cmsRoot = 'www'; // 'www' | 'za' | 'us'
var cmsUrl = '';
var cmsUrls = '';
var cmsId = '';
var initRS = false;
var pg = '';
var $jsRoot = ''; // to manage JS reference from EXodus

// MODULE
var appCvgx = angular.module('ngCvgxApp', ['ui.bootstrap', 'ngSanitize']);

// CONTROLLERS
appCvgx.controller('cvgxController', function ($scope, cvgxFactory) {

	$scope.pg = pg;

	// RIPPLE CMS
	$scope.friendly = cmsUrl;
	$scope.id = cmsId;
	//console.log($scope.friendly);

	$scope.friendlys = cmsUrls.replace(/,$/, "").split(",").map(function ($friendly) {
		return { friendly: $friendly };
	});
	//$scope.friendlys = JSON.stringify(cmsUrls);
	//console.log($scope.friendlys);

	$scope.header = ''; //$scope.friendly.replace(/\//g, ' <i class="fa fa-angle-right"></i>');
	$scope.headerBkg = '';
	$scope.downArrowIcon = '<i class="fa fa-angle-down"></i>';

	$scope.currentnav = top.location.pathname;
	$scope.currentnav = $scope.currentnav.substr(1, $scope.currentnav.length - 1);
	//console.log($scope.currentnav);

	$scope.agreeTandC = '0';

	$scope.toggleAgreeTandC = function () {
		$scope.agreeTandC = ($scope.agreeTandC == '0') ? '1' : '0';
	}

	$scope.mainnav = [];
	$scope.productnav = [];
	$scope.footernav = [];

	$scope.content = [];
	$scope.children = [];
	$scope.multicontent = [];

	$scope.customField = function ($title) {
		var $customFields = $scope.content['content-item']['custom-field'];
		var $return = '';
		for (x = 0; x < $customFields.length; x++) {
			if ($customFields[x].title == $title) {
				$return = $customFields[x]['#text'];
			}
		}
		return $return;
	}

	$scope.pop = function ($friendly) {
		cvgxFactory.getContent($friendly)
			.success(
				function (data) {
					if (data.response == undefined) {
						// content was found
						$('.pop-content-title').text(data['content-item']['title']);
						$('.pop-content-body').html(data['content-item']['long-desc']);
					}
				}
			)
			.error(
				function ($error) {
				}
			)
	}

	$scope.getSingleContent = function () {
		cvgxFactory.getContent($scope.friendly, $scope.id)
			.success(
				function (data) {

					$scope.content = data;

					if ($scope.content.response == undefined) {
						// content was found

						$scope.header = $scope.customField('Page Title');
						if ($scope.header.length == 0) {
							$scope.header = $scope.content['content-item']['title'];
						}
						$scope.headerBkg = $scope.customField('header-image/jpg');

						if (initRS) RevolutionSlider.initRShome();

						var dt = new Date();
						var intYrs = (dt.getFullYear() - 1997) + (dt.getFullYear() - 1998);
						//console.log(intYrs.toString());
						//console.log($scope.content['content-item']['long-desc'].indexOf('##number-of-years##'));
						$scope.content['content-item']['short-desc'] = $scope.content['content-item']['short-desc'].replace(/##number-of-years##/g, intYrs.toString());
						$scope.content['content-item']['long-desc'] = $scope.content['content-item']['long-desc'].replace(/##number-of-years##/g, intYrs.toString());

						for (var x = 0; x < $scope.content['content-item']['custom-field'].length; x++) {
							if ($scope.content['content-item']['custom-field'][x].title == 'jpg1/jpg') {
								$scope.content['content-item'].imgSrc1 = $scope.content['content-item']['custom-field'][x]['#text'];
							} else if ($scope.content['content-item']['custom-field'][x].title == 'jpg2/jpg') {
								$scope.content['content-item'].imgSrc2 = $scope.content['content-item']['custom-field'][x]['#text'];
							} else if ($scope.content['content-item']['custom-field'][x].title == 'Author') {
								$scope.content['content-item'].author = $scope.content['content-item']['custom-field'][x]['#text'];
							}
						};

						if ($scope.content['content-item']['child-item'] != undefined) {
							$scope.children = $scope.content['content-item']['child-item'];
							//console.log($scope.children);
							if ($scope.children.length > 1) {
								for (var i = 0; i < $scope.children.length; i++) {
									$scope.children[i].pubdate = $scope.children[i].pubdate.replace(/ /g, 'T');
									for (var x = 0; x < $scope.children[i]['custom-field'].length; x++) {
										if ($scope.children[i]['custom-field'][x].title == 'jpg1/jpg') {
											$scope.children[i].imgSrc1 = $scope.children[i]['custom-field'][x]['#text'];
										} else if ($scope.children[i]['custom-field'][x].title == 'jpg2/jpg') {
											$scope.children[i].imgSrc2 = $scope.children[i]['custom-field'][x]['#text'];
										} else if ($scope.children[i]['custom-field'][x].title == 'Author') {
											$scope.children[i].author = $scope.children[i]['custom-field'][x]['#text'];
										}
									}
								}
							} else if ($scope.children.length = 1) {
								$scope.children.pubdate = $scope.children.pubdate.replace(/ /g, 'T');
								for (var x = 0; x < $scope.children['custom-field'].length; x++) {
									if ($scope.children['custom-field'][x].title == 'jpg1/jpg') {
										$scope.children.imgSrc1 = $scope.children['custom-field'][x]['#text'];
									} else if ($scope.children['custom-field'][x].title == 'jpg2/jpg') {
										$scope.children.imgSrc2 = $scope.children['custom-field'][x]['#text'];
									} else if ($scope.children['custom-field'][x].title == 'Author') {
										$scope.children.author = $scope.children['custom-field'][x]['#text'];
									}
								}
							}
						};
					}

					$('.ng-waiting').show();

				}
			)
			.error(
				function ($error) {
				}
			)
	}

	if ($scope.friendly.length > 0 || $scope.id.length > 0) {
		$scope.getSingleContent();
	}

	var $data = {};

	$scope.getMultiContent = function ($index) {
		//console.log($scope.friendlys[$index]['friendly']);
		cvgxFactory.getContent($scope.friendlys[$index]['friendly'])
			.success(
				function (data) {
					//console.log(data);
					if (data.response == undefined) {
						// content was found
						var dt = new Date();
						var intYrs = (dt.getFullYear() - 1997) + (dt.getFullYear() - 1998);
						data['content-item']['short-desc'] = data['content-item']['short-desc'].replace(/##number-of-years##/g, intYrs.toString());
						data['content-item']['long-desc'] = data['content-item']['long-desc'].replace(/##number-of-years##/g, intYrs.toString());

						$data[$scope.friendlys[$index]['friendly']] = data;

						if ($scope.friendlys.length > $index+1) {
							$scope.getMultiContent($index+1);
						} else {
							$scope.multicontent = $data;
							//$scope.multicontent.push(data);
							//$.extend(true, $scope.multicontent, data);
							//console.log($scope.multicontent);
						}
					}
				}
			)
			.error(
				function ($error) {
					console.log($error);
				}
			)
	}

	if ($scope.friendlys[0].friendly.length > 0) {
		//console.log($scope.friendlys[0]['friendly']);
		$scope.getMultiContent(0);
	}

	cvgxFactory.getSitemap()
		.success(
			function (data) {
				for (x = 0; x < data['nav-group'].length; x++) {
					if (data['nav-group'][x].friendly == cmsRoot + '/main-nav') {
						$scope.mainnav = data['nav-group'][x];
					} else if (data['nav-group'][x].friendly == cmsRoot + '/products-nav') {
						$scope.productnav = data['nav-group'][x];
					} else if (data['nav-group'][x].friendly == cmsRoot + '/footer-nav') {
						$scope.footernav = data['nav-group'][x];
					}
				}
				//console.log($scope.mainnav);
				//$('.products-nav').show();
				//$('.main-nav').show();
			}
		)
		.error(
			function ($error) {
			}
		)
	// RIPPLE CMS END


	// GLOBAL TRACKING
	$scope.trackNo = '';
	$scope.trackCarrier = 'exds';


	$scope.tracking = [];
	$scope.tracking.pleaseWait = false;
	$scope.tracking.hasData = null;
	$scope.tracking.carrier = null;
	$scope.tracking.carrierLogo = null;
	$scope.tracking.exds = null;
	$scope.tracking.dhl = null;
	$scope.tracking.dates = [];

	$scope.clearTracking = function ($clearTrackNo) {
		$scope.tracking = [];
		$scope.tracking.exds = null;
		$scope.tracking.dhl = null;
		$scope.tracking.carrier = null;
		$scope.tracking.carrierLogo = null;
		$scope.tracking.dates = [];
		$scope.tracking.pleaseWait = false;
		$scope.tracking.hasData = null;

		$clearTrackNo = $clearTrackNo != null ? $clearTrackNo : false;
		if ($clearTrackNo) $scope.trackNo = null;
		$('#trackNo').focus();
		//$('body').animate({ scrollTop: $('#trackNo').offset().top - 200 }, 200);
		$('body').animate({ scrollTop: 0 }, 200);

		//console.log($scope.tracking);
		//console.log('pleaseWait:' + $scope.tracking.pleaseWait);
		//console.log('hasData:' + $scope.tracking.hasData);
		//console.log('trackNo:' + $scope.trackNo);

		//console.log($scope.tracking.exds == null && $scope.tracking.dhl == null);
	};

	if ($scope.pg == 'track-a-package') {
		$('.ng-waiting').show();
		$scope.clearTracking(true);
	};

	//console.log($.isEmptyObject($scope.tracking.dhl));

	$scope.getTracking = function ($carrier) {

		console.log($scope.trackNo);

		if ($scope.trackNo != null && $scope.trackNo != '') {

			if ($carrier == null) { // set starting point
				$carrier = 'exds';
			};

			$scope.clearTracking();

			//console.log('getTracking("' + $carrier + '")');

			$scope.tracking.pleaseWait = true;
			$scope.tracking.hasData = null;

			cvgxFactory.getTracking($carrier, $scope.trackNo)
				.success(
					function (data) {
						if (data != null) {
							//console.log(data['convergex-track-waybill']);
							$scope.tracking.carrier = data['convergex-track-waybill'].shipment.carrier;
							$scope.tracking.carrierLogo = '/assets/img/partner-logos/' + $scope.tracking.carrier + '_med.jpg';
							$scope.tracking[$carrier] = data['convergex-track-waybill'];
							if ($carrier == 'exds') {
								var $$events = $scope.tracking.exds != [] && $scope.tracking.exds.events != null ? $scope.tracking.exds.events.event : [];
								if ($$events.length > 0) $scope.tracking.hasData = true;
								$scope.tracking.exds.events = [];
								$scope.tracking.exds.events.event = [];
								var $currentDate = '';
								for ($$x = 0; $$x < $$events.length; $$x++) {
									// re-order the events
									$scope.tracking.exds.events.event.unshift($$events[$$x]);
									// load the unique dates
									if ($currentDate != $$events[$$x].eventDate) {
										$currentDate = $$events[$$x].eventDate;
										//console.log('new currentDate=' + $currentDate);
										$scope.tracking.dates.unshift({
											"Date": $currentDate,
											"Weekday": $scope.getDay($currentDate)
										});
									}
								};
								$$events = [];
							} else if ($carrier == 'dhl') {
								var $$events = $scope.tracking.dhl != [] ? $scope.tracking.dhl.ShipmentEvent : [];
								if ($$events.length > 0) $scope.tracking.hasData = true;
								$scope.tracking.dhl.ShipmentEvent = [];
								var $currentDate = '';
								for ($$x = 0; $$x < $$events.length; $$x++) {
									// re-order the events
									$scope.tracking.dhl.ShipmentEvent.unshift($$events[$$x]);
									// load the unique dates
									if ($currentDate != $$events[$$x].Date) {
										$currentDate = $$events[$$x].Date;
										//console.log('new currentDate=' + $currentDate);
										$scope.tracking.dates.unshift({
											"Date": $currentDate,
											"Weekday": $scope.getDay($currentDate)
										});
									}
								};
								$$events = [];
							}
							$scope.tracking.pleaseWait = false;
						} else {
							if ($carrier == 'dhl') {
								$scope.getTracking('exds');
							} else {
								$scope.tracking.hasData = false;
								$scope.tracking.pleaseWait = false;
							}
						};
					}
				)
		};
	}

	//$scope.getTracking = function ($checkFormat, $clearTrackNo) {

	//	$checkFormat = $checkFormat != null ? $checkFormat : true;

	//	if ($checkFormat) {
	//		if ($scope.trackNo.substr(0, 3) == 'CDM') {
	//			//console.log('DW');
	//			$scope.trackCarrier = 'dw';
	//		} else if ($scope.trackNo.substr(0, 3) == 'CON') {
	//			//console.log('SFS');
	//			$scope.trackCarrier = 'sfs';
	//		} else {
	//			//console.log('DHL');
	//			$scope.trackCarrier = 'dhl';
	//		}
	//	};

	//	//console.log('Run search on ' + $scope.trackCarrier + ' for ' + $scope.trackNo);

	//	$scope.clearTracking($clearTrackNo);

	//	if ($scope.trackNo != null && $scope.trackNo != '') {
	//		$scope.tracking.pleaseWait = true;
	//		$scope.tracking.hasData = null;
	//		cvgxFactory.getTracking($scope.trackCarrier, $scope.trackNo)
	//			.success(
	//				function (data) {
	//					$scope.tracking[$scope.trackCarrier] = data;
	//					//console.log($scope.trackCarrier);
	//					//console.log($scope.tracking[$scope.trackCarrier]);
	//					if (data != null) {
	//						//console.log($scope.trackCarrier);
	//						//console.log($scope.tracking[$scope.trackCarrier]);
	//						if ($scope.trackCarrier == 'dw') {
	//							var $$events = $scope.tracking.dw != [] ? $scope.tracking.dw.event : [];
	//							if ($$events.length > 0) $scope.tracking.hasData = true;
	//							$scope.tracking.dw.event = [];
	//							var $currentDate = '';
	//							for ($$x = 0; $$x < $$events.length; $$x++) {
	//								// re-order the events
	//								$scope.tracking.dw.event.unshift($$events[$$x]);
	//								// load the unique dates
	//								if ($currentDate != $$events[$$x].date) {
	//									$currentDate = $$events[$$x].date;
	//									//console.log('new currentDate=' + $currentDate);
	//									$scope.tracking.dates.unshift({
	//										"Date": $currentDate,
	//										"Weekday": $scope.getDay($currentDate)
	//									});
	//								}
	//							};
	//							$$events = [];
	//						} else if ($scope.trackCarrier == 'sfs') {
	//							var $$events = $scope.tracking.sfs != [] ? $scope.tracking.sfs.event : [];
	//							if ($$events.length > 0) $scope.tracking.hasData = true;
	//							$scope.tracking.sfs.event = [];
	//							var $currentDate = '';
	//							for ($$x = 0; $$x < $$events.length; $$x++) {
	//								// re-order the events
	//								$scope.tracking.sfs.event.unshift($$events[$$x]);
	//								// load the unique dates
	//								if ($currentDate != $$events[$$x].date) {
	//									$currentDate = $$events[$$x].date;
	//									//console.log('new currentDate=' + $currentDate);
	//									$scope.tracking.dates.unshift({
	//										"Date": $currentDate,
	//										"Weekday": $scope.getDay($currentDate)
	//									});
	//								}
	//							};
	//							$$events = [];
	//						} else if ($scope.trackCarrier == 'dhl') {
	//							var $$events = $scope.tracking.dhl != [] ? $scope.tracking.dhl.ShipmentEvent : [];
	//							if ($$events.length > 0) $scope.tracking.hasData = true;
	//							$scope.tracking.dhl.ShipmentEvent = [];
	//							var $currentDate = '';
	//							for ($$x = 0; $$x < $$events.length; $$x++) {
	//								// re-order the events
	//								$scope.tracking.dhl.ShipmentEvent.unshift($$events[$$x]);
	//								// load the unique dates
	//								if ($currentDate != $$events[$$x].Date) {
	//									$currentDate = $$events[$$x].Date;
	//									//console.log('new currentDate=' + $currentDate);
	//									$scope.tracking.dates.unshift({
	//										"Date": $currentDate,
	//										"Weekday": $scope.getDay($currentDate)
	//									});
	//								}
	//							};
	//							$$events = [];
	//						}
	//						//console.log('hasData=' + $scope.tracking.hasData);
	//						//console.log($scope.tracking.dates);
	//					} else {
	//						$scope.tracking.hasData = false;
	//					}

	//					//console.log($scope.tracking.hasData);

	//					$scope.tracking.pleaseWait = false;
	//					//console.log($scope.tracking[$scope.trackCarrier]);
	//				}
	//			)
	//			.error(
	//				function ($error) {
	//				}
	//			)
	//	};
	//};

	//$scope.eventDates = function () {
	//	var $eventDates = [];
	//	if ($scope.trackCarrier == 'dhl' && $scope.tracking.dhl != null) {
	//		var $currentDate = '';
	//		for ($x = 0; $x < $scope.tracking.dhl.ShipmentEvent.length; $x++) {
	//			console.log($currentDate + '~' + $scope.tracking.dhl.ShipmentEvent[$x].Date + '?' + ($currentDate != $scope.tracking.dhl.ShipmentEvent[$x].Date));
	//			if ($currentDate != $scope.tracking.dhl.ShipmentEvent[$x].Date) {
	//				$currentDate = $scope.tracking.dhl.ShipmentEvent[$x].Date;
	//				console.log('new currentDate=' + $currentDate);
	//			//	$eventDates.push({
	//			//		"Date": $currentDate,
	//			//		"Weekday": $scope.getDay($currentDate)
	//			//	});
	//			}
	//		};
	//	};
	//	return $eventDates;
	//}

	$('#trackNo').on('keydown', function (event) {
		if ($scope.trackNo != undefined && event.which == 13) { // enter
			$scope.getTracking();
		}
	})
	$('#trackNo').on('keyup', function (event) {
		//console.log($scope.trackNo == undefined);
		$scope.tracking.hasData = null;
		$scope.tracking.pleaseWait = false;
		if ($scope.trackNo == undefined) {
			//console.log('should clear');
			//$scope.getTracking(false, true);
			$scope.clearTracking(true);
		};
	})

	$('.track-carrier').on('change', function () {
		//console.log('changed to:' + $scope.trackCarrier);
		if ($scope.trackNo != undefined) $scope.getTracking(false);
	});

	$scope.getDay = function ($dateVal) {
		//var $today = new Date();
		//console.log($date + '~' + $today);
		var $date = new Date($dateVal);
		var $weekDay = '';
		switch ($date.getDay()) {
			case 0:
				$weekDay = 'Sunday';
				break;
			case 1:
				$weekDay = 'Monday';
				break;
			case 2:
				$weekDay = 'Tuesday';
				break;
			case 3:
				$weekDay = 'Wednesday';
				break;
			case 4:
				$weekDay = 'Thursday';
				break;
			case 5:
				$weekDay = 'Friday';
				break;
			case 6:
				$weekDay = 'Saturday';
				break;
		}
		return $weekDay;
	}

	//$scope.$watch('tracking.dw', function (newVal, oldVal) {
	//	//console.log($scope.inbound);
	//	if ($scope.inbound.groupCode != null && newVal) {
	//		$scope.inbound.groupCode = ($scope.inbound.groupCode.length == 0) ? $scope.inbound.trackNo : $scope.inbound.groupCode;
	//		$scope.saveInbound();
	//	} else if ($scope.inbound.groupCode != null && !newVal) {
	//		$scope.inbound.groupCode = '';
	//	}
	//});
	// GLOBAL TRACKING END

})

// FACTORIES
appCvgx.factory('cvgxFactory', function ($http) {

	// RIPPLE CMS
	function getContent($friendly, $id) {
		$friendly = ($friendly == undefined || $friendly == null) ? '' : $friendly;
		$id = ($id == undefined || $id == null) ? '' : $id;
		//console.log($jsRoot + '/data/json-ripplecms.cshtml?friendly=' + $friendly + '&id=' + $id);
		return $http({
			method: 'GET',
			url: $jsRoot + '/data/json-ripplecms.cshtml?friendly=' + $friendly + '&id=' + $id,
			cache: false
		});
	}

	function getSitemap() {
		//console.log($jsRoot + '/data/json-ripplecms.cshtml?type=sitemap');
		return $http({
			method: 'GET',
			url: $jsRoot + '/data/json-ripplecms.cshtml?type=sitemap',
			cache: false
		});
	}
	// RIPPLE CMS END

	// GLOBAL TRACKING
	function getTracking($carrier, $trackNo) {
		console.log('/data/json-' + $carrier + '?trackNo=' + $trackNo);
		return $http({
			method: 'GET',
			url: '/data/json-' + $carrier + '?trackNo=' + $trackNo,
			cache: false
		});
	}
	// GLOBAL TRACKING END

	return {
		getContent: getContent,
		getSitemap: getSitemap,

		getTracking: getTracking
	}
});
