<div class="custom-scroll custom-scroll-dark">
    <div class="scw-header clearfix">
        <div class="float-xs-left">
            <strong>Settings</strong>
        </div>
    </div>
    <div class="settings-tab">
        <form>
            <div class="row setting-heading">
                <div class="col-sm-12">
                    <h5 id="switch_devices_txt">Switch Devices</h5>
                </div>
            </div>
            <div class="dvc_selection">
                <div class="form-group">
                    <div id="preview-camera" class="">
                        <video id="preview-video" playsinline autoplay></video>
                    </div>
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="fa fa-video fa-fw"></i>
                        </div>
                        <select id="cam" class="form-control"></select>
                        <div
                            class="input-group-addon"
                            title="Refresh video devices"
                            onclick="vcxSettings.syncVideoDevices()">
                            <i class="fas fa-sync"></i>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="fa fa-microphone fa-fw"></i>
                        </div>
                        <select id="mic" class="form-control"></select>
                        <div
                            class="input-group-addon"
                            title="Refresh audio devices"
                            onclick="vcxSettings.syncAudioDevices()"
                        >
                            <i class="fas fa-sync"></i>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group" style="text-align: right;">
                        <button id="btn-device-apply" class="btn btn-success w-min-md">
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </form>
        <div class="dropdown-divider mar-top"></div>
        <form>
            <div class="row setting-heading">
                <div class="col-sm-12">
                    <h5> Participants on Screen </h5>
                </div>
            </div>
            <div class="at_selection">
                <div class="row">
                    <div class="col-sm-9 col-xs-9">
                        <select id="selected" class="at_options form-control" style="width:100%; height: 35px;"></select>
                    </div>
                    <div class="col-sm-3 col-xs-3">
                        <button
                            id="btn-at-selection-apply"
                            class="btn btn-success w-min-xs"
                            onclick="setActiveTalker('selected')"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </form>
        <div class="dropdown-divider  mar-top"></div>
        <form>
            <div class="row setting-heading">
                <div class="col-sm-12">
                    <h5>Receive Video Quality</h5>
                </div>
            </div>
            <div class="quality_selection">
                <div class="row ">
                    <div class="col-sm-9 col-xs-9">
                        <select id="video-quality" class="form-control" style="width:100%;height: 35px;"></select>
                    </div>
                    <div class="col-sm-3 col-xs-3">
                        <button
                            id="btn-quality-selection-apply"
                            class="btn btn-success w-min-xs"
                            onclick="setReceiveVideoQuality('video-quality')">
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </form>
        <div class="dropdown-divider mar-top"></div>
        <div class="row setting-heading">
            <div class="col-sm-4">
                <h5>Enable Stats</h5>
            </div>
            <div class="col-md-8">
                <label class="switch">
                    <input type="checkbox" id="stats_enable" name="stats">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
    </div>
</div>
