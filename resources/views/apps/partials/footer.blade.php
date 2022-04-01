<footer class="footer">
    <nav class="nav nav-1 border-top-gray">
        <div class="row no-gutter">
            <div class="col-md-12" style="display:flex;flex-direction: row;" id="control-panel">
                <span class="nav-link pad-20-30" id="audio_mute_btn" title="Mute" onclick="audioMute()">
                    <span>
                        <i class="fa fa-microphone fa-fw"></i>
                    </span><br>
                    Mute
                </span>
                <span class="nav-link pad-20-30" id="video_mute_btn" title="Stop" onclick="videoMute();">
                    <span>
                        <i class="fa fa-video fa-fw"></i>
                    </span><br>
                    Stop
                </span>
                <span class="nav-link pad-20-30" id="share_screen_btn" title="Start Share" onclick="screenShare();">
                    <span>
                        <i class="fa fa-desktop fa-fw SSicon"></i>
                    </span><br>
                    Share
                </span>
                <span class="nav-link pad-20-30" id="whiteboard_open" title="Open Whiteboad" >
                    <span>
                        <i class="fas fa-chalkboard fa-fw CBicon" id="startStreaming"></i>
                    </span><br>
                    <div class="whiteboard">Whiteboard</div>
                </span>
                <span class="nav-link pad-20-30" id="private_chat_btn" style="display:none;" title="Chat" onclick="vcxSettings.showPvtChat()">
                    <counter class="tag tag-danger footer-counter hide-this" id="pvt_chat-tag">&nbsp;</counter>
                    <span>
                        <i class="far fa-comments fa-fw"></i>
                    </span>
                    <br>
                    <div id="pvt_chat_txt">Chat</div>
                </span>
                <span class="nav-link pad-20-30" id="recording_btn" title="Start Record" onclick="startRoomRec();">
                    <span>
                        <i class="fa fa-circle fa-fw"></i>
                    </span><br>
                    <div id="record_text">Record</div>
                </span>
                <span class="nav-link pad-20-30" id="mute_all" title="Mute All" onclick="muteUnmuteAll();">
                    <span>
                        <i class="fa fa-microphone fa-fw "></i>
                    </span><br>
                    Mute All
                </span>
                <span class="nav-link pad-20-30" id="invite_btn" title="Invite">
                    <span>
                        <i class="far fa-envelope fa-fw"></i>
                    </span><br>
                    Invite
                </span>
                <span class="nav-link pad-20-30 to-toggle-settings" id="settings_panel" title="Settings" >
                    <span>
                        <i class="fas fa-cog fa-fw"></i>
                    </span><br>
                    <div class="settings_txt">Settings</div>
                </span>
            </div>
        </div>
    </nav>
</footer>
