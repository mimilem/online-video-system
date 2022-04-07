
//alocal object[Application Specific]
//usedax to capture the users willingness to create a pin for this room
const createPinBasedRoom = {};
const users = [];
$('#schedule_meeting_time').clockpicker({autoclose: true, default: 'now',});
$('#schedule_meeting_date').datepicker({
    format: 'dd-mm-yyyy',
    autoclose:true
   });
$("#schedule_meeting_date").datepicker().datepicker("setDate", new Date());

const createRoom = function(details, callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            callback(this.responseText);
        }
    };
    xhttp.open("POST", "/createRoom/", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(details));
};

function scheduleMeeting() {
    const obj = {};
    if(document.getElementById("schedule_meeting_topic").value !== ""){
        obj.topic = document.getElementById("schedule_meeting_topic").value.trim();
    }else{
        alert("Topic is important");
        return;
    }
    if(document.getElementById("schedule_meeting_username").value !== ""){
        obj.username = document.getElementById("schedule_meeting_username").value.trim();
    }else{
        alert("Username is mandatory");
        return;
    }
    if(document.getElementById("schedule_meeting_useremail").value !== ""){
        obj.useremail = document.getElementById("schedule_meeting_useremail").value.trim();  //
    }else if(document.getElementById("schedule_meeting_useremail").value === ""){
        alert("Can't proceed without your email");
        return;
    }else if(!document.getElementById("schedule_meeting_useremail").value.match("(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")){
        alert("Invalid email ID")
    }
    if(document.getElementById("schedule_meeting_date").value !== ""){
        //obj.datetime = document.getElementById("schedule_meeting_date").value.trim();
    }else{
        alert("Needs to schedule time for meeting");
        return;
    }
    if(document.getElementById("schedule_meeting_time").value !== ""){
        //obj.datetime = document.getElementById("schedule_meeting_time").value.trim();
    }else{
        alert("Needs to schedule time for meeting");
        return;
    }
    if(document.getElementById("schedule_meeting_message").value !== ""){
        obj.message = document.getElementById("schedule_meeting_message").value.trim();
    }
    const inviteEmailDivs = document.getElementsByClassName("schedule_meeting_user");
    const date = document.getElementById("schedule_meeting_date").value.trim();
    const time = document.getElementById("schedule_meeting_time").value.trim();
    obj.scheduled_time = moment(date+" "+time,"DD-MM-YYYY HH:mm").utc().format("YYYY-MM-DD HH:mm:ss");
    // alert(moment(date+" "+time,"DD-MM-YYYY HH:mm").utc().format("YYYY-MM-DD HH:mm:ss"));
    obj.video_codec_h264 = false;
    for(var i=0;i<inviteEmailDivs.length;i++){
        if(inviteEmailDivs[i].value !== ""){
            if(inviteEmailDivs[i].value.trim().match("(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")) {
                users.push(inviteEmailDivs[i].value.trim());
            }else{
                alert("Invalid Email ID");
                return;
            }
        }
    }
    if(users.length < 1){
        alert("At least one invite is required");
        return;
    }
    obj.scheduled = true;
    obj.adhoc = false;
    obj.inviteUsers = users;
    createRoom(obj,function (result) {
        const res = JSON.parse(result);
        if(res.result === 0){
            alert("Invited To Room Successfully");
            // window.location.reload();
        }else{
            alert("Unable To contact Server, Try after sometime");
        }
    });
}

function adhocMeeting() {
    const obj = {};
    if(document.getElementById("adhoc_meeting_topic").value !== ""){
        obj.topic = document.getElementById("adhoc_meeting_topic").value.trim();
    }else{
        alert("Topic is important");
        return;
    }
    if(document.getElementById("adhoc_meeting_username").value !== ""){
        obj.username = document.getElementById("adhoc_meeting_username").value.trim();
    }else{
        alert("Username is mandatory");
        return;
    }
    if(document.getElementById("adhoc_meeting_useremail").value !== ""){
        obj.useremail = document.getElementById("adhoc_meeting_useremail").value.trim();  //
    }else if(document.getElementById("adhoc_meeting_useremail").value === ""){
        alert("Can't proceed without your email");
        return;
    }else if(!document.getElementById("adhoc_meeting_useremail").value.match("(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")){
        alert("Invalid email ID")
    }
    if(document.getElementById("adhoc_meeting_message").value !== ""){
        obj.message = document.getElementById("adhoc_meeting_message").value.trim();
    }
    obj.scheduled = false;
    obj.adhoc = true;
    obj.video_codec_h264 = false;

    const inviteEmailDivs = document.getElementsByClassName("adhoc_meeting_user");
    obj.dateTime = moment()._d.getTime();
    const users = [];
    for(var i=0;i<inviteEmailDivs.length;i++){
        if(inviteEmailDivs[i].value !== ""){
            if(inviteEmailDivs[i].value.trim().match("(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")) {
                users.push(inviteEmailDivs[i].value.trim());
            }else{
                alert("Invalid Email ID");
                return;
            }
        }
    }
    if(users.length < 1){
        alert("Atleast one invite is required");
        return;
    }
    obj.inviteUsers = users;
    createRoom(obj,function (res) {
        if(res){
            alert("Invited To Room Successfully");
            // window.location.reload();
        }else{
            alert("Error when sending Invitation");
        }

    });
}

function parmanentRoom() {
    var obj = {};
    if(document.getElementById("pRoomName").value !== ""){
        obj.topic = document.getElementById("pRoomName").value.trim();
    }else{
        alert("Topic is important");
        return;
    }
    if(document.getElementById("pRoomUserName").value !== ""){
        obj.username = document.getElementById("pRoomUserName").value.trim();
    }else{
        alert("Username is mandatory");
        return;
    }
    if(document.getElementById("pRoomUserEmail").value !== ""){
        obj.useremail = document.getElementById("pRoomUserEmail").value.trim();  //
    }else if(document.getElementById("pRoomUserEmail").value === ""){
        alert("Can't proceed without your email");
        return;
    }else if(!document.getElementById("pRoomUserEmail").value.match("(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")){
        alert("Invalid email ID")
    }
    if(document.getElementById("pRoomInviteMsg").value !== ""){
        obj.message = document.getElementById("pRoomInviteMsg").value.trim();
    }
    obj.active_talker = true;
    obj.video_codec_h264 = false;
    obj.scheduled = false;
    obj.adhoc = false;
    const inviteEmailDivs = document.getElementsByClassName("pRoomInviteUser");
    obj.dateTime = moment()._d.getTime();
    const users = [];
    for(var i=0;i<inviteEmailDivs.length;i++){
        if(inviteEmailDivs[i].value !== ""){
            if(inviteEmailDivs[i].value.trim().match("(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")) {
                users.push(inviteEmailDivs[i].value.trim());
            }else{
                alert("Invalid Email ID");
                return;
            }
        }
    }
    obj.inviteUsers = users;
    obj.pin = {};
    obj.pin.mpin = Math.floor(100000 + Math.random() * 900000);
    obj.pin.ppin = Math.floor(100000 + Math.random() * 900000);
    if(obj.pin.mpin === obj.pin.ppin){
        obj.pin.mpin = Math.floor(100000 + Math.random() * 900000);
        obj.pin.ppin = Math.floor(100000 + Math.random() * 900000);
    }
    obj.pin.mpin = obj.pin.mpin.toString();
    obj.pin.ppin = obj.pin.ppin.toString();
    // }
    createRoom(obj,function (res) {
        if(res){
            alert("Invited To Room Successfully");
            // window.location.reload();
        }else{
            alert("Error when sending Invitation");
        }

    });
}
