$(document).ready(function () {
    $.getJSON("/wifi", function (data) {
        var items = [];
        $.each(data, function (key, value) {
            items.length = 0;
            items.push('<td>' + value.floor_number + '</td>');
            items.push('<td>' + value.room_number + '</td>');
            items.push('<td>');
            $.each(value.tests, function (subkey, subvalue) {
                items.push(subvalue.device_type + '<br/>');
            });
            items.push('</td>' + '<td>');
            $.each(value.tests, function (subkey, subvalue) {
                items.push(subvalue.download_speed + ' Mbps<br/>');
            });
            items.push('</td>' + '<td>');
            $.each(value.tests, function (subkey, subvalue) {
                items.push(subvalue.nickname + '<br/>');
            });
            items.push('</td>' + '<td>');
            $.each(value.tests, function (subkey, subvalue) {
                items.push(subvalue.test_date + '<br/>');
            });
            items.push('</td>');
            $('<tr/>', {
                html: items.join('')
            }).appendTo(document.getElementById('wifi-data'))
        });
    });
});

$(document).ready(function () {
    $.getJSON("/ethernet", function (data) {
        var items = [];
        $.each(data, function (key, value) {
            items.length = 0;
            items.push('<td>' + value.floor_number + '</td>');
            items.push('<td>' + value.room_number + '</td>');
            items.push('<td>');
            $.each(value.tests, function (subkey, subvalue) {
                items.push(subvalue.device_type + '<br/>');
            });
            items.push('</td>' + '<td>');
            $.each(value.tests, function (subkey, subvalue) {
                items.push(subvalue.download_speed + ' Mbps<br/>');
            });
            items.push('</td>' + '<td>');
            $.each(value.tests, function (subkey, subvalue) {
                items.push(subvalue.nickname + '<br/>');
            });
            items.push('</td>' + '<td>');
            $.each(value.tests, function (subkey, subvalue) {
                items.push(subvalue.test_date + '<br/>');
            });
            items.push('</td>');
            $('<tr/>', {
                html: items.join('')
            }).appendTo(document.getElementById('ethernet-data'))
        });
    });
});