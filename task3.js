
let timeStorage = localStorage;
let time;

if (timeStorage.getItem("time") != null) {
	time = parseInt(timeStorage.getItem("time"));
} else {
	time = 120;
	timeStorage.setItem("time", time);
}

let firstCard = null;
let secondCard = null;

let cards = [
	{
		name: "php",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/php-logo_1.png",
		id: 1,
	},
	{
		name: "css3",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/css3-logo.png",
		id: 2
	},
	{
		name: "html5",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/html5-logo.png",
		id: 3
	},
	{
		name: "jquery",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/jquery-logo.png",
		id: 4
	},
	{
		name: "javascript",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/js-logo.png",
		id: 5
	},
	{
		name: "node",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/nodejs-logo.png",
		id: 6
	},
	{
		name: "photoshop",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/photoshop-logo.png",
		id: 7
	},
	{
		name: "python",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/python-logo.png",
		id: 8
	},
	{
		name: "rails",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/rails-logo.png",
		id: 9
	},
	{
		name: "sass",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sass-logo.png",
		id: 10
	},
	{
		name: "sublime",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sublime-logo.png",
		id: 11
	},
	{
		name: "wordpress",
		img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
		id: 12
	}
];

let progress = 0;
let clicksss = 0;

$(document).ready(function () {


	$(".slideRules").click(function () {
		if (clicksss == 1) {
			$('#rules').slideUp();
			$(".slideRules").text("Description & Rules ▼");
			clicksss = 0;
		} else {
			$('#rules').slideDown();
			$(".slideRules").text("Description & Rules ▲");
			clicksss = 1;
		}
	});

	$(".progress").knob({
		'min': 0,
		'max': 12,
		'angleArc': 140,
		'angleOffset': -70,
		'readOnly': true,
		'width': '100%',
		'lineCap': 'round',
		'displayInput': false,
		'bgColor': 'white',
		'fgColor': 'green',
		'thickness': 0.2
	});


	$(".time").knob({
		'min': 0,
		'max': 120,
		'angleArc': 270,
		'angleOffset': -135,
		'readOnly': true,
		'width': '70%',
		'lineCap': 'round',
		'displayInput': false,
		'bgColor': 'white',
		'fgColor': 'blue',
		'thickness': 0.22
	});

	$("#start").click(function () {
		$("#start").css('display', 'none');
		$(".gameBoard").css('display', 'grid');
		fillBoard();
		$(".card").on('click', cardClicked);
		startTime();
	});

});

function cardClicked() {
	if ($(this).hasClass('flip') || $(this).hasClass('matched') || secondCard) {
		return;
	}

	if (!firstCard) {
		firstCard = $(this);
		firstCard.addClass('flip');
		return;
	}

	secondCard = $(this);
	secondCard.addClass('flip');
	if (firstCard.attr('data-id') === secondCard.attr('data-id')) {
		firstCard.addClass('matched');
		secondCard.addClass('matched');
		firstCard = null;
		secondCard = null;
		progress++;
		$('.progress').val(progress).trigger('change');
		if (progress === 12) {
			$("#win").css('display', 'flex');
			$(".gameBoard").css('display', 'none');
			timeStorage.removeItem("time");
			localStorage.removeItem("time");
		}
	} else {
		setTimeout(function () {
			firstCard.removeClass('flip');
			secondCard.removeClass('flip');
			firstCard = null;
			secondCard = null;
		}, 600);
	}
}

function fillBoard() {
	let board = shuffle([...cards, ...cards]);
	for (let i = 0; i < board.length; i++) {
		let cardHtml = `<div class="card" data-id="${board[i].id}">
		<div class="front">ROBOCODE</div>
		<div class="back"><img src="${board[i].img}" alt="${board[i].name}"></div>
		</div>`;
		$(".gameBoard").append(cardHtml);
	}
}
function shuffle(array) {
	let counter = array.length - 1;
	let temp;
	let index;
	while (counter > 0) {
		temp = array[counter];
		index = Math.floor(Math.random() * counter);
		array[counter] = array[index];
		array[index] = temp;
		counter--;
	}
	return array;
}









function startTime() {
	setInterval(function () {
		time = parseInt(timeStorage.getItem("time")) - 1;
		$(".time").val(time).trigger('change');
		if (time == 0) {
			alertify.error("Time is out!");
			setTimeout(() => window.open("file:///C:/Users/podle/OneDrive/%D0%A0%D0%BE%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D1%96%D0%BB/Task%2004.04.2025%20-%2018.04.2025/Taskk/task2.html", "_self", false), 2000);
			timeStorage.removeItem("time");
			localStorage.removeItem("time");
		} else if (time > 0) {
			localStorage.setItem("time", time);
		}
	}, 1000);
}