/**
 * Private messaging script
 * @Author: Vinod Rajbhar
 * @Date: 2019-07-01 09:42:08
 * @Desc:
 */

// Globals

/**
 * Short hand for document.querySelector
 * @param {*} selector
 */
var _V = function (selector, all = false) {
    if (all) {
        return document.querySelectorAll(selector);
    }
    return document.querySelector(selector);
};

var pmChatsListContainer = _V('#pm-list-container');
var footer = _V('.fixed-footer .footer');
var maxChatUiLimit = 4;
var pmListWithMaxFour = [];
var chatHistory = [];

// sidebar tabs trigger selectors
var participantsTabTrigger = _V('#pcr__topmenu .participants');
var publicChatTabTrigger = _V('#pcr__topmenu .chats');
var raisedHandsTabTrigger = _V('#pcr__topmenu .raised-hands');
var pcrNavItems = _V('#pcr__topmenu .nav-item', true);

// tabs selectors
var participantsTab = _V('#pcr__participants');
var publicChatTab = _V('#pcr__chats');
var raisedHandsTab = _V('#pcr_raise_hands');

publicChatTabTrigger.addEventListener('click', function () {
    chatTag.textContent = 0;
    chatCount = 0;
    chatTag.style.display = 'none';
    vcxSettings.resetPvtChatsCount();
});

/**
 * Get moderator client ID form users list in the room.
 */
function getModeratorClientId() {
    if (room.userList.size <= 1) {
        // console.log('Moderator not present...')
        return null;
    }
    var clientIndex = [...room.userList.values()].findIndex(item => {
        return item.role === 'moderator'
    });
    var client = [...room.userList][clientIndex][0];
    return client;
}
/**
 * Get user details by client ID
 * @param {*} clientId
 */
function getUserByClientId(clientId) {
    if (room.userList.has(clientId)) {
        return room.userList.get(clientId);
    }
}


/**
 * Checks for client id, moderator presence , then creates a card for pm
 * @param {*} selectedClient
 */
function createChatUIForClient(selectedClient = null) {
    var user = getUserByClientId(selectedClient);

    if (_V(`#personal-${selectedClient}`) !== null) {
        return;
    }

    // Create new card
    createCard(selectedClient, user);
}

/**
 * Create a new card for every client id provided
 * @param {*} clientId
 * @param {*} user
 */
function createCard(clientId, user) {
    var pmCont = document.createElement('div');
    pmCont.setAttribute('id', `personal-${clientId}`);
    pmCont.setAttribute('class', `pm-card`);

    var ui = `<div class="p1" id="pm-to-${clientId}">
            <div class="profile">
                <div class="close">
                    <div class="cy"></div>
                    <div class="cx"></div>
                </div>
                <p>${user.name}</p>
            </div>
            <div class="chat-messages" id="pm-list-${clientId}"></div>           
            
            <div class="send-message">
                <div class="input-group">
                    <input type="text" placeholder="Type here..."  data-cid="${clientId}" class="" onkeyup="sendPrivateChat(event)">
                        <span class="input-group-addon" id="basic-addon1">
                        
                            <label for="file_upload_private-${clientId}">
                                <i class="fa fa-paperclip fa-lg" aria-hidden="true"></i>
                            </label>
                            <input type="file" class="file-input hide" id="file_upload_private-${clientId}" name="file_upload" onchange="handlePrivateFileSharing(this)" data-cid="${clientId}">
                        </span>
                        
                        
                 </div>
                
            </div>
        </div>`;

    pmChatsListContainer.prepend(pmCont);
    _V(`#personal-${clientId}`).innerHTML = ui;

    setSidebarHeight();
    pmCont.querySelector(`#personal-${clientId} .close`).addEventListener('click', function () {
        pmCont.querySelector(".cx").classList.remove("s1", "s2", "s3");
        pmCont.querySelector(".cy").classList.remove("s1", "s2", "s3");
        pmCont.querySelector(".chat-messages, .profile, .profile p").classList.remove("animate");
        setTimeout(function () {
            _V(`#personal-${clientId}`).classList.remove('maximized');
            _V("#pm-list-container").style.display = "none";
            _V(".tab-content").style.display = "block";
        }, 50);
    });

    var chat_id = `${room.clientId}-${clientId}`;
    var keys = Object.keys(chatHistory);

    if (keys.includes(chat_id)) {
        renderOldChats(chatHistory[chat_id], clientId)
    }
}


