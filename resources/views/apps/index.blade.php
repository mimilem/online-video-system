@extends('layouts.auth')

@section('title', "Add your room")

@section('content')
    <div class="nk-wrap nk-wrap-nosidebar">
        <div class="nk-content ">
            <div class="nk-block nk-block-middle nk-auth-body  wide-xs">
                <div class="brand-logo pb-4 text-center">
                    <a href="" class="logo-link">
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
                        @if (session('error'))
                            <div class="alert alert-danger">{{ session('error') }}</div>
                        @endif
                        <div class="nk-block-head">
                            <div class="nk-block-head-content">
                                <h4 class="nk-block-title text-center">Join Room</h4>
                            </div>
                        </div>
                        <form action="{{ route('room.token') }}" method="POST">
                            @csrf
                            <div class="form-group">
                                <input
                                    type="text"
                                    class="form-control @error('username') error @enderror"
                                    name="username"
                                    value="{{ old('username') }}"
                                    placeholder="Add your username">
                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    class="form-control @error('meetingId') error @enderror"
                                    name="meetingId"
                                    value="{{ old('meetingId') ? $roomId : '' }}"
                                    placeholder="Add your room id">
                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    class="form-control @error('roomPins') error @enderror"
                                    name="roomPins"
                                    value="{{ old('roomPins') ? $pins : '' }}"
                                    placeholder="Enter your Pin">
                            </div>
                            <div class="form-group">
                                <button class="btn btn-outline-primary btn-block">Join room</button>
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
                            </ul>
                        </div>
                        <div class="col-lg-6">
                            <div class="nk-block-content text-center text-lg-left">
                                <p class="text-soft">&copy; {{ now()->format('Y') }} Ngomadigital. All Rights
                                    Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
