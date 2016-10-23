$(document).ready(function(){
            $.getJSON("/json", function(data){
                var items =  [];
                $.each(data, function(key, value){
                    items.length = 0;
                    items.push('<td>' + value.floor_number + '</td>');
                    items.push('<td>' + value.room_number + '</td>');
                    $.each(value.tests, function(subkey, subvalue){
                        items.push('<td>' + subvalue.conn_type + '</td>');
                        items.push('<td>' + subvalue.download_speed + '</td>');
                        items.push('<td>' + subvalue.upload_speed + '</td>');
                        items.push('<td>' + subvalue.test_date + '</td>');
                    });
                    $('<tr/>', {
                        html : items.join('')
                    }).appendTo('tbody')
                });
            });
        });