var vcxSettings = {};

vcxSettings.syncVideoDevices = () => {
    var refreshIcon = document.getElementById('cam').nextSibling.nextSibling.childNodes[0];
    refreshIcon.classList.add('fa-spin');
    getDevice(() => {
        console.log('Devicelist updated');
        refreshIcon.classList.remove('fa-spin');
    });
};

vcxSettings.syncAudioDevices = () => {
    var refreshIcon = document.getElementById('mic').nextSibling.nextSibling.childNodes[0];
    refreshIcon.classList.add('fa-spin');
    getDevice(() => {
        console.log('Audio Devicelist updated');
        refreshIcon.classList.remove('fa-spin');
    });
};

vcxSettings.previewCamera = (_this) => {
    const container = document.querySelector('#preview-camera');
    const video = document.querySelector('#preview-video');
    const deviceId = _this.childNodes[_this.selectedIndex].id;
    container.style.display = "block";
    const constraints = {
        video: {
            deviceId: { exact: deviceId }
        }
    };
    navigator.mediaDevices.getUserMedia(constraints).
        then((stream) => {
            console.log(stream)
            video.srcObject = stream;
        });
};

/**
 * Unpublish localStream
 */
vcxSettings.unPublishMe = (stream, callback) => {
    room.unpublish(stream, callback);
};

vcxSettings.publishMe = (config, callback) => {
    var success = null;
    const onAccessError = (err) => {
        error = err;
        callback(success, error);
    };
    const onAccessSuccess = () => {
        success = { "localStream": localStream };
        room.publish(localStream, {}, (response) => {
            if (response.result === 0) {
                success['publishId'] = response.id;
                callback(success, null);
            } else {
                callback(null, response);
            }
        });
    };

    localStream = room.initPublishStream('', config, onAccessSuccess, onAccessError);
};

vcxSettings.toggleSidebar = (selector) => {
    var { confoContainer, conf_container_inner_height, layoutContainer, finalLayoutWidth } = getLayOutDimensions();
    $('#sidebar-toggle').tooltip('dispose');
    let element = document.querySelector(selector);
    let body = document.body;
    let sidebarWidth = element.clientWidth;
    let toggleTrigger = document.querySelector('#sidebar-toggle');
    let siteContent = document.querySelector('.site-content');
    let footer = document.querySelector('.fixed-footer .footer');
    let watermark = document.querySelector('.watermark');
    let toggleOpenIcon = 'fas fa-angle-double-right';
    let toggleCloseIcon = 'fas fa-angle-double-left';
    watermark.style.width = '100%';

    let confoCurrentWidth = document.querySelector(".confo-container").clientWidth;
    console.log('sidebarWidth: ', sidebarWidth, 'confoCurrentWidth: ', confoCurrentWidth)

    if (body.classList.contains('sidebar-opened')) {
        element.style.left = `-${sidebarWidth}px`;
        siteContent.style.marginLeft = 0;
        footer.style.marginLeft = 0;
        toggleTrigger.setAttribute('title', 'Open sidebar');
        toggleTrigger.firstElementChild.setAttribute('class', toggleOpenIcon);
        toggleTrigger.style.left = 0;
        confoContainer.style.width = `${confoCurrentWidth + sidebarWidth}px`;
        body.classList.remove('sidebar-opened');
        body.classList.add('sidebar-closed');
        vcxSettings.initToolTip('#sidebar-toggle', 'Open Sidebar', 'right');
    }
    else {
        console.log(document.querySelector(".confo-container").clientWidth);
        element.style.left = 0;
        siteContent.style.marginLeft = `${sidebarWidth}px`;
        footer.style.marginLeft = `${sidebarWidth}px`;
        toggleTrigger.firstElementChild.setAttribute('class', toggleCloseIcon);
        confoContainer.style.width = `${confoCurrentWidth - sidebarWidth}px`;
        toggleTrigger.style.left = `${sidebarWidth}px`;
        body.classList.remove('sidebar-closed');
        body.classList.add('sidebar-opened');
        toggleTrigger.setAttribute('title', 'Close Sidebar');
        vcxSettings.initToolTip('#sidebar-toggle', 'Close Sidebar', 'right');
    }

    vcxSettings.recalculateContainerDimensions();
};

vcxSettings.recalculateContainerDimensions = () => {
    let { layoutContainer } = getLayOutDimensions();
    syncLayout(layoutContainer, ATUserList.length);
    if (wb && wb.canvas) {
        resizeWhiteboardCanvas();
    }
};

/**
 * Unhide Private chats window
 */
vcxSettings.showPvtChat = () => {
    if (document.body.classList.contains('sidebar-closed')) {
        vcxSettings.toggleSidebar('.site-sidebar');
        vcxSettings.resetPvtChatsCount();
    }
};

vcxSettings.resetPvtChatsCount = () => {
    var pvtChatCounts = document.querySelector(`#pvt_chat-tag`);
    pvtChatCounts.classList.remove('show-this');
    pvtChatCounts.classList.add('hide-this');
    var pvtChattagBtn = _V('#private_chat_btn');
    pvtChattagBtn.style.display = 'none';
};


vcxSettings.initToolTip = (selector, title, placement) => {
    $(selector).tooltip({
        title: title,
        placement: placement
    });
};

window.addEventListener('load', () => {
    vcxSettings.initToolTip('#sidebar-toggle', 'Open Sidebar', 'right');
    vcxSettings.toggleSidebar('.site-sidebar');
    vcxSettings.recalculateContainerDimensions();
    document.querySelector('#cam').addEventListener('change', (event) => {
        vcxSettings.previewCamera(event.target)
    });
    document.querySelector('#sidebar-toggle').addEventListener('click', (event) => {
        vcxSettings.resetPvtChatsCount();
        event.preventDefault();
        vcxSettings.toggleSidebar('.site-sidebar');
    });
    document.querySelector('.watermark').style.diplay = 'flex';
});

window.addEventListener('resize', function () {
    vcxSettings.recalculateContainerDimensions();
});