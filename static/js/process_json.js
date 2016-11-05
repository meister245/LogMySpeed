var floor_number, room_number, connection_type, device_type, nickname = null;

function prepareJSON(speedResult) {
    room_number = $('#rooms').find(":selected").text();
    connection_type = $('#connection').find(":selected").text();
    device_type = $('#device').find(":selected").text();
    nickname = $('#nickname').val();

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

    var data = {
        floorNumber: floor_number,
        roomNumber: room_number,
        connType: connection_type,
        nickname: nickname,
        deviceType: device_type,
        downloadSpeed: speedResult
    };

    sendJSON(data);
}

function sendJSON(data) {
    console.log(data);
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/submit",
        data: JSON.stringify(data),
        dataType: "json"
    });
}

function getData(conn_type) {
    $.getJSON('/data?type=' + conn_type, function (data) {
        $('#' + conn_type + '-data').empty();
        var items = [];
        console.log(data);
        for (var a in data) {
            items.length = 0;
            var rooms = data[a].room;
            var tests = data[a].tests;

            for (var fn in rooms) {
                if (rooms[fn].floor_number == 0) {
                    items.push('<td> ground floor </td>');
                } else if (rooms[fn].floor_number % 10 == 1) {
                    items.push('<td>' + rooms[fn].floor_number + 'st floor</td>');
                } else if (rooms[fn].floor_number % 10 == 2) {
                    items.push('<td>' + rooms[fn].floor_number + 'nd floor</td>');
                } else if (rooms[fn].floor_number % 10 == 3) {
                    items.push('<td>' + rooms[fn].floor_number + 'rd floor</td>');
                } else {
                    items.push('<td>' + rooms[fn].floor_number + 'th floor</td>');
                }
            }

            items.push('<td>');
            for (var rn in rooms) {
                items.push(rooms[rn].room_number + '<br/>');
            }

            items.push('</td><td>');
            for (var dt in tests) {
                items.push(tests[dt].device_type + '<br/>');
            }

            items.push('</td><td>');
            for (var ds in tests) {
                items.push(tests[ds].download_speed + ' Mbps<br/>');
            }

            items.push('</td><td>');
            for (var n in tests) {
                items.push(tests[n].nickname + '<br/>');
            }

            items.push('</td><td>');
            for (var td in tests) {
                items.push(tests[td].test_date + '<br/>');
            }

            items.push('</td>');
            $('<tr/>', {
                html: items.join('')
            }).appendTo(document.getElementById(conn_type + '-data'))
        }
    });
}