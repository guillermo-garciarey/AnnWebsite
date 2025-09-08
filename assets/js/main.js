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

// --- Elements
const container = document.querySelector(".card_container");
const cards = Array.from(document.querySelectorAll(".services_card"));
const dotsWrap = document.querySelector(".dots");

// Guard: bail if essentials are missing
if (!container || cards.length === 0) {
	console.warn("Card container or cards not found.");
} else {
	// --- Helpers
	// const setHeightTo = (el) => {
	// 	if (!el) return;
	// 	container.style.height = el.scrollHeight + "px";
	// };

	const setActive = (idx) => {
		dots.forEach((d, i) => d.setAttribute("aria-current", String(i === idx)));
	};

	const clampIndex = (i) => Math.min(Math.max(i, 0), cards.length - 1);

	const goTo = (idx) => {
		idx = clampIndex(idx);
		const left = cards[idx].offsetLeft;
		container.scrollTo({ left, behavior: "smooth" });
		setActive(idx);
	};

	// --- Dots
	const dots = [];
	if (dotsWrap) {
		cards.forEach((_, i) => {
			const btn = document.createElement("button");
			btn.className = "dot";
			btn.setAttribute("role", "tab");
			btn.setAttribute("aria-label", `Go to card ${i + 1}`);
			btn.addEventListener("click", () => goTo(i));
			dotsWrap.appendChild(btn);
			dots.push(btn);
		});
	}

	// --- IntersectionObserver: track most-visible card
	const io = new IntersectionObserver(
		(entries) => {
			const visible = entries
				.filter((e) => e.isIntersecting)
				.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
			if (!visible) return;

			const idx = cards.indexOf(visible.target);
			setActive(idx);
		},
		{
			root: container,
			threshold: [0.5, 0.75, 0.9],
		}
	);
	cards.forEach((card) => io.observe(card));

	// --- Init on load
	window.addEventListener("load", () => {
		if (dots.length) setActive(0);
	});

	// --- Resize: keep height aligned to current card
	let resizeRaf = null;
	window.addEventListener("resize", () => {
		if (resizeRaf) return;
		resizeRaf = requestAnimationFrame(() => {
			resizeRaf = null;
			const idx = clampIndex(
				Math.round(container.scrollLeft / container.clientWidth)
			);
			setActive(idx);
		});
	});

	// --- Keyboard navigation
	container.setAttribute("tabindex", "0");
	container.addEventListener("keydown", (e) => {
		if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
		const current = dots.findIndex(
			(d) => d.getAttribute("aria-current") === "true"
		);
		const fallbackIdx = clampIndex(
			Math.round(container.scrollLeft / container.clientWidth)
		);
		const activeIdx = current >= 0 ? current : fallbackIdx;
		const next = e.key === "ArrowRight" ? activeIdx + 1 : activeIdx - 1;
		goTo(next);
	});
}

// Multi-card flip handler
document.querySelectorAll(".flip-card").forEach((card, idx) => {
  const inner = card.querySelector(".flip-card-inner");
  const btn = card.querySelector(".contact-btn");
  const backFace = card.querySelector(".flip-card-face.back");
  const frontFace = card.querySelector(".flip-card-face.front");
  const backBtn = card.querySelector(".back-btn");

  // Ensure a unique ID for aria-controls
  if (inner) {
    const uniqueId = inner.id || `cardInner-${idx + 1}`;
    inner.id = uniqueId;
    btn?.setAttribute("aria-controls", uniqueId);
  }

  const setAria = (toBack) => {
    btn?.setAttribute("aria-expanded", String(toBack));
    frontFace?.setAttribute("aria-hidden", String(toBack));
    backFace?.setAttribute("aria-hidden", String(!toBack));
  };

  const flip = (toBack = true) => {
    inner?.classList.toggle("is-flipped", toBack);
    setAria(toBack);
  };

  // Optionally close other open cards when opening this one
  const closeOthers = () => {
    document.querySelectorAll(".flip-card-inner.is-flipped").forEach((el) => {
      if (el !== inner) {
        el.classList.remove("is-flipped");
        const host = el.closest(".flip-card");
        host?.querySelector(".contact-btn")?.setAttribute("aria-expanded", "false");
        host?.querySelector(".flip-card-face.front")?.setAttribute("aria-hidden", "false");
        host?.querySelector(".flip-card-face.back")?.setAttribute("aria-hidden", "true");
      }
    });
  };

  // Open (front → back)
  btn?.addEventListener("click", () => {
    closeOthers();
    flip(true);
  });
  btn?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeOthers();
      flip(true);
    }
  });

  // Click anywhere on the back to flip back, but ignore clicks on links/buttons
  backFace?.addEventListener("click", (e) => {
    const actionable = e.target.closest("a, button, [role='button'], input, select, textarea, label");
    if (!actionable) flip(false);
  });

  // Explicit back chip/button
  backBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    flip(false);
  });
});

// Global escape to close all
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".flip-card-inner.is-flipped").forEach((el) => {
      el.classList.remove("is-flipped");
      const host = el.closest(".flip-card");
      host?.querySelector(".contact-btn")?.setAttribute("aria-expanded", "false");
      host?.querySelector(".flip-card-face.front")?.setAttribute("aria-hidden", "false");
      host?.querySelector(".flip-card-face.back")?.setAttribute("aria-hidden", "true");
    });
  }
});



