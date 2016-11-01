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

$(document).ready(function()
{
    initSelectBox();
});

function initSelectBox(){
    var device = {smartphone: 'Smartphone', tablet: 'Tablet', notebook: 'Notebook', desktop: 'Desktop'};
    var connection = {wifi: 'Wi-fi', ethernet: 'Ethernet'};

    for (num = 1; num <= 103; num++) {
        $("#rooms").append('<option value="' + num + '">' + num + '</option>');
    }

    for (var c in connection) {
        $("#connection").append('<option value="' + connection[c] + '">' + connection[c] + '</option>');

    }

    for (var d in device) {
        $("#device").append('<option value="' + device[d] + '">' + device[d] + '</option>')
    }
}