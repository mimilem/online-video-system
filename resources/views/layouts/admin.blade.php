<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="js">
<head>
    <base href="/">
    @include('admins.partials.meta')
    <title>{{ config('app.name') }} | @yield('title')</title>
    <link rel="stylesheet" href="{{ asset('assets/admins/css/dashlite.css') }}">
    <link id="skin-default" rel="stylesheet" href="{{ asset('assets/admins/css/theme.css') }}">
    @yield('styles')
</head>

<body class="nk-body bg-lighter npc-general has-sidebar ">
<div id="app">
    <div class="nk-app-root">
        <div class="nk-main ">
            @include('admins.components.sidebar')
            <div class="nk-wrap">
                @include('admins.components.header')
                <div class="nk-content">
                    <div class="container-fluid">
                        @yield('content')
                    </div>
                </div>
                @include('admins.partials.footer')
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('assets/admins/js/bundle.js') }}"></script>
<script src="{{ asset('assets/admins/js/scripts.js') }}"></script>
@include('sweetalert::alert')
@yield('scripts')
</body>

</html>
