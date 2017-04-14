$(function () {
    $('a[href*=\\#]').each(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname && this.hash.replace(/#/, '')) {
            var $targetId = $(this.hash);
            var $targetAnchor = $('[name=' + this.hash.slice(1) + ']');
            var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
            if ($target) {
                var targetOffset = $target.offset().top;
                $(this).click(function () {
                    $('#nav li a').removeClass('active');
                    $(this).addClass('active');
                    $('html, body').animate({scrollTop: targetOffset}, 900);
                    return false;
                })
            }
        }
    });

    var oC = document.getElementById('canvas');
    var oGc = oC.getContext('2d');

    var r1 = 480;
    var r2 = 280;

    var circle = {
        x: 480,
        y: 480,
        radius: 442
    };
    var smccircle = {
        x: 480,
        y: 480,
        radius: 242
    };

    var rotate1 = 0;
    var rotate2 = 0;

    draw();

    setInterval(function () {
        draw();
        rotate1 += 10;
        rotate2 -= 30;
    }, 700);

    function draw() {
        //背景色
        oGc.fillStyle = '#323d4b';
        oGc.fillRect(0, 0, 960, 960);
        oGc.fill();

        //外彩色扇形背景圆1
        ites(0, 360, 480, '#323d4b');

        //彩色外扇叶
        ites(1 + rotate1, 44 + rotate1, r1, '#1777e2');
        ites(46 + rotate1, 89 + rotate1, r1, '#b017e2');
        ites(91 + rotate1, 134 + rotate1, r1, '#4c17e2');
        ites(136 + rotate1, 179 + rotate1, r1, '#ffbc3a');
        ites(181 + rotate1, 224 + rotate1, r1, '#e217a1');
        ites(226 + rotate1, 269 + rotate1, r1, '#17cde2');
        ites(271 + rotate1, 314 + rotate1, r1, '#3fc371');
        ites(316 + rotate1, 359 + rotate1, r1, '#e27217');

        //内覆盖扇形背景圆1
        ites(0, 360, 400, '#273341');

        //彩色内扇叶
        ites(1 + rotate2, 44 + rotate2, r2, '#4c17e2');
        ites(46 + rotate2, 89 + rotate2, r2, '#1777e2');
        ites(91 + rotate2, 134 + rotate2, r2, '#17cde2');
        ites(136 + rotate2, 179 + rotate2, r2, '#3fc371');
        ites(181 + rotate2, 224 + rotate2, r2, '#ffbc3a');
        ites(226 + rotate2, 269 + rotate2, r2, '#e27217');
        ites(271 + rotate2, 314 + rotate2, r2, '#e217a1');
        ites(316 + rotate2, 359 + rotate2, r2, '#b017e2');

        //内覆盖扇形背景圆2
        ites(0, 360, 200, '#273341');

        oGc.arc(480, 480, r2, 0, rads(45), false);
        oGc.save();

        drawCircularText(smccircle, 'CSS', rads(18 + rotate2), rads(28 + rotate2), 'center');
        drawCircularText(smccircle, 'bootstrap', rads(50 + rotate2), rads(86 + rotate2), 'center');
        drawCircularText(smccircle, 'angular', rads(98 + rotate2), rads(127 + rotate2), 'center');
        drawCircularText(smccircle, 'html5', rads(143 + rotate2), rads(173 + rotate2), 'center');
        drawCircularText(smccircle, 'CSS3', rads(188 + rotate2), rads(216 + rotate2), 'center');
        drawCircularText(smccircle, 'JQuery', rads(238 + rotate2), rads(258 + rotate2), 'center');
        drawCircularText(smccircle, 'javascript', rads(274 + rotate2), rads(310 + rotate2), 'center');
        drawCircularText(smccircle, 'html', rads(328 + rotate2), rads(348 + rotate2), 'center');

        oGc.restore();

        drawCircularText(circle, 'chrome', rads(14 + rotate1), rads(32 + rotate1), 'center');
        drawCircularText(circle, 'firefox', rads(53 + rotate1), rads(80 + rotate1), 'center');
        drawCircularText(circle, 'git', rads(104 + rotate1), rads(124 + rotate1), 'center');
        drawCircularText(circle, 'photoshop', rads(143 + rotate1), rads(175 + rotate1), 'center');
        drawCircularText(circle, 'webstorm', rads(188 + rotate1), rads(220 + rotate1), 'center');
        drawCircularText(circle, 'nodejs', rads(234 + rotate1), rads(260 + rotate1), 'center');
        drawCircularText(circle, 'c', rads(294 + rotate1), rads(308 + rotate1), 'center');
        drawCircularText(circle, 'python', rads(324 + rotate1), rads(350 + rotate1), 'center');

    }

    //转换弧度
    function rads(x) {
        return Math.PI * x / 180;
    }

    //圆
    function ites(a, b, r, color) {
        oGc.beginPath();
        oGc.moveTo(480, 480);
        oGc.arc(480, 480, r, rads(a), rads(b), false);
        oGc.closePath();
        oGc.fillStyle = color;
        oGc.fill()
    }

    //写字
    function drawCircularText(s, string, startAngle, endAngle, lv) {
        var radius = s.radius;
        var angleDecrement = (startAngle - endAngle) / (string.length - 1);
        var angle = parseFloat(startAngle);
        var index = 0;
        var character;

        oGc.save();

        oGc.fillStyle = '#fff';
        oGc.font = '40px 微软雅黑';
        oGc.textAlign = lv;
        oGc.textBaseline = 'middle';

        while (index < string.length) {
            character = string.charAt(index);
            oGc.save();
            oGc.beginPath();
            oGc.translate(s.x + Math.cos(angle) * radius, s.y + Math.sin(angle) * radius);
            oGc.rotate(Math.PI / 2 + angle);
            oGc.fillText(character, 0, 0);
            angle -= angleDecrement;
            index++;
            oGc.restore();
        }
        oGc.restore();
    }
});