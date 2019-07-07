
    let colors = [];
    let cnt = 0;
    let matrixX = 12;
    let matrixY = 32;
    let run = true;
    let blockSize = Math.floor(window.innerWidth / matrixY);

    function wheel(WheelPos) {
        if (WheelPos < 85) {
            return [WheelPos * 3, 255 - WheelPos * 3, 0];
        } else if (WheelPos < 170) {
            WheelPos -= 85;
            return [255 - WheelPos * 3, 0, WheelPos * 3];
        } else {
            WheelPos -= 170;
            return [0, WheelPos * 3, 255 - WheelPos * 3];
        }
    }

    function colorRun(i) {
        for (x = 0; x < matrixX; x++) {
            for (y = 0; y < matrixY; y++) {
                colors = wheel((((x + y) * 256 / (matrixX * matrixY) + i) & 255));
                $('#block' + x + "_" + y).css('background-color', 'rgb(' + colors[0] + ',' + colors[1] + ',' + colors[2]);
            }
        }
    }

    function clearColorRun(run) {
        if (run == true) {
            myVar = setInterval(function () {
                colorRun(cnt);
                cnt++;
                if (cnt > 256) cnt = 0;
            }, 25);
        } else {
            clearInterval(myVar);
        }
    }


    $(document).ready(function () {
        $(document).on('keydown', function (e) {
            console.log(e.keyCode);
            if (e.keyCode == 32) {
                if (run == false) {
                    run = true;
                } else {
                    run = false;
                }
            }
            clearColorRun(run);
        });

        for (x = 0; x < matrixX; x++) {
            $('#color__holder').append("<br>");
            for (y = 0; y < matrixY; y++) {
                let box = "<div class='block' id='block" + x + "_" + y + "'></div>";
                $('#color__holder').append(box);
            }
        }
        clearColorRun(run);
        $('.block').css('width', blockSize + 'px');
    });
