let conference_duration = 0;

function startDuration() {
    setInterval(function () {
        conference_duration++;
        let minute, second, hour;
        const duration = conference_duration / 60;
        const sec = conference_duration % 60;
        let min = parseInt(duration);
        let hr = 0;
        if (min > 59) {
            min = min % 60;
            hr = parseInt(duration)
        }
        (sec < 10) ? (second = "0" + sec) : (second = "" + sec);
        (min < 10) ? (minute = "0" + min) : (minute = "" + min);
        (hr < 10) ? (hour = "0" + hr) : (hour = "" + hr);
        $("#duration-label").text(hour + " : " + minute + " : " + second);
    }, 1000)
}

function checkOnlyParMsg() {
    $(".watermark").hide();
    $(".confo-container").show();
}

function addElement(elem_id, stream) {
    if (stream) {
        checkOnlyParMsg();
        const el = document.createElement("div");
        const elem = document.getElementById(elem_id);
        el.setAttribute("id", "con_" + stream.getID())
        elem.appendChild(el);
        stream.play("con_" + stream.getID(), options);
        if (stream.player.stream === undefined) {
            removeElement(stream.getID());
        }
    }
}

let inviteRoom = function (details, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(this.responseText);
        }
    };

    xhttp.open("POST", "/inviteRoom/", true);
    xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(details));
};

$(".par_audio_mute").click(function (e) {});

function muteParAudio(elem) {
    const currId = elem.id;
    room.remoteStreams.forEach(function (value, index, arr) {
        if (value.clientId === currId) {
            if (elem.src.split("/")[elem.src.split("/").length - 1] === "volume_on.svg") {
                value.hardMuteAudio(function () { });
                elem.src = "../img/volume_off.svg";
                return;
            } else if (elem.src.split("/")[elem.src.split("/").length - 1] === "volume_off.svg") {
                value.hardUnmuteAudio(function () { });
                elem.src = "../img/volume_on.svg";
                return;
            }

        }
    });
}
function muteParVideo(elem) {
    const currId = elem.id;
    room.remoteStreams.forEach(function (value, index, arr) {
        if (value.clientId === currId) {
            if (elem.src.split("/")[elem.src.split("/").length - 1] === "video_on.svg") {
                value.hardMuteVideo(function () { });
                elem.src = "../img/video_off.svg";
                return;
            } else if (elem.src.split("/")[elem.src.split("/").length - 1] === "video_off.svg") {
                value.hardUnmuteVideo(function () { });
                elem.src = "../img/video_on.svg";
                return;
            }
        }
    });
}

$("#btn-device-apply").click(function () {
    $("#btn-device-apply").attr("disabled", "disabled");
    EnxRtc.switchMediaDevice(localStream, $("#mic option:selected").attr('id'), $("#cam option:selected").attr('id'), function (stream) {
        if (stream && stream.getID) {
            localStream = stream;
            toastr.success(language.l8);
            localStorage.setItem("mic", $("#mic option:selected").attr('id'));
            localStorage.setItem("cam", $("#cam option:selected").attr('id'));
            setCookie("vcxMicId", $("#mic option:selected").val());
            setCookie("vcxCamId", $("#cam option:selected").val());
            $("#btn-device-apply").removeAttr("disabled");
            document.querySelector('#preview-camerapreview-camera').style.display = 'none';
        } else {
            toastr.error(language.l9);
            $("#btn-device-apply").removeAttr("disabled");
        }
    });
});

$( "#btn-invite" ).click(function() {
    $( "#btn-invite" ).attr("disabled","disabled");
    const csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    const details = {};
    details.username = localStorage.getItem("userName");
    details.room_id = room.roomID;
    details.topic = room.roomSettings.description;
    details.message = "Here is the link to join the live";
    details._token = csrf_token;
    const inviteEmailDivs = document.getElementById("invite-email").value.split(",");
    const users = [];
    for(let i=0; i<inviteEmailDivs.length; i++){
        if(inviteEmailDivs[i] !== ""){
            if(inviteEmailDivs[i].trim().match("(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")) {
                users.push(inviteEmailDivs[i].trim());
            }else{
                toastr.error("Invalid Email ID: "+inviteEmailDivs[i]);
                $( "#btn-invite" ).removeAttr("disabled");
                return;
            }
        }
    }
    if(users.length < 1){
        toastr.error("Enter at least one participant");
        document.getElementById("invite-email").style.border= "solid 1px red";
        $( "#btn-invite" ).removeAttr("disabled");
        return;
    }
    details.inviteUsers = users;
    inviteRoom(details,function (res) {
        if(res){
            toastr.success("Invitation has been sent to "+ document.getElementById("invite-email").value);
            $( "#btn-invite" ).removeAttr("disabled");
            $("#invite-dialog").modal("hide");
            document.getElementById("invite-email").style.border= "solid 1px rgb(169, 169, 169)";
            document.getElementById("invite-email").value = "";
        }else{
            toastr.error("Error when sending Invitation");
            $( "#btn-invite" ).removeAttr("disabled");
        }
    });
});

function getDevice(callback, devices = { cam: 'cam', mic: 'mic' }) {
    EnxRtc.getDevices(function (arg) {
        if (arg.result === 0) {
            const camLst = arg.devices.cam;
            const micLst = arg.devices.mic;
            listOutCamera(camLst, devices.cam);
            listOutMic(micLst, devices.mic);
            const camPrevSel = getCookie("vcxCamId");
            const micPrevSel = getCookie("vcxMicId");
            if (camPrevSel) {
                $("#cam").val(camPrevSel);
            } else {
                $("#cam").val($("#cam option:first").val());
            }
            if (micPrevSel) {
                $("#mic").val(micPrevSel);
            } else {
                $("#mic").val($("#mic option:first").val());
            }
            callback();
        } else if (arg.result === 1153) {
            toastr.error(language.dev_access_denied);
            $("#btn-device-apply").hide();
        } else {
            toastr.error(language.dev_access_denied);
            $("#btn-device-apply").hide();
        }
    });
}

function listOutMic(micLst, device) {
    document.getElementById(device).innerHTML = "";
    for (let j = 0; j < micLst.length; j++) {
        const x = document.getElementById(device);
        const option = document.createElement("option");
        option.text = micLst[j].label;
        const micOptionId = micLst[j].deviceId;
        option.setAttribute("id", micOptionId);
        x.add(option);
    }
}

function listOutCamera(camLst, device) {
    document.getElementById(device).innerHTML = "";
    for (let i = 0; i < camLst.length; i++) {
        const x = document.getElementById(device);
        const option = document.createElement("option");
        option.text = camLst[i].label;
        const cameraOptionId = camLst[i].deviceId;
        option.setAttribute("id", cameraOptionId);
        x.add(option);
    }
}
