$(document).ready(function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
    }

    $('#loadstatus').delay(1500).fadeOut('slow');
    $('#preloader').delay(2000).fadeOut('slow');

    var connection = {
        wifi: 'Wifi',
        ethernet: 'Ethernet'
    };

    var tableHeader =
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">Floor</th>' +
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">Room</th>' +
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">Device</th>' +
        '<th class="col-xs-2 col-sm-2 col-md-2 col-lg-2">Download Speed</th>' +
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">IP Address</th>' +
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">Nickname</th>' +
        '<th class="col-xs-2 col-sm-2 col-md-2 col-lg-2">Test Date</th>';

    $('<tr/>', {
        html: tableHeader
    }).appendTo(document.getElementsByClassName('header-data'));

    for (num = 1; num <= 103; num++) {
        $("#rooms").append('<option value="' + num + '">' + num + '</option>');
    }

    for (var c in connection) {
        $("#connection").append('<option value="' + connection[c] + '">' + connection[c] + '</option>');
    }
});

$('#teststart').on('click', function () {
    var room = $('#rooms').find(":selected").text();
    var conn = $('#connection').find(":selected").text();
    var device = $('#device').find(":selected").text();
    var nickname = $('#nickname').val();

    if (room == 'Room Number' || conn == 'Connection' || device == 'Device') {
        $("#validatefail").addClass('in').slideDown();
    } else if (nickname.length > 15) {
        $("#validatelength").addClass('in').slideDown();
    } else {
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
})

$('#newtest').on('click', function () {
    $("#testinput").addClass("in").slideDown();
    $("#testresult").removeClass("in").slideUp();
    $("#teststart").slideToggle();
})

$('#showresult').on('click', function() {
    var chosen = $('#connection').find(":selected").text();

    if (chosen == 'Wifi') {
        $("#wifitab").click();
    } else if (chosen == 'Ethernet') {
        $("#ethtab").click();
    }

    $("#testinput").addClass("in").slideDown();
    $("#testresult").removeClass("in").slideUp();
    $("#teststart").slideToggle();
})


$("#connection").on('change', function () {
    var wifi_devices = {smartphone: 'Smartphone', tablet: 'Tablet', notebook: 'Notebook', desktop: 'Desktop'};
    var ethernet_devices = {notebook: 'Notebook', desktop: 'Desktop'};

    conn_type = $('#connection').find(":selected").text();

    $('#device').find('option').remove();

    if (conn_type == 'Ethernet') {
        for (var e in ethernet_devices) {
            $('#device').append('<option value="' + ethernet_devices[e] + '">' + ethernet_devices[e] + '</option>')
        }
    } else {
        for (var w in wifi_devices) {
            $('#device').append('<option value="' + wifi_devices[w] + '">' + wifi_devices[w] + '</option>')
        }
    }

    $('#device').selectpicker('refresh');
});