$(document).ready(function(){
    $('.search_select_box select').selectpicker();
})


navigator.mediaDevices.enumerateDevices().then(function (devices) {
    for (var i = 0; i < devices.length; i++) {
        var device = devices[i];
        if (device.kind === 'videoinput') {
            var option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || 'camera ' + (i + 1);
            document.querySelector('select#videoSource').appendChild(option);
        }
    };
});