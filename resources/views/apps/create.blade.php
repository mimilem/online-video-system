@extends('layouts.auth')

@section('title', "Create your room")

@section('content')
    <div class="nk-wrap nk-wrap-nosidebar">
        <div class="nk-content">
            <div class="nk-block nk-block-middle nk-auth-body wide-xs">
                <div class="brand-logo pb-4 text-center">
                    <a href="{{ route('room.create') }}" class="logo-link">
                        <img class="logo-light logo-img logo-img-lg"
                             src="{{ asset('assets/aperi/Aperi Logo/3x/Aperixhdpi.png') }}"
                             srcset="{{ asset('assets/aperi/Aperi Logo/3x/Aperixhdpi.png') }} 2x" alt="logo">
                        <img class="logo-dark logo-img logo-img-lg"
                             src="{{ asset('assets/aperi/Aperi Logo/3x/Aperixhdpi.png') }}"
                             srcset="{{ asset('assets/aperi/Aperi Logo/3x/Aperixhdpi.png') }} 2x" alt="logo-dark">
                    </a>
                </div>
                <div class="card">
                    <div class="card-inner card-inner-lg">
                        <div class="nk-block-head">
                            <div class="nk-block-head-content mb-3">
                                <h4 class="nk-block-title text-center">Create a Room</h4>
                            </div>
                        </div>
                        @if ($errors->any())
                            <div class="alert alert-danger" role="alert">
                                <ul>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                        <form action="{{ route('room.store') }}" method="POST">
                            @csrf
                            <div class="form-group">
                                <input
                                    type="text"
                                    class="form-control @error('name') error @enderror"
                                    name="name"
                                    value="{{ old('name') }}"
                                    placeholder="Add your name">
                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    class="form-control @error('firstName') error @enderror"
                                    name="firstName"
                                    value="{{ old('firstName') }}"
                                    placeholder="Add your first name">
                            </div>
                            <div class="form-group">
                                <div class="form-control-wrap">
                                    <input
                                        type="email"
                                        class="form-control @error('email') error @enderror"
                                        name="email"
                                        value="{{ old('email') }}"
                                        placeholder="Add your email address">
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div class="form-control-wrap">
                                            <input
                                                type="text"
                                                class="form-control @error('city') error @enderror"
                                                name="city"
                                                value="{{ old('city') }}"
                                                placeholder="Your city">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div class="form-control-wrap">
                                            <input
                                                type="text"
                                                class="form-control @error('country') error @enderror"
                                                name="country"
                                                value="{{ old('country') }}"
                                                placeholder="Your country">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <input
                                    type="date"
                                    class="form-control @error('date') error @enderror"
                                    name="date"
                                    value="{{ old('date') }}"
                                    placeholder="Add event date">
                            </div>
                            <div class="form-group">
                                <input
                                    type="time"
                                    class="form-control @error('startTime') error @enderror"
                                    name="startTime"
                                    value="{{ old('startTime') }}"
                                    placeholder="Add your start time">
                            </div>
                            <div class="form-group">
                                <div class="form-control-wrap">
                                    <input
                                        type="time"
                                        class="form-control @error('endTime') error @enderror"
                                        name="endTime"
                                        value="{{ old('endTime') }}"
                                        placeholder="Add your end time">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-control-wrap">
                                    <input
                                        type="text"
                                        class="form-control @error('usersNumber') error @enderror"
                                        name="usersNumber"
                                        value="{{ old('usersNumber') }}"
                                        placeholder="Number of participants">
                                </div>
                            </div>
                            <div class="form-group">
                                <div id="dynamic_field">
                                    <div class="row text-center mb-2">
                                        <div class="col-md-9">
                                            <div class="form-control-wrap">
                                                <input
                                                    type="email"
                                                    name="guests[]"
                                                    placeholder="participant's email address"
                                                    class="form-control name_list"
                                                    value="{{ old('guests[]') }}"
                                                    id="task">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <button type="button" name="add" id="add" class="btn btn-success">
                                                <em class="icon ni ni-plus"></em>
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-outline-primary btn-block">Create a Room</button>
                            </div>
                        </form>
                        <div class="form-note-s2 text-center pt-4"> New on our platform?
                            <a href="{{ route('rooms.join') }}">Join room</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nk-footer nk-auth-footer-full">
                <div class="container wide-lg">
                    <div class="row g-3">
                        <div class="col-lg-6 order-lg-last">
                            <ul class="nav nav-sm justify-content-center justify-content-sm-end">
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Terms & Condition</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Privacy Policy</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Help</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-6">
                            <div class="nk-block-content text-center text-sm-left">
                                <p class="text-soft small">&copy; {{ now()->format('Y') }} Aperi. All Rights
                                    Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        var i = 1;
        $('#add').click(function () {
            var task = $("#task").val();
            i++;
            $('#dynamic_field').append('<div id="row' + i + '" class="row text-center mb-1"><div class="col-md-9"><div class="form-control-wrap"><input type="text" class="form-control" name="guests[]" placeholder="email address of the guests" class="form-control name_list" value="' + task + '" /></div></div><div class="col-md-3"><button type="button" name="remove" id="' + i + '" class="btn btn-danger btn_remove"><em class="icon ni ni-minus"></em></button></td></div>');
        });

        $(document).on('click', '.btn_remove', function () {
            var button_id = $(this).attr("id");
            $('#row' + button_id + '').remove();
        });
    </script>
@endsection
