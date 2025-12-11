
let timeStorage = localStorage;

let time;

if (timeStorage.getItem("time") != null) {
	time = parseInt(timeStorage.getItem("time"));
} else {
	time = 120;
	timeStorage.setItem("time", time);
}


let answer = [
	["гаррі поттер", "гарік" , "гарри поттер", "harry potter"],
	["губка боб", "sponge bob", "spongebob", "губка боб квадратные штаны", "губка боб квадратні штани"],
	["пірати", "пірати карибского моря", "капитан джек горобець", "пираты", "пираты карибского моря", "капитан джек воробей", "pirates of the caribbean"],
	["сімпсони", "симпсоны", "simpsons", "the simpsons"],
	["зоряні війни", "звездные войны", "star wars", "имперский марш", "імперский марш"],

	["lion king", "the lion king", "король лев", "симба", "сімба"],
	["frozen", "холодное сердце", "холодне серце", "эльза", "ельза"],
	["shrek", "шрек"],
	["shrek", "шрек"],
	["rocky", "рокки", "роккі"],

	["индиана джонс", "indiana jones"],
	["один вдома", "один дома", "home alone"],
	["термінатор", "терминатор", "terminator"],
	["назад у майбутнє", "назад в будущее", "back to the future", "марти макфлай"],
	["мисливці за привидами", "охотники за привидениями", "ghost busters"]
];

let was = [];
let proggres = 0;
let num = Math.floor(1 + Math.random() * 15);
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
		'max': 10,
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


	console.log(num);

	
	$("#start").click(function () {
		$("#start").css('display', 'none');
		$(".sound").css('display', 'flex');
		startRebus(num);
		startTime();
	});



	$("#btnTask").click(function () {
		if (answer[num - 1].indexOf($("#inputTask").val().toLowerCase()) != -1) {
			alertify.success("Right answer!");
			$("#inputTask").val("");
			proggres++;
			$(".progress").val(proggres).trigger('change');
			was.push(num);
			if (proggres < 10) {
				do {
					num = Math.floor(1 + Math.random() * 15);
				} while (was.includes(num));
				startRebus(num);
			} else {
				$(".sound").css({
					'display': 'none'
				});
				$("#nextTask").css({
					'display': 'flex'
				});
				timeStorage.removeItem("time");
				localStorage.removeItem("time");
			}
		} else { alertify.error("Wrong answer, try again!!"); }
	});

});

function startRebus(arg) {
	$("#melody").attr("src", `sound/${arg}.mp3`);
	console.log(num);
}

function startTime() {
	setInterval(function () {
		time = parseInt(timeStorage.getItem("time")) - 1;
		$(".time").val(time).trigger('change');
		if (time == 0) {
			alertify.error("Time is out!");
			setTimeout(() => window.open("file:///C:/Users/podle/OneDrive/%D0%A0%D0%BE%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D1%96%D0%BB/Task%2004.04.2025%20-%2018.04.2025/Taskk/task1.html", "_self", false), 2000);
			timeStorage.removeItem("time");
			localStorage.removeItem("time");
		} else if (time > 0) {
			localStorage.setItem("time", time);
		}
	}, 1000);
}