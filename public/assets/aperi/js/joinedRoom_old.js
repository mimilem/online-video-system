var localStream = null;
var username = null;
var room, localId, roomType = null;
var bootStrapAngular;
var VideoSize;
var streamShare = null;
var canvasStarted = false;
var shareStart = false;
var presentationStarted = false;
var audio_muted_all = false;
var ATUserList = [];
var isModerator = false;
var active_talker = false;
var audio_muted = false;
var video_muted = false;
var shareStream = null;
var recording_stared = false;
var chatCount = 0;
var oldATList = [];
var SubscribedStreamMap = new Map();
var streams = [{}],
    token = null;
var localUserRef = {};
var shareScreenStreamId = 11;
var desktop_shared = false;
var line_icon_class;
var layoutContainer = document.querySelector('#layout_manager');
var expandIcon = `<svg version="1.1" id="expand-icon" x="0px" y="0px" viewBox="0 0 490.667 490.667" style="enable-background:new 0 0 490.667 490.667;" xml:space="preserve" class="">
<g transform="matrix(0.932065 0 0 0.932065 16.6666 16.6666)"><g><g><path d="M423.531,67.136c-4.16-4.16-10.923-4.16-15.083,0L259.115,216.469c-4.16,4.16-4.16,10.923,0,15.083    c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.531-3.115L423.531,82.219    C427.691,78.059,427.691,71.296,423.531,67.136z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d44f1b"/>
</g></g><g><g><path d="M416,64c-5.888,0-10.667,4.779-10.667,10.667v128c0,5.888,4.779,10.667,10.667,10.667c5.888,0,10.667-4.779,10.667-10.667    v-128C426.667,68.779,421.888,64,416,64z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d44f1b"/>    </g></g><g>    <g>        <path d="M416,64H288c-5.888,0-10.667,4.779-10.667,10.667S282.112,85.333,288,85.333h128c5.888,0,10.667-4.779,10.667-10.667    S421.888,64,416,64z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d44f1b"/>    </g></g><g>    <g>        <path d="M231.531,259.136c-4.16-4.16-10.923-4.16-15.083,0L67.115,408.469c-4.16,4.16-4.16,10.923,0,15.083    c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.531-3.115l149.333-149.333    C235.691,270.059,235.691,263.296,231.531,259.136z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d44f1b"/>    </g></g><g>    <g>        <path d="M74.667,277.333C68.779,277.333,64,282.112,64,288v128c0,5.888,4.779,10.667,10.667,10.667S85.333,421.888,85.333,416V288    C85.333,282.112,80.555,277.333,74.667,277.333z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d44f1b"/>    </g></g><g>    <g>        <path d="M202.667,405.333h-128C68.779,405.333,64,410.112,64,416c0,5.888,4.779,10.667,10.667,10.667h128    c5.888,0,10.667-4.779,10.667-10.667C213.333,410.112,208.555,405.333,202.667,405.333z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d44f1b"/>    </g></g><g>    <g>        <path d="M458.667,0H32C14.357,0,0,14.357,0,32v426.667c0,17.643,14.357,32,32,32h426.667c17.643,0,32-14.357,32-32V32    C490.667,14.357,476.309,0,458.667,0z M469.333,458.667c0,5.867-4.8,10.667-10.667,10.667H32c-5.867,0-10.667-4.8-10.667-10.667    V32c0-5.867,4.8-10.667,10.667-10.667h426.667c5.867,0,10.667,4.8,10.667,10.667V458.667z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d44f1b"/></g></g></g></svg>`;

var collapseIcon = `<svg  id="collapse-grid" x="0px" y="0px" viewBox="0 0 271.673 271.673" style="enable-background:new 0 0 271.673 271.673;" xml:space="preserve"><g><path style="fill:#d44f1b;" d="M10.449,0h104.49c5.771,0,10.449,4.678,10.449,10.449v104.49c0,5.771-4.678,10.449-10.449,10.449
    H10.449C4.678,125.388,0,120.71,0,114.939V10.449C0,4.678,4.678,0,10.449,0z"/>
    <path style="fill:#d44f1b;" d="M156.735,0h104.49c5.771,0,10.449,4.678,10.449,10.449v104.49c0,5.771-4.678,10.449-10.449,10.449
    h-104.49c-5.771,0-10.449-4.678-10.449-10.449V10.449C146.286,4.678,150.964,0,156.735,0z"/>
    <path style="fill:#d44f1b;" d="M10.449,146.286h104.49c5.771,0,10.449,4.678,10.449,10.449v104.49
    c0,5.771-4.678,10.449-10.449,10.449H10.449C4.678,271.673,0,266.995,0,261.224v-104.49C0,150.964,4.678,146.286,10.449,146.286z" />
    <path style="fill:#d44f1b;" d="M156.735,146.286h104.49c5.771,0,10.449,4.678,10.449,10.449v104.49
    c0,5.771-4.678,10.449-10.449,10.449h-104.49c-5.771,0-10.449-4.678-10.449-10.449v-104.49
    C146.286,150.964,150.964,146.286,156.735,146.286z"/></g></svg>`;


var videoMaximized = false;

var toolbar_options = {
    "moderator": {
        recording: true,
        screenShare: true,
        playVideo: true,
        whiteboard: false,
        chat: false,
        videoMute: true,
        audioMute: true,
        feedback: true,
        raiseHandList: false,
        settings: true
    },
    "participant": {
        screenShare: true,
        playVideo: false,
        whiteboard: false,
        chat: false,
        feedback: true,
        videoMute: true,
        audioMute: true,
        raiseHand: false,
        settings: true
    }
}

var options = {
    id: 'vcx_1001',
    attachMode: '',
    resizer: false,
    player: {
        'height': 'inherit',
        'minHeight': 'inherit',
        'minWidth': 'inherit',
        'width': 'inherit',
        'abwd': {
            language: localStorage.getItem("language"),
            enabled: true,
            notification: 'app'
        }
    },
    toolbar: {
        'displayMode': false,

    }
};
var optionsLocal = {
    player: {
        'height': '160px',
        'width': '80%',
        'minHeight': 'inherit',
        'minWidth': 'inherit'
    },
    toolbar: {
        displayMode: false,
        branding: {
            display: false
        }
    }
};

var layoutConfig = {
    ATHighlightClass: '',
    ATHighlightStyle: '2px solid red',
};

var chatTag = document.querySelector("#chat-tag");
var muteUnmuteBtn = document.querySelector('#video_mute_btn');
chatTag.style.display = 'none';


