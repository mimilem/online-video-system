window.onload = function () {
    $(".login_join_div").show();
}
let submit = document.getElementById('login_form');

submit.addEventListener('submit', function (event) {
    event.preventDefault();

    let username = document.querySelector('#username')
    let roomId = document.querySelector('#meetingId')
    let errors = [];

    if (username.value.trim() === '') {
        errors.push('Enter your name.');
    }
    if (roomId.value.trim() === '') {
        errors.push('Enter your Room Id.')
    }

    if (errors.length > 0) {
        let mapreduce = errors.map(function (item) {
            return item + "</br>";
        });
        let allErrors = mapreduce.join('').toString();
        $.toast({
            heading: 'Error',
            text: allErrors,
            icon: 'error',
            position: 'top-right',
            showHideTransition: 'slide'
        });

        return false;
    }

    joinRoom(username.value, function (data) {
        console.log('data:' , data)
        if (!jQuery.isEmptyObject(data)) {
            const user_ref = username.value;

            window.location.href = "confo/" + data.room_id + "/participant/" + user_ref;
        } else {
            alert('No room found');
        }
    });
});


