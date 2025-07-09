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
//

// Wait for the DOM to be loaded

// This function shows the correct tab based on the tab ID
// function showTab(tab) {
// 	console.log("Tab function called for: ", tab);
// 	document
// 		.querySelectorAll(".tab-panel")
// 		.forEach((panel) => panel.classList.remove("active"));
// 	document
// 		.querySelectorAll(".tab-button")
// 		.forEach((button) => button.classList.remove("active"));

// 	const tabPanel = document.getElementById(tab);
// 	if (tabPanel) {
// 		tabPanel.classList.add("active");
// 	}

// 	const tabButton = document.querySelector(`[onclick="showTab('${tab}')"]`);
// 	if (tabButton) {
// 		tabButton.classList.add("active");
// 	}
// }

// const urlParams = new URLSearchParams(window.location.search);
// const tab = urlParams.get("tab");
// if (tab) {
// 	showTab(tab);
// } else {
// 	showTab("OurApproach");
// }

function showTab(tab) {
	console.log("showTab function called with tab: ", tab); // Debugging log for the tab parameter
	// Remove active class from all panels and buttons
	document
		.querySelectorAll(".tab-panel")
		.forEach((panel) => panel.classList.remove("active"));
	document
		.querySelectorAll(".tab-button")
		.forEach((button) => button.classList.remove("active"));

	// Add active class to the selected tab panel and button
	const tabPanel = document.getElementById(tab);
	if (tabPanel) {
		console.log(`Displaying tab: ${tab}`); // Debugging log when a tab is displayed
		tabPanel.classList.add("active");
	} else {
		console.error(`No tab found with id: ${tab}`); // Debugging log if tab not found
	}

	const tabButton = document.querySelector(`[onclick="showTab('${tab}')"]`);
	if (tabButton) {
		console.log(`Activating button for tab: ${tab}`); // Debugging log when button is activated
		tabButton.classList.add("active");
	} else {
		console.error(`No button found for tab: ${tab}`); // Debugging log if button not found
	}
}

document.addEventListener("DOMContentLoaded", function () {
	// Check the URL for the 'tab' query parameter and display the tab
	const urlParams = new URLSearchParams(window.location.search);
	const tab = urlParams.get("tab");
	console.log("Tab parameter in URL: ", tab); // Debugging log to show the tab parameter from URL

	if (tab) {
		console.log(`Navigating to tab: ${tab}`); // Debugging log when a tab is set from URL
		showTab(tab); // Open the tab corresponding to the URL query parameter
	} else {
		console.log("No tab parameter found, defaulting to 'OurApproach' tab."); // Debugging log for default
		showTab("OurApproach"); // Default to "Our Approach" tab if no query parameter is specified
	}
});
