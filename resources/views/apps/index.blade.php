@extends('layouts.auth')

@section('title', "Add your room")

@section('content')
    <div class="nk-wrap nk-wrap-nosidebar">
        <div class="nk-content ">
            <div class="nk-block nk-block-middle nk-auth-body  wide-xs">
                <div class="brand-logo pb-4 text-center">
                    <a href="" class="logo-link">
                        <img class="logo-light logo-img logo-img-lg" src="{{ asset('assets/admins/images/logo3.png') }}" srcset="{{ asset('assets/admins/images/logo3.png') }} 2x" alt="logo">
                        <img class="logo-dark logo-img logo-img-lg" src="{{ asset('assets/admins/images/logo3.png') }}" srcset="{{ asset('assets/admins/images/logo3.png') }} 2x" alt="logo-dark">
                    </a>
                </div>
                <div class="card">
                    <div class="card-inner card-inner-lg" >
                        <div class="nk-block-head">
                            <div class="nk-block-head-content">
                                <h4 class="nk-block-title text-center">Join Room</h4>
                            </div>
                        </div>

                        <span id="message" class="text-danger small"></span>
                        <form action="" id="login_form">
                            <div class="form-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="username"
                                    name="username"
                                    placeholder="Add your username">
                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="meetingId"
                                    name="meetingId"
                                    placeholder="Add your room id">
                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="roomPins"
                                    name="roomPins"
                                    placeholder="Enter your Pin">
                            </div>
                            <div class="form-group">
                                <button class="btn btn-outline-primary btn-block"  id="joinRoom">Sign in</button>
                            </div>
                        </form>
                        <div class="form-note-s2 text-center pt-4"> New on our platform?
                            <a href="{{ route('room.create') }}">Create room</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nk-footer nk-auth-footer-full">
                <div class="container wide-lg">
                    <div class="row g-3">
                        <div class="col-lg-6 order-lg-last">
                            <ul class="nav nav-sm justify-content-center justify-content-lg-end">
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Terms & Condition</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Privacy Policy</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Help</a>
                                </li>
                                <li class="nav-item dropup">
                                    <a class="dropdown-toggle dropdown-indicator has-indicator nav-link" data-toggle="dropdown" data-offset="0,10"><span>English</span></a>
                                    <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                        <ul class="language-list">
                                            <li>
                                                <a href="#" class="language-item">
                                                    <img src="#" alt="" class="language-flag">
                                                    <span class="language-name">English</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="language-item">
                                                    <img src="#" alt="" class="language-flag">
                                                    <span class="language-name">Français</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-6">
                            <div class="nk-block-content text-center text-lg-left">
                                <p class="text-soft">&copy; 2019 CryptoLite. All Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection


@section('scripts')
    <script defer>
        $(document).ready(function () {
            $('#login_form').on('submit', (e) => {
                e.preventDefault();
                let data = {
                    username: $('#username').val(),
                    meetingId: $('#meetingId').val(),
                    roomPins: $('#roomPins').val(),
                }

                let errors = [];

                if (data.username.trim() === '') {
                    errors.push('Enter your name.');
                }
                if (data.meetingId.trim() === '') {
                    errors.push('Enter your Room Id.')
                }

                if (data.roomPins.trim() === '') {
                    errors.push('Enter your Room Id.')
                }

                if (errors.length > 0) {
                    let mapreduce = errors.map(function (item) {
                        return item + "</br>";
                    });
                    let allErrors = mapreduce.join('').toString();

                    toastr.clear();
                    NioApp.Toast(`${allErrors}`, 'error', {
                        position: 'top-center'
                    });

                    return false;
                }

                joinRoom(data, function (data) {
                    console.log('data:' , data)
                    if (!jQuery.isEmptyObject(data)) {
                        const user_ref = username.value;
                        window.location.href = `/client/rooms/${data.room_id}/${data.type}/${user_ref}`;
                    } else {
                        alert('No room found');
                    }
                });
            })

            function joinRoom(attributes, callback){
                const xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        const response = JSON.parse(this.responseText);
                        if (response.error) {
                            toastr.clear();
                            NioApp.Toast(`${response.error}`, 'error', {
                                position: 'top-center'
                            });
                        } else {
                            callback(response.room);
                        }
                    }
                };
                xhttp.open("POST", "/api/create-token/", true);
                xhttp.setRequestHeader('Content-Type', 'application/json');
                xhttp.send(JSON.stringify(attributes));
            }
        });
    </script>
@endsection
