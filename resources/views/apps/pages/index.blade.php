@extends('layouts.app')

@section('title', "")

@section('content')
    <div class="container-fluid">
        <div class="col-md-12" style="width: 100%;height:100%;">
            <div class="video_container_div">
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-12">
                        <div id="local_video_div"></div>
                    </div>
                    <div class="col-md-9 col-sm-9" id="multi_video_container_div"></div>
                </div>
            </div>
            <div class="row" id="controls-div">
                <div class="controls" id="controls" style="background-color:grey;position: fixed;bottom: 0;left:0;width:100%;text-align: center">
                    <img src="{{ asset('img/mic.png') }}" style="margin-right: 20px;cursor: pointer;" class="cus_img_icon icon-confo-mute"  onclick="audioMute()" title="Mute audio" />
                    <img src="{{ asset('img/video.png') }}" style="margin-right: 20px;cursor: pointer;" class="cus_img_icon icon-confo-video-mute" title="Mute video" onclick="videoMute()" />
                    <img src="{{ asset('img/end-call.png') }}" style="margin-right: 20px;cursor: pointer;" class="cus_img_icon end_call" title="End call" onclick="endCall()" />
                </div>
            </div>
        </div>
    </div>
@endsection