window.onload = function () {

    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
        if (ua.indexOf('chrome') > -1) {
            $("#share_screen_btn").show();
        } else {
            $("#share_screen_btn").hide();
        }
    }
    EnxRtc.Logger.setLogLevel(0);
    toastr.options.timeOut = 10000;
    token = localStorage.getItem('token');
    if (token == null) {
        logout();
    }
    localStorage.removeItem("isPublished");
    bootStrapAngular = function () {
        angular.bootstrap(document, ['userJoinListApp']);
    };

    var enc = window.atob(token);
    var dec = JSON.parse(enc);
    //console.log(dec.roomMeta.settings.mode);
    localUserRef.mode = dec.roomMeta.settings.mode;
    var VideoSize = {
        "HD": [320, 180, 1280, 720],
        "SD": [320, 180, 640, 480],
        "LD": [80, 45, 640, 360]
    };
    var config = {
        video: {
            deviceId: localStorage.getItem("cam")
        },
        audio: {
            deviceId: localStorage.getItem("mic")
        },
        data: true,
        videoSize: VideoSize[dec.roomMeta.settings.quality],
        attributes: {
            name: localStorage.getItem("userName"),
            type: localStorage.getItem("usertype")
        },
        maxVideoLayers: 1,
        maxVideoBW: 1500,
        minVideoBW: 80
    };
    username = localStorage.getItem("userName");
    localStorage.setItem("streamConfig", JSON.stringify(config));


    function populateSetTalker() {
        room.getTalkerCount(function (res) {
            if (res.result === 0) {
                var num_talkers = res.numTalkers;
                num_talkers = num_talkers;
                for (var c = 0; c <= num_talkers; c++) {
                    var sel = '';
                    var val = "";
                    if (c === 0) {
                        val = language.audio_only;
                    } else {

                        val = c + ' ' + language.participants;
                    }
                    if (c === num_talkers) {

                        sel = 'selected';
                    }

                    document.getElementById("selected").innerHTML += ' <option value="' + c + '" ' + sel + '>' + val + ' </option>';
                }
            }
        });

    }

    function populateSetRecvVideoQuality() {
        document.getElementById("video-quality").innerHTML += ' <option value="' + 'Auto' + '" ' + 'selected' + '>' + language.auto + '</option>';
        document.getElementById("video-quality").innerHTML += ' <option value="' + 'HD' + '" ' + '' + '>' + language.high + '</option>';
        document.getElementById("video-quality").innerHTML += ' <option value="' + 'SD' + '" ' + '' + '>' + language.med + '</option>';
        document.getElementById("video-quality").innerHTML += ' <option value="' + 'LD' + '" ' + '' + '>' + language.low + '</option>';
    }

    joinRoom(token);

    function logout() {
        window.location.href = "../";
    }

    function joinRoom(token) {

        localStream = EnxRtc.joinRoom(token, config,
            function (success, error) {
                if (error && error != null) {
                    closeLoader();
                    if (error.type == "media-access-denied") {
                        logout();
                    }

                    if (error.type && error.type === "room-error") {
                        logout();
                    } else if (error.msg && error.msg.name && (error.msg.name === "NotFoundError" || error.msg.name === "NotReadableError" || error.msg.name === "NotSupportedError")) {
                        logout();
                    } else if ((error.msg && error.msg.name && (error.msg.name === "InvalidDeviceId"))) {
                        logout();
                    } else if (error.msg && error.msg.name === "OverconstrainedError") {
                        localStorage.setItem("quality", "SD");
                        config.videoSize = VideoSize[localStorage.getItem("quality")];
                        joinRoom(token);
                    }

                }
                if (success && success != null) {
                    startDuration();
                    room = success.room;
                    // startMauz(room);
                    roomType = room.roomSettings.mode;
                    isModerator = (room.me.role == "moderator") ? true : false;
                    if (isModerator) {
                        document.getElementById("user-name-div").innerText = language.join_as_mod;
                        line_icon_class = "cursor-pointer";
                    } else {
                        $("#recording_btn").remove();
                        $("#mute_all").hide();
                        document.getElementById("user-name-div").innerText = language.join_as_part
                        line_icon_class = "cursor-normal";
                    }
                    updateUserList();
                    room.addEventListener('room-muted', function (evt) {
                        audio_muted_all = true;
                        if (isModerator) {
                            $("#mute_all").html('<span><i class="fa fa-microphone-slash fa-fw"></i></span><br>' + language.unmute_all_txt);
                            $("#audio_mute_btn").prop("title", language.unmute_all_txt)
                        }
                        else {
                            $("#audio_mute_btn").html('<span><i class="fa fa-microphone-slash fa-fw"></i></span><br>' + language.mute_all_txt);
                            $("#audio_mute_btn").prop("title", language.mute_all_txt)
                            audio_muted = true;
                            toastr.success(language.audio_muted_moderator);
                        }
                    });
                    active_talker = true;
                    document.getElementsByClassName('meeting-title')[0].innerText = room.roomSettings.description;
                    showLocalView();
                    localStorage.setItem("IP", room.externalIp);
                    populateSetTalker();
                    populateSetRecvVideoQuality();
                    updateTabsVisibility();


                    bootStrapAngular();
                    if (typeof success.publishId !== 'object')
                        localId = success.publishId;


                    if (window.navigator.userAgent.match('.NET') === null) {
                        for (var i = 0; i < success.streams.length; i++) {
                            room.subscribe(success.streams[i]);
                        }
                    }
                    room.addEventListener('network-reconnect-timeout', function (event) {
                        var error_string = language.network_reconnect_timeout;
                        swal({
                            title: error_string,
                            type: "error",
                            text: "",
                            showConfirmButton: false,
                            showCancelButton: false,
                            timer: 3000
                        });
                        setTimeout(() => {
                            logout();
                        }, 3000);
                    })
                    room.addEventListener('network-reconnect-failed', function (event) {
                        var error_string = language.network_reconnect_failed;
                        swal({
                            title: error_string,
                            type: "error",
                            text: "",
                            showConfirmButton: false,
                            showCancelButton: false,
                            timer: 3000
                        });
                        setTimeout(() => {
                            logout();
                        }, 3000);
                    })
                    room.addEventListener('network-disconnected', function (event) {
                        var str = "";
                        if (room.reconnectionAllowed == true) {
                            str = language.try_reconnect;
                        }
                        swal({
                            title: str,
                            type: "error",
                            text: "",
                            showConfirmButton: false,
                            showCancelButton: false,
                            timer: 3000

                        });
                        if (room.reconnectionAllowed == false) {
                            setTimeout(() => {
                                logout();
                            }, 3000);

                        }
                    })
                    room.addEventListener('network-reconnected', function (event) {
                        var error_string = language.network_reconnected;
                        swal({
                            title: error_string,
                            type: "success",
                            text: "",
                            showConfirmButton: false,
                            showCancelButton: false,
                            timer: 3000
                        });
                    });
                    room.addEventListener('room-disconnected', function (event) {
                    })
                    room.addEventListener("room-record-on", function () {
                        $("#rec-notification").show();
                    });

                    room.addEventListener("room-record-off", function () {
                        $("#rec-notification").hide();
                    });

                    room.addEventListener("hard-mute-room", function (event) {

                        $("#audio_mute_btn").html('<span><i class="fa fa-microphone-slash fa-fw"></i></span><br>' + language.unmute_txt);
                        $("#audio_mute_btn").prop("title", language.unmute_txt)
                        audio_muted = true;
                        room.mute = true;
                        toastr.success(language.audio_muted_moderator);
                    });

                    /* When room is unmuted, all participants are notified */
                    room.addEventListener("hard-unmute-room", function (event) {
                        $("#audio_mute_btn").html('<span><i class="fa fa-microphone fa-fw"></i></span><br>' + language.mute_txt);
                        $("#audio_mute_btn").prop("title", language.mute_txt)
                        audio_muted = false;
                        room.mute = false;
                        toastr.success(language.audio_unmuted_moderator);
                    });

                    room.addEventListener("hard-mute", function (evt) {
                        Logger.info(evt);
                        if (evt.users.status === "ON") {
                            Logger.info("going to mute");
                            localStream.muteAudio(function (arg) {
                            });
                        } else if (evt.users.status === "OFF") {
                            Logger.info("going to un-mute");
                            localStream.unmuteAudio(function (arg) {
                            });
                        }
                    });

                    var plugin = (document.getElementById('WebrtcEverywherePluginId') !== null) ? document.getElementById('WebrtcEverywherePluginId') : room;
                    room.addEventListener('stream-subscribed', function (streamEvent) {
                        closeLoader();
                        checkOnlyParMsg();
                        var stream = (streamEvent.data && streamEvent.data.stream) ? streamEvent.data.stream : streamEvent.stream;

                        stream.addEventListener('bw-alert', function (event) {
                            updateBWMessages(event.stream.getID(), 'bw-low', 'add');
                        });

                        stream.addEventListener('bw-restored', function (event) {
                            updateBWMessages(event.stream.getID(), 'bw-restored', 'remove');
                        });

                        if (active_talker === true) {
                            SubscribedStreamMap.set(stream.getID(), stream);
                            if (stream.ifScreen() && room.shareStatus) {
                                shareStream = stream;
                                if (presentationStarted == false) {
                                    presentationStarted = true;
                                    if (ATUserList.length > 0) {
                                        addATElement("layout_manager", shareStream, shareScreenStreamId, "col-md-9", "75%");
                                        managePresentationView();
                                    } else {
                                        addATElement("layout_manager", shareStream, shareScreenStreamId, "col-md-12", "100%");
                                    }
                                    addMaximizeOption(shareScreenStreamId);
                                    shareStart = true;
                                }
                            }
                        }
                    });

                    room.addEventListener('active-talkers-updated', function (event) {
                        updateUserList();
                        ATUserList = event.message.activeList;
                        console.log("Active Talker count at first :- " + ATUserList.length);
                        var localList = {
                            streamId: localStream.getID(),
                            name: 'Self',
                            clientId: room.clientId,
                            mediatype: 'audiovideo',
                        }

                        if (ATUserList.length > 6) {
                            ATUserList = ATUserList.slice(0, 6);
                        }

                        if (ATUserList.length === 0) {
                            ATUserList.push(localList);
                        }
                        // console.table(ATUserList);

                        console.log("Updated Active Talker count :- " + ATUserList.length);

                        if (ATUserList !== null) {
                            // When Atlist is empty and presentation is on (U: 0, D: true)
                            if (ATUserList.length === 0 && presentationStarted) {
                                document.querySelector('div[id^="con_"]:first-of-type').style.gridRowEnd = 1;
                                document.querySelector('#layout_manager').style.gridTemplateColumns = `1fr`;
                                document.querySelector('#layout_manager').style.gridAutoRows = `auto`;
                                var divtemp = document.querySelector("#con_11") || document.querySelector("#con_21");
                                if (divtemp !== null && divtemp !== undefined) {
                                    divtemp.style.width = "100%";
                                }
                            }

                            document.querySelectorAll('div[id^="player_"]').forEach(item => {
                                item.style.borderBottom = '1px solid rgb(100, 100, 100)';
                            });

                            var atClientList = [];
                            var child_nodes = document.querySelector("#layout_manager").childNodes;
                            var mappedNodes = [...child_nodes]
                                .filter(item => {
                                    if (item.id !== 'con_21' && item.id !== 'con_11') return item.id
                                })
                                .map(item => item.id);

                            ATUserList.forEach((item) => {
                                atClientList.push(`con_${item.clientId}`);
                            });
                            let difference = mappedNodes.filter(x => !atClientList.includes(x));
                            if (difference.length > 0) {
                                difference.forEach((item) => {
                                    console.info('removing : ' + `${item}`);
                                    document.querySelector(`#${item}`).remove();
                                });
                            }


                            ATUserList.forEach((item, index) => {
                                if (item && item.clientId) {
                                    var st = room.remoteStreams.get(item.streamId);
                                    if (st == undefined) {
                                        st = localStream;
                                        console.log(localStream.stream.getVideoTracks());
                                    }
                                    var stream_id = item.streamId;
                                    var clientID = item.clientId;
                                    var aspectRatio = item.videoaspectratio || '16:9';
                                    // console.log(aspectRatio);
                                    // var name = item.name + ': ' + stream_id + ': ' + clientID;
                                    var name = item.name;
                                    var audio_tag = document.querySelectorAll("audio#stream" + stream_id);
                                    if (item.mediatype == "audio" || item.mediatype == "audioOnly") {
                                        muteVideoLineIcon(clientID);
                                        unMuteAudioLineIcon(clientID);
                                    }
                                    if (item.mediatype == "video") {
                                        muteAudioLineIcon(clientID);
                                        unMuteVideoLineIcon(clientID)
                                    }
                                    if (item.mediatype == "none") {
                                        muteAudioLineIcon(clientID);
                                        muteVideoLineIcon(clientID);
                                    }
                                    if (item.mediatype == "audiovideo") {
                                        unMuteAudioLineIcon(clientID);
                                        unMuteVideoLineIcon(clientID);
                                    }
                                    if (item.mediatype == "audiovideo" && audio_tag.length > 0) {
                                        removeElement(clientID);
                                    }

                                    if (document.querySelector("#layout_manager #con_" + clientID) === null) {
                                        relayoutElements(ATUserList, st, clientID, index, aspectRatio);
                                        addTitle(name, clientID, "layout_manager");
                                    }
                                    else {
                                        addTitle(name, clientID, 'layout_manager', true);
                                    }

                                    if (item.videomuted === true && item.reason === 'bw') {
                                        updateBWMessages(stream_id, 'at-low', 'add');
                                    }
                                    else {
                                        updateBWMessages(stream_id, 'at-restored', 'remove');
                                    }

                                    if (index === 0 && ATUserList.length > 1) {
                                        document.querySelector("#player_" + stream_id).style.borderBottom = layoutConfig.ATHighlightStyle;
                                    }
                                }
                            });

                            syncLayout(layoutContainer, ATUserList.length);

                            if (!(presentationStarted && (desktop_shared == false))) {
                                addMaximizeButtonAndlistener(ATUserList);
                            }
                        }
                        oldATList = ATUserList;
                        checkOnlyParMsg();
                        console.log("%cActive Talker List starts", "color: blue; font-size: 14px");
                        console.table(ATUserList);
                        console.log("%cActive Talker List ends", "color: blue; font-size: 14px");
                        addListenerForModToStartPM();
                    });


                    room.addEventListener("share-state-events", function (event) {
                        toastr.info(event.message);
                    })

                    room.addEventListener('user-connected', function (streamEvent) {
                        if (!checkModeratorPresence()) {
                            $('#only-mod-msg').html(language.wait_for_mod);
                        }
                        checkModerator();
                        updateUserList();
                        checkOnlyParMsg();
                        addListenerForModToStartPM();
                        // setTimeout(sendToNewUser, 3000);
                    });
                    room.addEventListener('user-disconnected', function (streamEvent) {
                        var clientId = streamEvent.clientId;
                        removeElement(clientId);
                        updateUserList();
                        checkOnlyParMsg();
                        clearPMUi(clientId);

                        syncLayout(layoutContainer, ATUserList.length);

                    });

                    room.addEventListener('user-audio-muted', function (args) {
                        updateUserList();

                        if (args.clientId == room.clientId) {
                            audio_muted = true;
                            toastr.success(language.audio_muted);
                            disableAudioMuteBtn();
                        }
                        else {
                            muteAudioLineIcon(args.clientId);
                        }
                    });

                    room.addEventListener('user-audio-unmuted', function (args) {
                        updateUserList();

                        if (args.clientId == room.clientId) {
                            audio_muted = false;
                            toastr.success(language.audio_unmuted);
                            enableAudioMuteBtn();
                        }
                        else {
                            unMuteAudioLineIcon(args.clientId);
                        }
                    });

                    room.addEventListener('user-video-muted', function (args) {
                        updateUserList();

                        if (args.clientId == room.clientId) {
                            toastr.success(language.video_stopped);
                            video_muted = true;
                            disableVideoMuteBtn();
                        }
                        else {
                            muteVideoLineIcon(args.clientId);
                        }
                    });

                    room.addEventListener('user-video-unmuted', function (args) {
                        updateUserList();

                        if (args.clientId == room.clientId) {
                            video_muted = false;
                            toastr.success(language.video_started);
                            enableVideoMuteBtn();
                        }
                        else {
                            unMuteVideoLineIcon(args.clientId);
                        }
                    });
                    room.addEventListener('fs-download-result', function (event) {
                        console.log(' file download result ', event.message);
                        const evtMsg = event.message;
                        switch (evtMsg.messageType) {
                            case'download-available': // event to notify when a file is available for download
                                filename = evtMsg.response.downloadInfo.name;
                                createAt = evtMsg.response.downloadInfo.createdAt;
                                var job_id = evtMsg.response.jobId;
                                var obj = {
                                    'msg': `User shared a file ${filename}. <a href="#" onclick="file_download(${job_id})">Download</span>`,
                                    'timestamp': "",
                                    'username': ""
                                };
                                plotChat(obj);
                                break;

                            case 'download-started':
                                console.log(' file download-started ', evtMsg.response.jobId, ' response', evtMsg.response);
                                break;
                            case 'download-completed':
                                console.log(' file download--completed', evtMsg.response.jobId, ' response', evtMsg.response);
                                break;
                            case 'download-failed':
                                console.log(' file download--failed', evtMsg.response.jobId, ' response', evtMsg.response);
                                break;
                            default:
                                console.log('default case file upload', evtMsg);
                        }
                    });
                    room.addEventListener('fs-upload-result', function (event) {
                        console.log(' file upload result ', event.message);
                        const evtMsg = event.message;
                        switch (evtMsg.messageType) {
                            case 'upload-started':
                                console.log(' fupload event upload-started ', evtMsg.response.upJobId, ' response', evtMsg.response);
                                break;
                            case 'upload-completed':
                                filename = evtMsg.response.uploadInfo.name;
                                createAt = evtMsg.response.uploadInfo.createdAt;
                                var job_id = evtMsg.response.upJobId;
                                var obj = {
                                    'msg': `You shared a file ${filename}. <a href="#" onclick="file_download(${job_id})" >Download</a>`,
                                    'timestamp': "",
                                    'username': ""
                                };
                                plotChat(obj);

                                console.log(' fupload event upload-completed656565656565', evtMsg.response.upJobId, ' response', evtMsg.response);
                                break;
                            case 'upload-failed':

                                console.log(' fupload event upload-failed', evtMsg.response.upJobId, ' response', evtMsg.response);
                                break;
                            default:
                                console.log('default case file upload', evtMsg);
                        }

                    });
                    room.addEventListener("message-received", function (eventData) {
                        var eventDataMsg = eventData.message;
                        if (eventDataMsg.broadcast === false) {
                            var obj = {
                                'msg': eventDataMsg.message,
                                'timestamp': eventDataMsg.timestamp,
                                'user': {
                                    name: eventDataMsg.sender,
                                    clientId: eventDataMsg.senderId
                                }
                            };
                            updateChatUI(obj);

                        } else {
                            var obj = {
                                'msg': eventDataMsg.message,
                                'timestamp': eventDataMsg.timestamp,
                                'username': eventDataMsg.sender
                            };
                            plotChat(obj);
                        }
                    });
                    room.addEventListener("active-talker-data-in", function (data) {
                        if (data.message.broadcast === false && data.message.chatParticipantsList.length > 0) {
                            var obj = {
                                'msg': data.message.message,
                                'timestamp': data.message.timestamp,
                                'user': data.message.from,
                                'participantsTo': data.message.chatParticipantsList
                            };

                            updateChatUI(obj);

                        } else {
                            var obj = {
                                'msg': data.message.message,
                                'timestamp': data.message.timestamp,
                                'username': data.message.from
                            };
                            plotChat(obj);
                        }
                    });

                    plugin.addEventListener("share-started", function (event) {
                        updateUserList();
                        var clientId = event.message.clientId;
                        if (clientId !== room.clientId) {
                            startblinkShareIcon(clientId);
                        }
                        if (presentationStarted == false && desktop_shared == false) {
                            if (shareStream == null) {
                                var st = room.remoteStreams.get(shareScreenStreamId);
                                if (st.stream !== undefined) {
                                    presentationStarted = true;
                                    if (ATUserList.length > 0) {
                                        addATElement("layout_manager", st, shareScreenStreamId, "100%", '100%');
                                        managePresentationView();
                                        updateLayoutUponChange(ATUserList, presentationStarted);
                                    } else {
                                        addATElement("layout_manager", st, shareScreenStreamId, "100%");
                                        updateLayoutUponChange(ATUserList, presentationStarted);
                                    }
                                    addMaximizeOption(shareScreenStreamId);
                                }
                            } else {
                                presentationStarted = true;
                                if (ATUserList.length > 0) {
                                    addATElement("layout_manager", shareStream, shareScreenStreamId, "100%");
                                    managePresentationView();
                                    updateLayoutUponChange(ATUserList, presentationStarted);
                                } else {
                                    addATElement("layout_manager", shareStream, shareScreenStreamId, "100%");
                                    updateLayoutUponChange(ATUserList, presentationStarted);
                                }
                                addMaximizeOption(shareScreenStreamId);
                            }
                            checkOnlyParMsg();
                        }
                    });

                    plugin.addEventListener("share-stopped", function (event) {
                        var clientId = event.message.clientId;
                        if (clientId !== room.clientId) {
                            stopblinkShareIcon(clientId);
                        }
                        desktop_shared = false;
                        presentationStarted = false;
                        streamShare = null;
                        removeElement(shareScreenStreamId);
                        removePresentationView();
                        checkOnlyParMsg();
                        updateLayoutUponChange(ATUserList, presentationStarted);
                    });

                    room.addEventListener("stream-removed", function (event) {
                        var stream = (event.data && event.data.stream) ? event.data.stream : event.stream;

                    });
                    room.addEventListener("stream-ended", function (event) {
                        var stream = (event.data && event.data.stream) ? event.data.stream : event.stream;

                    });
                }
            });
    }

    $("#stats_enable").on("change", function () {
        var stats = $(this).is(':checked') ? true : false;
        if (stats) {
            room.subscribeStreamStatsForClient(localStream, true);
        } else {
            room.subscribeStreamStatsForClient(localStream, false);
        }
    })
}

