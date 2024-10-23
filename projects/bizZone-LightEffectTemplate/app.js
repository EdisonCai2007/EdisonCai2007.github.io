
/*
#=-=-=-=-=-=-=-=-=-=-=-=-=-=-#
#   Element Initialization   #
#=-=-=-=-=-=-=-=-=-=-=-=-=-=-#*/

// Button
const btn = document.querySelector('.btn');
const btnGradient = document.getElementById("btn-gradient");

const btnGlow1 = document.getElementById('glow-border-1');
const btnGlow2 = document.getElementById('glow-border-2');

// Background Mask Effect
const cards = document.querySelector('.card-background');
const overlayMask = document.querySelector(".overlay");

const style = document.documentElement.style;

// Check for Pointer Hover
let mouseOverBtnGradient = false;
let mouseOverCards = false;

// Timeout ID for animation delays
let btnTimeoutID = 0;

// Reset all elements on website startup
window.addEventListener('DOMContentLoaded', () => {
	btnGradient.animate({
		left: `${btn.getBoundingClientRect().right}px`,
	}, {duration: 1000, fill: "forwards", easing: "cubic-bezier(0.4, 0, 0.2, 1)"});

	btnGlow1.style.opacity = '1';
	btnGlow2.style.opacity = '0';
});

/*
#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-#
#   Mouse Pointer Interactions   #
#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-#*/
document.body.onpointermove = event => {
	const { clientX, clientY } = event; // Get mouse position

	const rect = btn.getBoundingClientRect();
	const offsetX = clientX - rect.left;
	if (mouseOverBtnGradient) {
		clearTimeout(btnTimeoutID);
		btnTimeoutID = 0;
		// Tween outer glow
		if (offsetX < rect.width / 2) {
			btnGlow1.style.opacity = `${(offsetX / (rect.width / 2))-1}`; // Right
			btnGlow2.style.opacity = `${1 - (offsetX / (rect.width / 2))}`; // Left
		} else {
			btnGlow1.style.opacity = `${(offsetX / (rect.width / 2))-1}`; // Right
			btnGlow2.style.opacity = `${1 - (offsetX / (rect.width / 2))}`; // Left
		}

		// Tween inner glow to mouse position
		btnGradient.animate({
			left: `${clientX}px`,
		}, {duration: 500, fill: "forwards", easing: "ease-in-out"});
	} else {
		if (btnTimeoutID === 0) {
			btnTimeoutID = setTimeout(function () {
				console.log(btnTimeoutID);
				// Reset to initial position if mouse exits hover
				btnGradient.animate({
					left: `${rect.right}px`,
				}, {duration: 500, fill: "forwards", easing: "ease-in-out"});
				btnGlow1.style.opacity = '1';
				btnGlow2.style.opacity = '0';
			}, 2000);
		}
	}

	// Background mask follow mouse
	if (mouseOverCards) {
		style.setProperty("--overlay-left", `${clientX-(overlayMask.clientWidth/2)}px`);
		style.setProperty("--overlay-top", `${clientY-(overlayMask.clientWidth/2)}px`);
	}
}

btn.addEventListener("mouseover", event => {
	console.log('mouseover')

	mouseOverBtnGradient = true;
})
btn.addEventListener("mouseout", event => {
	console.log('mouseout')

	mouseOverBtnGradient = false;
})
cards.addEventListener("mouseover", event => {
	mouseOverCards = true;
})
cards.addEventListener("mouseout", event => {
	mouseOverCards = false;
})