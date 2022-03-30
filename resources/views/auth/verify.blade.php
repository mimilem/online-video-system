@extends('layouts.auth')

@section('content')
    <div class="nk-wrap nk-wrap-nosidebar">
        <div class="nk-content ">
            <div class="nk-split nk-split-page nk-split-md">
                <div class="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white w-lg-45">
                    <div class="absolute-top-right d-lg-none p-3 p-sm-5">
                        <a href="#" class="toggle btn btn-white btn-icon btn-light" data-target="athPromo"><em class="icon ni ni-info"></em></a>
                    </div>
                    <div class="nk-block nk-block-middle nk-auth-body">
                        <div class="brand-logo pb-5 pt-4">
                            <a href="{{ route('home.index') }}" class="logo-link">
                                <img
                                    src="{{ asset('assets/admins/images/logo.png') }}"
                                    alt="ticket key"
                                    height="70%"
                                    width="70%"
                                >
                            </a>
                        </div>
                        <div class="nk-block-head">
                            <div class="nk-block-head-content">
                                <h5 class="nk-block-title">Reset password</h5>
                            </div>
                        </div>
                        <form action="">
                            <div class="form-group">
                                <div class="form-label-group">
                                    <label class="form-label" for="default-01">Email</label>
                                </div>
                                <input
                                    type="text"
                                    class="form-control form-control-lg"
                                    id="default-01"
                                    placeholder="Enter your email address"
                                >
                            </div>
                            <div class="form-group">
                                <button class="btn btn-lg btn-primary btn-block">Send Reset Link</button>
                            </div>
                        </form>
                        <div class="form-note-s2 pt-5">
                            <a href="{{ route('login') }}"><strong>Return to login</strong></a>
                        </div>
                    </div>
                </div>
                <div class="nk-split-content nk-split-stretch" style="background-image: url('{{ asset('assets/admins/images/login.jpg') }}');background-repeat: no-repeat; background-attachment: fixed; background-position: center"></div>
            </div>
        </div>
    </div>
@endsection
