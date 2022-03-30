@extends('layouts.auth')

@section('title', "Create your room")

@section('content')
    <div class="nk-wrap nk-wrap-nosidebar">
        <div class="nk-content ">
            <div class="nk-block nk-block-middle nk-auth-body  wide-xs">
                <div class="card">
                    <div class="card-inner card-inner-lg">
                        <div class="nk-block-head">
                            <div class="nk-block-head-content mb-3">
                                <h4 class="nk-block-title text-center">Create your Room</h4>
                            </div>
                        </div>
                        <form action="" method="post">
                            @csrf
                            <div class="form-group">
                                <input
                                    type="date"
                                    class="form-control"
                                    id="date"
                                    name="date"
                                    placeholder="Add event date">
                            </div>
                            <div class="form-group">
                                <input
                                    type="time"
                                    class="form-control"
                                    id="startTime"
                                    name="startTime"
                                    placeholder="Add your start time">
                            </div>
                            <div class="form-group">
                                <div class="form-control-wrap">
                                    <input
                                        type="time"
                                        class="form-control"
                                        id="endTime"
                                        name="endTime"
                                        placeholder="Add your end time">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-control-wrap">
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Add your email address">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-control-wrap">
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="participants"
                                        name="participants"
                                        placeholder="Number of participans">
                                </div>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary btn-block">Sign in</button>
                            </div>
                        </form>
                        <div class="form-note-s2 text-center pt-4"> New on our platform?
                            <a href="{{ route('register') }}">Create room</a>
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
                                                    <img src="./images/flags/english.png" alt="" class="language-flag">
                                                    <span class="language-name">English</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="language-item">
                                                    <img src="./images/flags/french.png" alt="" class="language-flag">
                                                    <span class="language-name">Français</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-6">
                            <div class="nk-block-content text-center text-sm-left">
                                <p class="text-soft">&copy; 2019 CryptoLite. All Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
@endsection