/**
 * Update the chat ui with the latest message arrived
 * @param {*} obj
 */
function updateChatUI(obj) {

    var clientId = obj.user.clientId, 
    personalDOMId = `#personal-${clientId}`, pmListId = `#pm-list-${clientId}`;
    var elem = _V(pmListId);
    var pm = _V(personalDOMId);
    var senderName = obj.user.name;

    if (pm === null) {
        // createChatUIForClient(clientId);
        pm = _V(personalDOMId);
        // popPmWithAnimation(pm);
        elem = _V(pmListId);
        appendTemplateToPm(elem, { message: obj.msg, timestamp: obj.timestamp, name: senderName, doNotScroll: false }, false)
    } else {
        appendTemplateToPm(elem, { message: obj.msg, timestamp: obj.timestamp, name: senderName }, false)
    }

    // save received pm
    saveReceivedPMhistory({
        senderId: {
            name: senderName,
            clientId: clientId
        },
        message: obj.msg,
        timestamp: obj.timestamp,
        receiverId: room.clientId
    });

    //  Update chat counts on notifaction icons.
    updateChatNotificationsCount(clientId);
}


/**
 *
 * @param {object} data
 * @param {boolean} me
 */
function renderPmMessage(data, me = false) {
    var sentByMe = me ? 'right' : '';
    // const formattedDate = moment(data.timestamp).fromNow(); // human readable format
    const formattedDate = moment(data.timestamp).format('LT');
    var message = `<div class="message ${sentByMe}">
            <span class="name">${data.name}</span>
            <div class="bubble">
                ${data.message}
                <div class="corner"></div>
            </div>
            <span class="time">${formattedDate}</span>
        </div>`;
    return message;
}
/**
 *
 * @param {*} renderTo
 * @param {*} chatObj
 * @param {*} byMe
 */
function appendTemplateToPm(renderTo, chatObj, byMe = false) {
    var template = renderPmMessage(chatObj, byMe);
    $(template).appendTo(renderTo);
    if (!chatObj.hasOwnProperty('doNotScroll'))
        scrollDivLast(renderTo);
}

/**
 * Render chat history on opening the pm again
 * @param {object} oldChatData
 * @param {string} otherClientId
 */
function renderOldChats(oldChatData, otherClientId) {
    var renderToElem = _V(`#pm-list-${otherClientId}`);
    oldChatData.forEach(chat => {
        if (room.clientId === chat.sentBy) {
            appendTemplateToPm(renderToElem, chat, true);
        } else {
            appendTemplateToPm(renderToElem, chat);
        }
    });
}


/**
 * Update chat count for each user in sidebar for moderator
 * @param {*} clientId
 */
function updateChatNotificationsCount(clientId) {
    var chatTagElem = _V(`#chat-tag-${clientId}`);
    var pvtChattagElem = _V('#pvt_chat-tag');
    var pvtChattagBtn = _V('#private_chat_btn');

    var count = parseInt(chatTagElem.innerText);
    count += 1;
    chatTagElem.classList.remove('hide-this');
    chatTagElem.classList.add('show-this');
    chatTagElem.innerText = parseInt(count);

    pvtChattagElem.classList.remove('hide-this');
    pvtChattagElem.classList.add('show-this');

    pvtChattagBtn.style.display = 'inline-block';
}

/**
 * Show PM icon and add click listener on participant list for moderator once the room is connected
 */
function showPM() {
    var pmForparticipant = _V('#create-pm-participant');
    pmForparticipant.style.display = 'none';
    if (!isModerator) {
        pmForparticipant.style.display = 'inline-block';
    }
};

