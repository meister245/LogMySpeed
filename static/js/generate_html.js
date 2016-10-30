$(document).ready(function () {
    var table_header =
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">Floor</th>' +
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">Room</th>' +
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">Device</th>' +
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">Download Speed</th>' +
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">Nickname</th>' +
        '<th class="col-xs-2 col-sm-2 col-md-2 col-lg-1">Test Date</th>';
    $('<tr/>', {
        html: table_header
    }).appendTo(document.getElementsByClassName('header-data'))
});

$(document).ready(function () {
    for (i = 1; i <= 103; i++) {
        $("#rooms").append('<option value="' + i + '">' + i + '</option>');
    }
});

$(document).ready(function () {
    var connection = {wifi: 'Wi-fi', ethernet:'Ethernet'};
    for (var i in connection) {
        $("#connection").append('<option value="' + connection[i] + '">' + connection[i] + '</option>');

    }
});

$(document).ready(function () {
    var device = ['Smartphone', 'Tablet', 'Notebook', 'Desktop'];
    for (var i in device) {
        $("#device").append('<option value="' + device[i] + '">' + device[i] + '</option>')
    }
});