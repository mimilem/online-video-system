@extends('layouts.auth')

@section('title', "Create your room")

@section('content')
    <div class="nk-wrap nk-wrap-nosidebar">
        <div class="nk-content">
            <div class="nk-block nk-block-middle nk-auth-body wide-xs">
                <div class="brand-logo pb-4 text-center">
                    <a href="{{ route('room.create') }}" class="logo-link">
                        <img class="logo-light logo-img logo-img-lg" src="{{ asset('assets/aperi/Aperi Logo/3x/Aperixhdpi.png') }}" srcset="{{ asset('assets/aperi/Aperi Logo/3x/Aperixhdpi.png') }} 2x" alt="logo">
                        <img class="logo-dark logo-img logo-img-lg" src="{{ asset('assets/aperi/Aperi Logo/3x/Aperixhdpi.png') }}" srcset="{{ asset('assets/aperi/Aperi Logo/3x/Aperixhdpi.png') }} 2x" alt="logo-dark">
                    </a>
                </div>
                <div class="card">
                    <div class="card-inner card-inner-lg">
                        <div class="nk-block-head">
                            <div class="nk-block-head-content mb-3">
                                <h4 class="nk-block-title text-center">Create your Room</h4>
                            </div>
                        </div>
                        <form action="{{ route('room.store') }}" method="POST">
                            @csrf
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
                                        type="email"
                                        class="form-control @error('email') error @enderror"
                                        name="email"
                                        value="{{ old('email') }}"
                                        placeholder="Add your email address">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-control-wrap">
                                    <input
                                        type="text"
                                        class="form-control @error('participants') error @enderror"
                                        name="participants"
                                        value="{{ old('participants') }}"
                                        placeholder="Number of participants">
                                </div>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-outline-primary btn-block">Create room</button>
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
                                <p class="text-soft small">&copy; {{ now()->format('Y') }} Aperi. All Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