/**
 * Clear Chat Ui whenever an user leaves/disconnected from the call
 * @param {*} clientId
 */
function clearPMUi(clientId) {
    var pmToBeCleared = _V(`#personal-${clientId}`);
    if (pmToBeCleared !== null) {
        _V("#pm-list-container").style.display = "none";
        _V(".tab-content").style.display = "block";
        pmToBeCleared.remove();
    }
}

/**
 *  Add click Listener on participants list to start pm with them
 */
function addListenerForModToStartPM() {
    var partList = document.querySelectorAll('.pm-this-user');
    partList.forEach(user => {
        user.removeEventListener('click', (event) => {
            // console.log(event.target);
        });
        user.addEventListener('click', (ev) => {
            ev.preventDefault();
            var cid = ev.target.getAttribute('data-pmcid');
            // console.log(cid);
            if (_V(`#personal-${cid}`) !== null && _V(`#personal-${cid}`).classList.contains('maximized')) {
                return;
            }
            createChatUIForClient(cid);

            pmChatsListContainer.childNodes.forEach(item => {
                item.classList.remove('maximized');
                item.classList.add('minimized', 'pm-hide');
            });

            var pm = _V(`#personal-${cid}`);
            pm.classList.remove('minimized', 'pm-hide');
            pm.classList.add('maximized');

            popPmWithAnimation(pm);

            // Reset pm count for a particular client
            var pmNoti = _V(`#chat-tag-${cid}`);
            pmNoti.classList.remove('show-this');
            pmNoti.classList.add('hide-this');
            pmNoti.innerText = parseInt(0);
            vcxSettings.resetPvtChatsCount();
        });
    });
}



function popPmWithAnimation(pm) {

    setTimeout(function () {
        pm.querySelector(".profile p").classList.add("animate");
        pm.querySelector(".profile").classList.add("animate");
    }, 100);
    setTimeout(function () {
        pm.querySelector(".chat-messages").classList.add("animate");
        pm.querySelector(".cx").classList.add("s1");
        pm.querySelector(".cy").classList.add("s1");

        setTimeout(function () {
            pm.querySelector(".cx").classList.add("s2");
            pm.querySelector(".cy").classList.add("s2");
        }, 100);
        setTimeout(function () {
            pm.querySelector(".cx").classList.add("s3");
            pm.querySelector(".cy").classList.add("s3");
        }, 200);
    }, 150);

    _V(".tab-content").style.display = "none";
    _V("#pm-list-container").style.display = "block";
}

/**
 * Action to be performed on PM card.  actions: Maximize, Minimiz, Close
 * @param {*} event
 */
function pmCardActions(clientId, action) {
    // console.log(action)
    var actOnPm = _V(`#personal-${clientId}`);
    var pmHeight = '300';
    if (action === 'minimize') {
        minimizePM(clientId, pmHeight);
    } else if (action === 'maximize') {
        maximizePM(clientId, pmHeight);
    } else if (action === 'close') {
        endPM(clientId);
    }
}

/**
 * Minimize PM of the client id provided.
 * @param {*} clientId
 * @param {*} pmHeight
 */
function minimizePM(clientId, pmHeight) {
    var pmToMinimize = _V(`#personal-${clientId}`);
    pmToMinimize.style.bottom = '-340px';
    pmToMinimize.classList.remove('maximized');
    pmToMinimize.classList.add('minimized');
}

/**
 * Maximize PM of the client id provided.
 * @param {*} clientId
 * @param {*} pmHeight
 */
function maximizePM(clientId, pmHeight) {
    if (isModerator) {
        var pmNoti = _V(`#chat-tag-${clientId}`);
        pmNoti.classList.remove('show-this');
        pmNoti.classList.add('hide-this');
        pmNoti.innerText = parseInt(0);
    }
    var pmToMaximize = _V(`#personal-${clientId}`);
    pmToMaximize.style.bottom = 0;
    pmToMaximize.classList.remove('minimized');
    pmToMaximize.classList.add('maximized');
}

