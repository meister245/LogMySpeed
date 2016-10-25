$(document).ready(function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
    }
});

// $(document).ready(function () {
//     $('.nav a').on('click', function () {
//         $('.navbar-toggle').click(); //bootstrap 3.x by Richard
//     });
// });