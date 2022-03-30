//importLib("../js/error.js");
window.onload = function () {
    if(navigator.userAgent.indexOf(".NET") >= 0)
    {
        $("#login_form").hide();
        $("#unsupported_browser_message").show();
    }


    var prevUsername = getCookie("vcxEnablexDemoUsername");
    var prevUserpin = getCookie("vcxEnablexDemoPin");
    if (prevUsername !== "" || prevUserpin !== "") {
        document.getElementById("userName").value = prevUsername;
        document.getElementById("pin").value = prevUserpin;
    }

    EnxRtc.getDevices(function (arg) {

        if(arg.result === 0)
        {
            var camLst = arg.devices.cam;
            var micLst = arg.devices.mic;
            listOutMic(micLst);
            listOutCam(camLst);
            listOutVideoLayers();
            localStorage.setItem("mic", $(document).find('#mic').find('option:eq(0)').attr('id'));
            localStorage.setItem("cam", $(document).find('#cam').find('option:eq(0)').attr('id'));
            //localStorage.setItem("video-layers", $(document).find('#video-layers').find('option:eq(0)').attr('id'));
            localStorage.setItem("video-layers",1);
            var camPrevSel = getCookie("vcxCamId");
            var micPrevSel = getCookie("vcxMicId");

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
            $("#joinRoomByPin").show();
        }
        else if(arg.result === 1153)
        {
            $("#login_form").hide();
            $("#unsupported_browser_message").show();

        }
        else{
            $("#login_form").hide();
            $("#media-device-permission-error").show();

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
        localStorage.setItem("video-layers", '1');
    }

};

$('.icheck').iCheck({
    checkboxClass: 'icheckbox_minimal',
    radioClass: 'iradio_minimal',
});

function check_QA_Debug(query_field){
    var field = query_field;
    var url = window.location.href;
    if(url.indexOf('?' + field + '=') != -1)
        return true;
    else if(url.indexOf('&' + field + '=') != -1)
        return true;
    return false
}


var joinButton = document.querySelector('#joinRoomByPin');

// $('.icheck').on('ifToggled', function (event) {
//     document.querySelector('#mute').checked ? joinButton.removeAttribute('disabled') : joinButton.setAttribute('disabled', 'disabled')
// });


var joinRoom = function (details, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
    };
    xhttp.open("POST", "/join/", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(details));
};

$(document).on("click", "#joinRoomByPin", function (e) {
    enterRoomByPin();
});

function startWaitLoader() {
    document.getElementById("joinRoomByPin").innerHTML = language.wait + ' ..';
    document.getElementById("joinRoomByPin").setAttribute("disabled", true);
}

function stopWaitLoader() {
    document.getElementById("joinRoomByPin").innerHTML = language.join;
    document.getElementById("joinRoomByPin").removeAttribute("disabled");
}

function checkRememberMe(name, pin) {
    if ($("#remMe").prop("checked")) {
        setCookie("vcxEnablexDemoUsername", name);
        setCookie("vcxEnablexDemoPin", pin);
    }
}

function enterRoomByPin() {
    var name = document.getElementById("userName").value.trim();
    var pin = document.getElementById("pin").value.trim();
    localStorage.setItem("mic", $("#mic option:selected")[0].id);
    localStorage.setItem("cam", $("#cam option:selected")[0].id);


    // var joinAs = $("#join_as").val();

    var mute = '';

    if (document.querySelector('#mute').checked) {
        mute = 'audio';
    }
    // if(! document.querySelector('#agree_terms').checked)
    // {
    //     return false;
    // }
    var obj = {
        "pin": pin,
        "name": name
    };
    if (name === "" || pin === "") {
        toastr.error(language.pin_error,"",{ positionClass : "toast-top-center"})
    } else {
        localStorage.setItem("userName", name);
        checkRememberMe(name, pin);
        startWaitLoader();
        joinRoom(obj, function (response) {
            var res = JSON.parse(response);
            if (res) {
                if (res.result === 0) {
                    var dec = window.atob(res.token);
                    localStorage.setItem("quality", JSON.parse(dec).roomMeta.settings.quality);
                    localStorage.setItem('token', res.token);
                    localStorage.setItem("mute_type",mute);
                    window.location.href = "/room/"
                } else {
                    if (tokenError[res.result]) {
                        stopWaitLoader();
                        toastr.error(tokenError[res.result].msg,"",{ positionClass : "toast-top-center"})
                    } 
                    else {
                        stopWaitLoader();
                        toastr.error(language.invalid_pin_error,"",{ positionClass : "toast-top-center"})
                    }
                }
            } else {
                stopWaitLoader();
                toastr.error(language.no_active_room,"",{ positionClass : "toast-top-center"})
            }
        });
    }
}

function listOutMic(micLst) {
    for (var j = 0; j < micLst.length; j++) {
        var x = document.getElementById("mic");
        var option = document.createElement("option");
        option.text = micLst[j].label;
        var micoptId = micLst[j].deviceId;
        option.setAttribute("id", micoptId);
        x.add(option);
    }
}

function listOutCam(camLst) {
    for (var i = 0; i < camLst.length; i++) {
        var x = document.getElementById("cam");
        var option = document.createElement("option");
        option.text = camLst[i].label;
        var camoptId = camLst[i].deviceId;
        option.setAttribute("id", camoptId);
        x.add(option);
    }
}
function listOutVideoLayers() {
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    var maxLayers = isChrome ? 3 : 1;
    for (var i = maxLayers; i > 0; i--) {
        var x = document.getElementById("video-layers");
        var option = document.createElement("option");
        if (i == 1){
            option.text = i  + " Video Layer";
        }else{
            option.text = i + " Video Layers";
        }
        //var camoptId = i;
        option.setAttribute("id", i);
        x.add(option);
    }
}

$(document).on("keyup", ".enter-join", function (event) {
    if (event.keyCode === 13) {
        enterRoomByPin();
    }
});
