$('.icheck').iCheck({
    checkboxClass: 'icheckbox_minimal',
    radioClass: 'iradio_minimal',
});
const joinButton = document.querySelector('#joinRoom');

const joinRoom = function (details, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(this.responseText);
        }
    };
    xhttp.open("POST", "/joinRoom/", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(details));
};
document.getElementById("joinRoom").addEventListener('click', function (event) {
    enterRoom();
});


function enterRoom(){
    const key = window.location.href.split("/")[window.location.href.split("/").length - 1];
    const name = document.getElementById("userName").value.trim();
    localStorage.setItem("mic", $("#mic option:selected")[0].id);
    localStorage.setItem("cam", $("#cam option:selected")[0].id);
    if(name === ""){
        toastr.error("Name should not be empty","",{ positionClass : "toast-top-center"});
        return false;
    }
    let mute = '';

    if (document.querySelector('#mute').checked) {
        mute = 'audio';
    }
    localStorage.setItem("userName", name);
    const obj = {
        "key": key,
        "name": name
    };
    startWaitLoader();
    joinRoom(obj, function (response) {
        const res = JSON.parse(response);
        if (res) {
            if (res.result === 0) {
                const dec = window.atob(res.token);
                console.log(JSON.parse(dec).roomMeta.settings.quality);
                localStorage.setItem("quality", JSON.parse(dec).roomMeta.settings.quality);
                localStorage.setItem('token', res.token);
                localStorage.setItem("mute_type",mute);
                window.location.href = "/room/";
            } else {
                stopWaitLoader();
                if (tokenError[res.result]) {
                    toastr.error(tokenError[res.result].msg,"",{ positionClass : "toast-top-center"})

                } else {
                    toastr.error("Error connecting room. Check your credentials.","",{ positionClass : "toast-top-center"})
                }
            }
        } else {
            stopWaitLoader();
            toastr.error("No active room found ","",{ positionClass : "toast-top-center"})

        }
    });
}

function startWaitLoader() {
    document.getElementById("joinRoom").innerHTML = 'Wait ..';
    document.getElementById("joinRoom").setAttribute("disabled", true);
}

function stopWaitLoader() {
    document.getElementById("joinRoom").innerHTML = 'Join';
    document.getElementById("joinRoom").removeAttribute("disabled");
}

window.onload = function () {
    EnxRtc.getDevices(function (arg) {
        if(arg.result === 0)
        {
            const camLst = arg.devices.cam;
            const micLst = arg.devices.mic;
            listOutMic(micLst);
            listOutCam(camLst);
            listOutVideoLayers();
            localStorage.setItem("mic", $(document).find('#mic').find('option:eq(0)').attr('id'));
            localStorage.setItem("cam", $(document).find('#cam').find('option:eq(0)').attr('id'));
            localStorage.setItem("video-layers", $(document).find('#video-layers').find('option:eq(0)').attr('id'));
            const camPrevSel = getCookie("vcxCamId");
            const micPrevSel = getCookie("vcxMicId");
            if (camPrevSel && $("#cam option[value='"+camPrevSel+"']").length >= 0) {
                $("#cam").val(camPrevSel);
            }
            else{
                $("#cam").val($("#cam option:first").val());

            }
            if (micPrevSel  && $("#mic option[value='"+micPrevSel+"']").length >= 0) {
                $("#mic").val(micPrevSel);
            }
            else{
                $("#mic").val($("#mic option:first").val());
            }

            $("#device-selection-con").show();
            $("#joinRoom").show();
        }
        else
        {
            $("#media-device-permission-error").show();
            $("#login_form").hide();

        }

    });

    $(document).on("change", '#mic', function () {
        localStorage.setItem("mic", $(this).find("option:selected").attr('id'));
        setCookie("vcxMicId", $(this).find("option:selected").val());
    });
    $(document).on("change", '#cam', function () {
        localStorage.setItem("cam", $(this).find("option:selected").attr('id'));
        setCookie("vcxCamId", $(this).find("option:selected").val());
    });
    if(check_QA_Debug("qa"))
    {
        $('#video_layer_container').show();
        $(document).on("change", '#video-layers', function () {
            localStorage.setItem("video-layers", $(this).find("option:selected").attr('id'));
        });
    }
    else {
        $('#video_layer_container').hide();
        localStorage.setItem("video-layers", '3');
    }

};
function check_QA_Debug(query_field){
    var field = query_field;
    var url = window.location.href;
    if(url.indexOf('?' + field + '=') !== -1)
        return true;
    else if(url.indexOf('&' + field + '=') !== -1)
        return true;
    return false
}
function listOutVideoLayers() {
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    const maxLayers = isChrome ? 3 : 1;
    for (var i = maxLayers; i > 0; i--) {
        const x = document.getElementById("video-layers");
        const option = document.createElement("option");
        if (i === 1){
            option.text = i  + " Video Layer";
        }else{
            option.text = i + " Video Layers";
        }
        //var camoptId = i;
        option.setAttribute("id", i);
        x.add(option);
    }
}
function listOutMic(micLst) {
    for (var j = 0; j < micLst.length; j++) {
        const x = document.getElementById("mic");
        const option = document.createElement("option");
        option.text = micLst[j].label;
        const micoptId = micLst[j].deviceId;
        option.setAttribute("id", micoptId);
        x.add(option);
    }
}

function listOutCam(camLst) {
    for (var i = 0; i < camLst.length; i++) {
        const x = document.getElementById("cam");
        const option = document.createElement("option");
        option.text = camLst[i].label;
        const camoptId = camLst[i].deviceId;
        option.setAttribute("id", camoptId);
        x.add(option);
    }
}


$(document).on("keyup", function (event) {
    if (event.keyCode === 13) {
        enterRoom();
    }
});
