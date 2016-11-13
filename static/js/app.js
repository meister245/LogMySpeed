$(document).ready(function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
    }
    $('#loadstatus').delay(1500).fadeOut('slow');
    $('#preloader').delay(2000).fadeOut('slow');
});

function StartTest() {
    $("#validatefail").removeClass('in').slideUp();
    $("#dataplanwarning").removeClass('in').slideUp();
    $("#validatelength").removeClass('in').slideUp();
    $("#testerror").removeClass('in').slideUp();
    
    $("#testinput").waitMe({
        text: 'Test in progress, please wait.',
        effect: 'bounce'
    });
    $("#teststart").slideToggle();

    InitiateSpeedDetection();
}

function ResetTest() {
    $("#testinput").addClass("in").slideDown();
    $("#testresult").removeClass("in").slideUp();
    $("#teststart").slideToggle();
}

function DataPlanWarning() {
    var chosen = $('#device').find(":selected").text();
    if (chosen == 'Smartphone' || chosen == 'Tablet') {
        $("#validatefail").removeClass('in').slideUp();
        $("#dataplanwarning").addClass('in').slideDown();
    } else {
        $("#dataplanwarning").removeClass('in').slideUp();
    }
}

function ViewResult() {
    var chosen = $('#connection').find(":selected").text();
    if (chosen == 'Wifi') {
        $("#wifitab").click();
    }
    if (chosen == 'Ethernet') {
        $("#ethtab").click();
    }
    ResetTest();
}

function ValidateFields() {
    var room = $('#rooms').find(":selected").text();
    var conn = $('#connection').find(":selected").text();
    var device = $('#device').find(":selected").text();
    var nickname = $('#nickname').val();

    if (room == 'Room Number' || conn == 'Connection' || device == 'Device') {
        $("#validatefail").addClass('in').slideDown();
    } else if (nickname.length > 15) {
        $("#validatelength").addClass('in').slideDown();
    } else {
        StartTest()
    }
}