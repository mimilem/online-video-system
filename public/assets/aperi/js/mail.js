
function sendFeedBackMail(details,callback){
    var lang = details.lang;
    mail_body = "<p><strong>"+lang.name_txt+": </strong>"+details.name+" <br>" +
            "<strong>"+lang.console_logs+": </strong>"+ details.console_logs_status+"<br>" +
            "<strong>"+lang.log_id+": </strong>"+details.log_id+"<br>" +
            "<strong>"+lang.feedback_rating+": </strong>"+details.ratings+"<br>" +
            "<strong>"+lang.audio_issue_txt+": </strong><br/><p>"+details.audio+"</p>" +
            "<strong>"+lang.video_issue_txt+":</strong><br/><p> "+details.video+"</p>" +
            "<strong>"+lang.comments+":</strong><br/><p> "+details.comments+"</p>" +
            "<br>" +
            "<p>"+lang.received_ip_txt+" "+ details.ip +" "+lang.on+" "+new Date(new Date().toUTCString())+"</p>" +
            "</p>";
    var html_body = email_template.replace("{{content}}",mail_body);
    mailObj = {
        "body" : html_body,
        "name" : details.name,
        "subject" : lang.feedback_txt + " - "+lang.log_id + " "+ details.log_id

    };
    send_feedback_mail(mailObj,function(data){
        callback(data);
    });


}
function sendPostSessFeedBackMail(details,callback){
    var lang = details.lang;
    var et = details.et ;
    mail_body = "<p><strong>"+lang.name_txt+": </strong>"+details.name+" <br>" +
        "<strong>"+lang.log_id+": </strong>"+details.log_id+"<br>" +
        "<strong>"+lang.feedback_rating+": </strong>"+details.ratings+"<br>" +
        "<strong>"+lang.audio_issue_txt+": </strong><br/><p>"+details.audio+"</p>" +
        "<strong>"+lang.video_issue_txt+": </strong>"+details.video+"" +
        "<br>" +
        "<p>"+lang.received_ip_txt+" "+ details.ip +" "+lang.on+" "+new Date(new Date().toUTCString())+"</p>" +
            "</p>";
    html_body = et.replace("{{content}}",mail_body);
    mailObj = {
        "body" : html_body,
        "name" : details.name,
        "subject" : "Feedback -Log id  "+ details.log_id
    };

    send_feedback_mail(mailObj,function(data){
        callback(data)
    });

}

function send_feedback_mail(details,callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
    };
    xhttp.open("POST", "/sendMail/", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(details));

}



