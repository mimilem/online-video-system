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
                        <form action="{{ route('room.token') }}" method="POST">
                            @csrf
                            <div class="form-group">
                                <input
                                    type="text"
                                    class="form-control @error('username') error @enderror"
                                    id="username"
                                    name="username"
                                    value="{{ old('username') }}"
                                    placeholder="Add your username">
                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    class="form-control @error('meetingId') error @enderror"
                                    id="meetingId"
                                    name="meetingId"
                                    value="{{ old('meetingId') }}"
                                    placeholder="Add your room id">
                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    class="form-control @error('roomPins') error @enderror"
                                    id="roomPins"
                                    name="roomPins"
                                    value="{{ old('roomPins') }}"
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
