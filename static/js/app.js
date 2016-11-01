$(document).ready(function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
    }
});

function StartTest() {
    // ValidateFields();
    $("#dataplanwarning").removeClass('in').slideUp();
    $("#testerror").removeClass('in').slideUp();
    $("#testinput").waitMe({
        text: 'Test in progress, please wait...',
        effect: 'bounce'
    });
    $("#teststart").slideToggle();

    InitiateSpeedDetection();

    // use for offline testing
    // prepareJSON(5.22)
}

function ResetTest() {
    $("#testinput").addClass("in").slideDown();
    $("#testresult").removeClass("in").slideUp();
    $("#teststart").slideToggle();
}

function DataPlanWarning() {
    var chosen = $('#device').find(":selected").text();
    if (chosen == 'Smartphone' || chosen == 'Tablet') {
        $("#dataplanwarning").addClass('in').slideDown();
    } else {
        $("#dataplanwarning").removeClass('in').slideUp();
    }
}

function ViewResult() {
    var chosen = $('#connection').find(":selected").text();
    if (chosen == 'Wi-fi') {
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
    var check = false;

    if (room == null || room == '') {
        document.getElementById('rooms').style.outlineColor = 'red';
        check = true;
    }

    if (conn == null || conn == '') {
        document.getElementById('connection').style.borderColor = 'red';
        check = true;
    }

    if (device == null || device == '') {
        document.getElementById('device').style.borderColor = 'red';
        check = true;
    }

    if (check == true) {
        throw new Error("Missing values!");
    }
}