/*
	Relativity by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function ($) {
	var $window = $(window),
		$body = $("body"),
		$header = $("#header"),
		$banner = $("#banner");

	// Breakpoints.
	breakpoints({
		xlarge: ["1281px", "1680px"],
		large: ["981px", "1280px"],
		medium: ["737px", "980px"],
		small: ["481px", "736px"],
		xsmall: ["361px", "480px"],
		xxsmall: [null, "360px"],
	});

	// Play initial animations on page load.
	$window.on("load", function () {
		window.setTimeout(function () {
			$body.removeClass("is-preload");
		}, 100);
	});

	// Tweaks/fixes.

	// Polyfill: Object fit.
	if (!browser.canUse("object-fit")) {
		$(".image[data-position]").each(function () {
			var $this = $(this),
				$img = $this.children("img");

			// Apply img as background.
			$this
				.css("background-image", 'url("' + $img.attr("src") + '")')
				.css("background-position", $this.data("position"))
				.css("background-size", "cover")
				.css("background-repeat", "no-repeat");

			// Hide img.
			$img.css("opacity", "0");
		});
	}

	// Scrolly.
	$(".scrolly").scrolly({
		offset: function () {
			return $header.height() - 5;
		},
	});

	// Header.
	if ($banner.length > 0 && $header.hasClass("alt")) {
		$window.on("resize", function () {
			$window.trigger("scroll");
		});

		$banner.scrollex({
			bottom: $header.outerHeight(),
			terminate: function () {
				$header.removeClass("alt");
			},
			enter: function () {
				$header.addClass("alt");
			},
			leave: function () {
				$header.removeClass("alt");
				$header.addClass("reveal");
			},
		});
	}

	// Banner.

	// Hack: Fix flex min-height on IE.
	if (browser.name == "ie") {
		$window
			.on("resize.ie-banner-fix", function () {
				var h = $banner.height();

				if (h > $window.height()) $banner.css("height", "auto");
				else $banner.css("height", h);
			})
			.trigger("resize.ie-banner-fix");
	}

	// Dropdowns.
	$("#nav > ul").dropotron({
		alignment: "right",
		hideDelay: 350,
		baseZIndex: 100000,
	});

	// Menu.
	$('<a href="#navPanel" class="navPanelToggle">Menu</a>').appendTo($header);

	$(
		'<div id="navPanel">' +
			"<nav>" +
			$("#nav").navList() +
			"</nav>" +
			'<a href="#navPanel" class="close"></a>' +
			"</div>"
	)
		.appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			target: $body,
			visibleClass: "is-navPanel-visible",
			side: "right",
		});
})(jQuery);

const wrapper = document.querySelector(".carousel-wrapper");
const slides = document.querySelectorAll(".carousel-wrapper .post");
const dotsContainer = document.querySelector(".carousel-dots");

let currentSlide = 0;

// Create dots
slides.forEach((_, index) => {
	const dot = document.createElement("div");
	dot.classList.add("carousel-dot");
	if (index === 0) dot.classList.add("active");
	dot.addEventListener("click", () => {
		currentSlide = index;
		updateCarousel();
	});
	dotsContainer.appendChild(dot);
});

function updateCarousel() {
	const offset = -currentSlide * 100;
	wrapper.style.transform = `translateX(${offset}%)`;

	// Update active dot
	document.querySelectorAll(".carousel-dot").forEach((dot, idx) => {
		dot.classList.toggle("active", idx === currentSlide);
	});
}

// Optional: swipe support
let startX = 0;

wrapper.addEventListener("touchstart", (e) => {
	startX = e.touches[0].clientX;
});

wrapper.addEventListener("touchend", (e) => {
	const endX = e.changedTouches[0].clientX;
	if (startX - endX > 50 && currentSlide < slides.length - 1) {
		currentSlide++;
		updateCarousel();
	} else if (endX - startX > 50 && currentSlide > 0) {
		currentSlide--;
		updateCarousel();
	}
});