function updateBWMessages(streamId, reason, action) {
    var alertElement = document.querySelector(`#bw-alert-${streamId}`);
    if (alertElement !== null) alertElement.remove();

    var msgBlock = document.createElement('div');
    msgBlock.setAttribute('class', `bw-alert`);
    msgBlock.setAttribute('id', `bw-alert-${streamId}`);
    if (action === 'add') {
        msgBlock.innerHTML = `<div class="bw-msg"><img src="../img/bw-crunched.png"> <span style="color:red;font-weight:bold;">${language.bw}</span></div>`;
        if(document.querySelector(`#player_${streamId}`) !== null){
            document.querySelector(`#player_${streamId}`).append(msgBlock);
        }

    }
    else {
        if (alertElement !== null) alertElement.remove();
    }
}


function relayoutElements(AT, stream, client_id, index, aspectRatio) {
    addATElement("layout_manager", stream, client_id, "100%", "100%", index, aspectRatio);
}


function managePresentationView() {
    if (ATUserList.length) {
        for (var i = 0; i < ATUserList.length; i++) {
            if (ATUserList[i] && ATUserList[i].clientId) {
                var divtemp = document.querySelector("#con_" + ATUserList[i].clientId);
                if (divtemp !== null && divtemp !== undefined) {
                    if (divtemp.classList.contains('col-md-12')) {
                        divtemp.classList.remove('col-md-12');
                        divtemp.classList.add("col-md-3")
                        divtemp.style.width = "25%";
                        divtemp.style.height = "25%";
                    } else if (divtemp.classList.contains('col-md-6')) {
                        divtemp.classList.remove('col-md-6');
                        divtemp.classList.add("col-md-3")
                        divtemp.style.width = "25%";
                        divtemp.style.height = "25%";
                    }
                }
            }
        }
    }
}

