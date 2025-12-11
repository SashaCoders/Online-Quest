
let answer = ["яблоко", "груша", "город", "школа", "сайт", "браузер",
    "плагин", "цвет", "стиль", "язык", "узор", "сорока"];

let was = [];

let progress = 0;

let num = Math.floor(1 + Math.random() * 12);

let clicksss = 0;

function restartRebus(arg) {
    $(".picture").attr("src", `rebuses/${arg}.jpg`);
}

$(document).ready(function () {
    restartRebus(num);

    $(".deskButton").click(function () {
        if (clicksss == 1) {
            $('.rules').slideUp();
            $(".deskButton").text("Description & Rules ▼");
            clicksss = 0;
        } else {
            $('.rules').slideDown();
            $(".deskButton").text("Description & Rules ▲");
            clicksss = 1;
        }
    });

    $(".Progress").knob({
        'min': 0,
        'max': 5,
        'angleArc': 120,
        'angleOffset': -60,
        'readOnly': true,
        'width': '100%',
        'lineCap': 'round',
        'displayInput': false,
        'bgColor': 'white',
        'fgColor': 'green',
        'thickness': 0.2
    });

    $('#btnTask1').click(function () {

        if ($('#inputTask1').val().toLowerCase() == answer[num - 1]) {
            alertify.success("Right answer!");
            $('#inputTask1').val("");
            progress++;
            $('.Progress').val(progress).trigger('change');
            was.push(num);

            do {
                num = Math.floor(1 + Math.random() * 12);
            } while (was.includes(num));
            restartRebus(num);

            if (progress > 5) {
                $(".nextTask").css({
                    'display': 'flex'
                }); 
                  $(".nextTask").click({
                
                }); 
            }

        } else {
            alertify.error("Wrong answer, try again!");
        }
    });
});
