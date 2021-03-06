<!DOCTYPE html>
<html lang="en" class="js">
<head>
    <title>{{ config('app.name') }} | @yield('title')</title>
    <link rel="stylesheet" href="{{ asset('assets/admins/css/dashlite.css') }}">
    <link rel="icon" sizes="512x512" href="{{ asset('assets/admins/images/icon.png') }}">
    @yield('styles')
</head>

<body class="nk-body bg-white npc-default pg-auth">

<div class="nk-app-root">
    <div class="nk-main ">
        <div class="nk-wrap nk-wrap-nosidebar">
            <div class="nk-content ">
                @yield('content')
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('assets/admins/js/bundle.js') }}"></script>
<script src="{{ asset('assets/admins/js/scripts.js') }}"></script>
@yield("scripts")
</body>
</html>