function removePresentationView() {
    if (ATUserList.length) {
        for (var i = 0; i < ATUserList.length; i++) {
            if (ATUserList[i] && ATUserList[i].clientId) {

                if (ATUserList.length == 1) {
                    var divtemp = document.querySelector("#con_" + ATUserList[i].clientId);
                    if (divtemp !== null && divtemp !== undefined) {
                        if (divtemp.classList.contains('col-md-3')) {
                            divtemp.classList.remove('col-md-3');
                            divtemp.classList.add("col-md-12")
                            divtemp.style.width = "100%";
                            divtemp.style.height = "100%";
                        }
                    }
                } else {
                    var divtemp = document.querySelector("#con_" + ATUserList[i].clientId);
                    if (divtemp !== null && divtemp !== undefined) {
                        if (divtemp.classList.contains('col-md-3')) {
                            divtemp.classList.remove('col-md-3');
                            divtemp.classList.add("col-md-6")
                            divtemp.style.width = "50%";
                            divtemp.style.height = "100%";
                        }
                    }
                }
            }
        }
    }
}


function addATElement(elem_id, stream, client_id, div_width, div_heigth = "100%", aspectRatio = '4:3') {
    if (stream) {
        checkOnlyParMsg();
        if (document.getElementById("con_" + client_id) === null) {

            var el = document.createElement("div");
            var elem = document.getElementById(elem_id);
            var streamId = stream.getID();
            el.setAttribute("id", "con_" + client_id);
            el.setAttribute("data-stream", streamId);


            if ((presentationStarted && (desktop_shared == false)) && (streamId === 21 || streamId === 11)) {
                elem.prepend(el)
            }
            else {
                elem.appendChild(el);
            }
            options.player.width = div_width;
            options.player.height = div_heigth;
            stream.play("con_" + client_id, options);
            if (stream.player.stream == undefined) {
                removeElement(client_id);
            }
        }
    }
}

function removeElement(clientID) {
    if (document.querySelector("#con_" + clientID) !== null) {
        document.querySelector("#con_" + clientID).remove();
        checkOnlyParMsg();
    }
}

function addTitle(name, clientId, parent_div, update = false) {

    if (update) {
        var name_div = document.querySelector("#stream_username_" + clientId);
        if (name != name_div.innerText) {
            name_div.innerText = name;
        }
    }
    else {
        if (document.querySelector("#stream_username_" + clientId) === null) {
            var titleDiv = document.createElement('div');
            titleDiv.classList.add("stream-user-name");
            titleDiv.id = "stream_username_" + clientId;
            titleDiv.innerText = name;
            $("#" + parent_div + " #con_" + clientId + ' div[id^="player_"]').prepend(titleDiv);
        }
    }
}

function addMaximizeOption(id) {
    var imgDiv = document.createElement('img');
    imgDiv.classList.add("stream-max-icon");
    imgDiv.classList.add("minimized");
    imgDiv.src = '../img/maximize.svg';
    $("#con_" + id + ' div[id^="player_"]').prepend(imgDiv);
    imgDiv.addEventListener('click', maxMinScreen);
}

function closeLoader() {
    setTimeout(function () {
        $('.preloader').fadeOut();
    }, 500);
}


function updateUserList() {
    var uList = [];
    var userList = room.userList.forEach(function (user, clientId) {
        var username = user.name.substr(0, 10)
        if (clientId !== room.clientId) {
            uList.push({
                "fullName": user.name,
                "username": username,
                "usertype": user.role,
                "clientId": clientId,
                "lineIconClass": line_icon_class
            });
        }
    });
    if (uList.length) {
        updateLeftPanel()

    }
    var $scope = getScope('attendance-layout');
    // console.log("ismode" + isModerator, uList)
    $scope.updateAttendanceLayout({
        "is_mod": isModerator,
        "user_list": uList
    });
    $scope.$apply();

    var sidebarPCR = document.querySelector(`#sidebar-pcr-container`).querySelector('.tab-content').clientHeight - 41;

    if(document.querySelector(`#pcr__participants_list`) !== null)
    {
        document.querySelector(`#pcr__participants_list`).style.height = `${sidebarPCR}px`;
    }


}


function hangUp() {
    var tok = JSON.parse(window.atob(token));
    $.confirm({
        title: language.exit_msg + ' ? ',
        content: '',
        animation: 'opacity',
        closeAnimation: 'opacity',
        columnClass: 'col-md-4 offset-md-4 col-sm-6 offset-sm-3 col-xs-10 offset-xs-1',
        boxWidth: '50%',
        scrollToPreviousElement: true,
        scrollToPreviousElementAnimate: true,
        useBootstrap: true,
        offsetTop: 40,
        offsetBottom: 40,
        container: 'body',
        bootstrapClasses: {
            container: 'container',
            containerFluid: 'container-fluid',
            row: 'row',
        },
        buttons: {
            confirm: {
                text: language.yes,
                btnClass: 'btn-blue w-min-md text-transform-none',
                action: function () {
                    window.location.href = "/feedback/" + tok.logId;
                }
            },
            cancel: {
                text: language.cancel,
                btnClass: 'btn-danger w-min-md text-transform-none',
                action: function () {
                    this.close();
                }
            }
        }
    });

}
function audioMute() {
    if (audio_muted) {
        if (room.mute && !isModerator) {
            toastr.error(language.audio_muted_moderator)
        } else {
            localStream.unmuteAudio(function (arg) {
                if (arg.result == 0) {
                    $("#audio_mute_btn").html('<span><i class="fa fa-microphone fa-fw"></i></span><br>' + language.mute_txt);
                    $("#audio_mute_btn").prop("title", language.mute_txt)
                    audio_muted = false;
                }
                else {
                    toastr.error(arg.error);
                }


            });
        }

    } else {
        localStream.muteAudio(function (arg) {
            if (arg.result == 0) {
                $("#audio_mute_btn").html('<span><i class="fa fa-microphone-slash fa-fw"></i></span><br>' + language.unmute_txt);
                $("#audio_mute_btn").prop("title", language.unmute_txt)
                audio_muted = true;
            }
            else {
                toastr.error(arg.error);
            }
        });

    }
}

function muteUnmuteAll() {
    if (audio_muted_all) {
        room.hardUnmute(function (arg) {
            if (arg.result == 0) {
                $("#mute_all").html('<span><i class="fa fa-microphone fa-fw"></i></span><br>' + language.mute_all_txt);
                $("#mute_all").prop("title", language.mute_all_txt)

                audio_muted_all = false;
            } else {
                toastr.error(arg.msg);
            }
        });
    } else {
        room.hardMute(function (arg) {
            if (arg.result == 0) {
                $("#mute_all").html('<span><i class="fa fa-microphone-slash fa-fw"></i></span><br>' + language.unmute_all_txt);
                $("#mute_all").prop("title", language.unmute_all_txt);

                audio_muted_all = true;
            } else {
                toastr.error(arg.msg);
            }
        });
    }
}


function clearLocalView() {
    document.getElementById('local_div').innerHTML = "";
}

function showLocalView() {
    clearLocalView();
    localStream.play("local_div", optionsLocal);
}

function postLog() {
    room.postClientLogs(token, function (res) {
    });
}


function enableMuteButton() {
    muteUnmuteBtn.removeAttribute('disabled');
    muteUnmuteBtn.style.cursor = 'pointer';
    muteUnmuteBtn.style.pointerEvents = 'auto';
}

function disableVideoMuteBtn() {
    $("#video_mute_btn").html('<span><i class="fa fa-video-slash fa-fw"></i></span><br>' + language.start_txt);
    $("#video_mute_btn").prop("title", language.start_txt);
    enableMuteButton();
}

function enableVideoMuteBtn() {
    $("#video_mute_btn").html('<span><i class="fa fa-video fa-fw"></i></span><br>' + language.stop_txt);
    $("#video_mute_btn").prop("title", language.stop_txt);
    enableMuteButton();
}

function disableAudioMuteBtn() {
    $("#audio_mute_btn").html('<span><i class="fa fa-microphone-slash fa-fw"></i></span><br>' + language.unmute_txt);
    $("#audio_mute_btn").prop("title", language.unmute_txt)
}

function enableAudioMuteBtn() {
    $("#audio_mute_btn").html('<span><i class="fa fa-microphone fa-fw"></i></span><br>' + language.mute_txt);
    $("#audio_mute_btn").prop("title", language.mute_txt)
}


function videoMute() {
    muteUnmuteBtn.style.cursor = 'wait';
    muteUnmuteBtn.style.pointerEvents = 'none';
    muteUnmuteBtn.disabled = true;
    muteUnmuteBtn.setAttribute('disabled', 'disabled');

    if (video_muted) {
        localStream.unmuteVideo(function (res) {
            if (res.result === 0) {
                clearLocalView();
                showLocalView();
                $("#video_mute_btn").html('<span><i class="fa fa-video fa-fw"></i></span><br>' + language.stop_txt);
                $("#video_mute_btn").prop("title", language.stop_txt);
                video_muted = false;
                enableMuteButton();
            } else if (res.result === 1140) {
                toastr.error(language.pending_video_mute);
                enableMuteButton();
            }
            else if (res.result == 1176) {
                toastr.error(res.error);
                enableMuteButton();
            }
            muteUnmuteBtn.style.pointerEvents = 'auto';
            muteUnmuteBtn.disabled = false;
            muteUnmuteBtn.removeAttribute('disabled');
        });
    } else {
        localStream.muteVideo(function (res) {
            if (res.result === 0) {
                $("#video_mute_btn").html('<span><i class="fa fa-video-slash fa-fw"></i></span><br>' + language.start_txt);
                $("#video_mute_btn").prop("title", language.start_txt);
                video_muted = true;
                enableMuteButton();
            } else if (res.result === 1140) {
                toastr.error(language.pending_video_mute);
                enableMuteButton();
            }
            else if (res.result == 1176) {
                toastr.error(res.error);
                enableMuteButton();
            }
            muteUnmuteBtn.style.pointerEvents = 'auto';
            muteUnmuteBtn.disabled = false;
            muteUnmuteBtn.removeAttribute('disabled');
        });
    }
}

