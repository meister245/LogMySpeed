$(window).on("load", function () {
    var connection = {wifi: 'Wifi', ethernet: 'Ethernet'};

    var table_header =
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">Floor</th>' +
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">Room</th>' +
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">Device</th>' +
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">Download Speed</th>' +
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">Nickname</th>' +
        '<th class="col-xs-2 col-sm-2 col-md-2 col-lg-1">Test Date</th>';
    $('<tr/>', {
        html: table_header
    }).appendTo(document.getElementsByClassName('header-data'));

    for (num = 1; num <= 103; num++) {
        $("#rooms").append('<option value="' + num + '">' + num + '</option>');
    }

    for (var c in connection) {
        $("#connection").append('<option value="' + connection[c] + '">' + connection[c] + '</option>');
    }
});

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