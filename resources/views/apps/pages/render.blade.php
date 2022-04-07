@extends('layouts.rooms')

@section('title', "Joindre le room")

@section('content')
    <div class="wrapper">
        @include('apps.components._sidebar')
        <div class="template-options">
            @include('apps.components._setting')
        </div>
        @include('apps.components._endRoom')
        @include('apps.components._header')
        @include('apps.components._video')
    </div>
    @include('apps.partials.join')
    @include('apps.partials.chat')
    @include('apps.partials.footer')
    @include('apps.partials.feedback')
    @include('apps.partials.screenShare')
@endsection
