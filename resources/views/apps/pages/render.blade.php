<html lang="en">
<head>
    @include('apps.components._meta')
    <script>
        let content = {
            token : "{{ $token }}" ,
            role : "{{ $role }}",
            roomId : "{{ $roomId }}",
            user_ref: "{{ $user_ref }}",
            room : "{{ $room }}",
        };
    </script>
</head>
<body class="fixed-sidebar fixed-header fixed-footer skin-default sidebar-closed">
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
    @include('apps.components._script')
</body>
</html>
