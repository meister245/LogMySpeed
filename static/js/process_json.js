$(document).ready(function(){
    $.getJSON("/wifi", function(data){
        var items =  [];
        $.each(data, function(key, value){
            items.length = 0;
            items.push('<td>' + value.floor_number + '</td>');
            items.push('<td>' + value.room_number + '</td>');
            items.push('<td>');
            $.each(value.tests, function(subkey, subvalue){
                items.push(subvalue.device_type + '<br/>');
            });
            items.push('</td>'+'<td>');
            $.each(value.tests, function(subkey, subvalue){
                items.push(subvalue.download_speed + ' MB/s<br/>');
            });
            items.push('</td>'+'<td>');
            $.each(value.tests, function(subkey, subvalue){
                items.push(subvalue.upload_speed + ' MB/s<br/>');
            });
            items.push('</td>'+'<td>');
            $.each(value.tests, function(subkey, subvalue){
                items.push(subvalue.test_date + '<br/>');
            });
            items.push('</td>');
            $('<tr/>', {
                html : items.join('')
            }).appendTo(document.getElementsByClassName('wifi-data'))
        });
    });
});

$(document).ready(function(){
    $.getJSON("/ethernet", function(data){
        var items =  [];
        $.each(data, function(key, value){
            items.length = 0;
            items.push('<td>' + value.floor_number + '</td>');
            items.push('<td>' + value.room_number + '</td>');
            items.push('<td>');
            $.each(value.tests, function(subkey, subvalue){
                items.push(subvalue.device_type + '<br/>');
            });
            items.push('</td>'+'<td>');
            $.each(value.tests, function(subkey, subvalue){
                items.push(subvalue.download_speed + ' MB/s<br/>');
            });
            items.push('</td>'+'<td>');
            $.each(value.tests, function(subkey, subvalue){
                items.push(subvalue.upload_speed + ' MB/s<br/>');
            });
            items.push('</td>'+'<td>');
            $.each(value.tests, function(subkey, subvalue){
                items.push(subvalue.test_date + '<br/>');
            });
            items.push('</td>');
            $('<tr/>', {
                html : items.join('')
            }).appendTo(document.getElementsByClassName('ethernet-data'))
        });
    });
});

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