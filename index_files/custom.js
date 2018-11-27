/* Write here your custom javascript codes */

var $pathname = null;
var $body = null;
var $form = null;

var $winW = 0;
var $winH = 0;

var $bodyW = 0;
var $bodyH = 0;

var $bsWidth = 0;
var $bsSizeId = '';

var $html = '';

var intRnd = Math.random();

var $nextlevel = 1;

var makeFtrSticky = true; // home page master slider must set to false
var ftrIsSticky = false;

var $pgBkgImg = null;

var $bsSizingDivs = '';
$bsSizingDivs += '<div class="container">';
$bsSizingDivs += '<div class="bs-size visible-xs" id="bs-size-xs"></div>';
$bsSizingDivs += '<div class="bs-size visible-sm" id="bs-size-sm"></div>';
$bsSizingDivs += '<div class="bs-size visible-md" id="bs-size-md"></div>';
$bsSizingDivs += '<div class="bs-size visible-lg" id="bs-size-lg"></div>';
$bsSizingDivs += '<div class="bs-size visible-xl" id="bs-size-xl"></div>';
$bsSizingDivs += '</div>';

document.write($bsSizingDivs);

$(document).ready(function () {

	$('.hide').hide().removeClass('hide');
	$('.hidden').hide().removeClass('hidden');

	$body = $('body');
	$form = $('#pgForm');
	//$footer = $('#footer');

	//$('.exodus-nav').on('mouseover', function () {
	//	//$('.exodus-icon').hide();
	//	//$('.exodus-logo').show();
	//	$('.exodus-icon').attr('src', '/assets/img/logo-exodus.png');
	//});
	//$('.exodus-nav').on('mouseout', function () {
	//	//$('.exodus-icon').show();
	//	//$('.exodus-logo').hide();
	//	$('.exodus-icon').attr('src', '/assets/img/logo-exodus-icon.png');
	//});

	$setCanvasSizes = function () {

		//console.clear();

		$winW = $(window).width();
		$winH = $(window).height();

		$bodyW = $body.width();
		$bodyH = $body.height();

		$('.body-height').css({
			height: $bodyH + 'px'
		});
		$('.body-width').css({
			width: $bodyW + 'px'
		});

		$('.window-height').css({
			height: $winH + 'px'
		});
		$('.window-width').css({
			width: $winW + 'px'
		});

		$bsWidth = $('.bs-size:visible').outerWidth();
		$bsSizeId = $('.bs-size:visible').attr('id');

		$('.modal-bswidth').css('width', $bsWidth + 'px');
		$('.modal-fullwidth').css('width', ($bodyW - 50) + 'px');
	}

	$setCanvasSizes();

	$(window).on('resize', function () {
		$setCanvasSizes();
	})


	//$(window).scroll(function () {
	//	if ($(window).scrollTop() > 94) {
	//		$('body').addClass('body-sticky-top');
	//		$('.navbar').addClass('navbar-sticky-top');
	//	} else {
	//		$('body').removeClass('body-sticky-top');
	//		$('.navbar').removeClass('navbar-sticky-top');
	//	}
	//});

	stickFooter = function () {
		if (!ftrIsSticky) {
			$('html').css({
				"position": "relative",
				"min-height": "100%"
			});
			$('body').css({
				"margin-bottom": "140px"
			});
			$('.footer-v1').css({
				"position": "absolute",
				"bottom": "0",
				"width": "100%",
				"height": "62px"
			});
			ftrIsSticky = true;
			//console.log('footer sticky.');
		}
	}

	if (makeFtrSticky) stickFooter();

	$pathname = top.location.pathname;
	$pathname = $pathname.substr(1, $pathname.length - 1);
	//console.log($pathname);
	//var $filename = top.location.pathname;
	//console.log($filename);
	//$('.nav > li > a[href="' + $filename + '"]').parent('li').addClass('active');
	//$.each($('.nav > li > a')) {
	//	console.log($(this).attr('href'));
	//}


	$waiter = $('.waiter');
	showWaiter = function () {
		$waiter.show();
	}
	hideWaiter = function () {
		$waiter.hide();
	}

	$(".bookmarkme").on('click', function () {
		// Mozilla Firefox Bookmark
		if ('sidebar' in window && 'addPanel' in window.sidebar) {
			//alert('Firefox');
			window.sidebar.addPanel(location.href,document.title,"");
		} else if( /*@cc_on!@*/false) { // IE Favorite
			//alert('IE');
			window.external.AddFavorite(location.href,document.title); 
		} else { // webkit - safari/chrome
			//alert('Safari/Chrome');
			alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
		}
	});

	$('.jumper-link').on('click', function () {
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		var $this = $(this);
		var $id = $this.attr('data-id');
		var $class = $this.attr('data-class');
		if ($id != undefined && $('#' + $id).length > 0) {
			$('html, body').animate({
				scrollTop: $('#' + $id).offset().top - 30
			}, 1000);
		} else if ($class != undefined && $('.' + $class).length > 0) {
			$('html, body').animate({
				scrollTop: $('.' + $class).offset().top - 30
			}, 1000);
		}
	});

	$('a[href*="#popin="]').click(function (event) {
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		var $this = $(this);
		var friendly = $this.attr('href');
		friendly = friendly.substring(friendly.indexOf('#popin=') + 7, friendly.length);
		var popSize = '';
		if ($this.attr('data-size') != undefined) {
			popSize = $this.attr('data-size');
		}
		showModal($nextlevel, null, 'popin.aspx?friendly=' + friendly, popSize);
	});

	//setHeading = function (heading, headingClass) {
	//	$heading = $('.breadcrumbs-v2');
	//	$heading.addClass(headingClass);
	//	$('h1', $heading).html(heading);
	//	$heading.show();
	//}

	setPage = function (heading, pgBkgImg) {
		if (heading != null) setHeading(heading);
		if (pgBkgImg != null) setPgBkg(pgBkgImg);
	}
	setHeading = function (heading) {
		// HEADING
		$heading = $('.custom-heading');
		$('h1', $heading).html(heading);
		$heading.show();
	}
	setPgBkg = function (pgBkgImg, darken) {
		// BACKGROUND IMAGE
		$bkgImg = $('img.pg-bkg');

		var $img = new Image();
		$img.onload = function () {
			//console.log($bkgImg.attr('src') + ' - done!');
			$bkgImg.attr('src', '/assets/img/bg/' + pgBkgImg);
			$bkgImg.show();
		}
		$img.onerror = function () {
			//console.log($bkgImg.attr('src') + ' - error!');
			$bkgImg.show();
		}
		$img.src = '/assets/img/bg/' + pgBkgImg;

		darken = (darken != undefined) ? darken : false;

		if (darken) {
			$bkgImg.addClass('darkened');
		}
	}

	$alertMsg = $('#alertMsg');
	hideAlert = function () {
		$alertMsg.hide();
	}
	showAlert = function (alertTxt, cssClass, duration) {
		$('span', $alertMsg).html(alertTxt);
		if (cssClass != undefined) {
			if (cssClass.length > 0) {
				$alertMsg.removeClass('alert-danger').removeClass('alert-info').removeClass('alert-success').removeClass('alert-warning');
				$alertMsg.addClass(cssClass);
			}
		}
		$alertMsg.show();
		if (duration != undefined) {
			if (!isNaN(duration)) {
				window.setTimeout(function () {
					hideAlert();
				}, duration);
			}
		}
	}

	$usAddressNav = $('.usaddress-nav');

	if ($usAddressNav.length > 0 && !$usAddressNav.is(':empty()')) {
		$('.usaddress-block .panel-body p').html($('a', $usAddressNav).html());
		$('.usaddress-block address').html($('a', $usAddressNav).html());
		$('.footer-join-links').hide();
		$('.usaddress-block').show();
	}

	setLinks = function ($context, $level) {

		if ($level == null) $level = 0;
		var $nextlevel = parseInt($level) + 1;
		//alert($nextlevel);

		/*
		$('a[href^="http://"]:not([href*="#image"]):not([href*="changinglives.co"]):not([href*="#pop"]):not([href*="#activation-form"]):not([href*="#contact-us"])', $context).click(function (event) {
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			var $this = $(this);
			//chkExtLink($this.attr('href'));
		});
		$('a[href^="https://"]:not([href*="#image"]):not([href*="changinglives.co"]):not([href*="#pop"]):not([href*="#activation-form"]):not([href*="#contact-us"])', $context).click(function (event) {
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			var $this = $(this);
			//alert($this.attr('href'));
			//chkExtLink($this.attr('href'));
		});
		*/
		$('a[href*=".pdf"]', $context).click(function () {
			//event.preventDefault ? event.preventDefault() : event.returnValue = false;
			var $this = $(this);
			//window.open($this.attr('href'), '_blank');
		});
		$('a[href*="#image"]', $context).each(function () {
			var $this = $(this);
			var $thisTitle = $this.attr('title');
			$thisTitle = ($thisTitle != undefined) ? $thisTitle : '';
			$this.data('original-title', $thisTitle);
			$this.attr('title', $thisTitle + ' (CLICK TO VIEW LARGER IMAGE)');
		});
		$('a[href*="#image"]', $context).click(function (event) {
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			var $this = $(this);

			var $wh = parseInt($(window).height());
			var $ww = parseInt($(window).width());

			var $testImg = new Image();
			var $thisImg = $('img', $this);
			$testImg.src = $thisImg.attr('src');
			/*
			$testImg.css({
				'width': 'auto',
				'height': 'auto'
			});
			*/
			var imgW = parseInt($testImg.width * 0.96);
			var imgH = parseInt($testImg.height * 0.96);
			var $imgRatio = imgW / imgH;
			//alert($imgRatio + '~' + imgW + '~' + imgH);
			if (parseFloat($imgRatio) <= 1) { // portrait
				//if (imgH > $wh) {
				//	imgH = parseInt(parseInt($wh - 40) * 0.96);
				//	imgW = parseInt(parseInt(imgH * $imgRatio) * 0.96);
				//}
				if (imgW > $ww) { // still wider than screen width
					imgW = parseInt(parseInt($ww - 40) * 0.96);
					imgH = parseInt(parseInt(imgW * $imgRatio) * 0.96);
				}
			} else { // landscape
				if (imgW > $ww) {
					imgW = parseInt(parseInt($ww - 40) * 0.96);
					imgH = parseInt(parseInt(imgW * $imgRatio) * 0.96);
				}
				if (imgH > $wh) { // still higher than screen height
					imgH = parseInt(parseInt($wh - 40) * 0.96);
					imgW = parseInt(parseInt(imgH * $imgRatio) * 0.96);
				}
			}
			//alert(imgW + '~' + imgH);
			$thisImg = '<img data="img-only" width="100%" src="' + $testImg.src + '" />';

			var imgT = $this.data('original-title');
			if (imgT.length == 0) imgT = '&nbsp;';

			showModal($nextlevel, imgT, $thisImg, '');
		});
		/*
		$('p:has(iframe)', $context).css({
			'margin-bottom': '0px',
			'padding-bottom': '0px',
			'overflow': 'hidden'
		});
		$('iframe', $context).css({
			'margin-bottom': '0px'
		});
		*/
		$('a[href*="video.aspx"]', $context).click(function (event) {
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			var $this = $(this);
			var vUrl = $this.attr('href');
			if ($this.attr('data-title') == undefined) {
				vUrl += '&t=' + encodeURIComponent($this.text());
			} else {
				vUrl += '&t=' + encodeURIComponent($this.attr('data-title'));
			}
			winpop(vUrl, 770, 490);
		});
		$('a[href*="#popin="]', $context).click(function (event) {
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			var $this = $(this);
			var friendly = $this.attr('href');
			friendly = friendly.substring(friendly.indexOf('#popin=') + 7, friendly.length);
			var popSize = '';
			if ($this.attr('data-size') != undefined) {
				popSize = $this.attr('data-size');
			}
			showModal($nextlevel, null, 'popin.aspx?friendly=' + friendly, popSize);
		});
		$('a[href*="#popunder="]', $context).click(function (event) {
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			var $this = $(this);
			var friendly = $this.attr('href');
			friendly = friendly.substring(10, friendly.length);
			if ($('#' + friendly).css('display') == 'none') {
				$('#' + friendly).slideDown(300);
			} else {
				$('#' + friendly).slideUp(300);
			}
		});
		/*
		$('a[href="http://#popunder"]', $context).each(function () {
			var $this = $(this).closest('.dark-link-block');
			if ($this.next('div').hasClass('light-link-block')) {
				$this.nextUntil(':not(.light-link-block)').css('display', 'none');
			}
		});
		$('a[href="http://#popunder"]', $context).click(function (event) {
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			var $this = $(this).closest('.dark-link-block');
			if ($this.next('.light-link-block').css('display') == 'none') {
				$this.siblings('.dark-link-block.active').nextUntil(':not(.light-link-block)').slideUp(300);
				$this.nextUntil(':not(.light-link-block)').slideDown(300, function () {
					$(this).closest('.accordion-body').css({
						'height': 'auto',
						'max-height': 'auto'
					});
					$.scrollTo($this, 100, { offset: -90 });
				});
			} else {
				$this.nextUntil(':not(.light-link-block)').slideUp(100);
			}
		});
		$('td[style*="vertical-align: top"]', $context).each(function () {
			$(this).css('vertical-align', 'top !important');
		});
		*/
	}

	showModal = function (level, title, contents, size) {

		if ($('#alert').is(':visible')) {
			$('#alert').hide();
		}

		var $cmsModal = $('#cmsModal' + level);

		title = (title == null) ? '' : title;
		size = (size == null) ? '' : size; // blank | modal-sm | modal-lg

		if (size.length > 0) $('.modal-dialog', $cmsModal).removeClass('modal-lg').addClass(size);
		$('.modal-body', $cmsModal).html('');

		if ((contents.toLowerCase().indexOf('.aspx') > -1 || contents.toLowerCase().indexOf('.html') > -1 || contents.toLowerCase().indexOf('.php') > -1) && (contents.toLowerCase().indexOf('<') == -1)) {
			contents = (contents.indexOf('?') > -1) ? contents + '&poplevel=' + level : contents + '?poplevel=' + level;
			$('.modal-body', $cmsModal).load(contents, function () {
				setLinks($cmsModal, level);
				var $popinTitle = $('.popin-hdr', $cmsModal).html();
				$('.modal-header h4', $cmsModal).html($popinTitle);
				$popinTitle = '';
			}); // load a separate page
		} else if (contents.toLowerCase().indexOf('<img data="img-only"') > -1) {
			if (title.length > 0) {
				$('.modal-header h4', $cmsModal).html(title);
			} else {
				$('.modal-header h4', $cmsModal).html('&nbsp;');
			}
			$('.modal-body', $cmsModal).css({
				'max-height': height,
				'overflow': 'hidden'
			});
			$('.modal-body', $cmsModal).html(contents); // load an image into the modal
			$cmsModal.height('auto').css({
				'overflow': 'hidden'
			});
		} else {
			$('.modal-header h4', $cmsModal).html(title);
			$('.modal-body', $cmsModal).html(contents); // load html into the modal
		}
		$cmsModal.modal();

		$cmsModal.on('hide', function () {
			$('.modal-header h4', $cmsModal).html('<i class="icon-spin icon-spinner icon-large"></i> Loading');
			$cmsModal.off('hide');
		});

		$cmsModal.off('show');

	}

	popModal = function (level, modalContents, width, height, title) {

		if ($('#alert').is(':visible')) {
			$('#alert').hide();
		}

		title = (title == null) ? '' : title;
		var $cmsModal = $('#cmsModal' + level);

		var $wh = parseInt($(window).height());
		var $ww = parseInt($(window).width());

		$('.modal-body', $cmsModal).html('');
		width = (width == null) ? 560 : width;
		height = (height == null || height > ($wh - 50)) ? ($wh - 50) : height;
		//$cmsModal.width(width + 'px').css('margin-left', (-width / 2) + 'px');

		//$('.modal-header', $cmsModal).width((width - 30) + 'px');
		//$('.modal-body', $cmsModal).width((width - 30) + 'px');
		//$('.modal-footer', $cmsModal).width((width - 30) + 'px');
		//$('.modal-footer', $cmsModal).hide();

		//$cmsModal.height(height + 'px').css('overflow', 'hidden');

		//$cmsModal.on('show', function (e) {
		//	var $this = $(this);
		//	$this.css('margin-top', parseInt(($wh - height) / 6))
		//		 .css('margin-left', (($ww - width) / 2));
		//});

		if ((modalContents.toLowerCase().indexOf('.aspx') > -1 || modalContents.toLowerCase().indexOf('.html') > -1 || modalContents.toLowerCase().indexOf('.php') > -1) && (modalContents.toLowerCase().indexOf('<') == -1)) {
			modalContents = (modalContents.indexOf('?') > -1) ? modalContents + '&poplevel=' + level : modalContents + '?poplevel=' + level;
			$('.modal-body', $cmsModal).load(modalContents, function () {
				setLinks($cmsModal, level);
				var $popinTitle = $('.popin-hdr', $cmsModal).html();
				$('.modal-header h3', $cmsModal).html($popinTitle);
				var hdrH = $('.modal-header h3', $cmsModal).height();
				var bdyH = parseInt($cmsModal.height());
				//$('.modal-body', $cmsModal).css({
				//	'height': (bdyH - hdrH - 54) + 'px',
				//	'max-height': (bdyH - hdrH - 54) + 'px'
				//});

				$popinTitle = '';
			}); // load a separate page
		} else if (modalContents.toLowerCase().indexOf('<img data="img-only"') > -1) {
			if (title.length > 0) {
				$('.modal-header h3', $cmsModal).html(title);
			} else {
				$('.modal-header h3', $cmsModal).html('&nbsp;');
			}
			$('.modal-body', $cmsModal).css({
				'max-height': height,
				'overflow': 'hidden'
			});
			$('.modal-body', $cmsModal).html(modalContents); // load an image into the modal
			$cmsModal.height('auto').css({
				'overflow': 'hidden'
			});
		} else {
			$('.modal-header h3', $cmsModal).html(title);
			$('.modal-body', $cmsModal).html(modalContents); // load html into the modal
		}
		$cmsModal.modal();

		$cmsModal.on('hide', function () {
			$('.modal-header h3', $cmsModal).html('<i class="icon-spin icon-spinner icon-large"></i> Loading');
			$cmsModal.off('hide');
		});

		$cmsModal.off('show');
	}

});

var concatenateVals = function (separator) {
	// Requires Bootstrap
	if (separator.length == 0 || separator == undefined) {
		separator = ',';
	}
	var concatenation = '';
	if (arguments.length > 1) {
		for (x = 1; x < arguments.length; x++) {
			//concatenation += $(arguments[x]).length + separator;
			if ($(arguments[x]).val().length > 0) {
				concatenation += $(arguments[x]).val() + separator;
			}
		}
		if (concatenation.length > separator.length) {
			concatenation = concatenation.substr(0, concatenation.length - separator.length);
		}
	}
	return concatenation;
}

var querystring = function (name) {
	var url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

