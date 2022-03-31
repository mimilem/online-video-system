///////////////////////////////////////////////////////
//
// File: room.js
// This function fetches Room-Information to which the user is logging in
//
// Last Updated: 29-11-2018
// Reformat, Indentation, Inline Comments
//
/////////////////////////////////////////////////////


const joinRoom = function (roomName, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const response = JSON.parse(this.responseText);
            console.log(response)
            if (response.error) {
                $.toast({
                    heading: 'Error',
                    text: response.error,
                    icon: 'error',
                    position: 'top-right',
                    showHideTransition: 'slide'
                });
            } else {
                callback(response.room);
            }
        }
    };
    xhttp.open("GET", "../getRoom/" + roomName, false);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(roomName));
};