/**
 * Close the PM
 * @param {*} clientId
 */
function endPM(clientId) {
    clearPMUi(clientId);
}

/**
 * Send pm text with params to socket
 * @param {*} event
 */
function sendPrivateChat(event) {
    if (event.keyCode === 13) {
        var text = event.target.value;
        var senderName = room.me.name;

        if (text.length <= 0 || text.trim() === "") {
            event.target.value = '';
            return;
        }
        var clientId = event.target.getAttribute('data-cid');
        var elem = _V(`#pm-list-${clientId}`);
        var pmSentTime = moment()._d.getTime();

        appendTemplateToPm(elem, { message: text, timestamp: pmSentTime, name: senderName }, true);
        room.sendMessage(text,
            false,
            [clientId],
            function (data) {
                // console.log(data)
            });


        // save sent pm
        saveSentPMhistory({
            myId: {
                name: room.me.name,
                clientId: room.clientId
            },
            message: text,
            timestamp: pmSentTime,
            receiverId: clientId
        });
        event.target.value = '';
    }
}

function addToChatHistory(chat_id, data) {
    chatHistory[`${chat_id}`].push({
        sentBy: data.myId.clientId,
        name: data.myId.name,
        message: data.message,
        time: data.timestamp
    });
}

function saveSentPMhistory(data) {
    var chat_id = `${data.myId.clientId}-${data.receiverId}`;
    var keys = Object.keys(chatHistory);
    if (!keys.includes(`${chat_id}`)) {
        chatHistory[`${chat_id}`] = [];
        addToChatHistory(chat_id, data);
    } else {
        addToChatHistory(chat_id, data);
    }
}


function saveReceivedPMhistory(data) {
    var chat_id = `${data.receiverId}-${data.senderId.clientId}`;
    var keys = Object.keys(chatHistory);
    if (!keys.includes(`${chat_id}`)) {
        chatHistory[`${chat_id}`] = [];
        chatHistory[`${chat_id}`].push({
            sentBy: data.senderId.clientId,
            name: data.senderId.name,
            message: data.message,
            time: data.timestamp
        });
    } else {
        chatHistory[`${chat_id}`].push({
            sentBy: data.senderId.clientId,
            name: data.senderId.name,
            message: data.message,
            time: data.timestamp
        });
    }
}


function calculateHeightForchatUI() {
    var tosubtract = parseInt(_V('.site-header').offsetHeight) + parseInt(_V('#first_sidebar').offsetHeight) + parseInt(footer.offsetHeight);
    return parseInt(window.innerHeight - tosubtract);

}

/**
 * Set sidebar Height
 */
function setSidebarHeight() {
    var calculatedHeight = calculateHeightForchatUI();
    var pcrTopmenu = _V('#pcr__topmenu');
    var tabContentHeight = calculatedHeight - parseInt(pcrTopmenu.offsetHeight);
    _V('#sidebar-pcr-container').style.height = calculatedHeight + 'px';
    _V('.tab-content').style.height = tabContentHeight + 'px';

    var listContHeight = (tabContentHeight - 74);
    _V('.chat-messages', true).forEach(item => {
        item.style.height = (listContHeight - 30) + 'px';
    });
    _V('#chat').style.height = (listContHeight) + 'px';
}


function updateTabsVisibility() {
    setSidebarHeight();
}

window.addEventListener('load', function () {
    pcrNavItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var pmCont = _V('.pm-card.maximized');
            if (pmCont !== null) {
                pmCont.querySelector(".cx").classList.remove("s1", "s2", "s3");
                pmCont.querySelector(".cy").classList.remove("s1", "s2", "s3");
                pmCont.querySelector(".chat-messages, .profile, .profile p").classList.remove("animate");
                pmCont.classList.remove('maximized');
                _V("#pm-list-container").style.display = "none";
                _V(".tab-content").style.display = "block";
            }
        });
    });
});

// Listeners
window.addEventListener('resize', function () {
    setSidebarHeight();
});
