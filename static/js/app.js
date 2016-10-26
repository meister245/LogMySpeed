$(document).ready(function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
    }
});

function DataPlanWarning() {
    var chosen = $('#device').find(":selected").text();
    if (chosen == 'Smartphone' || chosen == 'Tablet') {
        $("#dataplanwarning").addClass('in').slideDown();
    } else {
        $("#dataplanwarning").removeClass('in').slideUp();
    }
}

function StartTest(){
    $("#dataplanwarning").removeClass('in').slideUp();
    $("#speedInput").slideToggle();
    $("#startTest").slideToggle();


    // InitiateSpeedDetection()
}

// toogle mobile navbar collapse on action
// $(document).ready(function () {
//     $('.nav a').on('click', function () {
//         $('.navbar-toggle').click(); //bootstrap 3.x by Richard
//     });
// });