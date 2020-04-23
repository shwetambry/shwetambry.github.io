class Clock {
    correct = 0;
    attempt = 0;
    feedback = "";
    h; m; fh; fm;
    getCorrect() {
        return this.correct;
    }
    getAttempt() {
        return this.attempt;
    }
    getfeedbackText() {
        return this.feedback;
    }
    reset() {
        this.feedback = "";
    }
    setUp() {
        this.reset();
        this.h = Math.floor(Math.random() * 12) + 1;
        this.m = Math.floor(Math.random() * 4) * 15;
        drawClock(this.h, this.m);
        this.fh = Math.floor(Math.random() * 5);
        this.fm = Math.floor(Math.random() * 7) * 5;
        var txt = "";
        if (this.fh == 1) {
            txt += "1 hour";
        }
        if (this.fh > 1) {
            txt += this.fh + " hours";
        }
        if (this.fh > 0 && this.fm > 0) {
            txt += " and ";
        }
        if (this.fm > 0) {
            txt += this.fm + " minutes";
        }
        $("#futQues").html(txt);
        $("#timeHour").focus();
    }
    check() {
        this.attempt += 3;
        if (
            ($("#timeHour").val() == this.h && $("#timeMin").val() == this.m) ||
            $("#timeMin").val() == "0" + this.m) {
            this.correct += 1;
            $("#timeMin").css("background-color", "green");
            $("#timeHour").css("background-color", "green");

        } else {
            $("#timeMin").css("background-color", "red");
            $("#timeHour").css("background-color", "red");
        }
        if ($("#timeM").val().toLowerCase().trim() == timeInWords(this.h, this.m)) {
            this.correct += 1;
            $("#timeM").css("background-color", "green");
        } else {
            $("#timeM").css("background-color", "red");
        }
        var ft = futureTime(this.h, this.m, this.fh, this.fm);
        if (
            $("#futureTimeHour").val() == ft[0] &&
            $("#futureTimeMin").val() == ft[1]
        ) {
            this.correct += 1;
            $("#futureTimeMin").css("background-color", "green");
            $("#futureTimeHour").css("background-color", "green");
        } else {
            $("#futureTimeMin").css("background-color", "red");
            $("#futureTimeHour").css("background-color", "red");
        }
        this.feedback = "Answers"
        this.feedback += "<p>1. " + this.h + ":" + this.m;
        if (this.m == 0) {
            this.feedback += "0";
        }
        this.feedback += ".</p>";
        this.feedback += "<p>2. " + timeInWords(this.h, this.m) + ".</p>";
        var ft = futureTime(this.h, this.m, this.fh, this.fm);
        this.feedback += "<p>3. " + ft[0] + ":";
        if (ft[1] < 10) {
            this.feedback += "0";
        }
        this.feedback += ft[1] + ".</p>";
    }

}
function futureTime(h1, m1, h2, m2) {
    var mins = (m1 + m2) % 60;
    var q = Math.floor((m1 + m2) / 60);
    var hour = h1 + h2 + q;
    if (hour > 12) {
        hour = hour % 12;
    }
    return [hour, mins];
}
function timeInWords(h, m) {
    txt = "";
    if (m == 0) {
        txt = h + " o'clock";
    } else if (m == 15) {
        txt = "quarter past " + h;
    } else if (m == 30) {
        txt = "half past " + h;
    } else {
        txt = "quarter to " + ((h % 12) + 1);
    }
    return txt;
}
var ctx;
var radius;
$(document).ready(function () {
    var canvas = $("#myCanvas")[0];
    ctx = canvas.getContext("2d");
    radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.9;

});

function drawClock(h, m) {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius, h, m);
}

function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, "saddlebrown");
    grad.addColorStop(0.5, "white");
    grad.addColorStop(1, "saddlebrown");
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = "saddlebrown";
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = (num * Math.PI) / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius, h, m) {
    hour = h;
    minute = m;
    hour = hour % 12;
    hour = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60);
    //(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI) / 30;
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);

}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
