<!DOCTYPE html>
<html lang="en" class="js">

<head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="{{ asset('assets/aperi/assets/logo.svg') }}">
    <title>{{ config('app.name') }} | @yield('title')</title>
    <link rel="stylesheet" href="{{ asset('assets/admins/css/dashlite.css') }}">
    <link rel="icon" sizes="512x512" href="{{ asset('assets/admins/images/icon.png') }}">
</head>

<body class="nk-body bg-white npc-general pg-error">
<div class="nk-app-root">
    <div class="nk-main ">
        <div class="nk-wrap nk-wrap-nosidebar">
            <div class="nk-content ">
                <div class="nk-block nk-block-middle wide-md mx-auto">
                    <div class="nk-block-content nk-error-ld text-center">
                        <img class="nk-error-gfx" src="{{ asset('assets/aperi/Aperi Logo/3x/Aperixhdpi.png') }}"
                             width="200" height="250" alt="">
                        <div class="wide-xs mx-auto">
                            <h3 class="nk-error-title">Gateway Timeout Error</h3>
                            <p class="nk-error-text">We are very sorry for inconvenience. It looks like some how our
                                server did not receive a timely response.</p>
                            <a href="{{ route('rooms.join') }}" class="btn btn-lg btn-primary mt-2">Back To Home</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('assets/admins/js/bundle.js') }}"></script>
<script src="{{ asset('assets/admins/js/scripts.js') }}"></script>
</html>