function screenShare() {

    if (navigator.userAgent.indexOf('QQBrowser') > -1 && room.Connection.getBrowserVersion() < 72) {
        toastr.error(language.ss_unsupport_qq);
        return;
    }
    else if (navigator.userAgent.indexOf('Chrome') > -1 && room.Connection.getBrowserVersion() < 72) {
        toastr.error(language.ss_unsupport_chrome_below72);
        return;
    }

    if (presentationStarted === false) {
        desktop_shared = true;
        streamShare = room.startScreenShare(function (rs) {
            if (rs.result === 0) {
                presentationStarted = true;
                $("#share_screen_btn").prop('title', 'Stop Share');
                $('.SSicon').addClass("blink-image");
                $(".watermark").hide();
                $(".only-par-msg").hide();
            } else if (rs.result === 1151) {
                desktop_shared = false;
                toastr.error(rs.error);
            } else if (rs.result === 1144) {
                desktop_shared = false;
                toastr.error(rs.error);
            } else if (rs.result === 1150) {
                desktop_shared = false;
                $("#extension-dialog").modal("toggle");

            } else {
                desktop_shared = false;
                toastr.error(language.ss_not_supported);
            }
        });
    }
    else if (streamShare) {
        room.stopScreenShare(function (res) {
            if(res.result == 0)
            {
                $("#share_screen_btn").prop('title', 'Start Share');
                $('.SSicon').removeClass("blink-image");
                presentationStarted = false;
                checkOnlyParMsg();
                streamShare = null;
            }
        });


    } else {
        desktop_shared = false;
        toastr.error("Presentation is already running")
    }
    if (streamShare) {
        streamShare.addEventListener("stream-ended", function (event) {
            room.stopScreenShare( function (res) {
                if(res.result == 0)
                {
                    $("#share_screen_btn").prop('title', 'Start Share');
                    $('.SSicon').removeClass("blink-image");
                    presentationStarted = false;
                    checkOnlyParMsg();
                    streamShare = null;
                }
            });

        });
    }
}

function blinkImgStart(elem) {
    elem.classList.add("blink-image");
}

function blinkImgStop(elem) {
    elem.classList.remove("blink-image");
}

function startRoomRec() {
    if (recording_stared) {
        room.stopRecord(function (success, error) {
            if (success !== null) {
                $('.fa-circle').removeClass("blink-image");
                $('.fa-circle').removeClass("text-danger");
                recording_stared = false;
                $("#recording_btn").prop('title', language.start_txt + ' ' + language.record_txt);
                $("#rec-notification").hide();
                $('#record_txt').text(language.record_txt);
            } else {
                Logger.info(error);
            }
        });

    } else {
        room.startRecord(function (success, error) {
            if (success !== null) {
                $('.fa-circle').addClass("blink-image");
                $('.fa-circle').addClass("text-danger");
                $('#record_txt').text(language.stop_txt);
                recording_stared = true;
                $("#recording_btn").prop('title', language.stop_txt + ' ' + language.record_txt);
                $("#rec-notification").show();
            } else {
                toastr.error(language.error_starting_recording);
            }

        });

    }
}

function updateChatNotify() {
    chatCount++;
    if ((!document.querySelector('#pcr__chats-tab').classList.contains('active')
        || document.body.classList.contains('sidebar-closed')
    ) && chatCount > 0) {
        if (!document.querySelector('#pcr__chats-tab').classList.contains('active')) {
            chatTag.style.display = 'block';
            chatTag.textContent = chatCount;
        }
        var pvtChattagBtn = document.querySelector('#private_chat_btn');
        var pvtChattagElem = document.querySelector('#pvt_chat-tag');
        pvtChattagElem.classList.remove('hide-this');
        pvtChattagElem.classList.add('show-this');
        pvtChattagBtn.style.display = 'inline-block';
    }
}

function getScope(elementID) {
    var sel = document.getElementById(elementID);
    return angular.element(sel).scope();
}

function sendChat(event) {
    if (event.keyCode === 13) {
        addText();
    }
}

function sendFile() {
    document.getElementById("chat-file-btn").click();
}

function addText() {
    var text = document.getElementById('chat-text-area').value;
    var elem = document.getElementById("chat");
    if (/<[a-z][\s\S]*>/i.test(text)) {
        text = "'" + text + "'";
    }
    if (text !== "") {
        var timestamp = moment()._d.getTime();
        var templete = createChatText({
            text,
            timestamp
        });
        $(templete).appendTo(elem);
        document.getElementById('chat-text-area').value = '';
        sendChatToServer(text);
        scrollDivLast(elem);
    }
}

function addFileLocal(fileName, dataUrl) {
    var timestamp = moment()._d.getTime();
    var text = '<a href="' + dataUrl + '" download="' + fileName + '" target="_blank"><i class="fa fa-file-text-o fa-2x"></i> ' + fileName + '</a>';
    var elem = document.getElementById("vcx-chat-container").getElementsByTagName("ul")[0];
    var template = createChatText({
        text,
        timestamp
    }, 'html');
    elem.appendChild(template);
    document.getElementById('chat-text-area').value = '';
    scrollDivLast(elem);
}

function createChatText(obj) {
    const formattedDate = moment(obj.timestamp).format('LT');
    var template = `<div class="message right">
            <span class="name">Me</span>
            <div class="bubble"> 
                ${obj.text}
                <div class="corner"></div>
                <span class="time">${formattedDate}</span>
            </div>
        </div>`;
    return template;
}

function sendChatToServer(text) {

    room.sendMessage(text,
        true,
        [],
        function (data) {
            // console.log(data)
        });

}

function plotChat(obj) {
    const formattedDate = moment(obj.timestamp).format('LT');
    var templete = `<div class="message">
            <span class="name">${obj.username}</span>
            <div class="bubble">
                ${obj.msg}
                <div class="corner"></div>
            </div>
            <span class="time">${formattedDate}</span>
        </div>`;

    var elem = document.getElementById("chat");
    $(templete).appendTo(elem);
    scrollDivLast(elem);
    updateChatNotify();
}

function scrollDivLast(elem) {
    elem.scrollTop = elem.scrollHeight;
}

function maxMinScreen(event) {
    var element = event.target;
    if (element.classList.contains('minimized')) {
        element.classList.remove('minimized');
        element.classList.add('maximized');
        element.parentNode.classList.add('fullScreen');
        element.src = '../img/minimize.svg';
    } else if (element.classList.contains('maximized')) {
        element.classList.add('minimized');
        element.classList.remove('maximized');
        element.parentNode.classList.remove('fullScreen');
        element.src = '../img/maximize.svg';
    }
};

function muteOne_click(id) {
    var clientId = id.split("^");
    var x = id;
    Logger.info(x);
    var sts = document.getElementById(x).value;

    room.muteOne(clientId[0], function (arg) {
        if (arg.result == 0) {
        } else {
            alert(arg.result + "::::" + arg.msg);
        }
    })
};

function unMuteOne_click(id) {
    var clientId = id.split("^");
    var x = id;
    Logger.info(x);
    var sts = document.getElementById(x).value;

    room.unMuteOne(clientId[0], function (arg) {
        if (arg.result == 0) {
        } else {
            alert(arg.result + "::::" + arg.msg);
        }
    })

}

function checkModeratorPresence() {
    var moderator_present = false;
    var user_list = room.userList;
    user_list.forEach(function (user) {
        if (user.role == 'moderator') {
            moderator_present = true;
        }
    });
    return moderator_present;
}

function getUser() {
    var localUsrList = room.userList;
    document.getElementById("list-contain").innerHTML = ''; //user-list-container
    for (var i = 0; i < localUsrList.size; i++) {
        var node = document.createElement("LI");
        if (localUsrList[i].role != "moderator") {
            var textnode = document.createTextNode(localUsrList[i].name);
            node.setAttribute("style", "color:blue;font-size: 19px;font-weight: bold;");
            node.appendChild(textnode);
            document.getElementById("list-contain").appendChild(node);
        }
    }
}

function checkModerator() {
    var arr = room.userList;
}

function muteAudioLineIcon(clientId) {
    var iconClientId = document.querySelector(`#audioMute${clientId}`);
    if (iconClientId !== null) {
        iconClientId.innerHTML = "<i class=\"fa fa-microphone-slash fa-fw\"></i>";
        iconClientId.title = "Muted";
    }


}

function unMuteAudioLineIcon(clientId) {
    var iconClientId = document.querySelector(`#audioMute${clientId}`);
    if (iconClientId !== null) {
        iconClientId.innerHTML = "<i class=\"fa fa-microphone fa-fw\"></i>";
        iconClientId.title = "Unmuted";
    }


}

function muteVideoLineIcon(clientId) {
    var iconClientId = document.querySelector(`#videoMute${clientId}`);
    if (iconClientId !== null) {
        iconClientId.innerHTML = "<i class=\"fa fa-video-slash fa-fw\"></i>";
        iconClientId.title = "Muted";
    }


}

function unMuteVideoLineIcon(clientId) {
    var iconClientId = document.querySelector(`#videoMute${clientId}`);
    if (iconClientId !== null) {
        iconClientId.innerHTML = "<i class=\"fa fa-video fa-fw\"></i>";
        iconClientId.title = "Unmuted";
    }
}

