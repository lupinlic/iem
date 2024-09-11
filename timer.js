$(function(){
    function timer(settings){
        var config = {
            endDate: '2030-02-23 00:00',
            timeZone: 'Asia/Ho_Chi_Minh', 
            hours: $('#hours'),
            minutes: $('#minutes'),
            seconds: $('#seconds'),
            newSubMessage: 'The countdown has ended!'
        };

        function prependZero(number){
            return number < 10 ? '0' + number : number;
        }

        $.extend(true, config, settings || {});

        function updateTimer() {
            var currentTime = moment();
            var endDate = moment.tz(config.endDate, config.timeZone);
            var diffTime = endDate - currentTime;
            var duration = moment.duration(diffTime);

            if (diffTime <= 0) {
                endEvent($('.sub-message'), config.newSubMessage, $('.countdown'));
                return;
            }

            var days = Math.floor(duration.asDays());
            var hours = duration.hours();
            var minutes = duration.minutes();
            var seconds = duration.seconds();

            $('#days').text(prependZero(days));
            config.hours.text(prependZero(hours));
            config.minutes.text(prependZero(minutes));
            config.seconds.text(prependZero(seconds));

            if (days <= 0) {
                $('.days').hide();
            }
        }

        updateTimer(); // Cập nhật ngay lập tức khi tải trang

        var intervalID = setInterval(function(){
            updateTimer();
        }, 1000);
    }

    function endEvent($el, newText, hideEl){
        $el.text(newText);
        hideEl.hide();
    }

    timer();
});

