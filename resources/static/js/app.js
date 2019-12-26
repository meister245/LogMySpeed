$(document).ready(function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
    }
    $('#loadstatus').delay(1500).fadeOut('slow');
    $('#preloader').delay(2000).fadeOut('slow');
});

function startTest() {
    $("#validatefail").removeClass('in').slideUp();
    $("#dataplanwarning").removeClass('in').slideUp();
    $("#validatelength").removeClass('in').slideUp();
    $("#testerror").removeClass('in').slideUp();
    
    $("#testinput").waitMe({
        text: 'Test in progress, please wait.',
        effect: 'bounce'
    });
    $("#teststart").slideToggle();

    initiateSpeedDetection();
}

function resetTest() {
    $("#testinput").addClass("in").slideDown();
    $("#testresult").removeClass("in").slideUp();
    $("#teststart").slideToggle();
}

function viewResult() {
    var chosen = $('#connection').find(":selected").text();

    if (chosen == 'Wifi') {
        $("#wifitab").click();
    } else if (chosen == 'Ethernet') {
        $("#ethtab").click();
    }

    resetTest();
}

function validateFields() {
    var room = $('#rooms').find(":selected").text();
    var conn = $('#connection').find(":selected").text();
    var device = $('#device').find(":selected").text();
    var nickname = $('#nickname').val();

    if (room == 'Room Number' || conn == 'Connection' || device == 'Device') {
        $("#validatefail").addClass('in').slideDown();
    } else if (nickname.length > 15) {
        $("#validatelength").addClass('in').slideDown();
    } else {
        startTest()
    }
}