function startblinkShareIcon(clientId) {
    var iconClientId = document.querySelector(`#shareIcon${clientId}`);
    if (iconClientId != null) {
        iconClientId.classList.add("iconRed");
        iconClientId.title = "Sharing";
    }
}

function stopblinkShareIcon(clientId) {
    var iconClientId = document.querySelector(`#shareIcon${clientId}`);
    if (iconClientId !== null) {
        iconClientId.classList.remove("iconRed");
        iconClientId.title = "Share";
    }
}

function audioMuteUser(element) {
    if (room.me.role !== "moderator") {
        return true;
    }
    var elementId = element.id.split("audioMute")[1];
    if (element.firstElementChild.classList.contains("fa-microphone")) {
        room.hardMuteUserAudio(elementId, function () {
        });
    }
    else {
        room.hardUnmuteUserAudio(elementId, function () {
        });
    }
}

function videoMuteUser(element) {
    if (room.me.role !== "moderator") {
        return true;
    }
    var elementId = element.id.split("videoMute")[1];
    if (element.firstElementChild.classList.contains("fa-video")) {
        room.hardMuteUserVideo(elementId, function () {

        });
    }
    else {
        room.hardUnmuteUserVideo(elementId, function () {

        });
    }


}


function setActiveTalker(q) {
    $("#btn-at-selection-apply").attr("disabled", "disabled");
    var e = document.getElementById(q);
    var selValue = e.options[e.selectedIndex].value;
    room.setTalkerCount(parseInt(selValue), function (result) {
        if (result.result == 0) {
            toastr.success(language.requested_to_rec + ' ' + selValue + " " + language.ats);
            $("#btn-at-selection-apply").removeAttr("disabled");
        } else {
            toastr.error(language.error_setting_at);
            $("#btn-at-selection-apply").removeAttr("disabled");
        }
    });
}

function setReceiveVideoQuality(q) {
    $("#btn-quality-selection-apply").attr("disabled", "disabled");
    var e = document.getElementById(q);
    var selValue = e.options[e.selectedIndex].value;
    room.setReceiveVideoQuality(selValue, function (result) {
        if (result.result == 0) {
            toastr.success(language.set_rec_video_qual);
            $("#btn-quality-selection-apply").removeAttr("disabled");
        } else {
            toastr.error(language.error_set_rec_video_qual);
            $("#btn-quality-selection-apply").removeAttr("disabled");
        }
    });
}

// Update layout when presentaion is started/stopped
var updateLayoutUponChange = function (ATUsersList, _presentaionStatus, _videoMaximized = false) {

    var {layoutContainer} = getLayOutDimensions();
    var ATUsersListLength = ATUsersList.length;

    if (_presentaionStatus) {
        videoMaximized = false;
        layoutContainer.classList.remove('player-maximized');
    }
    else if (_videoMaximized) {
        videoMaximized = true;
    }
    syncLayout(layoutContainer, ATUsersListLength);
    addMaximizeButtonAndlistener(ATUsersList);
}

function getLayOutDimensions() {
    var sidebar_width = document.querySelector('.site-sidebar').clientWidth;
    if (document.body.classList.contains('sidebar-closed')) {
        sidebar_width = 0;
    }
    var confoContainer = document.querySelector('.confo-container');
    var conf_container_height = document.querySelector('.site-header').clientHeight + document.querySelector('.footer').clientHeight;
    var conf_container_inner_height = document.body.clientHeight - conf_container_height;

    var finalLayoutWidth = document.body.clientWidth - sidebar_width;

    confoContainer.style.height = `${conf_container_inner_height}px`;
    confoContainer.style.width = `${finalLayoutWidth}px`;

    layoutContainer.style.height = `${conf_container_inner_height}px`;
    layoutContainer.style.width = `${finalLayoutWidth}px`;
    return {confoContainer, conf_container_inner_height, layoutContainer, finalLayoutWidth};
}

/**
 * Add listener  for maximize/zoom button
 *
 * @param   {Array}  ATUsersList
 * @return  {void}
 */

function addMaximizeButtonAndlistener(ATUsersList) {
    var ATUsersListLength = ATUsersList.length;
    var videos = document.querySelectorAll('div[id^="con_"]');


    if (ATUsersListLength === 1) {
        videos.forEach(function (item, index) {
            if (document.querySelector('#maximize_' + item.id) !== null) {
                document.querySelector('#maximize_' + item.id).remove();
            }
        });
        return;
    }

    if (layoutContainer.classList.contains('player-maximized')) {
        if ([...document.querySelectorAll('div[id^="con_"]')].find(item => item.classList.contains('maximized'))) {
            updateGridLayout(ATUsersListLength);
        }
    }

    videos.forEach(function (item, index) {
        if (document.querySelector('#maximize_' + item.id) === null) {
            var maximizeIcon = document.createElement('div');
            maximizeIcon.setAttribute('id', 'maximize_' + item.id);
            maximizeIcon.setAttribute('class', 'maximize_player');
            maximizeIcon.setAttribute('title', 'Click to expand video');
            maximizeIcon.innerHTML = expandIcon;

            maximizeIcon.onclick = function (event) {
                event.preventDefault();
                if (maximizeIcon.classList.contains('expanded')) {
                    goBackToGridLayout(item);
                }
                else {
                    maximizePlayer(item);
                }
            };
            if (!(presentationStarted && (desktop_shared == false))) item.querySelector('div[id^="player_"]').append(maximizeIcon);
        }
        if ((presentationStarted && (desktop_shared == false)) && (document.querySelector('#maximize_' + item.id) !== null)) {
            document.querySelector('#maximize_' + item.id).remove();
        }
    });
}

/**
 * Maximize player on click of player  zoom button on top right corner
 * @param {DOM Element} _this Item
 */

function maximizePlayer(_this) {
    var maximizeCollapseTrigger = document.querySelector('#maximize_' + _this.id);
    videoMaximized = true;
    resetGridBeforeUpdate();
    _this.classList.add('maximized');
    layoutContainer.classList.add('player-maximized');
    maximizeCollapseTrigger.classList.add('expanded');
    maximizeCollapseTrigger.innerHTML = collapseIcon;
    maximizeCollapseTrigger.setAttribute('title', 'Click to collapse video');
    updateLayoutUponChange(ATUserList, presentationStarted, videoMaximized);
}


//  Minimize player on click of player grid button on top right corner
function goBackToGridLayout(_this) {
    var ATUsersListLength = ATUserList.length,
        maximizeCollapseTrigger = document.querySelector('#maximize_' + _this.id);
    videoMaximized = false;
    layoutContainer.classList.remove('player-maximized');
    maximizeCollapseTrigger.classList.remove('expanded');
    maximizeCollapseTrigger.innerHTML = expandIcon;
    maximizeCollapseTrigger.setAttribute('title', 'Click to expand video');
    resetGridBeforeUpdate();
    layoutContainer.style.gridTemplateRows = ``;
    layoutContainer.style.marginLeft = `0`;
    syncLayout(layoutContainer, ATUsersListLength);
}


/**
 * Update grid layout
 * @param {DOM Element} layoutContainer
 */
function updateGridLayout(ATUsersListLength) {

    if ((presentationStarted && (desktop_shared == false)) || videoMaximized) {
        layoutContainer.style.height = `${parseInt(layoutContainer.clientHeight)}px`;
    }
    else {
        layoutContainer.style.height = `auto`;
    }

    if (videoMaximized === true) {
        document.querySelector('div[id^="con_"].maximized').style.height = `${parseInt(layoutContainer.clientHeight)}px`;
        document.querySelector('div[id^="con_"].maximized').style.gridRow = `${ATUsersListLength}/1`;
        document.querySelector('div[id^="con_"].maximized').style.gridColumn = `1/1`;
        document.querySelectorAll('div[id^="con_"]:not(.maximized)').forEach(item => {
            item.style.height = `${parseInt(layoutContainer.clientHeight / (ATUsersListLength - 1))}px`;
            item.style.gridArea = ``;
        });
    }
    else if ((presentationStarted && (desktop_shared == false)) === true) {
        document.querySelector('div[id^="con_"]:first-of-type').style.height = `${parseInt(layoutContainer.clientHeight)}px`;
        document.querySelector('div[id^="con_"]:first-of-type').style.gridRow = `${ATUsersListLength}/1`;
        document.querySelector('div[id^="con_"]:first-of-type').style.gridColumn = `1/1`;
        document.querySelectorAll('div[id^="con_"]:not(:first-of-type)').forEach(item => {
            item.style.height = `${parseInt(layoutContainer.clientHeight / (ATUsersListLength - 1))}px`;
            item.style.gridArea = ``;
        });
    }
}

/**
 * Reset Grid layout before updating the grid again
 */
function resetGridBeforeUpdate() {
    // document.querySelector('#layout_manager').classList.remove('player-maximized');
    document.querySelectorAll('div[id^="con_"]').forEach(function (item) {
        item.classList.remove('maximized');
        var maximizedPlayer = item.querySelector('.maximize_player');

        if (maximizedPlayer !== null) {
            maximizedPlayer.classList.remove('expanded');
            maximizedPlayer.innerHTML = expandIcon;
            maximizedPlayer.setAttribute('title', 'Click to expand video');
        }
    });
}

/**
 *
 * @param {DOM Element} layoutContainer  Main layout container
 * @param {Integer } ATUsersListLength  AT Users list length
 */
