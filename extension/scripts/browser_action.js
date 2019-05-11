jQuery(function ($) {
    const $startRecording = $('#start-recording');
    $startRecording.on('click', function () {
        alert('Recording all events');
        var currentState = $startRecording.html();
        if (currentState === 'Start recording') {
            $(this).html('Stop recording');
        } else {
            $(this).html('Start recording');
        }
    });
});
