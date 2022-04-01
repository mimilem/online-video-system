<div class="modal fade" id="feedback-dialog" tabindex="-1" role="dialog" aria-labelledby="feedbackLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style="background: #0275d8;color: #fff;">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color:#fff">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="feedbackLabel">Your Feedback</h4>
            </div>
            <div class="modal-body">
                <div class="m-item">
                    <div class="feedback_form ">
                        <div class="row">
                            <div class="form-group col-sm-12">
                                <strong>How is your Call ?</strong>
                            </div>
                            <div class='col-sm-12 form-group'>
                                <ul id='stars'>
                                    <li class='star' title='Poor' data-value='1'>
                                        <i class='fa fa-star fa-fw'></i>
                                    </li>
                                    <li class='star' title='Fair' data-value='2'>
                                        <i class='fa fa-star fa-fw'></i>
                                    </li>
                                    <li class='star' title='Good' data-value='3'>
                                        <i class='fa fa-star fa-fw'></i>
                                    </li>
                                    <li class='star' title='Excellent' data-value='4'>
                                        <i class='fa fa-star fa-fw'></i>
                                    </li>
                                    <li class='star' title='WOW!!!' data-value='5'>
                                        <i class='fa fa-star fa-fw'></i>
                                    </li>
                                </ul>
                            </div>
                            <div class="form-group col-sm-12 display-flex" id="attach_log_check">
                                <input type="checkbox" id="attach_logs" class="icheck" checked>
                                <label for="attach_logs" class="text-black" style="padding-left: 10px;">
                                    Attach Browser Console Log for qaulity diagnosis
                                </label>
                            </div>
                            <div class="col-sm-12">
                                <div class="col-sm-6">
                                    <div class="form-group"><strong>Audio Issues</strong></div>
                                    <div class="form-group  display-flex">
                                        <input type="checkbox" id="audio_not_present" class="icheck" >
                                        <label for="audio_not_present" class="text-black" style="padding-left: 10px;">
                                            I cannot hear anyone
                                        </label>
                                    </div>
                                    <div class="form-group  display-flex" >
                                        <input type="checkbox" id="audio_was_bad" class="icheck" >
                                        <label for="audio_was_bad" class="text-black" style="padding-left: 10px;">
                                            Poor Audio Quality
                                        </label>
                                    </div>
                                    <div class="form-group  display-flex" >
                                        <input type="checkbox" id="other_participant_not_hear_me" class="icheck" >
                                        <label for="other_participant_not_hear_me" class="text-black" style="padding-left: 10px;">
                                            Others cannot hear me
                                        </label>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group"><strong>Video Issues</strong></div>
                                    <div class="form-group  display-flex">
                                        <input type="checkbox" id="video_not_present" class="icheck" >
                                        <label for="video_not_present" class="text-black" style="padding-left: 10px;">
                                            I cannot see anyone
                                        </label>
                                    </div>
                                    <div class="form-group  display-flex" >
                                        <input type="checkbox" id="video_is_bad" class="icheck" >
                                        <label for="video_is_bad" class="text-black" style="padding-left: 10px;">
                                            Poor Video quality
                                        </label>
                                    </div>
                                    <div class="form-group  display-flex" >
                                        <input type="checkbox" id="other_participant_not_see_me" class="icheck" >
                                        <label for="other_participant_not_see_me" class="text-black" style="padding-left: 10px;">
                                            Others cannot see me
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class=" form-group col-sm-12 text-center" style="margin-top:20px;">
                                <button id="send_feedback" class="btn btn-success w-min-md">Send</button>
                                <button id="cancel_feedback" class="btn btn-danger w-min-md">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