function syncLayout(layoutContainer, ATUsersListLength) {
    var {confoContainer, conf_container_inner_height, layoutContainer, finalLayoutWidth} = getLayOutDimensions();

    var confoContainerHeight = conf_container_inner_height;
    var layoutContainerWidth = finalLayoutWidth;

    if ((presentationStarted && (desktop_shared == false)) || videoMaximized) {
        layoutContainer.style.height = `${confoContainerHeight}px`;
    }
    else {
        layoutContainer.style.height = `auto`;
    }

    if (ATUsersListLength === 1) {
        videoMaximized = false;
    }

    if (!videoMaximized) {
        layoutContainer.style.marginLeft = `0`;
    }

    var gridLayoutTemplate = {

        0: {
            'LMGridTemplateColumns': '1fr',
            'LMGridAutoRows': `${parseInt(confoContainerHeight)}px`,
            'LMHeight': `${parseInt(confoContainerHeight)}px`,
            'LMAT': 1,
            'FirstElemGridRowEnd': 1,
            'firstContainerGridAutoRows': `${parseInt(confoContainerHeight)}px`,
            'cols': 1
        },

        1: {
            'LMGridTemplateColumns': '1fr',
            'LMGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'LMHeight': `${parseInt(confoContainerHeight)}px`,
            'LMAT': 1,
            'FirstElemGridRowEnd': 1,
            'firstContainerGridAutoRows': `${parseInt(confoContainerHeight)}px`,
            'cols': 1
        },
        2: {
            'LMGridTemplateColumns': '1fr 1fr',
            'LMGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'LMHeight': `${parseInt(confoContainerHeight)}px`,
            'LMAT': 1,
            'FirstElemGridRowEnd': 1,
            'firstContainerGridAutoRows': `${parseInt(confoContainerHeight / 2)}px`,
            'cols': 2
        },
        3: {
            'LMGridTemplateColumns': '1fr 1fr 1fr',
            'LMGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'LMHeight': `${parseInt(confoContainerHeight)}px`,
            'LMAT': 1,
            'FirstElemGridRowEnd': 1,
            'firstContainerGridAutoRows': `${parseInt(confoContainerHeight / 3)}px`,
            'cols': 3
        },
        4: {
            'LMGridTemplateColumns': '1fr 1fr',
            'LMGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'LMHeight': `${parseInt(confoContainerHeight)}px`,
            'LMAT': 2,
            'FirstElemGridRowEnd': 1,
            'firstContainerGridAutoRows': `${parseInt(confoContainerHeight / 2)}px`,
            'cols': 2
        },
        5: {
            'LMGridTemplateColumns': '1fr 1fr 1fr',
            'LMGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'LMHeight': `${parseInt(confoContainerHeight)}px`,
            'LMAT': 2,
            'FirstElemGridRowEnd': 1,
            'firstContainerGridAutoRows': `${parseInt(confoContainerHeight / 2)}px`,
            'cols': 3
        },
        6: {
            'LMGridTemplateColumns': '1fr 1fr 1fr',
            'LMGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'LMHeight': `${parseInt(confoContainerHeight)}px`,
            'LMAT': 2,
            'FirstElemGridRowEnd': 1,
            'firstContainerGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'cols': 3
        },

        '0p': {
            'LMGridTemplateColumns': '1fr',
            'LMGridAutoRows': `${parseInt(confoContainerHeight)}px`,
            'LMHeight': `${parseInt(confoContainerHeight)}px`,
            'LMAT': 1,
            'FirstElemGridRowEnd': 1,
            'firstContainerGridAutoRows': `${parseInt(confoContainerHeight)}px`,
            'cols': 1
        },

        '1p': {
            'LMGridTemplateColumns': '3fr 1fr',
            'LMGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'LMHeight': `${parseInt(confoContainerHeight)}px`,
            'LMAT': 1,
            'FirstElemGridRowEnd': 1,
            'firstContainerGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'cols': 2
        },

        '2p': {
            'LMGridTemplateColumns': `${ATUsersListLength + 1}fr 1fr`,
            'LMGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'LMHeight': `${parseInt(confoContainerHeight)}px`,
            'LMAT': 2,
            'FirstElemGridRowEnd': 3,
            'firstContainerGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'cols': 2
        },

        '3p': {
            'LMGridTemplateColumns': `4fr 1fr`,
            'LMGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'LMHeight': `${parseInt(confoContainerHeight)}px`,
            'LMAT': 3,
            'FirstElemGridRowEnd': 4,
            'firstContainerGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'cols': 2
        },

        '4p': {
            'LMGridTemplateColumns': `4fr 1fr`,
            'LMGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'LMHeight': `${parseInt(confoContainerHeight)}px`,
            'LMAT': 4,
            'FirstElemGridRowEnd': 5,
            'firstContainerGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'cols': 2
        },
        '5p': {
            'LMGridTemplateColumns': `${ATUsersListLength + 1}fr 1fr`,
            'LMGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'LMHeight': `${parseInt(confoContainerHeight)}px`,
            'FirstElemGridRowEnd': `${ATUsersListLength + 1}`,
            'LMAT': 5,
            'FirstElemGridRowEnd': 6,
            'firstContainerGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'cols': 2
        },

        '6p': {
            'LMGridTemplateColumns': `${ATUsersListLength + 1}fr 1fr`,
            'LMGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'LMHeight': `${parseInt(confoContainerHeight)}px`,
            'LMAT': 6,
            'FirstElemGridRowEnd': `${ATUsersListLength + 1}`,
            'firstContainerGridAutoRows': `${parseInt(confoContainerHeight / (ATUsersListLength))}px`,
            'cols': 2
        },

    };

    var gridIndex = ((presentationStarted && (desktop_shared == false)) || videoMaximized) ? `${ATUsersListLength}p` : ATUsersListLength;

    if ((presentationStarted && (desktop_shared == false))) {
        resetGridBeforeUpdate();
        var firstVideoContainer = document.querySelector('div[id^="con_"]:first-of-type');
        var playerInsidefirstVideoContainer = document.querySelector('div[id^="con_"]:first-of-type [id^="player_"]');

        firstVideoContainer.style.width = `${layoutContainerWidth * 0.75}px`;
        firstVideoContainer.style.height = `${confoContainerHeight}px`;
        firstVideoContainer.style.gridRowEnd = `${gridLayoutTemplate[gridIndex].FirstElemGridRowEnd}`;
        firstVideoContainer.style.gridRowStart = 1;

        playerInsidefirstVideoContainer.style.width = `${layoutContainerWidth * 0.75}px`;
        playerInsidefirstVideoContainer.style.height = `${confoContainerHeight}px`;

        var LMAT = ((presentationStarted && (desktop_shared == false)) && ATUserList.length === 1) ? 2 : gridLayoutTemplate[gridIndex].LMAT;

        document.querySelectorAll('div[id^="con_"]:not(:first-of-type)').forEach(item => {
            item.style.height = `${parseInt(confoContainerHeight / LMAT)}px`;
            item.style.width = `${layoutContainerWidth * 0.25}px`;
            item.style.gridArea = ``;
            item.style.gridRowEnd = ``;
        });
    }
    else if (videoMaximized === true) {
        var playerMaximizedContainer = document.querySelector('div[id^="con_"].maximized');

        if (playerMaximizedContainer !== null) {
            var playerWidth = `${layoutContainerWidth * 0.75}px`, playerHeight = `${confoContainerHeight}px`;
            var maximixedPlayer = document.querySelector('div[id^="con_"].maximized [id^="player_"]');
            var smallPlayers = document.querySelectorAll('div[id^="con_"]:not(.maximized)');
            var LMAT = (ATUserList.length <= 2) ? 2 : gridLayoutTemplate[gridIndex].LMAT - 1;

            playerMaximizedContainer.style.width = playerWidth;
            playerMaximizedContainer.style.height = playerHeight;

            maximixedPlayer.style.width = playerWidth;
            maximixedPlayer.style.height = playerHeight;

            smallPlayers.forEach(item => {
                item.style.height = `${parseInt(confoContainerHeight / LMAT)}px`;
                item.style.width = `${layoutContainerWidth * 0.25}px`;
                item.style.gridArea = ``;
                item.style.gridRowEnd = ``;
            });
        }
        else {
            // if 'player-maximized' class is present on LM but maximized class is not on video players
            videoMaximized = false;
            layoutContainer.classList.remove('player-maximized');
            resetInsideSync();
        }
    }
    else {
        if (gridIndex > 0) {
            resetInsideSync();
        }
    }

    getpartToCalculate();

    function resetInsideSync() {
        if (document.querySelector('div[id^="con_"]:first-of-type') !== null) {
            document.querySelector('div[id^="con_"]:first-of-type').style.gridRowEnd = 1;
            document.querySelector('div[id^="con_"]:first-of-type').style.gridArea = ``;
            document.querySelector('div[id^="con_"]:first-of-type').style.height = `${parseInt(confoContainerHeight / (gridLayoutTemplate[gridIndex].LMAT))}px`;
            document.querySelector('div[id^="con_"]:first-of-type').style.width = `${parseInt(layoutContainerWidth / gridLayoutTemplate[gridIndex].cols)}px`;

        }
        document.querySelectorAll('div[id^="con_"]:not(:first-of-type)').forEach(item => {
            item.style.height = `${parseInt(confoContainerHeight / (gridLayoutTemplate[gridIndex].LMAT))}px`;
            item.style.width = `${parseInt(layoutContainerWidth / gridLayoutTemplate[gridIndex].cols)}px`;
            item.style.gridArea = ``;
            item.style.gridRowEnd = '';
        });
    }

    function getpartToCalculate() {
        var ratio = 1.34;
        var {layoutContainer, finalLayoutWidth} = getLayOutDimensions();

        document.querySelectorAll('div[id^="con_"]').forEach((item, index) => {
            var newWidth, newHeight, condition = 0;
            videoPlayerContainerWidth = item.getClientRects()[0].width;
            videoPlayerContainerHeight = item.getClientRects()[0].height;

            if (((presentationStarted && (desktop_shared == false))) && item.dataset.stream === '21' || item.dataset.stream === '11' && index === 0) {
                var gridTemplateCols = ``;
                var shareScreenContainer = document.querySelector('div[id^="con_' + item.dataset.stream + '"]');

                var pWidth = shareScreenContainer.clientWidth;

                if (gridIndex !== '0p')
                    gridTemplateCols += `${pWidth}px ${finalLayoutWidth - pWidth}px`;

                if (gridIndex === '0p') {
                    layoutContainer.style.justifyItems = 'center';
                }
                else {
                    layoutContainer.style.justifyItems = '';
                }

                layoutContainer.style.gridTemplateColumns = gridTemplateCols;
                layoutContainer.style.gridAutoRows = `${parseInt(confoContainerHeight / (gridLayoutTemplate[gridIndex].LMAT))}px`;
            }
            else if (videoMaximized && item.classList.contains('maximized')) {
                var gridTemplateCols = ``;
                var pWidth = document.querySelector('div[id^="con_"].maximized').clientWidth;
                gridTemplateCols += `${pWidth}px ${finalLayoutWidth - pWidth}px`;
                layoutContainer.style.gridTemplateColumns = gridTemplateCols;
                layoutContainer.style.gridTemplateRows = '1fr';
                var LMAT = (ATUserList.length <= 2) ? 2 : gridLayoutTemplate[gridIndex].LMAT - 1;
                layoutContainer.style.gridAutoRows = `${parseInt(confoContainerHeight / (LMAT))}px`;
                if (item.classList.contains('maximized')) {
                    // console.log('skip this loop..');
                }
            }

            else {

                var playerContainerRatio = parseFloat((videoPlayerContainerWidth / videoPlayerContainerHeight).toFixed(2));
                if (playerContainerRatio > ratio) {
                    newWidth = (videoPlayerContainerHeight * ratio).toFixed(2);
                    newHeight = videoPlayerContainerHeight;
                    condition = 1;

                }
                else if (playerContainerRatio === ratio) {
                    newWidth = (videoPlayerContainerWidth);
                    newHeight = videoPlayerContainerHeight;
                    condition = 2;
                    var newRatio = parseFloat((newWidth / newHeight).toFixed(2));
                    ({newWidth, newHeight, condition} = getDimensionByRatio(newRatio, newWidth, newHeight, condition));
                }
                else {
                    newWidth = (videoPlayerContainerWidth * ratio).toFixed(2);
                    newHeight = videoPlayerContainerHeight;
                    condition = '3.0';
                    var newRatio = parseFloat((newWidth / newHeight).toFixed(2));
                    ({newWidth, newHeight, condition} = getDimensionByRatio(newRatio, newWidth, newHeight, condition));
                }

                newWidth = Math.floor(newWidth);
                newHeight = Math.floor(newHeight);

                // console.log({
                //     videoPlayerContainerWidth: videoPlayerContainerWidth,
                //     videoPlayerContainerHeight: videoPlayerContainerHeight,
                //     newWidth: newWidth,
                //     newHeight: newHeight,
                //     condition: condition,
                // })

                document.querySelector(`#${item.id} .default_vcx_player`).style.width = `${newWidth}px`;
                document.querySelector(`#${item.id} .default_vcx_player`).style.height = `${newHeight}px`;
                document.querySelector(`#${item.id}`).style.width = `${newWidth}px`;
                document.querySelector(`#${item.id}`).style.height = `${newHeight}px`;

                if (!(presentationStarted && (desktop_shared == false)) && !videoMaximized) {
                    var gridTemplateCols = ``;
                    for (var ind = 0; ind < gridLayoutTemplate[gridIndex].cols; ind++) {
                        if (!index > 0 && ((presentationStarted && (desktop_shared == false)) || videoMaximized)) break;
                        gridTemplateCols += ` ${newWidth}px`;
                    }
                    layoutContainer.style.gridTemplateColumns = gridTemplateCols;
                    layoutContainer.style.gridAutoRows = `${newHeight}px`;
                    layoutContainer.style.height = `auto`;
                }

                else if ((presentationStarted && (desktop_shared == false)) || videoMaximized) {
                    layoutContainer.style.height = `${confoContainerHeight}px`;
                }

                layoutContainer.style.justifyContent = 'center';
                condition = 0;
            }
        });


        function getDimensionByRatio(newRatio, newWidth, newHeight, condition) {
            // console.log('condition::: ', condition, (presentationStarted || videoMaximized));
            if (newRatio < ratio) {
                newWidth = videoPlayerContainerWidth;
                newHeight = (videoPlayerContainerWidth / ratio).toFixed(2);
                condition = '3.1';
            }
            else if (newRatio > ratio) {

                if ((presentationStarted && (desktop_shared == false)) || videoMaximized) {
                    newWidth = (videoPlayerContainerHeight * ratio).toFixed(2);
                    newHeight = videoPlayerContainerHeight;
                    condition = '3.2.0';

                    if (newWidth > videoPlayerContainerWidth) {
                        newWidth = videoPlayerContainerWidth;
                        newHeight = (videoPlayerContainerWidth / ratio).toFixed(2);
                        condition = '3.2.0.1';
                    }
                }
                else {
                    newWidth = videoPlayerContainerHeight;
                    newHeight = (videoPlayerContainerHeight / ratio).toFixed(2);
                    condition = '3.2.1';
                }
            }
            else {
                if ((presentationStarted && (desktop_shared == false)) || videoMaximized) {
                    newWidth = (videoPlayerContainerHeight * ratio).toFixed(2);
                    newHeight = videoPlayerContainerHeight;
                    condition = '3.3.0';
                }
                else {
                    newWidth = (videoPlayerContainerWidth * ratio).toFixed(2);
                    newHeight = videoPlayerContainerHeight;
                    condition = '3.3.1';

                    if (newWidth > videoPlayerContainerWidth) {
                        newWidth = videoPlayerContainerWidth;
                        newHeight = (videoPlayerContainerWidth / ratio).toFixed(2);
                        condition = '3.3.1.2';
                    }
                }
            }

            return {newWidth, newHeight, condition};
        }

    }
}

