<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Aperi | @yield('title')</title>
    <meta http-equiv="X-UA-Compatible" content="IE=9"/>
    <link rel="shortcut icon" href="{{ asset('assets/admins/images/icon.png') }}"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @include('apps.components._meta')
    <script>
        let content = {
            token: "{{ $token }}",
            role: "{{ $role }}",
            roomId: "{{ $roomId }}",
            user_ref: "{{ $user_ref }}",
            room: "{{ $room }}",
        };
    </script>
</head>
<body class="fixed-sidebar fixed-header fixed-footer skin-default sidebar-closed">
@yield('content')
@include('apps.components._script')
</body>
</html>
