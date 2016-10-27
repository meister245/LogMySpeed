var floor_number, room_number, connection_type, device_type, nickname, test_date = null;

function prepareJSON(speedResult) {
    room_number = $('#rooms').find(":selected").text();
    connection_type = $('#connection').find(":selected").text();
    device_type = $('#device').find(":selected").text();
    nickname = $('#nickname').val();
    test_date = (new Date()).getTime();

    switch (true) {
        case room_number <= 14:
            floor_number = 0;
            break;
        case room_number <= 31:
            floor_number = 1;
            break;
        case room_number <= 48:
            floor_number = 2;
            break;
        case room_number <= 59:
            floor_number = 3;
            break;
        case room_number <= 70:
            floor_number = 4;
            break;
        case room_number <= 81:
            floor_number = 5;
            break;
        case room_number <= 92:
            floor_number = 6;
            break;
        default:
            floor_number = 7;
    }

    var test_result = {
        floorNumber: floor_number,
        roomNumber: room_number,
        connection: connection_type,
        device: device_type,
        nickname: nickname,
        downloadSpeed: speedResult,
        test_date: test_date
    };

    sendJSON(test_result);
}

function sendJSON(asd) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/testresult",
        data: JSON.stringify(asd),
        success: function (sad) {
            console.log(sad);
        },
        dataType: "json"
    });
}

$(document).ready(function () {
    $.getJSON("/wifi", function (data) {
        var items = [];
        $.each(data, function (key, value) {
            items.length = 0;
            if (value.floor_number == 0) {
                items.push('<td> földszint </td>');
            } else {
                items.push('<td>' + value.floor_number + '. emelet</td>');
            }
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
            if (value.floor_number == 0) {
                items.push('<td> földszint </td>');
            } else {
                items.push('<td>' + value.floor_number + '. emelet</td>');
            }
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