// window.addEventListener('resize', function () {
//     updateLayoutUponChange(ATUserList, presentationStarted);
// });


$(document).ready(function () {
    $("#cancel_feedback").on("click", function () {
        $("#feedback-dialog").modal("toggle");
    })

    $("#notify-btn").click(function (e) {
        $("#notify-container").toggle();

    });
    $("#user-list-btn").click(function (e) {
        $("#user-list-container").toggle();
        getUser();
    });
    var x = document.cookie;
    var videoSupportRating = 0;
    $("#invite_btn").on("click", function () {
        $("#invite-dialog").modal("toggle")
    });
    $("#feedback_btn").on("click", function () {
        $("#feedback-dialog").modal("toggle")
    });

    $('.icheck').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal',
    });

    $('#stars li').on('mouseover', function () {
        var onStar = parseInt($(this).data('value'), 10);
        $(this).parent().children('li.star').each(function (e) {
            if (e < onStar)
                $(this).addClass('hover');
            else
                $(this).removeClass('hover');
        });

    }).on('mouseout', function () {
        $(this).parent().children('li.star').each(function (e) {
            $(this).removeClass('hover');
        });
    });

    /* 2. Action to perform on click */
    $('#stars li').on('click', function () {
        var onStar = parseInt($(this).data('value'), 10);
        var stars = $(this).parent().children('li.star');

        for (i = 0; i < stars.length; i++)
            $(stars[i]).removeClass('selected');

        for (i = 0; i < onStar; i++)
            $(stars[i]).addClass('selected');


        videoSupportRating = parseInt($('#stars li.selected').last().data('value'), 10);

    });

    $("#send_feedback").on("click", function () {
        $("#send_feedback").attr("disabled", "disabled");
        var logs_sent = language.not_sent;
        if (document.querySelector('#attach_logs').checked) {
            postLog();
            logs_sent = language.sent
        }
        audio_issues = "<ul>";
        video_issues = "<ul>";
        if (document.querySelector('#audio_not_present').checked) {
            audio_issues += "<li>" + language.audio_not_present_txt + "</li>";
        }
        if (document.querySelector('#video_not_present').checked) {
            video_issues += "<li>" + language.video_not_present_txt + "</li>";
        }
        if (document.querySelector('#audio_was_bad').checked) {
            audio_issues += "<li>" + language.audio_is_bad_txt + "</li>";
        }
        if (document.querySelector('#video_is_bad').checked) {
            video_issues += "<li>" + language.video_is_bad_txt + "</li>";
        }
        if (document.querySelector('#other_participant_not_hear_me').checked) {
            audio_issues += "<li>" + language.other_participant_not_hear_me_txt + "</li>";
        }
        if (document.querySelector('#other_participant_not_see_me').checked) {
            video_issues += "<li>" + language.other_participant_not_see_me_txt + "</li>";
        }

        if (video_issues == "<ul>") {
            video_issues = language.none;
        } else {
            video_issues += "</ul>"
        }
        if (audio_issues == "<ul>") {
            audio_issues = language.none;
        } else {
            audio_issues += "</ul>"
        }

        var tok = JSON.parse(window.atob(token));
        send_mail({
            "name": username,
            "ratings": videoSupportRating,
            "log_id": tok.logId,
            "console_logs_status": logs_sent,
            "audio": audio_issues,
            "video": video_issues
        }, function (res) {
            if (res) {
                toastr.success("Thank you for your valuable feedback.");
                $("#feedback-dialog").modal("hide");
            }
        });
    });

    document.getElementById('file_upload_public').addEventListener('change', handlePublicFileSharing, false);
    document.getElementById('file_upload_public').addEventListener("click", function (evt) {
        evt.target.value = null ;
    }, false);



    function handlePublicFileSharing(evt) {

        var shareOptions = {
            "broadcast": true
        };
        var files = evt.target.files; // FileList object
        //    that.filesToUpload = files;
        // temp test for android
        //    that.sendFiles(that.filesToUpload);
        room.sendFiles(files,shareOptions);
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {
            console.log(f);
        }
    }
    function handlePrivateFileSharing(evt) {

        var shareOptions = {
            "broadcast": false
        };

        var clientList =[];

        var files = evt.target.files; // FileList object
        //    that.filesToUpload = files;
        // temp test for android
        //    that.sendFiles(that.filesToUpload);
        room.sendFiles(files,shareOptions,clientList);
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

            console.log(f);

        }
    }
});

function file_download(id){
    let availableFiles = room.availableFiles;
    room.recvFiles(availableFiles[id].index, options = {},
        function callbacker(res){
            console.log('download response',res)
        });
}





