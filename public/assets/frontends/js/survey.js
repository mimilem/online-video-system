window.onload = function(){
   

   
   
    $("#submitSurvey").on("click",function () {
        $("#submitSurvey").attr("disabled","disabled");
        var key = window.location.href.split("/")[window.location.href.split("/").length - 1];
        var statisfaction,requirement_meet,features,intersted,timeline;
        statisfaction = $("input[name='statisfection']:checked").val() !== undefined ? $("input[name='statisfection']:checked").val(): "";
        requirment = $("input[name='requirements']:checked").val() !== undefined ? $("input[name='requirements']:checked").val(): "";;
        features = $("input[name='features']").val();
        intersted = $("input[name='subs']:checked").val() !== undefined ? $("input[name='subs']:checked").val(): "";
        timeline = $("input[name='expected_timeline']:checked").val() !== undefined ? $("input[name='expected_timeline']:checked").val(): "";

        username = localStorage.getItem("userName");
        
        send_survey_mail({"log_id":key,"name":username,"satisfaction":statisfaction,"requirement_meet":requirment,"timeline":timeline,"features":features,"intersted":intersted},function (res) {
            if(res){
                toastr.success("Thank you for your valuable feedback.","",{ positionClass : "toast-top-center"});
            
                $("#submitSurvey").removeAttr("disabled");
                setTimeout(function(){
                    window.location.href="https://www.enablex.io/";
                },5000);
            }
        });
    });
}

function send_survey_mail(details,callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
    };
    xhttp.open("POST", "/sendSurveyEmail/", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(details));

}