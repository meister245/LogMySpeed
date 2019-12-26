var imageAddr = "http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg";
var downloadSize = 4995374; //bytes

function initiateSpeedDetection() {
    window.setTimeout(MeasureConnectionSpeed, 1);
}

function measureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    };

    download.onerror = function (err, msg) {
        var speedMbps = 0.00;
        prepareJSON(speedMbps);
        $("#testinput").waitMe("hide");
        $("#testerror").addClass('in').slideDown();
        $("#errorwait").addClass('in').slideDown();
        $("#teststart").delay(60000).slideToggle();
    };

    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;

    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        $("#testinput").removeClass("in").slideUp().waitMe("hide");
        $("#speed").html("<h4>"+speedMbps+" Mb/s, that is: "+(speedMbps/8).toFixed(2)+" MB/s</h4>");
        $("#testresult").addClass("in").slideDown();
        prepareJSON(speedMbps);
    }
}