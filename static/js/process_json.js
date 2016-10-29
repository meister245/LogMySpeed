var floor_number, room_number, connection_type, device_type, nickname, test_date = null;

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
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/testresult",
        data: JSON.stringify(data),
        dataType: "json"
    });
}

function getWifiData() {
    $.getJSON("/wifi", function (data) {
        $("#wifi-data").empty();
        var items = [];
        for (var a in data) {
            items.length = 0;
            var rooms = data[a].rooms;
            var tests = data[a].tests;

            for (var fn in rooms) {
                if (rooms[fn].floor_number == 0) {
                    items.push('<td> földszint </td>');
                } else {
                    items.push('<td>' + rooms[fn].floor_number + '. emelet</td>');
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
                items.push(tests[ds].download_speed + '<br/>');
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
            }).appendTo(document.getElementById('wifi-data'))
        }
    });
}


function getEthernetData() {
    $.getJSON("/ethernet", function (data) {
        $("#ethernet-data").empty();
        var items = [];
        for (var a in data) {
            items.length = 0;
            var rooms = data[a].rooms;
            var tests = data[a].tests;

            for (var fn in rooms) {
                if (rooms[fn].floor_number == 0) {
                    items.push('<td> földszint </td>');
                } else {
                    items.push('<td>' + rooms[fn].floor_number + '. emelet</td>');
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
                items.push(tests[ds].download_speed + '<br/>');
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
            }).appendTo(document.getElementById('ethernet-data'))
        }
    });
}