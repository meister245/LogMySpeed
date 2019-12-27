var floorNumber, roomNumber, connectionType, deviceType, nickName = null;

function sendResult(speedResult) {
    roomNumber = $('#rooms').find(":selected").text();
    connectionType = $('#connection').find(":selected").text();
    deviceType = $('#device').find(":selected").text();
    nickName = $('#nickname').val();

    switch (true) {
        case roomNumber <= 14:
            floorNumber = 0;
            break;
        case roomNumber <= 31:
            floorNumber = 1;
            break;
        case roomNumber <= 48:
            floorNumber = 2;
            break;
        case roomNumber <= 59:
            floorNumber = 3;
            break;
        case roomNumber <= 70:
            floorNumber = 4;
            break;
        case roomNumber <= 81:
            floorNumber = 5;
            break;
        case roomNumber <= 92:
            floorNumber = 6;
            break;
        default:
            floorNumber = 7;
    }

   var data = {
        floorNumber: floorNumber,
        roomNumber: roomNumber,
        connType: connectionType,
        nickname: nickName,
        deviceType: deviceType,
        downloadSpeed: speedResult
    };

   console.log(data);

   $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/api/data",
        data: JSON.stringify(data),
        dataType: "json"
   });
}

function getData(conn_type) {
    var items = [];

    $.getJSON('/api/data?type=' + conn_type, function (data) {
            $('#' + conn_type + '-data').empty();

            console.log(data);

            for (var a in data) {
                items.length = 0;

                var tests = data[a].tests;

                if (data[a].floor_number == 0) {
                    items.push('<td> ground floor </td>');
                } else if (data[a].floor_number % 10 == 1) {
                    items.push('<td>' + data[a].floor_number + 'st floor</td>');
                } else if (data[a].floor_number % 10 == 2) {
                    items.push('<td>' + data[a].floor_number + 'nd floor</td>');
                } else if (data[a].floor_number % 10 == 3) {
                    items.push('<td>' + data[a].floor_number + 'rd floor</td>');
                } else {
                    items.push('<td>' + data[a].floor_number + 'th floor</td>');
                }

                items.push('<td>');
                items.push(data[a].room_number + '<br/>');

                items.push('</td><td>');
                for (var dt in tests) {
                    items.push(tests[dt].device_type + '<br/>');
                }

                items.push('</td><td>');
                for (var ds in tests) {
                    if (tests[ds].download_speed == 0.00) {
                        items.push('<span style="color: red">Connection Error</span><br/>')
                    } else {
                        items.push(tests[ds].download_speed + ' Mbps<br/>');
                    }
                }

                items.push('</td><td>');
                for (var ra in tests) {
                    items.push(tests[ra].remote_addr + '<br/>');
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
        }
    )
}