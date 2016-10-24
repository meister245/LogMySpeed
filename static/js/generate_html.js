$(document).ready(function(){
    var table_header =
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">Floor</th>' +
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-1">Room</th>' +
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-2">Device</th>' +
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-2">Download Speed</th>' +
        '<th class="col-xs-1 col-sm-1 col-md-1 col-lg-2">Upload Speed</th>' +
        '<th class="col-xs-2 col-sm-2 col-md-2 col-lg-2">Test Date</th>';
    $('<tr/>', {
        html : table_header
    }).appendTo(document.getElementsByClassName('header-data'))
});

$(document).ready(function(){
    var rooms = [];
    for (i = 1; i <= 103; i++) {
        rooms.push('<option value="'+i+'">'+i+'</option>')
    }
    rooms = rooms.join('');
    $("#rooms").append(rooms);
});

