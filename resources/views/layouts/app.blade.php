<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Aperi | @yield('title')</title>
    <link rel="shortcut icon" type="image/png" href="{{ asset('assets/admins/images/icon.png') }}"/>
    <link rel="stylesheet" href="{{ asset('assets/enableX/css/font-awesome.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/enableX/css/jquery.toast.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/enableX/css/bootstrap.css') }}"/>
    <link rel="stylesheet" href="{{ asset('assets/enableX/css/confo.css') }}">
    <script>
        window.site_url = '{{ url("/") }}';
        var urlData = {
            user_ref: '{{ $user_ref}}',
            usertype: '{{ $usertype}}',
            roomId: '{{ $roomId}}'
        }
    </script>
</head>
<body>
    @yield('content')

    <script type="text/javascript" src="{{ asset('assets/enableX/js/jquery-3.2.1.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/enableX/js/tether.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/enableX/js/bootstrap.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/enableX/js/jquery.toast.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/enableX/js/EnxRtc.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/enableX/js/confo.js') }}"></script>
</body>
</html>
